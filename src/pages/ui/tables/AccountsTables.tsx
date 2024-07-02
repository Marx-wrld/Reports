import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
// import { FaEye, FaPlus } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { Column } from 'react-table';
import { PageSize, Table, PageBreadcrumb } from '@/components';
import { fetchAndAssignAccountData } from './account-data';
import { AccountAccounts } from './types';
import { Navigate, useNavigate } from 'react-router-dom';

interface AccountsProps {}

const Accounts: React.FC<AccountsProps> = () => {
  const [redirectTo, setRedirectTo] = useState<string | null>(null);
  const [accountAccounts, setAccountAccounts] = useState<AccountAccounts[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState<string | null>(null);
  const [selectedCustomerCode, setSelectedCustomerCode] = useState<string | null>(null);
  const [serverOTP, setServerOTP] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAndAssignAccountData();
      setAccountAccounts(data);
    }
    fetchData();
  }, []);

  const handleOtpVerification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredOTP = (e.currentTarget.elements.namedItem('otp') as HTMLInputElement).value;

    if (enteredOTP === serverOTP && selectedAccountNumber !== null) {
      navigate(`/ui/tables/Accountsresults/${selectedAccountNumber}`);
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
      Header: 'Account No.',
      accessor: 'account_number',
      defaultCanSort: true,
    },
    {
      Header: 'Arrangement ID',
      accessor: 'arrangement_id',
      defaultCanSort: true,
    },
    {
      Header: 'Customer Code',
      accessor: 'customer_code',
      defaultCanSort: true,
    },
    {
      Header: 'Currency',
      accessor: 'curr',
      defaultCanSort: true,
    },
    {
      Header: 'Account Title',
      accessor: 'account_title',
      defaultCanSort: true,
    },
    // {
    //   Header: 'Actions',
    //   accessor: 'actions',
    //   Cell: ({ row }: any) => (
    //     <>
    //       <Button
    //         variant="outline-info"
    //         size="sm"
    //         className="mr-2 mb-2 mb-sm-0"
    //         // onClick={() => handleView(row.original)}
    //       >
    //         <FaEye /> View Statements
    //       </Button>
    //     </>
    //   ),
    //   defaultCanSort: false,
    // },
  ];

  const sizePerPageList: PageSize[] = [
    { text: '5', value: 5 },
    { text: '10', value: 10 },
    { text: '25', value: 25 },
    { text: 'All', value: accountAccounts.length },
  ];

  return (
    <>
      <PageBreadcrumb title="Accounts" subName="Accounts" />
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Row className="align-items-center">
                <Col>
                  <Button variant="success" size="sm" onClick={handleNewRole}>
                    <FaPlus /> Upload
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table<AccountAccounts>
                columns={columns}
                data={accountAccounts}
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

export default Accounts;
