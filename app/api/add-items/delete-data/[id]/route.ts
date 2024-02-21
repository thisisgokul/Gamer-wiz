import { connectDatabase } from "@/lib/database";
import AddItems from "@/lib/database/modals/additem.modal";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function DELETE(request: Request,context:any) {
    try {
        await connectDatabase();
        const {params}=context;
        const {id} = params;
        await AddItems.findByIdAndDelete(id);
    
        return NextResponse.json("Category deleted successfully");
    } catch (error) {
        handleError(error);
    }
}