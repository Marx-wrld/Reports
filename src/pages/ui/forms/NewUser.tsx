// Import necessary dependencies
import { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

// Import components
import { PageBreadcrumb } from '@/components';

// Main functional component for the custom form
const CustomStyles = () => {
  const [validated, setValidated] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  // Handle back button click
  const handleBack = () => {
    // Set the redirect path to "/ui/tables/userData-tables"
    setRedirectTo('/ui/tables/userData-tables');
  };

  // Redirect if redirectTo is set
  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <Card>
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h4 className="header-title">Create New User</h4>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              id="NewUserCustom01"
              placeholder="First name"
              defaultValue="Mark"
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              id="NewUserCustom02"
              placeholder="Last name"
              defaultValue="Otto"
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              id="NewUserCustom03"
              placeholder="Phone"
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              id="NewUserCustom04"
              placeholder="Username"
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              id="NewUserCustom06"
              placeholder="Email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="NewUserCustom07"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              id="NewUserCustom08"
              placeholder="Confirm Password"
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          {/* ... (other form fields) */}
          
          {/* Buttons at the bottom */}
          <Row className="mt-3">
            <Col>
              <Button variant="secondary" onClick={handleBack}>
                <FaArrowLeft /> Back
              </Button>
            </Col>
            <Col className="text-right">
              <Button variant="primary" type="submit">
                Submit form
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

// Main functional component for the New User page
const NewUser = () => {
  return (
    <>
      <PageBreadcrumb title="New User Record" subName="Forms" />
      <Row>
        <Col lg={12}>
          <CustomStyles />
        </Col>
      </Row>
    </>
  );
};

export default NewUser;
