import { Input, InputProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { v4 } from "uuid";

export type LabeledProps = {
  label: string;
  inline?: boolean;
};

export const Labeled: FC<LabeledProps & { children: ReactNode }> = ({
  label,
  inline,
  children,
}) => {
  const id = v4();
  return (
    <div className={`${inline ? "flex items-center" : ""} w-full`}>
      <div className="mb-1 font-semibold pr-2">
        <label htmlFor={id}> {label}</label>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};
