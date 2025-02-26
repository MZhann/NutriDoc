'use client'

import { Heart } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { getCurrentUserProfile } from "@/api/user"

const UserInfo = () => {

  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [weight, setWeight] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrentUserProfile();
      setFirstname(data.first_name);
      setLastname(data.last_name)
      setWeight(data.physical_data.weight)
    };
    fetchData();
  }, [])


  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex gap-3">
        <Heart className="text-red-400 mt-3" />
        <div className="-space-y-0 text-[#A1A4B2]">
          <p className="font-bold">{firstname} {lastname}</p>
          <p className="text-xs">current weight</p>
          <p>{weight} kg</p>
        </div>
      </div>
      <Image src={'/assets/images/decoration/chillguy.svg'} width={60} height={60} alt="chillguy image" />
    </div>
  )
}

export default UserInfo