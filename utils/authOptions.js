import connectToDb from "@/config/database"
import User from "@/models/User";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY,
      authorization:{
        params:{
          prompt:'consent',
          access_type:'offline',
          response_type:'code'
        }
      }
    }),
    // ...add more providers here
  ],
  callbacks:{
    async signIn({profile}){
      await connectToDb();
      const user = await User.findOne({email:profile?.email});
      if(!user){
        const username = profile?.name?.slice(0,20);
        const newUser = await User.create({
          username,
          email:profile?.email,
          image:profile?.picture
        })
      }
      return true;
    },
    async session({session}){
      await connectToDb();
      const userExit = await User.findOne({email:session?.user?.email});
      session.user.id = userExit?._id?.toString()
      return session;
    }
  }
}

