import type { ReactNode } from "react";

type AuthLayoutProps = {
  badge?: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  aside?: ReactNode;
};

export const AuthLayout = ({
  badge = "Asilbek School",
  title,
  description,
  children,
  footer,
  aside,
}: AuthLayoutProps) => {
  return (
    <section className="relative min-h-[calc(100vh-0px)] overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.15),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(244,63,94,0.15),transparent_30%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <aside className="hidden flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-white shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:flex">
            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                {badge}
              </div>
              <h1 className="max-w-md text-4xl font-black tracking-tight text-white xl:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-lg text-base leading-7 text-white/55 xl:text-lg">
                {description}
              </p>
            </div>
            {aside}
          </aside>

          <div className="rounded-[2rem] border border-white/10 bg-[#111111]/80 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="mb-8 lg:hidden">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                {badge}
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-white/55 sm:text-base">
                {description}
              </p>
            </div>

            {children}

            {footer && <div className="mt-6">{footer}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};
