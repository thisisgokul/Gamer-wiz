import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    admin:{type:Boolean,default:false },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
