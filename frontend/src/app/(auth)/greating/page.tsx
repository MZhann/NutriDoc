"use client";

// import { useForm } from "react-hook-form";
import Link from "next/link";
// import { useToast } from "@/hooks/use-toast";
// import { loginUser } from "@/api/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";


export default function GreatingPage() {
  const router = useRouter();
 

  return (
    <div className="flex justify-center h-full min-h-screen bg-white">
      <Image
        src="/assets/images/decoration/Frame.png"
        className="w-full absolute z-0 md:hidden"
        width={300}
        height={300}
        alt="background decoration"
      />

      <Card className="w-11/12 z-10">
        <CardHeader>
          <CardTitle className="text-xl text-center text-mydarkgray font-bold flex justify-center">
            <Image
              src="/assets/icons/logo.svg"
              className="mt-10"
              width={150}
              height={100}
              alt="logo nutriDoc"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col justify-between">
          <Image
            src={"/assets/images/decoration/Group.svg"}
            width={300}
            height={200}
            className="mt-4 ml-4 md:mx-auto md:w-[400px]"
            alt="image vector"
          />

          <div>
            <h1 className="text-xl text-center text-mydarkgray font-bold mt-40 md:mt-6">
              We are what we do
            </h1>
            <p className="text-center text-mylightgray text-sm mt-4">
              We will help you gain or lose mass, keep <br/>diet and keep track of
              you progresses
            </p>

            <div className="absolute md:static w-full flex md:mt-10 justify-center left-0 bottom-8">
              <div className="flex flex-col w-10/12">
                <Button variant={"indigo"} onClick={() => router.push('/login')} size={"md"} className="w-full">
                  Log In
                </Button>
                <div className="flex items-center justify-center mt-3 px-4 text-xs text-mylightgray">
                  DON&apos;T HAVE ACCOUNT? &nbsp;
                  <Link
                    href="/register"
                    className="text-blue-500 hover:underline whitespace-nowrap"
                  >
                    SIGN UP
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
