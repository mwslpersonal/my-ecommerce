import { loadToInputFiled } from "@/utils/helpers";
import { Button } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";

type InputFileProps = {
  setImages?: (files: FileList | null) => void;
  multiple?: boolean;
  label: string;
  accept?: string;
  images?: File[];
};

export const InputFile: FC<InputFileProps> = ({
  setImages,
  label,
  accept = "image/*",
  multiple = false,
  images,
}) => {
  const [numberOfImages, setNumberOfImages] = useState<number>(0);
  const inputImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNumberOfImages(images?.length ?? 0);
    if (inputImageRef.current) {
      if (images?.length) {
        inputImageRef.current.files = loadToInputFiled(images);
      } else {
        inputImageRef.current.files = null;
      }
    }
  }, [images]);

  return (
    <div>
      <Button
        colorScheme="blue"
        onClick={() => inputImageRef.current?.click?.()}
      >
        {label}
      </Button>
      <p>Foram selecionados {numberOfImages} arquivos</p>
      <input
        ref={inputImageRef}
        type="file"
        multiple={multiple}
        accept={accept}
        className="hidden"
        onChange={(ev) => setImages?.(ev.target.files)}
      />
    </div>
  );
};
