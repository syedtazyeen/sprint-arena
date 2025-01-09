import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        {
          status: 400,
          message: "User ID is required",
        },
        { status: 400 }
      );
    }

    const events = await prisma.event.findMany({
      where: {
        userId: userId,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(events);
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        message: "An error occurred while fetching events",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
