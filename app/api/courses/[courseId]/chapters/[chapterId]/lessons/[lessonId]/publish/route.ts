import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { chapterId: string; } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { list } = await req.json();

    const ownChapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        userId: userId
      }
    });

    if (!ownChapter) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    for (let item of list) {
      await db.lesson.update({
        where: { id: item.id },
        data: { position: item.position }
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER_LESSONS]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}