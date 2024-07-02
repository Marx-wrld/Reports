import { useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa'; // Import the back arrow icon
import { Navigate } from 'react-router-dom';

// component
import { PageBreadcrumb } from '@/components';

const permissionsData = [
  'RolePermission',
  'User Management',
  'Template Management',
  'System Configuration',
  'Security Management',
];

const CustomStyles = () => {
  const [validated, setValidated] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleBack = () => {
    // Set the redirect path to "/ui/tables/rolePermission-tables"
    setRedirectTo('/ui/tables/rolePermission-tables');
  };

  if (redirectTo) {
    // Redirect to the specified path
    return <Navigate to={redirectTo} />;
  }

  return (
    <Card>
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h4 className="header-title">Add New Role & Assign Permissions</h4>
             {/* Back Button */}
             <Button variant="secondary" className="mr-2" onClick={handleBack}>
              <FaArrowLeft /> Back
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Role Name</Form.Label>
            <Form.Control
              type="text"
              id="validationCustom01"
              placeholder="Role Name"
              defaultValue=""
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          {/* Table with Permissions */}
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Permissions</th>
                <th>Create</th>
                <th>Read</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {permissionsData.map((permission, index) => (
                <tr key={index}>
                  <td>{permission}</td>
                  <td>
                    <Form.Check type="checkbox" />
                  </td>
                  <td>
                    <Form.Check type="checkbox" />
                  </td>
                  <td>
                    <Form.Check type="checkbox" />
                  </td>
                  <td>
                    <Form.Check type="checkbox" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Submit and Back Buttons with spacing */}
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleBack}>
              <FaArrowLeft /> Back
            </Button>
            <Button variant="primary" type="submit">
              Submit form
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

const NewRole = () => {
  return (
    <>
      <PageBreadcrumb title="New Role Permission" subName="Forms" />
      <Row>
        <Col lg={12}>
          <CustomStyles />
        </Col>
      </Row>
    </>
  );
};

export default NewRole;
