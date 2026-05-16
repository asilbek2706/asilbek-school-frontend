import { Button } from "@/shared/ui";
import type { ReactNode } from "react";

type AuthSectionLinkProps = {
  children: ReactNode;
  onClick: () => void;
};

export const AuthSectionLink = ({ children, onClick }: AuthSectionLinkProps) => (
  <Button
    type="button"
    onClick={onClick}
    className="h-12 rounded-xl bg-white/[0.05] text-white/80 shadow-none hover:bg-white/[0.08]"
  >
    {children}
  </Button>
);
