import { connectDatabase } from "@/lib/database";
import Orders from "@/lib/database/modals/orders.model";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    try {
        await connectDatabase();
        const data = await request.json();
        await Orders.create(data);
        return NextResponse.json("Category created successfully")
    } catch (error) {
        handleError(error)
    }
    
}
export async function GET() {
    try {
        await connectDatabase();
        const data = await Orders.find();
        return NextResponse.json(data)
    } catch (error) {
        handleError(error)
    }
    
}