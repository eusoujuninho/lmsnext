import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { LessonTitleForm } from "./_components/lesson-title-form";
import { LessonDescriptionForm } from "./_components/lesson-description-form";
import { LessonAccessForm } from "./_components/lesson-access-form";
import { LessonVideoForm } from "./_components/lesson-video-form";
import { LessonActions } from "./_components/lesson-actions";

const LessonIdPage = async ({
  params
}: {
  params: { chapterId: string; lessonId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const lesson = await db.lesson.findUnique({
    where: {
      id: params.lessonId,
      chapterId: params.chapterId
    }
  });

  if (!lesson) {
    return redirect("/")
  }

  const requiredFields = [
    lesson.title,
    lesson.description,
    lesson.videoUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = true;

  return (
    <>
      {!lesson.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.lessonId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                  Lesson creation
                </h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>

            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <LessonVideoForm initialData={lesson} chapterId={params.chapterId} lessonId={lesson.id}></LessonVideoForm>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default LessonIdPage;