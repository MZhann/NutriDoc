import Image from "next/image";

const Monitoring = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center pt-20 text-[#3F414E] p-6">
      <h1 className="font-bold text-2xl">Monitoring</h1>

      <p className="text-center text-[#A0A3B1] mt-4">
        you can see the sessions that going on and update them with your
        progress
      </p>

      <div className="w-full mt-10 h-24 bg-[url('/assets/images/decoration/yellowish-bg.svg')] bg-no-repeat bg-cover bg-center rounded-xl flex justify-between items-center p-6  ">
        <div>
          <p className="text-lg font-bold">Lose weight</p>
          <div className="flex flex-col text-sm text-[#5A6175]">
            <span>APR 30</span>
          </div>
        </div>
        <button className="text-lg font-bold text-[#5A6175] size-12 rounded-full bg-[#3F414E] flex justify-center items-center">
          {/* <Play className="text-white" /> */}
          <Image src={'/assets/images/decoration/play.svg'} width={17} height={17} alt="start button"/>
        </button>
      </div>

      <div className="w-full mt-10 h-24 bg-[url('/assets/images/decoration/yellowish-bg.svg')] bg-no-repeat bg-cover bg-center rounded-xl flex justify-between items-center p-6  ">
        <div>
          <p className="text-lg font-bold">Lose weight</p>
          <div className="flex flex-col text-sm text-[#5A6175]">
            <span>APR 30</span>
          </div>
        </div>
        <button className="text-lg font-bold text-[#5A6175] size-12 rounded-full bg-[#3F414E] flex justify-center items-center">
        <Image src={'/assets/images/decoration/play.svg'} width={17} height={17} alt="start button"/>

        </button>
      </div>

      <div className="w-full mt-10 h-24 bg-[url('/assets/images/decoration/yellowish-bg.svg')] bg-no-repeat bg-cover bg-center rounded-xl flex justify-between items-center p-6  ">
        <div>
          <p className="text-lg font-bold">Lose weight</p>
          <div className="flex flex-col text-sm text-[#5A6175]">
            <span>APR 30</span>
          </div>
        </div>
        <button className="text-lg font-bold text-[#5A6175] size-12 rounded-full bg-[#3F414E] flex justify-center items-center">
        <Image src={'/assets/images/decoration/play.svg'} width={17} height={17} alt="start button"/>

        </button>
      </div>
    </section>
  );
};

export default Monitoring;
