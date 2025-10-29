import { randomUUID } from "crypto";
import { ComplianceLog, KYCDocument, User } from "./types";
import { store } from "./store";

type AMLAssessment = {
  score: number;
  status: "passed" | "failed" | "pending";
  reasons?: string[];
};

export function logComplianceEvent(userId: string, event: string, status: ComplianceLog["status"], details?: Record<string, unknown>) {
  const log: ComplianceLog = {
    id: randomUUID(),
    userId,
    event,
    status,
    createdAt: new Date().toISOString(),
    details,
    score: typeof details?.score === "number" ? (details.score as number) : undefined,
  };
  store.addComplianceLog(log);
  return log;
}

export function evaluateAML(user: User): AMLAssessment {
  const historicalPerformance = user.verificationScore || 0.6;
  const baseScore = 0.6 + Math.random() * 0.2 + historicalPerformance * 0.1;
  const score = Number(baseScore.toFixed(2));
  const status: AMLAssessment["status"] = score > 0.75 ? "passed" : "pending";
  if (status === "pending") {
    return { score, status, reasons: ["Manual review required"] };
  }
  return { score, status };
}

export function verifyKYCDocument({ verificationScore }: User, document: KYCDocument): KYCDocument {
  const historicalConfidence = verificationScore || 0.5;
  const isHighConfidence = document.reference.length > 5 && historicalConfidence >= 0.5;
  return {
    ...document,
    status: isHighConfidence ? "approved" : "pending",
  };
}
