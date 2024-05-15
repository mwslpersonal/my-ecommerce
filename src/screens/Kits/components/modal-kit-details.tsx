import { Table } from "@/components";
import { useProductsByIds } from "@/hooks";
import { Kit, Product } from "@/models";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

type ModalKitDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  kit: Kit;
};

export const ModalKitDetails: FC<ModalKitDetailsProps> = ({
  isOpen,
  onClose,
  kit,
}) => {
  const [products, setProducts] = useState<
    { name: string; quantity: string }[]
  >([]);
  const [productIds, setProductIds] = useState<string[]>([]);

  const { data } = useProductsByIds(productIds);

  useEffect(() => {
    setProductIds(kit?.products?.map((product) => product.id));
  }, [kit]);

  useEffect(() => {
    if (data?.length)
      setProducts(
        data
          .map((product) => {
            const kitProduct = kit?.products?.find((kp) => {
              return kp.id === product.id;
            });
            return {
              name: product.name,
              quantity: kitProduct?.quantity!,
            };
          })
          .filter((product) => product.name && product.quantity)
      );
  }, [data, kit]);

  if (!kit) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="px-3 py-3">
        <ModalCloseButton />

        <ModalBody>
          <div className="mb-2">
            <h2>{kit?.name}</h2>
          </div>

          <div>
            <div className="mb-4">
              <p>
                <b>Quantidade: </b>
                {kit?.quantity}
              </p>
            </div>

            <div>
              <div className="mb-2">
                <h3>Produtos</h3>
              </div>
              <Table
                data={products.map((product) => [
                  product.name,
                  product.quantity,
                ])}
                headers={["Nome do produto", "Quantidade"]}
              ></Table>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={() => {
              onClose();
            }}
          >
            {" "}
            Voltar{" "}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
