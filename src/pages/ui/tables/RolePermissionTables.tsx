import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { FaEdit, FaEye, FaTrash, FaPlus } from 'react-icons/fa';
import { rolePermissionRecords } from './role-permision-data';
import { Column } from 'react-table';
import { RolePermissions } from './types';
import { PageSize, Table } from '@/components';
import { PageBreadcrumb } from '@/components';
import { Navigate } from 'react-router-dom';

interface RolePermissionTablesProps {}

interface RolePermissionTablesState {
  redirectTo: string | null;
}

class RolePermissionTables extends React.Component<RolePermissionTablesProps, RolePermissionTablesState> {
  constructor(props: RolePermissionTablesProps) {
    super(props);

    this.state = {
      redirectTo: null,
    };
  }

  handleEdit = (record: RolePermissions) => {
    console.log('Edit:', record);
  };

  handleView = (record: RolePermissions) => {
    console.log('View:', record);
  };

  handleDelete = (id: string) => {
    console.log('Delete:', id);
  };

  handleNewRole = () => {
    // Set the redirect path to "/ui/forms/validation" when the "New Role" button is clicked
    this.setState({ redirectTo: '/ui/forms/new-role' });
  };

  render() {
    const { redirectTo } = this.state;

    if (redirectTo) {
      // Redirect to the specified path
      return <Navigate to={redirectTo} />;
    }

    const columns: ReadonlyArray<Column> = [
      {
        Header: 'ID',
        accessor: 'id',
        defaultCanSort: true,
      },
      {
        Header: 'Role Name',
        accessor: 'role_name',
        defaultCanSort: true,
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }: any) => (
          <>
            {/* Edit Button */}
            <Button
              variant="outline-primary"
              size="sm"
              className="mr-2 mb-2 mb-sm-0"
              onClick={() => this.handleEdit(row.original)}
            >
              <FaEdit /> Edit
            </Button>
            {/* View Button */}
            <Button
              variant="outline-info"
              size="sm"
              className="mr-2 mb-2 mb-sm-0"
              onClick={() => this.handleView(row.original)}
            >
              <FaEye /> View
            </Button>
            {/* Delete Button */}
            <Button
              variant="outline-danger"
              size="sm"
              className="mr-2 mb-2 mb-sm-0"
              onClick={() => this.handleDelete(row.original.id)}
            >
              <FaTrash /> Delete
            </Button>
          </>
        ),
        defaultCanSort: false,
      },
    ];

    const sizePerPageList: PageSize[] = [
      {
        text: '5',
        value: 5,
      },
      {
        text: '10',
        value: 10,
      },
      {
        text: '25',
        value: 25,
      },
      {
        text: 'All',
        value: rolePermissionRecords.length,
      },
    ];

    return (
      <>
        <PageBreadcrumb title="Role-Permissions" subName="Roles" />
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Row className="align-items-center">
                  <Col>
                    <h4 className="header-title">Assign Permissions to Roles</h4>
                    {/* New Role Button */}
                    <Button variant="success" size="sm" onClick={this.handleNewRole}>
                      <FaPlus /> New Role
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Table<RolePermissions>
                  columns={columns}
                  data={rolePermissionRecords}
                  pageSize={5}
                  sizePerPageList={sizePerPageList}
                  isSortable={true}
                  pagination={true}
                  isSearchable={true}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default RolePermissionTables;
