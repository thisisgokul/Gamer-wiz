import { Schema, model, models } from "mongoose";

const UserInfoSchema = new Schema({
    email: {type: String, required: true},
    address: { type: String },
    phone: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    
},{timestamps:true})

const UserInfo = models.UserInfo || model("UserInfo",UserInfoSchema);

export default UserInfo;