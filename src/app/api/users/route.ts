import prisma from "../../../../prisma";
import { NextRequest, NextResponse } from "next/server";

// Handler to get all users
async function getHandler() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error: any) {
    throw error;
  }
}

async function postHandler(req: NextRequest) {
  const body = await req.json();

  try {
    console.log("Received request body:", body);
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          status: 400,
          body: {
            message: "Name, email, and password are required.",
          },
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user)
      return NextResponse.json(
        {
          status: 400,
          body: {
            message: "User already exists",
          },
        },
        { status: 400 }
      );

    const result = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return NextResponse.json(result);
  } catch (error: any) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return NextResponse.json(
      {
        status: 500,
        body: {
          message: "Failed to create user",
        },
      },
      { status: 500 }
    );
  }
}

export { getHandler as GET, postHandler as POST };
