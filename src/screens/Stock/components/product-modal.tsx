import { InputFile, LabeledTextarea, PreviewImages } from "@/components";
import { LabeledInput } from "@/components/labeled-input";
import { useCreateProduct, useUpdateProduct } from "@/hooks";
import { Product } from "@/models";
import {
  convertMultiplesToBase64,
  convertMultiplesToFile,
} from "@/utils/helpers";
import { AddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  IconButton,
  ModalFooter,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data?: Product;
};

export const ProductModal: FC<ProductModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [barcode, setBarcode] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");

  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();

  useEffect(() => {
    if (isOpen && data) {
      setProductName(data.name);
      setQuantity(data.quantity);
      setBarcode(data.barcode);
      setDescription(data.description ?? "");
      setImages(data.images);
    }
  }, [data]);

  const createBarcode = () => {
    const barcodeValue = Math.floor(Math.random() * 10 ** 16).toString();
    setBarcode(barcodeValue);
  };

  const cleanData = () => {
    setBarcode("");
    setProductName("");
    setQuantity(0);
    setDescription("");
    setImages([]);
  };

  const saveData = () => {
    const newData = {
      name: productName!,
      barcode: barcode!,
      quantity,
      description,
      images,
    };

    if (data?.id) {
      updateProduct({ id: data?.id, ...newData });
    } else {
      createProduct({
        id: v4(),
        ...newData,
      });
    }

    cleanData();
  };

  const saveImages = async (files: FileList | null) => {
    if (!files) return;
    const convertedFiles = await convertMultiplesToBase64(files);
    setImages(convertedFiles);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="px-3 py-3">
        <ModalCloseButton />

        <ModalBody>
          <div>
            <h2>Novo produto</h2>
          </div>

          <div>
            <div className="pt-4">
              <LabeledInput
                label="Nome:"
                value={productName}
                onChange={(ev) => setProductName(ev.target.value)}
              />
            </div>

            <div className="flex pt-4 items-end">
              <LabeledInput
                label="Código de barra:"
                placeholder="Clique no '+' para criar um"
                value={barcode}
                onChange={(ev) => setBarcode(ev.target.value)}
                isDisabled={!!data?.id}
              />
              <IconButton
                aria-label="Criar código de barra"
                icon={<AddIcon />}
                onClick={createBarcode}
                isDisabled={!!data?.id}
              ></IconButton>
            </div>

            <div className="pt-4 mb-3">
              <LabeledInput
                label="Quantidade:"
                type="number"
                min={0}
                step={1}
                value={quantity}
                onChange={(ev) => setQuantity(parseInt(ev.target.value))}
              />
            </div>

            <div className="mb-3">
              <LabeledTextarea
                label="Descrição do produto:"
                placeholder="Máximo de 500 caracteres"
                maxLength={500}
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
              />
            </div>

            <div className="mb-4">
              <div className="mb-3">
                <InputFile
                  label="Adicionar imagens"
                  setImages={saveImages}
                  multiple={true}
                  accept=".png, .jpg, .jpeg"
                  images={convertMultiplesToFile(images?.length ? images : [])}
                />
              </div>

              <div>
                {images?.length ? <PreviewImages images={images} /> : null}
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <Button
              variant="outline"
              onClick={() => {
                cleanData();
                onClose();
              }}
            >
              {" "}
              Cancelar{" "}
            </Button>
            <Button
              colorScheme="blue"
              isDisabled={!productName || !barcode || !quantity}
              onClick={() => {
                saveData();
                onClose();
              }}
            >
              {" "}
              Salvar{" "}
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
