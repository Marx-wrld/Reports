import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { PageBreadcrumb } from '@/components';
import { Spinner } from 'react-bootstrap';


interface ProcessBoxStyles {
    border: string;
    padding: string;
    marginBottom: string;
    height: string;
    margin: string;
    width: string;
    position: 'relative'; // Adjusted type for 'position'
  }

// Define CSS styles with correct TypeScript types
const processBoxStyles: ProcessBoxStyles = {
    border: '1px solid #ccc',
    padding: '20px',
    marginBottom: '20px',
    height: '100%',
    margin: '10px',
    width: '80%',
    position: 'relative',
  };
  
interface StepStyles extends React.CSSProperties {
  position: 'absolute';
  top: string;
  right: string;
  backgroundColor: string;
  borderRadius: string;
  width: string;
  height: string;
  display: string;
  alignItems: string;
  justifyContent: string;
  fontSize: string;
}

const stepStyles: StepStyles = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'white',
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
};

const rowStyles: React.CSSProperties = {
  marginBottom: '20px',
};

const buttonStyles: React.CSSProperties = {
  position: 'absolute',
  bottom: '10px',
  right: '10px',
};

const Spinners = () => {
    const [initializationStatus, setInitializationStatus] = useState('Initializing...');
    const [fileDetectionStatus, setFileDetectionStatus] = useState('Waiting...');
    const [fileProcessingStatus, setFileProcessingStatus] = useState('Inactive');
    const [emailDispatchStatus, setEmailDispatchStatus] = useState('Inactive');
    const [retryMechanismStatus, setRetryMechanismStatus] = useState('Inactive');
    const [customerUploadStatus, setCustomerUploadStatus] = useState('Inactive');
  
    useEffect(() => {
      // Simulate Initialization Process
      setTimeout(() => {
        setInitializationStatus('Completed');
        setFileDetectionStatus('Receiving...');
      }, 3000);
  
      // Simulate Incoming File Detection Process
      setTimeout(() => {
        setFileDetectionStatus('Received');
        setFileProcessingStatus('Processing');
      }, 4000);
  
      // Simulate File Processing Process
      setTimeout(() => {
        setFileProcessingStatus('Inactive');
        setEmailDispatchStatus('Reading for Dispatch');
      }, 5000);
  
      // Simulate Email Dispatch Process
      setTimeout(() => {
        setEmailDispatchStatus('Sending');
        setRetryMechanismStatus('Sending Retries');
      }, 3000);
  
      // Simulate Retry Mechanism Process
      setTimeout(() => {
        setRetryMechanismStatus('Inactive');
        setCustomerUploadStatus('Uploading Customer Details');
      }, 4000);
  
      // Loop back to Initialization
      setTimeout(() => {
        setInitializationStatus('Initializing...');
        setCustomerUploadStatus('Inactive');
      }, 3000);
    }, []);
  
    return (
      <>
        <PageBreadcrumb title="Real-Time Statements Processing" subName="Base UI" />
        <Row style={rowStyles}>
          <Col sm={12} md={6} lg={6}>
            <div className="d-flex flex-wrap">
              <div className="process-box" style={processBoxStyles}>
                <div style={stepStyles}>1</div>
                <h4 className="header-title">Initialization Process</h4>
                <p className="text-muted mb-0">{initializationStatus}</p>
                <div className="d-flex flex-wrap gap-2">
                  <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <span>Initializing...</span>
                </div>
                <div style={buttonStyles}>
                  <button>Start</button>
                  <button>Pause</button>
                  <button>Stop</button>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <div className="d-flex flex-wrap">
              <div className="process-box" style={processBoxStyles}>
                <div style={stepStyles}>2</div>
                <h4 className="header-title">Incoming File Detection Process</h4>
                <p className="text-muted mb-0">{fileDetectionStatus}</p>
                <div className="d-flex flex-wrap gap-2">
                  <Spinner animation="grow" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <span>Listening...</span>
                </div>
                <div style={buttonStyles}>
                  <button>Start</button>
                  <button>Pause</button>
                  <button>Stop</button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={rowStyles}>
          <Col sm={12} md={6} lg={6}>
            <div className="d-flex flex-wrap">
              <div className="process-box" style={processBoxStyles}>
                <div style={stepStyles}>3</div>
                <h4 className="header-title">File Processing Process</h4>
                <p className="text-muted mb-0">{fileProcessingStatus}</p>
                <div className="d-flex flex-wrap gap-2">
                  <Spinner animation="border" variant="pink" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <span>Processing...</span>
                </div>
                <div style={buttonStyles}>
                  <button>Start</button>
                  <button>Pause</button>
                  <button>Stop</button>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <div className="d-flex flex-wrap">
              <div className="process-box" style={processBoxStyles}>
                <div style={stepStyles}>4</div>
                <h4 className="header-title">Email Dispatch Process</h4>
                <p className="text-muted mb-0">{emailDispatchStatus}</p>
                <div className="d-flex flex-wrap gap-2">
                  <Spinner animation="grow" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <span>Dispatching...</span>
                </div>
                <div style={buttonStyles}>
                  <button>Start</button>
                  <button>Pause</button>
                  <button>Stop</button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={rowStyles}>
          <Col sm={12} md={6} lg={6}>
            <div className="d-flex flex-wrap">
              <div className="process-box" style={processBoxStyles}>
                <div style={stepStyles}>5</div>
                <h4 className="header-title">Retry Mechanism Process</h4>
                <p className="text-muted mb-0">{retryMechanismStatus}</p>
                <div className="d-flex flex-wrap gap-2">
                  <Spinner animation="grow" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <span>Resending Failed...</span>
                </div>
                <div style={buttonStyles}>
                  <button>Start</button>
                  <button>Pause</button>
                  <button>Stop</button>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <div className="d-flex flex-wrap">
              <div className="process-box" style={processBoxStyles}>
                <div style={stepStyles}>6</div>
                <h4 className="header-title">Customer Details Upload Process</h4>
                <p className="text-muted mb-0">{customerUploadStatus}</p>
                <div className="d-flex flex-wrap gap-2">
                  <Spinner animation="border" variant="pink" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <span>Uploading...</span>
                </div>
                <div style={buttonStyles}>
                  <button>Start</button>
                  <button>Pause</button>
                  <button>Stop</button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  };
  
  export default Spinners;
  