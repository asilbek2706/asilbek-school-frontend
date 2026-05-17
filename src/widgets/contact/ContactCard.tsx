import React from "react";
import { motion } from "framer-motion";
import type { IContact } from "@/shared/types/contact";

const hexToRgba = (hex: string, alpha = 1) => {
  const clean = hex.replace("#", "").trim();

  const parsed =
    clean.length === 3
      ? clean
        .split("")
        .map((c) => c + c)
        .join("")
      : clean;

  const bigint = parseInt(parsed, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ContactCard = ({ contact }: { contact: IContact }) => {
  const glow = hexToRgba(contact.color || "#ffffff", 0.16);

  return (
    <motion.a
      href={contact.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${contact.name}`}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="
        group
        relative
        overflow-hidden

        rounded-[1.8rem]

        border border-white/10
        bg-white/[0.03]

        backdrop-blur-2xl

        px-5
        py-4

        transition-all duration-500

        hover:border-orange-500/30
        hover:bg-white/[0.05]

        hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          -top-12
          -right-10

          w-32
          h-32

          rounded-full
          blur-3xl

          opacity-0
          group-hover:opacity-100

          transition-all duration-700
        "
        style={{
          background: glow,
        }}
      />

      {/* SHINE */}
      <div
        className="
          absolute
          inset-0

          opacity-0
          group-hover:opacity-100

          transition-opacity duration-700

          bg-gradient-to-br
          from-white/[0.08]
          via-transparent
          to-transparent
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 flex items-center gap-4">
        {/* ICON */}
        <div
          className="
            relative

            w-14
            h-14
            shrink-0

            rounded-2xl

            flex items-center justify-center

            border border-white/10
            bg-white/[0.04]

            transition-all duration-500

            group-hover:scale-105
          "
        >
          {/* ICON BG */}
          <div
            className="
              absolute
              inset-0

              rounded-2xl

              opacity-20
            "
            style={{
              background: glow,
            }}
          />

          <img
            src={contact.icon}
            alt={contact.name}
            loading="lazy"
            className="
              relative z-10

              w-7
              h-7

              object-contain
            "
          />
        </div>

        {/* TEXT */}
        <div className="flex-1 min-w-0">
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <h3
              className="
                text-white
                text-lg
                font-bold
                truncate
              "
            >
              {contact.name}
            </h3>

            <div
              className="
    text-white/25

    opacity-0
    invisible

    transition-all duration-300

    group-hover:opacity-100
    group-hover:visible

    group-hover:text-white
    group-hover:translate-x-1
  "
            >
              ↗
            </div>
          </div>

          <p
            className="
              mt-1

              text-white/40
              text-[13px]

              line-clamp-1
            "
          >
            {contact.description}
          </p>

          <span
            className="
              inline-block
              mt-2

              text-sm
              font-semibold
            "
            style={{
              color: contact.color,
            }}
          >
            {contact.value}
          </span>
        </div>
      </div>
    </motion.a>
  );
};

export default React.memo(ContactCard);