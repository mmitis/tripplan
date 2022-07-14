import { ReactNode } from "react";

export const ContainerTitle = ({
  children,
  subtext,
}: {
  children: ReactNode;
  subtext?: string;
}) => {
  return (
    <h4 className="truncate text-base font-medium leading-7 text-slate-900 mb-1 flex justify-between items-center">
      <div> {children}</div>
      {subtext && <div className="text-gray-400 text-sm">{subtext}</div>}
    </h4>
  );
};
