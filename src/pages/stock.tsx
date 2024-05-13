import { BarcodeIcon } from "@/assets/icons/BarcodeIcon";
import { PageView, Table } from "@/components";
import { useCreateProduct, useDeleteProduct, useProducts } from "@/hooks";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import JsBarcode from "jsbarcode";
import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";

const Stock = () => {
  const [dataTable, setDataTable] = useState<(string | number | FC)[][]>([]);

  const { data } = useProducts();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const generateBarcode = (value: string) => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, value);
    return canvas.toDataURL(); // Convert canvas to data URL
  };

  const printBarcode = async (value: string) => {
    const barcodeDataURL = generateBarcode(value);
    const newTab = window.open(); // Open new tab/window
    newTab?.document.write('<img id="barcode" src="' + barcodeDataURL + '" />'); // Write image to new tab

    const initialTime = new Date().getTime();
    const canPrint = async () => {
      const image = newTab?.document.getElementById("barcode");
      return setTimeout(() => {
        if (image) {
          return Promise.resolve(true);
        } else {
          const currTime = new Date().getTime();
          if (currTime - initialTime >= 10000) {
            return Promise.resolve(false);
          }
          canPrint();
        }
      }, 10);
    };

    if (await canPrint()) newTab?.print();
  };

  const { mutate: deleteProduct } = useDeleteProduct();
  useEffect(() => {
    const newDataTable: (string | number | FC)[][] = [];
    data?.map((product) => {
      newDataTable.push([
        product.name,
        product.barcode,
        product.quantity,
        () => (
          <div className="flex justify-between w-3/5">
            <div>
              <IconButton
                aria-label="Edit stock"
                icon={<EditIcon />}
                onClick={onOpen}
              ></IconButton>
            </div>

            <div>
              <IconButton
                aria-label="Remove stock"
                icon={<DeleteIcon />}
                onClick={() => deleteProduct(product.id!)}
              ></IconButton>
            </div>

            <div>
              <IconButton
                aria-label="Print barcode"
                icon={<BarcodeIcon />}
                onClick={() => printBarcode(product.barcode)}
              ></IconButton>
            </div>
          </div>
        ),
      ]);
    });
    setDataTable(newDataTable);
  }, [data]);

  const ModalNewProduct = () => {
    const [barcode, setBarcode] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);

    const { mutate: createProduct } = useCreateProduct();

    const createBarcode = () => {
      const barcodeValue = Math.floor(Math.random() * 10 ** 16).toString();
      setBarcode(barcodeValue);
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
                  onChange={(ev) => setProductName(ev.target.value)}
                />
              </div>

              <div className="flex pt-4">
                <Input
                  placeholder="Código de barra"
                  value={barcode}
                  onChange={(ev) => setBarcode(ev.target.value)}
                />
                <IconButton
                  aria-label="Criar código de barra"
                  icon={<AddIcon />}
                  onClick={createBarcode}
                ></IconButton>
              </div>

              <div className="pt-4">
                <Input
                  placeholder="Quantidade"
                  type="number"
                  min={0}
                  step={1}
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
                onClick={async () => {
                  createProduct({
                    id: v4(),
                    name: productName!,
                    barcode: barcode!,
                    quantity,
                  });
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

  return (
    <PageView>
      <div className="flex justify-between w-full align-center mb-6">
        <div>
          <h1>Estoque</h1>
        </div>

        <div>
          <Button colorScheme="blue" onClick={onOpen}>
            Adicionar novo
          </Button>
        </div>
      </div>

      <ModalNewProduct />

      <div>
        <Table
          data={dataTable}
          headers={["Nome", "Código de barra", "Quantidade", ""]}
        ></Table>
      </div>
    </PageView>
  );
};

export default Stock;
