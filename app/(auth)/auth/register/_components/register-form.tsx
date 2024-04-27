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
import {
  registerFormSchema,
  registerFormSchemeType,
} from "@/schema/form-schema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { registerAction } from "@/app/action/register";

interface LoginFormProps {}

const RegisterForm: FC<LoginFormProps> = ({}) => {
  const [isPending, setIsPending] = useTransition();

  const form = useForm<registerFormSchemeType>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = (values: registerFormSchemeType) => {
    try {
      setIsPending(async () => {
        await registerAction(values)?.then((data) => {
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
      Heading="Auth 🔒"
      description="create an account"
      backButtonHref="/auth/login"
      backButtonLabel="already have an account?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="john doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            Register
          </Button>
        </form>
      </Form>

      <SocialLoginButton />
    </CardWrapper>
  );
};

export default RegisterForm;
