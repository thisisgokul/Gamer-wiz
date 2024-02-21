import { Schema, model, models } from "mongoose";

const AddItem = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description :{type:String,required:true},
    pictures: [{ type: String, required:true }],
    price :{type:String, required:true},

})

const AddItems = models?.AddItems || model("AddItems",AddItem);

export default AddItems; 