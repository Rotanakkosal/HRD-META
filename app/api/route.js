import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request){
     const session = await getServerSession();
     console.log("session",{session});
     return NextResponse.json({id:1});
}