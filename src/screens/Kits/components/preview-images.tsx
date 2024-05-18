import { base64ToFile } from "@/utils/helpers";
import { Image } from "@chakra-ui/react";
import { FC } from "react";

type PreviewImagesProps = {
  images: string[];
  columnNumber?: number;
};

export const PreviewImages: FC<PreviewImagesProps> = ({
  images,
  columnNumber = 2,
}) => {
  return (
    <div className={`grid grid-cols-${columnNumber}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className="mx-2 my-2 w-24 h-24 hover:h-full hover:w-full"
        >
          <Image
            src={URL.createObjectURL(base64ToFile(image))}
            alt={`Product image #${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};
