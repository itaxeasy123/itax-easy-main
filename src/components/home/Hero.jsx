"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import Button, { BTN_SIZES } from "@/components/ui/Button";
import { InputStyles } from "@/app/styles/InputStyles";

/* ✅ Typewriter → client-only (performance safe) */
const Typewriter = dynamic(() => import("typewriter-effect"), {
  ssr: false,
});

/* ✅ fallback data (API / CMS fail ho jaye) */
const fallbackUpper = {
  mainHeading: "Ease of Doing Taxation, iTaxEasy.",
  subHeading: "Download The App For Better Tax Filing Experience",
  button: "Fill your ITR free",
  ctaLink: "/dashboard",
  image: "/Hero-ITR.gif",
};

export default function Hero({ upper }) {
  const router = useRouter();

  /* ✅ stable merged data */
  const data = useMemo(
    () => ({ ...fallbackUpper, ...(upper || {}) }),
    [upper]
  );

  return (
    <section className={InputStyles.hero_div}>
      {/* LEFT IMAGE */}
      <div className={InputStyles.hero_div2}>
        <Image
          src={data.image}
          width={700}
          height={500}
          alt="Hero Image"
          priority
          unoptimized
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className={InputStyles.hero_div3}>
        <h1 className={InputStyles.hero_h1}>
          <Typewriter
            options={{
              strings: [String(data.mainHeading)],
              autoStart: true,
              loop: true,
              changeDeleteSpeed: 3,
            }}
          />
        </h1>

        <p className={InputStyles.hero_p}>{data.subHeading}</p>

        <Button
          className={`${BTN_SIZES["xl-1"]} ${InputStyles.hero_button}`}
          onClick={() => router.push(data.ctaLink)}
        >
          {data.button}
        </Button>
      </div>
    </section>
  );
}
