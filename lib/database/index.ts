import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI

const cached = (global as any).mongoose || {conn:null,promise:null};

export const connectDatabase =async () => {
    if(cached.conn) return cached.conn;

    if(!MONGODB_URI) throw new Error("MONGODB_URI is missing");

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI ,{
        dbName:"GamerrWiz",
        promoteBuffers:false
    })

    cached.conn = cached.promise;

    return cached.conn;
    
}