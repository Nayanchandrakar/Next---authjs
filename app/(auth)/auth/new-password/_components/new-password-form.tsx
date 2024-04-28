"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import CardWrapper from "@/components/shared/card-wrapper";
import { passwordSchema, passwordSchemaType } from "@/schema/form-schema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { newPasswordAction } from "@/app/action/new-password";

interface ResetFormProps {
  token: string;
}

const NewPasswordForm: FC<ResetFormProps> = ({ token }) => {
  const [isPending, setIsPending] = useTransition();

  const form = useForm<passwordSchemaType>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = (values: passwordSchemaType) => {
    try {
      setIsPending(async () => {
        await newPasswordAction(values, token)?.then((data) => {
          if (data?.success) {
            return toast.success(data?.success);
          }
          return toast.error(data?.error);
        });
      });
    } catch (error) {
      return toast?.error("something went wrong!");
    }
  };

  return (
    <CardWrapper
      Heading="Passwor Reset"
      description="Enter a new password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} className="w-full" type="submit">
            reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
