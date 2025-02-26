"use client";

import { useEffect } from "react";
// import { fetchUserData } from "@/api/user";
// import { useToast } from "@/hooks/use-toast";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store";
// import Image from "next/image";
// import Link from "next/link";
// import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import GoalTopics from "@/components/page-components/main-page/goal-topics";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    if(!window) return;
    if (localStorage.getItem("accessToken") === null) {
      router.push("/greating ");
    }
  }, []);

  return (
    <div className="pt-20 px-6">
      <h1 className="text-mydarkgray text-2xl font-bold">
        What do you want <br /> to reach?
      </h1>
      <h2 className="text-[#A1A4B2] font-bold mt-4">
        choose a topic to focus on:
      </h2>
      <GoalTopics />
    </div>
  );
};

export default Page;
