import { base64ToFile } from "@/utils/helpers";
import { Image } from "@chakra-ui/react";
import { FC } from "react";

type PreviewImagesProps = {
  images: string[];
  columnNumber?: number;
};

export const PreviewImages: FC<PreviewImagesProps> = ({
  images,
  columnNumber = 3,
}) => {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${columnNumber}, minmax(0, 1fr))` }}
    >
      {images.map((image, index) => (
        <Image
          src={URL.createObjectURL(base64ToFile(image))}
          alt={`Product image #${index + 1}`}
          key={index}
          className="w-24 h-24"
        />
      ))}
    </div>
  );
};
