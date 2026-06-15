"use client";
import Image from "next/image";
import { H2 } from "@/components/pagesComponents/pageLayout/Headings";
import { InputStyles } from "@/app/styles/InputStyles";

export default function OngoingProjects({
  title = "Ongoing Projects",
  ongoingProjects = [],
}) {
  /* 🔒 HARD GUARD — JSON empty ho to section hide */
  if (!Array.isArray(ongoingProjects) || ongoingProjects.length === 0) {
    return null;
  }

  const checkImageLink = (url) => {
    if (typeof url === "string" && url.trim() !== "") {
      return url;
    }
    return "/images/home/ongoing_projects/upcoming.avif";
  };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-4 py-4">
      {/* ===== Heading (JSON driven) ===== */}
      <H2 className={InputStyles.service_H2}>
        {title}
        <span className={InputStyles.service_span}></span>
      </H2>

      {/* ===== Cards ===== */}
      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {ongoingProjects.map((project, index) => (
          <li key={index} className="flex justify-center">
            <div
              className="
                group relative
                w-full max-w-[260px]
                h-[300px]
                rounded-2xl
                bg-white
                border border-slate-200
                shadow-md
                transition-all duration-500
                hover:-translate-y-2
                hover:shadow-2xl hover:shadow-blue-200/40
              "
            >
              {/* Image */}
              <div
                className="
                  h-[200px]
                  flex items-center justify-center
                  overflow-hidden
                  rounded-t-2xl
                  bg-gradient-to-br from-slate-50 to-slate-100
                "
              >
                <Image
                  src={checkImageLink(project.image)}
                  alt={project.heading || "Ongoing Project"}
                  width={200}
                  height={160}
                  className="
                    object-contain
                    transition-transform duration-500
                    group-hover:scale-110
                  "
                />
              </div>

              {/* Title */}
              <div
                className="
                  h-[100px]
                  flex items-center justify-center
                  px-4
                  border-t border-slate-200
                "
              >
                <span className="text-center text-sm font-semibold text-slate-800">
                  {project.heading}
                </span>
              </div>

              {/* Hover Ring */}
              <span
                className="
                  pointer-events-none
                  absolute inset-0
                  rounded-2xl
                  ring-1 ring-blue-500/0
                  group-hover:ring-blue-500/40
                  transition-all
                "
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
