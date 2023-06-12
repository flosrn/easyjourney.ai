type BadgeAnimatedBorderGradientProps = {
  label: string;
};

const BadgeAnimatedBorderGradient = ({
  label,
}: BadgeAnimatedBorderGradientProps) => {
  return (
    <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <div className="inline-flex h-full w-full select-none items-center justify-center rounded-full bg-slate-950/90 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        {label}
      </div>
    </span>
  );
};

export default BadgeAnimatedBorderGradient;
