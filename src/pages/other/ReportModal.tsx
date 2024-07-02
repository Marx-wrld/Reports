import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

interface ReportModalProps {
  show: boolean;
  handleClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ show, handleClose }) => {
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    socket.on('reportData', (data: any) => {
      setReportData(data.payload);
    });

    return () => {
      socket.off('reportData');
    };
  }, []);

  const fetchReports = (startDate: string, endDate: string) => {
    socket.emit('fetchReports', { type: 'fetchReports', payload: { startDate, endDate } });
  };

  const handleDateRangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const startDate = (e.currentTarget.elements.namedItem('startDate') as HTMLInputElement).value;
    const endDate = (e.currentTarget.elements.namedItem('endDate') as HTMLInputElement).value;
    fetchReports(startDate, endDate);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleDateRangeSubmit}>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" required />
          </Form.Group>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Fetch Report
          </Button>
        </Form>
        {reportData && (
          <>
            <h4>Route A</h4>
            <ReactApexChart
              options={{
                chart: { type: 'bar' },
                xaxis: { categories: ['Files Processed', 'Error Files', 'Sent Emails'] },
              }}
              series={[
                {
                  name: 'Route A Statistics',
                  data: [
                    reportData.routes[0].statistics.files_processed,
                    reportData.routes[0].statistics.error_files,
                    reportData.routes[0].statistics.sent_emails,
                  ],
                },
              ]}
              type="bar"
              height={380}
            />
            <h4>Route B</h4>
            <ReactApexChart
              options={{
                chart: { type: 'line' },
                xaxis: { categories: ['Files Processed', 'Error Files', 'Sent Emails'] },
              }}
              series={[
                {
                  name: 'Route B Statistics',
                  data: [
                    reportData.routes[1].statistics.files_processed,
                    reportData.routes[1].statistics.error_files,
                    reportData.routes[1].statistics.sent_emails,
                  ],
                },
              ]}
              type="line"
              height={380}
            />
            <h4>Route C</h4>
            <ReactApexChart
              options={{
                chart: { type: 'pie' },
                labels: ['Files Processed', 'Error Files', 'Sent Emails'],
              }}
              series={[
                reportData.routes[2].statistics.files_processed,
                reportData.routes[2].statistics.error_files,
                reportData.routes[2].statistics.sent_emails,
              ]}
              type="pie"
              height={380}
            />
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => window.print()}>
          Print
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReportModal;
