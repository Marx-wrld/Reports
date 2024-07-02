import React, { useState, ChangeEvent } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { PageBreadcrumb } from '@/components';

const EmailServer = () => {
  const [from, setFrom] = useState('admin@velocity.co.ke');
  const [subject, setSubject] = useState('E-STATEMENT INVOICE');
  const [serverAddress, setServerAddress] = useState('smtp.gmail.com');
  const [username, setUsername] = useState('robert.kasembeli@velocity.co.ke');
  const [password, setPassword] = useState('ynns hpzx xggi eoty');
  const [portNumber, setPortNumber] = useState('587');
  const [messageBody, setMessageBody] = useState('');
  const [footer, setFooter] = useState('');

  const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value);
  };

  const handleSubjectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleServerAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setServerAddress(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePortNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPortNumber(e.target.value);
  };

  const handleMessageBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageBody(e.target.value);
  };

  const handleFooterChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFooter(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
      <PageBreadcrumb title="Email Server Settings" subName="Forms" />
      <Row>
        <Col lg={12}>
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
                <h2>SMTP configuration</h2>
                <div className="form-group">
                  <label htmlFor="serverAddress">Server Address</label>
                  <input
                    type="text"
                    id="serverAddress"
                    placeholder="Server Address"
                    value={serverAddress}
                    onChange={handleServerAddressChange}
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
                    type="text"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="portNumber">Port Number</label>
                  <input
                    type="text"
                    id="portNumber"
                    placeholder="Port Number"
                    value={portNumber}
                    onChange={handlePortNumberChange}
                    required
                  />
                </div>
                <h2>Sender and recipient details</h2>
                <div className="form-group">
                  <label htmlFor="from">From</label>
                  <input
                    type="text"
                    id="from"
                    placeholder="From"
                    value={from}
                    onChange={handleFromChange}
                    required
                  />
                </div>
                <h2>Email content</h2>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Subject"
                    value={subject}
                    onChange={handleSubjectChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="messageBody">Message Body</label>
                  <textarea
                    id="messageBody"
                    placeholder="Message Body"
                    value={messageBody}
                    onChange={handleMessageBodyChange}
                    required
                  />
                </div>
                <h2>Email Footer & Attachment</h2>
                <div className="form-group">
                  <label htmlFor="footer">Footer</label>
                  <textarea
                    id="footer"
                    placeholder="Footer"
                    value={footer}
                    onChange={handleFooterChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EmailServer;
