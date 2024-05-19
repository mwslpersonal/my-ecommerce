import { Select, SelectProps } from "@chakra-ui/react";
import { Labeled, LabeledProps } from "./labeled";
import { FC } from "react";

type LabeledSelectProps = LabeledProps & SelectProps;

export const LabeledSelect: FC<LabeledSelectProps> = ({
  label,
  inline,
  ...rest
}) => {
  return (
    <Labeled label={label} inline={inline}>
      <Select {...rest} />
    </Labeled>
  );
};
