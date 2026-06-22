"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signUp } from "@/server/users";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Email invalid"),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmpassword: z
      .string()
      .min(8, "Confirmation password must be at least 8 characters."),
  })
  .refine((val) => val.password === val.confirmpassword, {
    message: "Confirmation password is not match",
    path: ["confirmpassword"],
  });

export type FormSignup = z.infer<typeof formSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSignup>({
    resolver: zodResolver(formSchema),
  });

  const onSignUp = async (formdata: FormSignup) => {
    const { success, message } = await signUp(formdata);
    if (success) {
      reset();
    } else {
      console.log(message);
      toast.error(message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSignUp)}>
            <FieldGroup>
              <Field data-invalid={Boolean(errors.name)}>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  aria-invalid={Boolean(errors.name)}
                />
                {Boolean(errors.name) && (
                  <FieldError errors={[{ message: errors.name?.message }]} />
                )}
              </Field>
              <Field data-invalid={Boolean(errors.email)}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {Boolean(errors.email) && (
                  <FieldError errors={[{ message: errors.email?.message }]} />
                )}
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field data-invalid={Boolean(errors.password)}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                    />
                    {Boolean(errors.password) && (
                      <FieldError
                        errors={[{ message: errors.password?.message }]}
                      />
                    )}
                  </Field>
                  <Field data-invalid={Boolean(errors.confirmpassword)}>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      {...register("confirmpassword")}
                    />
                    {Boolean(errors.confirmpassword) && (
                      <FieldError
                        errors={[{ message: errors.confirmpassword?.message }]}
                      />
                    )}
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <Link href="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
}
