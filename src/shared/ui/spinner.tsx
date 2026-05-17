type SpinnerProps = {
  className?: string;
};

export const Spinner = ({ className = "h-5 w-5" }: SpinnerProps) => (
  <svg
    className={`${className} animate-spin`}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="4" />
    <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);
