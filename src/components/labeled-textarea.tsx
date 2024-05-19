import { FC } from "react";
import { Labeled, LabeledProps } from "./labeled";
import { Textarea, TextareaProps } from "@chakra-ui/react";

type LabeledTextareaProps = LabeledProps & TextareaProps;

export const LabeledTextarea: FC<LabeledTextareaProps> = ({
  label,
  inline,
  ...rest
}) => {
  return (
    <Labeled label={label} inline={inline}>
      <Textarea {...rest} />
    </Labeled>
  );
};
