"use client";

import * as React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { ConfirmModal } from "./confirm-modal"; // Importe o componente Modal aqui
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { ImageIcon } from "lucide-react";
import { Pencil } from "lucide-react";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
};

export const ImageForm = ({
  initialData,
  courseId
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleGenerateImage = () => {
    setShowModal(true);
  };

  const confirmGenerateImage = () => {
    console.log("AI Image Generation would be implemented here.");
    setShowModal(false);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {renderButtonContent(isEditing, initialData)}
        </Button>
        {!isEditing && (
          <Button onClick={handleGenerateImage} variant="outline">
            Generate Image with AI
          </Button>
        )}
      </div>
      {!isEditing && renderImageDisplay(initialData)}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => onSubmit({ imageUrl: url })}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmGenerateImage}
      >
        Are you sure you want to automatically generate an image for this course?
      </ConfirmModal>
    </div>
  );
};

const renderButtonContent = (isEditing, initialData) => {
  if (isEditing) return <>Cancel</>;
  if (!initialData.imageUrl) {
    return (
      <>
        <PlusCircle className="h-4 w-4 mr-2" />
        Add an image
      </>
    );
  }
  return (
    <>
      <Pencil className="h-4 w-4 mr-2" />
      Edit image
    </>
  );
};

const renderImageDisplay = (initialData) => {
  if (!initialData.imageUrl) {
    return (
      <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
        <ImageIcon className="h-10 w-10 text-slate-500" />
      </div>
    );
  }
  return (
    <div className="relative aspect-video mt-2">
      <Image
        alt="Course Image"
        fill
        className="object-cover rounded-md"
        src={initialData.imageUrl}
      />
    </div>
  );
};
