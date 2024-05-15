import { useCreateProduct, useUpdateProduct } from "@/hooks";
import { Product } from "@/models";
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
  useDisclosure,
  Input,
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

  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();

  useEffect(() => {
    if (isOpen) {
      setProductName(data?.name ?? "");
      setQuantity(data?.quantity ?? 0);
      setBarcode(data?.barcode ?? "");
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
  };

  const saveData = () => {
    const newData = {
      name: productName!,
      barcode: barcode!,
      quantity,
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
              <Input
                placeholder="Nome"
                value={productName}
                onChange={(ev) => setProductName(ev.target.value)}
              />
            </div>

            <div className="flex pt-4">
              <Input
                placeholder="Código de barra"
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

            <div className="pt-4">
              <Input
                placeholder="Quantidade"
                type="number"
                min={0}
                step={1}
                value={quantity}
                onChange={(ev) => setQuantity(parseInt(ev.target.value))}
              />
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <Button variant="outline" onClick={onClose}>
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
