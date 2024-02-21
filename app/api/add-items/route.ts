import { connectDatabase } from "@/lib/database";
import AddItems from "@/lib/database/modals/additem.modal";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";

interface FileObject {
    file: any; 
    url: string;
}

export async function POST(request: Request) {
    try {
        await connectDatabase();
        const data = await request.json();
        const { files, formdata } = data; 
        const { itemname, category , description, price} = formdata;  
        const urls = files.map((file: FileObject) => file.url);
       
        await AddItems.create({
            name: itemname,
            category,
            description,
            price,
            pictures: urls
        });
        
        return NextResponse.json("Item created successfully");
    } catch (error) {
        handleError(error);
    }
}

export async function GET() {
    try {
        await connectDatabase();
        const data = await AddItems.find()
        return NextResponse.json(data);
    } catch (error) {
        handleError(error)
    }
    
}

