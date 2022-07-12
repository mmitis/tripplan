import { FC, ReactElement } from "react";

export const Container: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <div className="rounded-md bg-gray-50 overflow-hidden shadow-md mb-2">
      <div className="px-6 py-3">{children}</div>
    </div>
  );
};
