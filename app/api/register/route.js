import bcrypt from "bcrypt";
import {  PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisima = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;

  // Checking the missing fiedl
  if (!name || !email || !password) {
    return new NextResponse("Missing name, email and password !!",{ status: 400 })
  }

  //   Check the use is already exit or not
  const userExit = await prisima.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExit) {
    return new NextResponse("User Already Exit", { status: 400 });
  }

  // Encrypt the user password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user and insert inot mongodb

  const user = await prisima.user.create({
     data: {
          name,
          email,
          password:hashedPassword
     }
  })

  return NextResponse.json(user);
}
