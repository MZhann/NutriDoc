"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoginLoading(true);
    try {
      const response = await loginUser(data);
      toast({
        variant: "success",
        title: "Login Successful",
        description: "You have been logged in successfully!",
      });
      localStorage.setItem("accessToken", response.access_token);
      localStorage.setItem("refreshToken", response.refresh_token);
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: (error as Error).message,
      });
    } finally {
      setIsLoginLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-white pt-28 relative z-0">
      <Image
        src="/assets/images/decoration/auth-decor.svg"
        width={430}
        height={430}
        className="absolute top-0 left-0 -z-10 rounded-xl"
        alt="auth page decor"
      />

      <Card className="w-11/12">
        <CardHeader>
          <CardTitle className="text-xl text-center text-mydarkgray font-bold">
            Welcome Back!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mt-10">
            <span className="text-sm text-mylightgray">Log in</span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-mylightgray pl-1">
                email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your email"
                {...register("email")}
                className="bg-[#F2F3F7] placeholder:text-mylightgray placeholder:font-bold placeholder:text-sm"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="text-mylightgray pl-1">
                password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="your password"
                {...register("password")}
                className="bg-[#F2F3F7] placeholder:text-mylightgray placeholder:font-bold placeholder:text-sm"
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col items-center bottom-20 absolute left-0 w-full">
              <div className="w-10/12">
                <Button
                  type="submit"
                  variant="indigo"
                  size="md"
                  className="w-full"
                  disabled={isLoginLoading}
                >
                  {isLoginLoading ? <Loader className="animate-spin text-white"/> : 'Login'}
                </Button>
                <div className="flex items-center justify-center mt-3 px-4 text-sm">
                  Don&apos;t have an account? &nbsp;
                  <Link
                    href="/register"
                    className="text-blue-500 hover:underline whitespace-nowrap"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
