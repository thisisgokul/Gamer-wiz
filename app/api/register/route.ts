"use server"
import { connectDatabase } from "@/lib/database";
import User from "@/lib/database/modals/user.modal";
import { handleError } from "@/lib/utils";
import bcrypt from "bcrypt"

export async function POST(request: Request) {
  const data = await request.json();
  const { email, password,name } = data;
 
  try {
    await connectDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name:name,
      email: email,
      password: hashedPassword,
    });

    return Response.json({ ok: createdUser });
  } catch (error) {
    handleError(error);
  }
}
