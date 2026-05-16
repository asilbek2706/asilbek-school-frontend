import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  alert?: ReactNode;
};

type AuthFieldProps = {
  children: ReactNode;
  error?: string;
};

export const authInputClass = `
  w-full
  h-14

  rounded-2xl

  border border-white/10
  bg-white/[0.04]

  px-5

  text-white
  outline-none

  transition-all

  placeholder:text-white/30

  focus:border-orange-500/40
  focus:bg-white/[0.06]
`;

export const authButtonClass = `
  w-full
  h-14

  rounded-2xl

  bg-gradient-to-r
  from-orange-500
  to-red-500

  text-white
  font-bold

  shadow-[0_16px_40px_rgba(249,115,22,0.25)]

  transition-all

  hover:brightness-110
  active:scale-[0.99]
`;

export const authSecondaryButtonClass = `
  w-full

  text-white/60
  text-sm

  hover:text-white
  transition-all
`;

export const AuthField = ({ children, error }: AuthFieldProps) => {
  return (
    <div>
      {children}

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

const AuthShell = ({
  title,
  description,
  children,
  footer,
  alert,
}: AuthShellProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-transparent">
      <div className="relative w-full max-w-[520px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8 md:p-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

        <div className="relative z-10">
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
              <span className="h-2 w-2 rounded-full bg-orange-400" />
              Asilbek School
            </div>

            <h1 className="text-3xl font-black text-white sm:text-4xl">
              {title}
            </h1>

            <p className="mt-3 text-base leading-relaxed text-white/45 sm:text-lg">
              {description}
            </p>
          </div>

          {alert && <div className="mb-6">{alert}</div>}

          <div>{children}</div>

          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </div>
    </section>
  );
};

export default AuthShell;