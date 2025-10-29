import { NextResponse } from "next/server";
import { userService } from "@/lib/services/user-service";
import { store } from "@/lib/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") ?? store.demoUserId;
  try {
    const status = userService.getVerificationStatus(userId);
    return NextResponse.json({ status });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}
