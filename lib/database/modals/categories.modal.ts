import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
    categories:{type:String,required:true}
},{timestamps:true})

const Category = models?.Category || model("Category",CategorySchema);

export default Category;