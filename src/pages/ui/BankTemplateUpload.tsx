// Import necessary dependencies from React and React Router DOM
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// Define the interface for the state of file uploads
interface UploadsState {
  logo: File | null;
  watermark: File | null;
  digital_stamp: File | null;
  digital_signature: File | null;
  [key: string]: File | null; // Index signature
}

// Define the PdfTemplateForm component as a functional component
const PdfTemplateForm: React.FC = () => {
  // State variables to manage form data and UI state
  const [bankName, setBankName] = useState('');
  const [uploads, setUploads] = useState<UploadsState>({
    logo: null,
    watermark: null,
    digital_stamp: null,
    digital_signature: null,
  });
  const [mobile, setMobile] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [emailId, setEmailId] = useState<string>('');
  const [emailOptions, setEmailOptions] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Function to handle the "Edit" button click
  const handleEdit = (record: any) => {
    setIsEditing(true);
    setSelectedRecord(record);
    initializeFormForEdit(record);
  };


// Function to render file preview images
const renderFilePreview = (fileUpload: File | string | null) => {
    if (fileUpload instanceof File) {
      // Handle the case when the fileUpload is a File object
      const url = URL.createObjectURL(fileUpload);
      return <img src={url} alt="File Preview" width="50" />;
    } else if (typeof fileUpload === 'string') {
      // Handle the case when the fileUpload is a string (URL)
      return <img src={`http://localhost/transactX/uploads/${fileUpload}`} alt="File Preview" width="50" />;
    }
  
    return null;
  };
  
  // ... (The rest of the code remains unchanged)
  

  // Function to handle the "Preview" button click
  const handlePreview = (record: any) => {
    console.log('Preview:', record);
  };

  const handleDelete = async (record: any) => {
    try {
      const response = await fetch(`http://localhost/transactX/banks.php?id=${record.bank_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // You may need to adjust the content type
          'Accept': 'application/json',
          // Add any other headers you might need
        },
      });
  
      if (response.ok) {
        // Handle successful deletion
        // Remove the deleted record from the state
        const updatedRecords = records.filter((r) => r.bank_id !== record.bank_id);
        setRecords(updatedRecords);
      } else {
        console.error('Failed to delete record');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
  
  
  
  const initializeFormForEdit = (record: any) => {
    setBankName(record.bank_name);
    setMobile(record.mobile);
    setWebsiteUrl(record.website_url);
  
    // Initialize uploads based on the existing file names
    setUploads({
      logo: record.logo_upload ? record.logo_upload : null,
      watermark: record.watermark_upload ? record.watermark_upload : null,
      digital_stamp: record.digital_stamp_upload ? record.digital_stamp_upload : null,
      digital_signature: record.digital_signature_upload ? record.digital_signature_upload : null,
    });
  
    // Initialize email ID
    const selectedEmailOption = emailOptions.find((option) => option.id === record.email_id);
    setEmailId(selectedEmailOption ? selectedEmailOption.id : '');
  };
  
  

  // useEffect to fetch email options and records when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [emailResponse, recordsResponse] = await Promise.all([
          fetch('http://localhost/transactX/email_server.php'),
          fetch('http://localhost/transactX/banks.php'),
        ]);

        if (emailResponse.ok) {
          const emailResult = await emailResponse.json();
          setEmailOptions(emailResult);
        } else {
          console.error('Failed to fetch email options');
        }

        if (recordsResponse.ok) {
          const recordsResult = await recordsResponse.json();
          setRecords(recordsResult);
        } else {
          console.error('Failed to fetch records');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchData();
  }, []);

  // useEffect to fetch records when the component mounts or when editing is finished
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const recordsResponse = await fetch('http://localhost/transactX/banks.php');
        if (recordsResponse.ok) {
          const recordsResult = await recordsResponse.json();
          setRecords(recordsResult);
          setIsEditing(false); // Reset editing mode
        } else {
          console.error('Failed to fetch records');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchRecords();
  }, [isEditing]);

  // Function to handle file input changes
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploads((prevUploads) => ({
        ...prevUploads,
        [fileType]: files[0],
      }));
    }
  };

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'bankName':
        setBankName(value);
        break;
      case 'mobile':
        setMobile(value);
        break;
      case 'websiteUrl':
        setWebsiteUrl(value);
        break;
      default:
        break;
    }
  };

  // Function to handle email ID changes
  const handleEmailIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEmailOption = emailOptions.find((option) => option.id === event.target.value);
    const displayValue = selectedEmailOption ? selectedEmailOption.id : '';
    setEmailId(displayValue);
  };

// Function to handle save or update
const handleSaveOrUpdate = async () => {
    const formData = new FormData();
    formData.append('bank_name', bankName);
    Object.keys(uploads).forEach((key) => {
      const file = uploads[key];
      if (file) {
        formData.append(`${key}_upload`, file as Blob);
      }
    });
    formData.append('mobile', mobile);
    formData.append('website_url', websiteUrl);
    formData.append('email_id', emailId);
  
    try {
      let response;
      if (selectedRecord) {
        formData.append('id', selectedRecord.bank_id);
        response = await fetch('http://localhost/transactX/banks.php', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('http://localhost/transactX/banks.php', {
          method: 'POST',
          body: formData,
        });
      }
  
      if (response.ok) {
        // Fetch the updated records
        const updatedRecordsResponse = await fetch('http://localhost/transactX/banks.php');
        if (updatedRecordsResponse.ok) {
          const updatedRecordsResult = await updatedRecordsResponse.json();
          setRecords(updatedRecordsResult);
        } else {
          console.error('Failed to fetch updated records');
        }
  
        setSelectedRecord(null);
      } else {
        console.error('Failed to upload/update data');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  
  };
  

  // Return the JSX for the component
  return (
    <div className="container mt-4">
     {/* Form for Email ID selection */}
     <div className="row">
    <div className="col-md-12">
      <h2>Email ID</h2>
      <select className="form-control" onChange={handleEmailIdChange} value={emailId}>
        <option value="">Select Email ID</option>
        {emailOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.username}
          </option>
        ))}
      </select>
    </div>
  </div>

    {/* Form for Bank details */}
    <div className="row mt-3">
      <div className="col-md-6">
        <label>Bank Name</label>
        <input type="text" className="form-control" name="bankName" onChange={handleInputChange} value={bankName} />
      </div>
      <div className="col-md-6">
        <label>Mobile</label>
        <input type="text" className="form-control" name="mobile" onChange={handleInputChange} value={mobile} />
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md-6">
        <label>Website URL</label>
        <input type="text" className="form-control" name="websiteUrl" onChange={handleInputChange} value={websiteUrl} />
      </div>
      <div className="col-md-6">
        <label>Logo Upload</label>
        <input type="file" className="form-control" onChange={(e) => handleFileChange(e, 'logo')} />
        {renderFilePreview(uploads.logo)}
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md-6">
        <label>Watermark Upload</label>
        <input type="file" className="form-control" onChange={(e) => handleFileChange(e, 'watermark')} />
        {renderFilePreview(uploads.watermark)}
      </div>
      <div className="col-md-6">
        <label>Digital Stamp Upload</label>
        <input type="file" className="form-control" onChange={(e) => handleFileChange(e, 'digital_stamp')} />
        {renderFilePreview(uploads.digital_stamp)}
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md-6">
        <label>Digital Signature Upload</label>
        <input type="file" className="form-control" onChange={(e) => handleFileChange(e, 'digital_signature')} />
        {renderFilePreview(uploads.digital_signature)}
      </div>
    </div>

    {/* Button for Save/Update */}
    <div className="row mt-3">
      <div className="col-md-12">
        <button className="btn btn-primary" onClick={handleSaveOrUpdate}>
          {isEditing ? 'Update' : 'Save'}
        </button>
      </div>
    </div>

      {/* Display Records */}
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>Records</h2>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Bank Name</th>
                <th>Email ID</th>
                <th>Logo</th>
                <th>Watermark</th>
                <th>Digital Stamp</th>
                <th>Digital Signature</th>
                <th>Mobile</th>
                <th>Website URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record.bank_id}>
                  <td>{index + 1}</td>
                  <td>{record.bank_name}</td>
                  <td>{record.email_id}</td>
                  <td>
                    <img src={`http://localhost/transactX/uploads/${record.logo_upload}`} alt="Logo" width="50" />
                  </td>
                  <td>
                    <img src={`http://localhost/transactX/uploads/${record.watermark_upload}`} alt="Watermark" width="50" />
                  </td>
                  <td>
                    <img src={`http://localhost/transactX/uploads/${record.digital_stamp_upload}`} alt="Digital Stamp" width="50" />
                  </td>
                  <td>
                    <img src={`http://localhost/transactX/uploads/${record.digital_signature_upload}`} alt="Digital Signature" width="50" />
                  </td>
                  <td>{record.mobile}</td>
                  <td>{record.website_url}</td>
                  <td>
                    <button className="btn btn-info mr-2" onClick={() => handleEdit(record)}>
                      Edit
                    </button>
                    <button className="btn btn-warning mr-2" onClick={() => handlePreview(record)}>
                      Preview
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(record)}>
  Delete
</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Export the PdfTemplateForm component as the default export
export default PdfTemplateForm;

