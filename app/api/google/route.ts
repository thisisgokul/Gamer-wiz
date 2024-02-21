import { connectDatabase } from "@/lib/database";
import User from "@/lib/database/modals/user.modal";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
  const { name, email,image } = await request.json();
  await connectDatabase()
  await User.create({ name, email,image });
  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}