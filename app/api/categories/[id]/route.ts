import { connectDatabase } from "@/lib/database";
import Category from "@/lib/database/modals/categories.modal";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function DELETE(request: Request,context:any) {
    try {
        await connectDatabase();
        const {params}=context;
        const {id} = params;
        await Category.findByIdAndDelete(id);
    
        return NextResponse.json("Category deleted successfully");
    } catch (error) {
        handleError(error);
    }
}