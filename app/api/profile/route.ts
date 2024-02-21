import { getServerSession } from "next-auth";
import { connectDatabase } from "@/lib/database";
import User from "@/lib/database/modals/user.modal";
import { handleError } from "@/lib/utils";
import UserInfo from "@/lib/database/modals/userInfo.modal";
import { authOptions } from "@/app/utils/authOptions";

export async function PUT(request:Request) {
  try {
    await connectDatabase();
    const data = await request.json();
    const {name,image,...otherUserInfo}=data;
   
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if(!email){
      return Response.json("user not found");
    }
   
    await User.updateOne({ email }, { name,image });
    await UserInfo.findOneAndUpdate({ email }, otherUserInfo, { upsert: true });
    return Response.json(true);
  } catch (error) {
    return handleError(error);
  }
}

export async function GET() {
  try {
    await connectDatabase();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if(!email){
      Response.json("user not found");
    }

    const user = await User.findOne({ email }).lean();
    const userInfo = await UserInfo.findOne({email}).lean();
   
    return Response.json({...user,...userInfo});
  } catch (error) {
    return handleError(error);
  }
}
