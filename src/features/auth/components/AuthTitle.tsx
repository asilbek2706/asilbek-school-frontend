type AuthTitleProps = {
  title: string;
  description: string;
};

export const AuthTitle = ({ title, description }: AuthTitleProps) => (
  <div className="mb-8 space-y-3">
    <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
      {title}
    </h2>
    <p className="text-sm leading-6 text-white/55 sm:text-base">{description}</p>
  </div>
);
