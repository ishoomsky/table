import React from "react";
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  Button,
} from "carbon-components-react";

import styled from "styled-components";
import { Edit16, Delete16 } from "@carbon/icons-react";



const AppTable = ({ users, headers, findAndSetCurrentUser, setEditModalOpen, setDeleteModalOpen, startAddUser }) => {
  const tableHeaders = (headers) => headers.map(({ header }) => <TableHeader key={header}>{header}</TableHeader>);

  const tableCells = (row) => (
    <>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.group}</TableCell>
      <TableCell>{row.balance} BYN</TableCell>
      <TableCell>{row.status === "Active" ? <ActiveValue>{row.status}</ActiveValue> : <InactiveValue>{row.status}</InactiveValue>}</TableCell>
      <TableCell>{row.note}</TableCell>
      <TableCell>
        <ControlsContainer>
          <Button
            renderIcon={Edit16}
            iconDescription="Edit"
            hasIconOnly
            onClick={() => {
              findAndSetCurrentUser(row.id);
              setEditModalOpen(true);
            }}
          />
          <Button
            renderIcon={Delete16}
            iconDescription="Delete"
            hasIconOnly
            onClick={() => {
              findAndSetCurrentUser(row.id);
              setDeleteModalOpen(true);
            }}
          />
        </ControlsContainer>
      </TableCell>
    </>
  );

  const tableRows = (rows) => rows.map((row) => <TableRow key={row.id}>{tableCells(row)}</TableRow>);

  const renderDataTable = () => {
    return (
      <DataTable rows={users} headers={headers}>
        {() => (
          <TableContainer>
            <TableToolbar>
              <TableToolbarContent>
                <Button onClick={startAddUser}>Add user</Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table>
              <TableHead>
                <TableRow>{tableHeaders(headers)}</TableRow>
              </TableHead>
              <TableBody>{tableRows(users)}</TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    );
  };

  return renderDataTable();
};

const ActiveValue = styled.div`
  color: green;
`;
const InactiveValue = styled.div`
  color: maroon;
`;
const ControlsContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export default AppTable;