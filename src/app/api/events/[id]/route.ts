import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          status: 400,
          message: "Event ID is required",
        },
        { status: 400 }
      );
    }

    const events = await prisma.event.findUnique({
      where: {
        id: id,
      },
      include: {
        creator: true,
      },
    });

    return NextResponse.json(events);
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        message: "An error occurred while fetching the event",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
