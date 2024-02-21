import { connectDatabase } from "@/lib/database";
import Category from "@/lib/database/modals/categories.modal";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    try {
        await connectDatabase();
        const {category} = await request.json();
        await Category.create({categories:category});
        return NextResponse.json("Category created successfully")
    } catch (error) {
        handleError(error)
    }
    
}

export async function GET() {
    try {
        await connectDatabase();
        const data = await Category.find()
        return NextResponse.json(data);
    } catch (error) {
        handleError(error);
    }
    
}

export async function PUT(request:Request){
    try {
        await connectDatabase();
        const {editedCategoryID,category} = await request.json();
        await Category.updateOne({_id:editedCategoryID},{categories:category})
        return NextResponse.json(true);
    } catch (error) {
        handleError(error)
    }
    
}

