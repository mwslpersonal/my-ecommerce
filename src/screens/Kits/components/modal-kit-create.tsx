import { useProducts } from "@/hooks";
import { useCreateKit } from "@/hooks/Kits/CreateKits";
import { useUpdateKit } from "@/hooks/Kits/UpdateKit";
import { Kit } from "@/models";
import {
  convertMultiplesToBase64,
  convertMultiplesToFile,
} from "@/utils/helpers";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import {
  InputFile,
  LabeledInput,
  LabeledSelect,
  LabeledTextarea,
  PreviewImages,
} from "@/components";

type ModalKitCreateProps = {
  isOpen: boolean;
  onClose: () => void;
  kit?: Kit;
};

export const ModalKitCreate: FC<ModalKitCreateProps> = ({
  isOpen,
  onClose,
  kit,
}) => {
  const { data } = useProducts();
  const [selectProducts, setSelectProducts] = useState<
    { id: string; quantity: string }[]
  >([]);
  const [kitName, setKitName] = useState<string>("");
  const [kitQuantity, setKitQuantity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (kit) {
      setKitName(kit.name);
      setKitQuantity(kit.quantity);
      setSelectProducts(kit.products);
      setDescription(kit?.description ?? "");
      setImages(kit.images);
    }
  }, [kit]);

  const onAddProduct = () => {
    setSelectProducts([...(selectProducts ?? []), { id: "", quantity: "" }]);
  };

  const onRemoveProduct = (productIndex: number) => {
    const t = selectProducts.filter((_, index) => index !== productIndex);
    setSelectProducts(t);
  };

  const onProductChange = ({
    id,
    quantity,
    index,
    propName,
  }:
    | {
        id: string;
        quantity?: string;
        propName: "id";
        index: number;
      }
    | {
        id?: string;
        quantity: string;
        propName: "quantity";
        index: number;
      }) => {
    const newSelectProducts = [...selectProducts];
    if (propName === "id") newSelectProducts[index].id = id;
    if (propName === "quantity") newSelectProducts[index].quantity = quantity;

    setSelectProducts(newSelectProducts);
  };

  const { mutate: createKit } = useCreateKit();
  const { mutate: updateKit } = useUpdateKit();
  const onCreateKit = () => {
    const content = {
      name: kitName,
      quantity: kitQuantity,
      products: selectProducts,
      description,
      images,
    };

    if (kit?.id) {
      updateKit({
        id: kit.id,
        ...content,
      });
    } else {
      createKit({
        id: v4(),
        ...content,
      });
    }
  };

  const saveImages = async (files: FileList | null) => {
    if (!files?.length) return;
    const convertedFiles = await convertMultiplesToBase64(files);
    setImages(convertedFiles);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSelectProducts([]);
      }}
    >
      <ModalOverlay />
      <ModalContent className="px-3 py-3">
        <ModalCloseButton />

        <ModalBody>
          <div className="mb-6">
            <h2>Novo kit</h2>
          </div>

          <div className="mb-6">
            <div className="mb-4">
              <LabeledInput
                label="Nome do kit:"
                value={kitName}
                onChange={(ev) => setKitName(ev.target.value)}
              />
            </div>

            <div>
              <LabeledInput
                label="Quantidade:"
                min={0}
                step={1}
                type="number"
                value={kitQuantity}
                onChange={(ev) => setKitQuantity(ev.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <h3>Produtos</h3>
          </div>

          <div className="mb-3">
            {selectProducts?.map((_, index) => (
              <div key={index} className="pb-4 flex items-end">
                <div className="w-2/3 mr-3">
                  <LabeledSelect
                    label="Nome do produto"
                    placeholder="Selecione um produto"
                    onChange={(ev) =>
                      onProductChange({
                        id: ev.target.value,
                        index,
                        propName: "id",
                      })
                    }
                    value={selectProducts[index].id}
                  >
                    {data?.map((product, index) => (
                      <option key={index} value={product.id!}>
                        {product.name}
                      </option>
                    ))}
                  </LabeledSelect>
                </div>

                <div className="w-1/3 mr-3">
                  <LabeledInput
                    label="Quantidade:"
                    min={0}
                    step={1}
                    type="number"
                    onChange={(ev) =>
                      onProductChange({
                        quantity: ev.target.value,
                        index,
                        propName: "quantity",
                      })
                    }
                    value={selectProducts[index].quantity}
                  />
                </div>

                <div>
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="remove product"
                    onClick={() => onRemoveProduct(index)}
                  ></IconButton>
                </div>
              </div>
            ))}

            <div>
              <Button colorScheme="blue" onClick={onAddProduct}>
                {" "}
                Adicionar produto{" "}
              </Button>
            </div>
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
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={() => {
                onClose();
                setSelectProducts([]);
              }}
            >
              {" "}
              Cancelar{" "}
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                onCreateKit();
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
