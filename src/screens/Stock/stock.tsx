import { BarcodeIcon } from "@/assets/icons";
import { PageView, Table } from "@/components";
import { useDeleteProduct, useProducts } from "@/hooks";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, IconButton, useDisclosure } from "@chakra-ui/react";
import JsBarcode from "jsbarcode";
import { FC, useEffect, useState } from "react";
import { ProductModal } from "./components";
import { Product } from "@/models";

export const Stock = () => {
  const [dataTable, setDataTable] = useState<(string | number | FC)[][]>([]);
  const [dataToEdit, setDataToEdit] = useState<Product | undefined>();

  const { data } = useProducts();
  const { onOpen, isOpen, onClose } = useDisclosure();

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
          <div className="flex justify-between w-1/2">
            <div>
              <IconButton
                aria-label="Edit stock"
                icon={<EditIcon />}
                onClick={() => {
                  setDataToEdit(product);
                  onOpen();
                }}
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

  return (
    <PageView>
      <div className="flex justify-between w-full align-center mb-6">
        <div>
          <h1>Estoque</h1>
        </div>

        <div>
          <Button
            colorScheme="blue"
            onClick={() => {
              setDataToEdit(undefined);
              onOpen();
            }}
          >
            Adicionar novo
          </Button>
        </div>
      </div>

      <ProductModal isOpen={isOpen} onClose={onClose} data={dataToEdit} />

      <div>
        <Table
          data={dataTable}
          headers={["Nome", "Código de barra", "Quantidade", ""]}
        ></Table>
      </div>
    </PageView>
  );
};
