// Supondo que todos os componentes importados de "@/components/ui/form" estão corretos e exportados devidamente.
"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";

import {
  Form, // Supondo que Form encapsula FormProvider e <form>
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormSelect, // Certifique-se de que é um Select personalizado
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageFormProps {
  initialData: Course;
  courseId: string;
};

const languageOptions = [
  { value: "pt-BR", label: "Português - Brasileiro" },
  { value: "pt-PT", label: "Português - Portugal" },
  { value: "en-US", label: "English (US)" },
  { value: "es", label: "Español" }
];

const formSchema = z.object({
  language: z.string().min(1, {
    message: "Language selection is required",
  }),
});

export const LanguageForm = ({
  initialData,
  courseId
}: LanguageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: initialData?.language || "pt-BR"
    },
  });

  const { handleSubmit, formState: { isSubmitting, isValid } } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Language updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course language
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit language
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn("text-sm mt-2", !initialData.language && "text-slate-500 italic")}>
          {languageOptions.find(opt => opt.value === initialData.language)?.label || "No language set"}
        </p>
      )}
      {isEditing && (
        <Form onSubmit={handleSubmit(onSubmit)} {...form}>
          <div className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <FormSelect {...field} disabled={isSubmitting} options={languageOptions} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </div>
        </Form>
      )}
    </div>
  )
}
