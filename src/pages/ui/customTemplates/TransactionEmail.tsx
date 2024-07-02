// Import necessary React hooks and components
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Define the interface for the email data
interface EmailData {
  headerData: any;
  footerData: any;
}

// Define the interface for the email configuration received from the server
interface EmailConfig {
  id: number;
  mail_from: string;
  // Add other properties as needed
}

// Define the TransactionalEmailTemplate functional component
const TransactionalEmailTemplate: React.FC = () => {
  // Extract location and emailData from React Router
  const location = useLocation();
  const emailData: EmailData = location.state;

  // Destructure headerData and footerData from emailData
  const { headerData, footerData } = emailData;

  // Destructure properties from headerData
  const { companyName, backgroundColor: headerBgColor, textColor: headerTextColor, logo } = headerData;
  const headerLogo = URL.createObjectURL(logo);

  // Destructure properties from footerData
  const { contactDetails, footerText, backgroundColor: footerBgColor, textColor: footerTextColor } = footerData;

  // Set up state for 'From', 'To', 'Subject', CKEditor content, and template type
  const [fromOptions, setFromOptions] = useState<EmailConfig[]>([]);
  const [selectedFrom, setSelectedFrom] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [templateType, setTemplateType] = useState('Newsletter');

  // Fetch 'From' options from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://kasedevs.co.ke/transactx/email_server.php');
        const data = await response.json();
        setFromOptions(data);
        if (data.length > 0) {
          setSelectedFrom(data[0].mail_from);
        }
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  // Event handler for changing 'From' value
  const handleFromChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFrom(event.target.value);
  };

  // Event handlers for changing 'To' and 'Subject' values
  const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTo(event.target.value);
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };

  // Event handler for CKEditor content change
  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorContent(data);
  };

  // Event handler for changing template type
  const handleTemplateTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTemplateType(event.target.value);
  };

  // UseNavigate hook for navigation
  const navigate = useNavigate();

  // Function for editing the template
  const editTemplate = async () => {
    // Your editTemplate logic remains unchanged

    // Redirect to "/email_templates" after saving the template
    navigate('/email_templates');
  };

  // Function for using the template
  const useTemplate = () => {
    // Implement the logic for using the template
    console.log('Template used!');
    console.log('Selected Template Type:', templateType);
  };

  // Return the JSX for the component
  return (
    <div>
      <div style={{ maxWidth: '600px', margin: '30px auto 0px' }}>
        {/* Header section */}
        <header
          style={{
            border: '2px solid cadetblue',
            padding: '20px',
            textAlign: 'center',
            borderRadius: '5px',
            color: headerTextColor,
            backgroundColor: headerBgColor,
          }}
        >
          <img style={{ maxWidth: '100px' }} src={headerLogo} alt="Company Logo" />
          <h1 style={{ fontSize: '24px', margin: '0' }}>{companyName}</h1>
        </header>

        {/* Main content section */}
        <div style={{ padding: '20px' }}>
          {/* 'From' dropdown */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="fromSelect">From:</label>
            <select
              id="fromSelect"
              value={selectedFrom}
              onChange={handleFromChange}
              style={{ width: '100%', padding: '10px' }}
            >
              {fromOptions.map((option) => (
                <option key={option.id} value={option.mail_from}>
                  {option.mail_from}
                </option>
              ))}
            </select>
          </div>

          {/* 'To' input */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="To"
              value={to}
              onChange={handleToChange}
              style={{ width: '100%', padding: '10px' }}
            />
          </div>

          {/* 'Subject' input */}
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={handleSubjectChange}
            style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
          />

          {/* CKEditor */}
          <CKEditor editor={ClassicEditor} onChange={handleEditorChange} data={editorContent} />

          {/* Template type dropdown */}
          <div style={{ marginTop: '20px' }}>
            <label htmlFor="templateTypeSelect">Template Type:</label>
            <select
              id="templateTypeSelect"
              value={templateType}
              onChange={handleTemplateTypeChange}
              style={{ width: '100%', padding: '10px' }}
            >
              <option value="Newsletter">Newsletter</option>
              <option value="Statement">Statement</option>
              <option value="Welcome">Welcome</option>
              <option value="News">News</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>

        {/* Footer section */}
        <footer
          style={{
            marginTop: '20px',
            fontSize: '12px',
            textAlign: 'center',
            color: footerTextColor,
            backgroundColor: footerBgColor,
          }}
        >
          <p style={{ marginTop: '13px' }}>{contactDetails}</p>
          <p>{footerText}</p>
        </footer>
      </div>

      {/* Buttons for modifying and using the template */}
      <button onClick={editTemplate}>Modify Template</button>
      <button onClick={useTemplate}>Use Template</button>
    </div>
  );
};

// Export the TransactionalEmailTemplate component
export default TransactionalEmailTemplate;
