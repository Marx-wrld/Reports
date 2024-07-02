// Import necessary dependencies from React and Bootstrap
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Card, Col, Row, Table, Button, Modal, Form } from 'react-bootstrap';
import { PageBreadcrumb } from '@/components';

// Define the main component, EmailServer
const EmailServer = () => {
  // State variables for managing form input and state
  const [editMode, setEditMode] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [selectedRecordId, setSelectedRecordId] = useState('');
  const [server_host, setServerHost] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mail_port, setMailPort] = useState('');
  const [mail_from, setFrom] = useState('');
  const [fetchedData, setFetchedData] = useState<any[]>([]);

// Update the handleToggleRecordStatus function
const handleToggleRecordStatus = async (recordId: string, checked: boolean) => {
  // Make API request to update the status for the selected record
  try {
    const newStatus = checked ? '1' : '0';
    const formData = new FormData();
    formData.append('id', recordId);
    formData.append('isActive', newStatus);

    const response = await fetch('http://localhost/transactX/active_email.php', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Status updated successfully');
      fetchData(); // Refresh the data
    } else {
      console.error('Failed to update status');
    }
  } catch (error) {
    console.error('Error updating status:', error);
  }
};


  // Event handlers for form input changes
  const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value);
  };

  const handleserver_hostChange = (e: ChangeEvent<HTMLInputElement>) => {
    setServerHost(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleportChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMailPort(e.target.value);
  };

  // Event handler for initiating edit mode
  const handleEdit = (record: any) => {
    setSelectedRecord(record);
    setEditMode(true);
  };

  // useEffect to populate form data when in edit mode
  useEffect(() => {
    if (editMode && selectedRecord) {
      setServerHost(selectedRecord.server_host);
      setUsername(selectedRecord.username);
      setPassword(selectedRecord.password);
      setMailPort(selectedRecord.mail_port);
      setFrom(selectedRecord.mail_from);
    }
  }, [editMode, selectedRecord]);

  useEffect(() => {
    if (selectedRecord) {
      setHeaderBgColor(selectedRecord.headerBgColor || ''); // Set default values or use empty string
      setFooterBgColor(selectedRecord.footerBgColor || '');
      setFooterMessage(selectedRecord.footerMessage || '');
    }
  }, [selectedRecord]);
  

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('server_host', server_host);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('mail_port', mail_port);
    formData.append('mail_from', mail_from);

    if (editMode && selectedRecord && selectedRecord.id) {
      formData.append('id', selectedRecord.id);
    }

    try {
      let url = 'http://localhost/transactX/email_server.php';
      let method = 'POST';

      if (editMode && selectedRecord && selectedRecord.id) {
        method = 'POST'; // Update the method for existing records
      }

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        console.log('Data submitted successfully');
        fetchData();
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }

    // Resetting form and state variables
    setFrom('');
    setServerHost('');
    setUsername('');
    setPassword('');
    setMailPort('');
    setEditMode(false);
    setSelectedRecord(null);
  };

  // Fetch data from the server
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost/transactX/email_server.php');
      if (response.ok) {
        const data = await response.json();
        if (data.error) {
          console.log('Error from API:', data.error);
        } else {
          setFetchedData(data);
        }
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // State variables for the Customize modal
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [headerBgColor, setHeaderBgColor] = useState('');
  const [footerBgColor, setFooterBgColor] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');
  const [footerMessage, setFooterMessage] = useState('');

  const handleCustomizeModal = (recordId: string) => {
    const recordToCustomize = fetchedData.find((record) => record.id === recordId);
    setSelectedRecord(recordToCustomize);
    setSelectedRecordId(recordId);
    setShowCustomizeModal(true);
  };
  

// Event handler for Customize form submission
const handleCustomizationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Make API request to update customization details for the selected record
  try {
    const formData = new FormData();
    formData.append('id', selectedRecordId);
    formData.append('headerBgColor', headerBgColor);
    formData.append('footerBgColor', footerBgColor);
    formData.append('emailSubject', emailSubject);
    formData.append('bodyMessage', bodyMessage);
    formData.append('footerMessage', footerMessage);

    const response = await fetch('http://localhost/transactX/customize_email_template.php', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Customization submitted successfully');
      // Close the modal and optionally refresh the data
      setShowCustomizeModal(false);
      fetchData();
    } else {
      console.error('Failed to submit customization');
    }
  } catch (error) {
    console.error('Error submitting customization:', error);
  }

  // Reset the form state variables
  setHeaderBgColor('');
  setFooterBgColor('');
  setFooterMessage('');
  setBodyMessage('');
  setEmailSubject('');
};



  return (
    <>
      {/* Page breadcrumb */}
      <PageBreadcrumb title="Email Server Settings" subName="Forms" />

      {/* Main content */}
      <Row>
        <Col lg={12}>
          {/* Email Server Settings Card */}
          <Card>
            <Card.Header>
              <Row className="align-items-center">
                <Col>
                  <h4 className="header-title">Configure Email Server Settings</h4>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
            <form className="email-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="server_host">Server Address</label>
                  <input
                    type="text"
                    id="server_host"
                    placeholder="Server Address"
                    value={server_host}
                    onChange={handleserver_hostChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mail_port">Port Number</label>
                  <input
                    type="text"
                    id="mail_port"
                    placeholder="Port Number"
                    value={mail_port}
                    onChange={handleportChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mail_from">From</label>
                  <input
                    type="text"
                    id="mail_from"
                    placeholder="From"
                    value={mail_from}
                    onChange={handleFromChange}
                    required
                  />
                </div>
                <div className="form-group">
                  {editMode && selectedRecord ? (
                    <Button variant="success" className="mx-2" type="submit">
                      Update
                    </Button>
                  ) : (
                    <Button variant="primary" className="mx-2" type="submit">
                      Submit
                    </Button>
                  )}
                </div>
              </form>
            </Card.Body>
          </Card>

        {/* Submitted Details Card */}
      <Card className="mt-4">
        <Card.Body>
          <h4>Submitted Details</h4>
 {/* Table displaying fetched data */}
<Table striped bordered hover>
  <thead>
    <tr>
      <th>From</th>
      <th>Server Address</th>
      <th>Username</th>
      <th>Port Number</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {fetchedData.map((data, index) => (
      <tr key={index}>
        <td>{data.mail_from}</td>
        <td>{data.server_host}</td>
        <td>{data.username}</td>
        <td>{data.mail_port}</td>
        <td>
          {/* Checkbox for real-time status update */}
          <Form.Check
  type="checkbox"
  id={`realTimeStatus-${data.id}`}
  label={`${data.status === '1' ? 'Active' : 'Inactive'}`}
  checked={data.status === '1'}
  onChange={(e) => handleToggleRecordStatus(data.id, e.target.checked)}
/>

        </td>
        <td>
          <Button variant="info" className="mx-2" onClick={() => handleEdit(data)}>
            Edit
          </Button>
          <Button variant="info" className="mx-2" onClick={() => handleCustomizeModal(data.id)}>
            Customize
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>

        </Card.Body>
      </Card>
        </Col>
      </Row>

   {/* Customize Modal */}
<Modal show={showCustomizeModal} onHide={() => setShowCustomizeModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Customize Email</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* Customize form within the modal */}
    <Form onSubmit={handleCustomizationSubmit}>
<Form.Group controlId="headerBgColor">
  <Form.Label>Header Background Color</Form.Label>
  <Form.Control
    type="color"
    value={headerBgColor}
    onChange={(e) => setHeaderBgColor(e.target.value)}
  />
</Form.Group>
<Form.Group controlId="footerBgColor">
  <Form.Label>Footer Background Color</Form.Label>
  <Form.Control
    type="color"
    value={footerBgColor}
    onChange={(e) => setFooterBgColor(e.target.value)}
  />
</Form.Group>
<Form.Group controlId="emailSubject">
  <Form.Label>Email Subject</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter Subjeuct"
    value={emailSubject}
    onChange={(e) => setEmailSubject(e.target.value)}
  />
   </Form.Group>
<Form.Group controlId="bodyMessage">
  <Form.Label>Body Message</Form.Label>
  <Form.Control
    as="textarea"
    rows={3}
    placeholder="Enter Body message"
    value={bodyMessage}
    onChange={(e) => setBodyMessage(e.target.value)}
  />
      </Form.Group>
<Form.Group controlId="footerMessage">
  <Form.Label>Footer Message</Form.Label>
  <Form.Control
    as="textarea"
    rows={3}
    placeholder="Enter footer message"
    value={footerMessage}
    onChange={(e) => setFooterMessage(e.target.value)}
  />
      </Form.Group>
      {/* Submit button for customization form */}
      <Button variant="primary" type="submit">
        Save Customization
      </Button>
    </Form>
  </Modal.Body>
</Modal>

    </>
  );
};

export default EmailServer;
