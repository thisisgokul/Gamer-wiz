import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_key_id!,
  key_secret: process.env.key_secret!,
});

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();
    const options = {
      amount: amount * 100,
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    handleError(error);
  }
}
