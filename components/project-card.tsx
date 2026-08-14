import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  subtitle: string;
  thumbImage: string;
  link: string;
}

export const ProjectCard = React.memo(({ id, title, subtitle, thumbImage, link }: ProjectCardProps) => (
  <Link
    href={link}
    className="flex items-center justify-between gap-3 sm:gap-6 group py-2 border-b border-zinc-900/60 hover:border-zinc-800 transition-colors"
  >
    <div className="flex items-center gap-3 sm:gap-6 min-w-0">
      <div className="w-16 h-16 sm:w-28 sm:h-28 rounded-2xl bg-zinc-900 border border-zinc-800/80 overflow-hidden relative flex-shrink-0 shadow-md">
        <Image
          src={thumbImage}
          alt={title}
          fill
          sizes="112px"
          loading="lazy"
          quality={80}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-lg sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#F05335] transition-colors truncate font-poppins">
          {title}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-zinc-400 mt-1 line-clamp-1 font-poppins">
          {subtitle}
        </p>
      </div>
    </div>

    <div className="text-[#F05335] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform p-1 sm:p-2 flex-shrink-0">
      <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
    </div>
  </Link>
));

ProjectCard.displayName = "ProjectCard";
