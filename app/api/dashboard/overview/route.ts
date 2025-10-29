import { NextResponse } from "next/server";
import { dashboardService } from "@/lib/services/dashboard-service";
import { store } from "@/lib/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") ?? store.demoUserId;
  try {
    const overview = await dashboardService.getOverview(userId);
    return NextResponse.json({ overview });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}
