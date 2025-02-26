"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface FormData {
  name: string;
  surname: string;
  age: number;
  weight: number;
  height: number;
  blood_sugar: number;
  email: string;
  password: string;
  privacyPolicyAccepted: boolean;
}

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      surname: "",
      age: 0,
      weight: 0,
      height: 0,
      blood_sugar: 0,
      email: "",
      password: "",
      privacyPolicyAccepted: false,
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: FormData) => {
    try {
      // Convert numeric fields from string to number before sending
      const payload = {
        first_name: data.name,
        last_name: data.surname,
        email: data.email,
        password: data.password,
        physical_data: {
          weight: Number(data.weight),
          height: Number(data.height),
          age: Number(data.age),
          blood_sugar: Number(data.blood_sugar),
        },
      };

      console.log('payload before sending:', payload);
      const response = await registerUser(payload);
      console.log(response);
      toast({
        variant: "success",
        title: "Registration Successful",
        description: "Your account has been created successfully!",
      });
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: (error as Error).message,
      });
    }
  };

  const steps = [
    "Personal Info",
    "Physical Data",
    "Blood Sugar",
    "Account Details",
  ];
  const totalSteps = steps.length;

  return (
    <div className="flex w-full pt-28 justify-center min-h-screen bg-white">
      <Button
        type="button"
        onClick={prevStep}
        className="py-2 h-12 rounded-full text-mydarkgray bg-white absolute left-8 top-10 hover:bg-myindigo hover:text-white"
      >
        <ArrowLeft />
      </Button>
      <Card className="w-11/12">
        <CardHeader>
          <CardTitle className="text-xl text-center text-mydarkgray font-bold">
            Create your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mt-10">
            <span className="text-sm text-mylightgray">{steps[step]}</span>
          </div>
          <form
            onSubmit={
              step === totalSteps - 1
                ? handleSubmit(onSubmit)
                : handleSubmit(() => nextStep())
            }
          >
            {step === 0 && (
              <div className="space-y-4">
                {/* Step 0: Personal Info */}
                <div>
                  <Label htmlFor="name" className="text-mylightgray pl-1">
                    name
                  </Label>
                  <Input
                    id="name"
                    className="bg-[#F2F3F7] placeholder:text-mylightgray placeholder:font-bold placeholder:text-sm"
                    placeholder="your name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="surname" className="text-mylightgray pl-1">
                    surname
                  </Label>
                  <Input
                    id="surname"
                    className="bg-[#F2F3F7] placeholder:text-mylightgray placeholder:font-bold placeholder:text-sm"
                    placeholder="your surname"
                    {...register("surname")}
                  />
                  {errors.surname && (
                    <p className="text-sm text-red-500">
                      {errors.surname.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="age" className="text-mylightgray pl-1">
                    age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    className="bg-[#F2F3F7] placeholder:text-mylightgray placeholder:font-bold placeholder:text-sm"
                    placeholder="age"
                    {...register("age")}
                  />
                  {errors.age && (
                    <p className="text-sm text-red-500">{errors.age.message}</p>
                  )}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                {/* Step 1: Physical Data */}
                <div>
                  <Label htmlFor="weight" className="text-mylightgray pl-1">
                    weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    className="bg-[#F2F3F7] placeholder:text-mylightgray placeholder:font-bold placeholder:text-sm"
                    placeholder="weight"
                    {...register("weight")}
                  />
                  {errors.weight && (
                    <p className="text-sm text-red-500">
                      {errors.weight.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="height" className="text-mylightgray pl-1">
                    height (cm)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    className="bg-[#F2F3F7] placeholder:text-mylightgray placeholder:font-bold placeholder:text-sm"
                    placeholder="height"
                    {...register("height")}
                  />
                  {errors.height && (
                    <p className="text-sm text-red-500">
                      {errors.height.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                {/* Step 2: Blood Sugar */}
                <div>
                  <Label
                    htmlFor="blood_sugar"
                    className="text-mylightgray pl-1"
                  >
                    blood sugar
                  </Label>
                  <Input
                    id="blood_sugar"
                    className="bg-[#F2F3F7] placeholder:text-mylightgray placeholder:font-bold placeholder:text-sm"
                    type="number"
                    placeholder="blood sugar"
                    {...register("blood_sugar")}
                  />
                  {errors.blood_sugar && (
                    <p className="text-sm text-red-500">
                      {errors.blood_sugar.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                {/* Step 3: Account Details */}
                <div>
                  <Label htmlFor="email" className="text-mylightgray pl-1">
                    email
                  </Label>
                  <Input
                    id="email"
                    className="bg-[#F2F3F7] placeholder:text-mylightgray placeholder:font-bold placeholder:text-sm"
                    type="email"
                    placeholder="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password" className="text-mylightgray pl-1">
                    password
                  </Label>
                  <Input
                    id="password"
                    className="bg-[#F2F3F7] placeholder:text-mylightgray placeholder:font-bold placeholder:text-sm"
                    type="password"
                    placeholder="password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    id="privacyPolicyAccepted"
                    className="size-4 bg-[#F2F3F7]"
                    type="checkbox"
                    {...register("privacyPolicyAccepted")}
                  />
                  <Label
                    htmlFor="privacyPolicyAccepted"
                    className="cursor-pointer text-sm text-mylightgray"
                  >
                    I agree to the{" "}
                    <Link
                      href="/privacy-policy"
                      target="_blank"
                      className="text-blue-500 underline"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                  {errors.privacyPolicyAccepted && (
                    <p className="text-sm text-red-500">
                      {errors.privacyPolicyAccepted.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col items-center bottom-20 absolute left-0 w-full">
              <div className="flex justify-center flex-col w-10/12">
                <div className="flex justify-between">
                  {/* {step > 0 && (
                    
                  )} */}
                  <Button
                    type="submit"
                    className={"w-full"}
                    size="md"
                    variant={"indigo"}
                  >
                    {step === totalSteps - 1 ? "Get Started" : "Next"}
                  </Button>
                </div>

                <p className="text-sm text-center w-full mt-3">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-500 hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
