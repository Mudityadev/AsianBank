import { NextResponse } from "next/server";
import { userService } from "@/lib/services/user-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, documentType, reference } = body;
    if (!userId || !documentType || !reference) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const document = userService.submitKycDocument({ userId, documentType, reference });
    return NextResponse.json({ document });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }
  try {
    const status = userService.getVerificationStatus(userId);
    return NextResponse.json({ status });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}
