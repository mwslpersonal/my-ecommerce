import { BarcodeIcon } from "@/assets/icons";
import { PageView, Table } from "@/components";
import { useKits } from "@/hooks/Kits";
import { EditIcon, DeleteIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { ModalKitCreate, ModalKitDetails } from "./components";
import { Kit } from "@/models";
import { useDeleteKit } from "@/hooks/Kits/DeleteKit";

export const Kits = () => {
  const [dataTable, setDataTable] = useState<(string | number | FC)[][]>([]);
  const [kitDetails, setKitDetails] = useState<Kit>();

  const { data } = useKits();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isKitCreateOpen,
    onClose: onKitCreateClose,
    onOpen: onKitCreateOpen,
  } = useDisclosure();

  const { mutate: deleteKit } = useDeleteKit();

  useEffect(() => {
    const newDataTable: (string | number | FC)[][] = [];
    data?.map((kit) => {
      newDataTable.push([
        kit.name,
        kit.quantity,
        () => (
          <div className="flex justify-between w-1/3">
            <div>
              <IconButton
                aria-label="Edit stock"
                icon={<EditIcon />}
                onClick={() => {
                  setKitDetails(kit);
                  onKitCreateOpen();
                }}
              ></IconButton>
            </div>

            <div>
              <IconButton
                aria-label="Remove stock"
                icon={<DeleteIcon />}
                onClick={() => deleteKit(kit.id!)}
              ></IconButton>
            </div>

            <div>
              <IconButton
                aria-label="Products details"
                icon={<InfoOutlineIcon />}
                onClick={() => {
                  setKitDetails(kit);
                  onOpen();
                }}
              ></IconButton>
            </div>
          </div>
        ),
      ]);
    });
    setDataTable(newDataTable);
  }, [data]);

  const createNewKit = () => {
    setKitDetails({} as Kit);
    onKitCreateOpen();
  };

  return (
    <PageView>
      <div className="flex justify-between items-center mb-6">
        <h1>Kits</h1>

        <Button colorScheme="blue" onClick={createNewKit}>
          Novo kit
        </Button>
      </div>

      <ModalKitCreate
        isOpen={isKitCreateOpen}
        onClose={onKitCreateClose}
        kit={kitDetails}
      />
      <ModalKitDetails isOpen={isOpen} onClose={onClose} kit={kitDetails!} />

      <div>
        <Table data={dataTable} headers={["Nome", "Quantidade", ""]}></Table>
      </div>
    </PageView>
  );
};
