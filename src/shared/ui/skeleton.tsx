type SkeletonProps = {
  className?: string;
};

export const Skeleton = ({ className = "h-4 w-full" }: SkeletonProps) => (
  <div className={`animate-pulse rounded-xl bg-white/10 ${className}`} aria-hidden="true" />
);
