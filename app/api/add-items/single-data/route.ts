import { connectDatabase } from "@/lib/database";
import AddItems from "@/lib/database/modals/additem.modal";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    try {
       await connectDatabase();
       const {_id} = await request.json();
       console.log(_id);
       
       const data = await AddItems.findById(_id);
       return NextResponse.json(data)
    } catch (error) {
        handleError(error);
    }
    
    
}