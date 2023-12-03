import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
// import { authOptions } from "./options";
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";



// allow cli from prisma
const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
     //  credentials: {
     //    username: {
     //      label: "Username",
     //      type: "text",
     //      placeholder: "WHO",
     //    },
     //    email: {
     //      label: "Email",
     //      type: "text",
     //      placeholder: "who@gmail.com",
     //    },
     //    password: {
     //      label: "Password",
     //      type: "password",
     //      placeholder: "**********",
     //    },
     //  },
      async authorize(credentials) {
        // Check the the email and password is valid
        if (!credentials.email || !credentials.password) {
          return "Email and Password is not valid";
        }
        // check if user exit
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return "User Doesn't Exit";
        }

        // Check if the password is match
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return "Password Doesn't Match";
        }
         console.log("user : ",user);
        return  {
          id: '1234',
          name: 'john',
          email: 'john@gmail.com'
        };;
      },
    })
  ],
  // Track user with JWT token
  session: {
    strategy: "jwt ",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST};