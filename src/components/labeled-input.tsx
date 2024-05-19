import { Input, InputProps } from "@chakra-ui/react";
import { FC } from "react";
import { v4 } from "uuid";
import { Labeled, LabeledProps } from "./labeled";

type LabeledInputProps = InputProps & LabeledProps;

export const LabeledInput: FC<LabeledInputProps> = ({
  label,
  inline,
  ...rest
}) => {
  const id = v4();
  return (
    <Labeled label={label} inline={inline}>
      <Input id={id} {...rest} />
    </Labeled>
  );
};
