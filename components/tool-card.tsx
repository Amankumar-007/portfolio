import React from "react";

interface ToolCardProps {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
}

export const ToolCard = React.memo(({ id, name, subtitle, icon }: ToolCardProps) => (
  <div
    key={id}
    className="flex items-center gap-2.5 sm:gap-3.5 group cursor-pointer p-2 sm:p-2.5 rounded-2xl bg-zinc-950/60 sm:bg-transparent border border-zinc-800/60 sm:border-0 hover:bg-zinc-900/40 transition-colors"
  >
    <div className="w-10 h-10 sm:w-13 sm:h-13 bg-white rounded-[14px] sm:rounded-[16px] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 group-hover:shadow-[0_10px_20px_rgba(240,83,53,0.2)] transition-all duration-300">
      {icon}
    </div>

    <div className="min-w-0 flex-1">
      <h3 className="text-xs sm:text-base font-semibold text-zinc-100 tracking-normal group-hover:text-[#F05335] transition-colors leading-tight truncate font-poppins">
        {name}
      </h3>
      <p className="text-[10px] sm:text-xs font-normal text-zinc-400 mt-0.5 leading-tight truncate font-poppins">
        {subtitle}
      </p>
    </div>
  </div>
));

ToolCard.displayName = "ToolCard";
