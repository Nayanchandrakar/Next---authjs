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
import SocialLoginButton from "@/app/(auth)/auth/_components/social-login-button";
import { loginFormSchema, loginFormSchemaType } from "@/schema/form-schema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/app/action/login";
import { toast } from "sonner";
import Link from "next/link";

interface ResetFormProps {}

const ResetForm: FC<ResetFormProps> = ({}) => {
  const [isPending, setIsPending] = useTransition();

  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = (values: loginFormSchemaType) => {
    try {
      setIsPending(async () => {
        await loginAction(values)?.then((data) => {
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
      Heading="Reset password"
      description="Forgot your password?"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} className="w-full" type="submit">
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
