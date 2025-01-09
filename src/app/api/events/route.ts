import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/options";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchText = searchParams.get("search");

  const where = searchText
    ? {
        OR: [
          { name: { contains: searchText, mode: "insensitive" } },
          { details: { contains: searchText, mode: "insensitive" } },
        ],
      }
    : {};
  try {
    const events = await prisma.event.findMany({
      where,
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
        message: "An error occurred while fetching events.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        status: 401,
        message: "Unauthorized: No user found in session",
      },
      { status: 401 }
    );
  }
  const userId = session.user.id;

  try {
    const {
      name,
      details,
      hosts,
      price,
      category,
      tags,
      seats,
      occupancy,
      location,
      eventLink,
      createdAt,
      startAt,
      endAt,
    } = body;

    if (!name || !userId || !startAt || !endAt) {
      return NextResponse.json(
        {
          status: 400,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const newEvent = await prisma.event.create({
      data: {
        name,
        details,
        hosts: hosts || [],
        price: price || null,
        category,
        tags,
        seats: seats || null,
        occupancy: occupancy || null,
        location,
        eventLink,
        createdAt: createdAt || new Date().toISOString(),
        startAt,
        endAt,
        userId,
      },
    });

    return NextResponse.json(newEvent);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        status: 500,
        message: "An error occurred while creating the event",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
