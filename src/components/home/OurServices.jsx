"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { H2 } from "@/components/pagesComponents/pageLayout/Headings";
import { InputStyles } from "@/app/styles/InputStyles";

export default function OurServices({
  title = "Our Services",
  ourServicesCards = [],
}) {
  if (!Array.isArray(ourServicesCards) || ourServicesCards.length === 0) {
    return null;
  }

  return (
    <section className={InputStyles.service_section}>
      <H2 className={InputStyles.service_H2}>
        {title}
        <span className={InputStyles.service_span}></span>
      </H2>

      <ul className={InputStyles.service_ul}>
        {ourServicesCards.map((card, i) => (
          <li key={i} className={InputStyles.service_li}>
            <div className={InputStyles.service_div}></div>

            <div className={InputStyles.service_card_header}>
              <h4 className={InputStyles.service_h4}>{card.heading}</h4>
            </div>

            <div className={InputStyles.service_cardcontent}>
              {card.items.map((item, idx) => {
                const hasLink = !!item.link;

                return (
                  <Link
                    key={idx}
                    href={hasLink ? item.link : "#"}
                    className={`${InputStyles.service_link} ${
                      hasLink
                        ? InputStyles.service_item_link
                        : InputStyles.service_item_dot
                    }`}
                  >
                    <span className={InputStyles.service_label}>
                      {hasLink && (
                        <span className={InputStyles.service_label_span}></span>
                      )}
                      {item.label}
                    </span>

                    {/* ✅ ALWAYS SHOW UPCOMING (NO ARROW) */}
                    <span className={InputStyles.service_Upcoming}>
                      Upcoming
                    </span>
                  </Link>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}