import { NextResponse } from "next/server";
import { userService } from "@/lib/services/user-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, phone } = body;
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const user = userService.signUp({ email, password, name, phone });
    const { passwordHash: _passwordHash, ...safeUser } = user;
    void _passwordHash;
    return NextResponse.json({ user: safeUser });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
