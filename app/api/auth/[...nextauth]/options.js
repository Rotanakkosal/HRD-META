import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

// allow cli from prisma
const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "WHO",
        },
        email: {
          label: "Email",
          type: "text",
          placeholder: "who@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "**********",
        },
      },
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
        return user;
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

// login with credentials provider and github provider
// export const authOptions = {
//     providers: [
//         GitHubProvider({
//             clientId: process.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET,
//         }),
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 username: {
//                     label: "Username : ",
//                     type: "text",
//                     placeholder: "Who"
//                 },
//                 password: {
//                     label: "Passwords : ",
//                     type: "password",
//                     placeholder: "*******"
//                 }
//             },
//             async authorize(credentials) {
//                 const user = { id: "03", name: "who", password: "123" };
//                 if (credentials?.username === user.name && credentials?.password === user.password) {
//                     return user;
//                 } else {
//                     return null;
//                 }
//             }
//         })
//     ],
// };
