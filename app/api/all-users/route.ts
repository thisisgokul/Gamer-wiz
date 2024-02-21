import { connectDatabase } from "@/lib/database";
import User from "@/lib/database/modals/user.modal";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    try {
        await connectDatabase()
       const user = await User.find().lean();
     
       return NextResponse.json(user);
    } catch (error) {
        handleError(error);
    }

}
export async function PUT(req:Request){
    try {
        await connectDatabase()
       const {userId,checked} = await req.json();
       console.log(checked);
       
       await User.findByIdAndUpdate(userId, { admin: checked })
       return NextResponse.json("success");
    } catch (error) {
        handleError(error);
    }

}