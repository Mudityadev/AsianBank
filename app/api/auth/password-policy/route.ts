import { NextResponse } from "next/server";
import { userService } from "@/lib/services/user-service";

export async function GET() {
  return NextResponse.json({ policy: userService.getPasswordPolicy() });
}
