import { randomUUID, createHash } from "crypto";
import { store } from "../store";
import { KYCDocument, TwoFactorEnrollment, User } from "../types";
import { evaluateAML, logComplianceEvent, verifyKYCDocument } from "../compliance";

const PASSWORD_REQUIREMENTS = {
  minLength: 12,
  mustContainUppercase: true,
  mustContainLowercase: true,
  mustContainNumber: true,
  mustContainSymbol: true,
};

type PasswordPolicy = typeof PASSWORD_REQUIREMENTS;

type SignUpPayload = {
  email: string;
  password: string;
  name: string;
  phone?: string;
};

type KycPayload = {
  userId: string;
  documentType: string;
  reference: string;
};

export class UserService {
  validatePassword(password: string): { valid: boolean; violations: string[] } {
    const violations: string[] = [];
    if (password.length < PASSWORD_REQUIREMENTS.minLength) {
      violations.push(`Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters.`);
    }
    if (PASSWORD_REQUIREMENTS.mustContainUppercase && !/[A-Z]/.test(password)) {
      violations.push("Password must contain an uppercase letter.");
    }
    if (PASSWORD_REQUIREMENTS.mustContainLowercase && !/[a-z]/.test(password)) {
      violations.push("Password must contain a lowercase letter.");
    }
    if (PASSWORD_REQUIREMENTS.mustContainNumber && !/[0-9]/.test(password)) {
      violations.push("Password must contain a number.");
    }
    if (PASSWORD_REQUIREMENTS.mustContainSymbol && !/[^A-Za-z0-9]/.test(password)) {
      violations.push("Password must contain a symbol.");
    }
    return { valid: violations.length === 0, violations };
  }

  getPasswordPolicy(): PasswordPolicy {
    return PASSWORD_REQUIREMENTS;
  }

  signUp({ email, password, name, phone }: SignUpPayload): User {
    if (store.getUserByEmail(email)) {
      throw new Error("Email already registered");
    }
    const passwordValidation = this.validatePassword(password);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.violations.join(" "));
    }
    const user: User = store.createUser({
      id: randomUUID(),
      email,
      name,
      phone,
      passwordHash: createHash("sha256").update(password).digest("hex"),
    });
    const aml = evaluateAML(user);
    logComplianceEvent(user.id, "aml-screening", aml.status, { score: aml.score, reasons: aml.reasons });
    if (aml.status === "passed") {
      user.verificationScore = aml.score;
      store.updateUser(user);
    }
    return user;
  }

  enrollTwoFactor(userId: string): TwoFactorEnrollment {
    const user = store.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const secret = createHash("sha1").update(`${user.email}-${Date.now()}`).digest("hex").slice(0, 32).toUpperCase();
    user.twoFactor = { enabled: true, secret, createdAt: new Date().toISOString() };
    store.updateUser(user);
    logComplianceEvent(userId, "2fa-enrollment", "passed");
    return user.twoFactor;
  }

  submitKycDocument(payload: KycPayload): KYCDocument {
    const user = store.getUser(payload.userId);
    if (!user) {
      throw new Error("User not found");
    }
    const document: KYCDocument = {
      id: randomUUID(),
      type: payload.documentType,
      reference: payload.reference,
      uploadedAt: new Date().toISOString(),
      status: "pending",
    };
    user.kycDocuments = [...user.kycDocuments, document];
    const verified = verifyKYCDocument(user, document);
    user.kycDocuments = user.kycDocuments.map((doc) => (doc.id === document.id ? verified : doc));
    if (verified.status === "approved") {
      user.kycStatus = "verified";
      user.verificationScore = Math.max(user.verificationScore, 0.9);
    }
    store.updateUser(user);
    logComplianceEvent(user.id, "kyc-document", verified.status === "approved" ? "passed" : "pending", {
      documentType: verified.type,
    });
    return verified;
  }

  getVerificationStatus(userId: string): Pick<User, "kycStatus" | "verificationScore" | "twoFactor"> {
    const user = store.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      kycStatus: user.kycStatus,
      verificationScore: user.verificationScore,
      twoFactor: user.twoFactor,
    };
  }
}

export const userService = new UserService();
