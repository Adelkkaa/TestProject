import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import type { FC } from 'react';

import type { ITableItem } from '@/src/shared';

type ITableComponentProps = {
  columns: ITableItem[];
  rows?: ITableItem[];
  description?: string;
};

export const TableComponent: FC<ITableComponentProps> = ({
  columns,
  rows,
  description,
}) => (
  <TableContainer>
    <Table variant="simple">
      <TableCaption>{description}</TableCaption>
      <Thead>
        <Tr>
          {columns.map((item) => (
            <Th key={item.id}>{item.title}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {rows?.map((item) => (
          <Tr key={item.id}>
            <Th>{item.title}</Th>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);
