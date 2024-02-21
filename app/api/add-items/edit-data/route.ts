import { connectDatabase } from "@/lib/database";
import AddItems from "@/lib/database/modals/additem.modal";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";

interface FileObject {
    file: any; 
    url: string;
}
export async function PUT(request:Request) {
    try {
        const { data, id,files }  = await request.json();
        const urls = files.map((file: FileObject) => file.url);
        await connectDatabase();
        await AddItems.findByIdAndUpdate(id,{ ...data, pictures: urls });
        return NextResponse.json(true);
        
    } catch (error) {
        handleError(error);
    }
}
