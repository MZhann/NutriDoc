import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import UserInfo from "@/components/page-components/lose-weight-page/user-info";
import LoseWeightForm from "@/components/page-components/lose-weight-page/lose-weight-form";
import { Suspense } from "react";

const LoseWeight = () => {
  return (
    <div className="relative z-0 w-full max-w-3xl">
      <Image
        src={"/assets/images/decoration/lose-weight-shapka.svg"}
        width={460}
        height={200}
        className="w-screen md:w-full md:h-64 md:object-cover md:object-bottom"
        alt="header lose weight"
      />
      <Link
        href="/"
        className="size-14 rounded-full bg-white border-2 border-mydarkgray absolute top-4 left-4 flex justify-center items-center"
      >
        <ArrowLeft />
      </Link>
      <div className="px-6">
        <p className="pt-6 text-[#A1A4B2] text-sm font-bold">CREATION</p>
        
        <p className="pt-6 text-[#A1A4B2]">
          Track your progress in loosing weight, get specified schedule of diet, and get analysis{" "}
        </p>
        <UserInfo />
        {/* <LoseWeightForm /> */}
        <Suspense fallback={<div>Loading...</div>}>
      <LoseWeightForm />
    </Suspense>
      </div>
    </div>
  );
};

export default LoseWeight;
