import { Children, ReactNode } from "react";

export const ContainerTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h4 className="truncate text-base font-medium leading-7 text-slate-900 mb-1">
      {children}
    </h4>
  );
};
