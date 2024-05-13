import {
  TableContainer,
  Table as ChakraUITable,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { FC } from "react";

type TableProps = {
  data: (string | number | FC)[][];
  headers: string[];
};

export const Table: FC<TableProps> = ({ data, headers }) => {
  return (
    <TableContainer>
      <ChakraUITable variant="simple">
        <Thead>
          <Tr>
            {headers.map((head, index) => (
              <Th key={index}>{head}</Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {data.map((line, indexLine) => {
            return (
              <Tr key={indexLine}>
                {line.map((Individual, indexIndividual) =>
                  typeof Individual === "string" ||
                  typeof Individual === "number" ? (
                    <Td key={indexIndividual}>{Individual}</Td>
                  ) : (
                    <Td key={indexIndividual}>
                      <Individual />
                    </Td>
                  )
                )}
              </Tr>
            );
          })}
        </Tbody>
      </ChakraUITable>
    </TableContainer>
  );
};
