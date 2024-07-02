import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import { FaEye, FaPlus } from 'react-icons/fa';
import { Column } from 'react-table';
import { PageSize, Table, PageBreadcrumb } from '@/components';
import { fetchAndAssignData } from './statement-data'; // Assuming the file contains the data fetching logic
import { AccountStatements } from './types';
import { Navigate, useNavigate } from 'react-router-dom';

interface StatementsProps {}

const Statements: React.FC<StatementsProps> = () => {
  const [redirectTo, setRedirectTo] = useState<string | null>(null);
  const [accountStatements, setAccountStatements] = useState<AccountStatements[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState<number | null>(null);
  const [selectedCustomerCode, setSelectedCustomerCode] = useState<number | null>(null);
  const [serverOTP, setServerOTP] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAndAssignData();
      setAccountStatements(data);
    }
    fetchData();
  }, []);

  const fetchOTPFromServer = async (accountNumber: number) => {
    try {
      const response = await fetch(`http://localhost/transactX/stmt_api_account.php?account_number=${accountNumber}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Server OTP data:', data);
        return data?.otp; // Return the OTP from the server response
      } else {
        console.error('Failed to fetch OTP. Status:', response.status);
        return null; // Return null or handle error as needed
      }
    } catch (error) {
      console.error('Error fetching OTP:', error);
      return null; // Return null or handle error as needed
    }
  };

  const handleView = async (record: AccountStatements) => {
    const { account_number, customer_code } = record;
    const otp = await fetchOTPFromServer(account_number);

    setShowModal(true);
    setSelectedAccountNumber(account_number);
    setSelectedCustomerCode(customer_code);
    setServerOTP(otp);
  };

  const handleOtpVerification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredOTP = parseInt((e.currentTarget.elements.namedItem('otp') as HTMLInputElement).value, 10);

    if (enteredOTP === serverOTP && selectedAccountNumber !== null) {
      navigate(`/ui/tables/statementsresults/${selectedAccountNumber}`);
    } else {
      alert('Incorrect OTP. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAccountNumber(null);
    setSelectedCustomerCode(null);
    setServerOTP(null);
  };

  const handleNewRole = () => {
    setRedirectTo('/ui/forms/new-role');
  };

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  
  const columns: ReadonlyArray<Column> = [
    {
      Header: 'Account Number',
      accessor: 'account_number',
      defaultCanSort: true,
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }: any) => (
        <>
        <Button
        variant="outline-info"
        size="sm"
        className="mr-2 mb-2 mb-sm-0"
        onClick={() => handleView(row.original)}
        >
        <FaEye /> View statement
        </Button>
        </>
      ),
      defaultCanSort: false,
    },
  ];

  const sizePerPageList: PageSize[] = [
    { text: '5', value: 5 },
    { text: '10', value: 10 },
    { text: '25', value: 25 },
    { text: 'All', value: accountStatements.length },
  ];


  return (
    <>
      <PageBreadcrumb title="Statements" subName="Statements" />
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Row className="align-items-center">
                <Col>
                  <h4 className="header-title">Account Numbers Search</h4>
                  <Button variant="success" size="sm" onClick={handleNewRole}>
                    <FaPlus /> Upload
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table<AccountStatements>
                columns={columns}
                data={accountStatements}
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>View Statement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Account Number: {selectedAccountNumber}</p>
          <p>Customer Code: {selectedCustomerCode}</p>
          <form onSubmit={handleOtpVerification}>
            <label htmlFor="otp">Enter OTP:</label>
            <input type="text" id="otp" name="otp" />
            <button type="submit">Verify OTP</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Statements;
