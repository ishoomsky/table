import React from "react";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
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
import * as routes from "../../navigation/routes";
import { removeIdFromRoute } from "../../functions/utilities";

const AppTable = ({ users, headers, findAndSetCurrentUser, setEditModalOpen, setDeleteModalOpen, setAddModalOpen }) => {
  const tableHeaders = () => headers.map(({ header }) => <TableHeader key={header}>{header}</TableHeader>);
  const tableCells = ({ id, name, group, balance, status, note }) => (
    <>
      <TableCell>
        <TableCellLink>
          <Link className="table-link" target="_blank" to={`${removeIdFromRoute(routes.USER)}${id}`}>{name}</Link>
        </TableCellLink>
      </TableCell>
      <TableCell>{group}</TableCell>
      <TableCell>{balance} BYN</TableCell>
      <TableCell>
        {status === "Active" ? (
          <ActiveValue>{status}</ActiveValue>
        ) : (
          <InactiveValue>{status}</InactiveValue>
        )}
      </TableCell>
      <TableCell>{note}</TableCell>
      <TableCell>
        <ControlsContainer>
          <Button
            renderIcon={Edit16}
            iconDescription="Edit"
            hasIconOnly
            onClick={() => {
              findAndSetCurrentUser(id);
              setEditModalOpen(true);
            }}
          />
          <Button
            renderIcon={Delete16}
            iconDescription="Delete"
            hasIconOnly
            onClick={() => {
              findAndSetCurrentUser(id);
              setDeleteModalOpen(true);
            }}
          />
        </ControlsContainer>
      </TableCell>
    </>
  );
  const tableRows = () => users.map((user) => <TableRow key={user.id}>{tableCells(user)}</TableRow>);
  const renderDataTable = () => {
    return (
      <DataTable rows={users} headers={headers}>
        {() => (
          <TableContainer>
            <TableToolbar>
              <TableToolbarContent>
                <Button onClick={() => setAddModalOpen(true)}>Add user</Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table>
              <TableHead>
                <TableRow>{tableHeaders()}</TableRow>
              </TableHead>
              <TableBody>{tableRows()}</TableBody>
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
const TableCellLink = styled.span`
  cursor: pointer;
`;

AppTable.defaultProps = {
  users: [],
};

AppTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      balance: PropTypes.oneOfType(
        [
          PropTypes.string,
          PropTypes.number
        ]
      ).isRequired,
      group: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      note: PropTypes.string,
      status: PropTypes.string.isRequired,
    })
  ),
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
    })
  ),
  findAndSetCurrentUser: PropTypes.func.isRequired,
  setEditModalOpen: PropTypes.func.isRequired,
  setDeleteModalOpen: PropTypes.func.isRequired,
  setAddModalOpen: PropTypes.func.isRequired,
};


export default AppTable;
