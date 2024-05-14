"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";

import { FormControl, FormField, FormItem, FormMessage, FormSelect } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";

interface PriceFormProps {
  initialData: Course;
  courseId: string;
};

const currencyRates = {
  USD: 5.00,
  EUR: 5.50,
  GBP: 6.00,
  BRL: 1
};

const formSchema = z.object({
  price: z.coerce.number(),
  currency: z.string().optional(),
});

export const PriceForm = ({
  initialData,
  courseId
}: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [convertedPrice, setConvertedPrice] = useState<string | null>(null);

  const router = useRouter();

  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
      currency: initialData?.currency || 'USD',
    },
  });

  const { handleSubmit, watch, formState: { isSubmitting, isValid } } = formMethods;
  const price = watch("price");
  const currency = watch("currency");

  useEffect(() => {
    if (currency !== 'BRL' && price) {
      const rate = currencyRates[currency];
      const converted = price * rate;
      setConvertedPrice(`Approximately R$ ${converted.toFixed(2)} BRL`);
    } else {
      setConvertedPrice(null);
    }
  }, [price, currency]);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course price updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course price
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? "Cancel" : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.price && "text-slate-500 italic"
        )}>
          {initialData.price
            ? `${formatPrice(initialData.price)} ${initialData.currency}`
            : "No price"
          }
          {convertedPrice && ` - ${convertedPrice}`}
        </p>
      )}
      {isEditing && (
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={formMethods.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      disabled={isSubmitting}
                      placeholder="Set a price for your course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormSelect {...field} disabled={isSubmitting} options={[
                      { value: "USD", label: "USD" },
                      { value: "EUR", label: "EUR" },
                      { value: "GBP", label: "GBP" },
                      { value: "BRL", label: "BRL" }
                    ]} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {convertedPrice && (
              <p className="text-sm text-gray-700">{convertedPrice}</p>
            )}
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  )
}
