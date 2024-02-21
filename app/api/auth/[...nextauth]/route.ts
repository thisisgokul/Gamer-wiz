import { connectDatabase } from "@/lib/database";
import User from "@/lib/database/modals/user.modal";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "@/lib/database/MongoClient";

export const authOptions={ 
  secret:process.env.SECRET,
 
  // adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
          
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          id:'credentials',
          credentials: {
            email: { label: "Email", type: "text", placeholder: "testuser@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            console.log({credentials});
          
          
          const email = credentials?.email
          const password = credentials?.password
           
          await connectDatabase();
          const user = await User.findOne({email});
          const passwordOk = user && bcrypt.compareSync(password,user.password);
        
          

          if(passwordOk){
            return user;
          }
          
            return null
          }
        })
      ],
      callbacks: {
      
        async signIn({ user, account }:any) {
         
          if (account.provider === "google") {
            const { name, email } = user;
            try {
              await connectDatabase();
              const userExists = await User.findOne({ email });
    
              if (!userExists) {
                const res = await fetch("http://localhost:3000/api/google", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name,
                    email,
                  }),
                });
    
                if (res.ok) {
                  return user;
                }
              }
            } catch (error) {
              console.log(error);
            }
          }
    
          return user;
        },
      },   
  
}

const handler= NextAuth(authOptions)

export {handler as GET , handler as POST}