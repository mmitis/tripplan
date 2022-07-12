import { ReactNode } from "react";
import { Loader } from "./Loader";

type ButtonProps = {
  isLoading?: boolean;
  disabled?: boolean;
  children: ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  isLoading,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={isLoading || disabled}
      className={`${
        disabled ? "opacity-60" : ""
      } ${className} w-[200px] text-center inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500`}
      {...props}
    >
      <div className="w-full text-center flex items-center justify-center">
        {isLoading ? <Loader /> : <>{children}</>}
      </div>
    </button>
  );
};
