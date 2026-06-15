import Typewriter from "typewriter-effect";
import Image from "next/image";
import Button, { BTN_SIZES } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function Hero({ pageData }) {
  const router = useRouter();

  const upper = pageData?.upper;

  return (
    <div className="mx-auto max-w-7xl grid lg:grid-cols-2 items-center gap-y-8 my-28">
      
      {/* IMAGE */}
      <div className="lg:order-2 mx-auto">
        <Image
          src="/Hero-ITR.gif"
          loading="eager"
          width={700}
          height={500}
          alt="ITR"
          priority
        />
      </div>

      {/* CONTENT */}
      <div className="lg:w-full lg:pl-16 lg:mx-0 mt-5 lg:mt-0 text-center lg:text-left">
        
        <h1 className="text-lg lg:text-[32px] font-bold text-slate-800 leading-snug">
          <Typewriter
            options={{
              strings: [upper?.mainHeading || "Ease of Doing Taxation, iTaxEasy."],
              autoStart: true,
              loop: true,
              changeDeleteSpeed: 3,
            }}
          />
        </h1>

        <p className="font-semibold text-slate-800 mt-3">
          {upper?.subHeading || "Download The App For Better Tax Filing Experience"}
        </p>

        <Button
          className={`my-4 font-medium ${BTN_SIZES["xl-1"]} py-[10px]`}
          onClick={() =>
            router.push("/dashboard/itr-filing")
          }
        >
          {upper?.button || "Fill you ITR free"}
        </Button>
      </div>
    </div>
  );
}

