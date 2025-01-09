import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/options";
import prisma from "../../../../../prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          status: 401,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const email = session.user?.email;

    if (!email)
      return NextResponse.json(
        {
          status: 404,
          message: "User not found",
        },
        { status: 404 }
      );

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: 404,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        message: "An error occurred while fetching the user",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
