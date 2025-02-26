import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import UserInfo from "@/components/page-components/lose-weight-page/user-info";

const LoseWeight = () => {
  return (
    <div className="relative z-0">
      <Image
        src={"/assets/images/decoration/lose-weight-shapka.svg"}
        width={460}
        height={200}
        className="w-screen"
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
          Track your progress in loosing weight, get
          <br /> specified schedule of diet, and get analysis{" "}
        </p>
        <UserInfo />
      </div>
    </div>
  );
};

export default LoseWeight;
