import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PdfTemplateForm: React.FC = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [watermark, setWatermark] = useState<File | null>(null);
  const [digitalStamp, setDigitalStamp] = useState<File | null>(null);
  const [digitalSignature, setDigitalSignature] = useState<File | null>(null);
  const [footerText, setFooterText] = useState('');

  const navigate = useNavigate();

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setLogo(files[0]);
    }
  };

  const handleWatermarkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setWatermark(files[0]);
    }
  };

  const handleDigitalStampChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setDigitalStamp(files[0]);
    }
  };

  const handleDigitalSignatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setDigitalSignature(files[0]);
    }
  };

  const handleFooterTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newFooterText = event.target.value;
    setFooterText(newFooterText);
  };

  const handlePreview = () => {
    const formData = {
      logo,
      watermark,
      digitalStamp,
      digitalSignature,
      footerText,
    };

    navigate('/preview_template', {
      state: { formData },
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h2>Logo Upload</h2>
          <input type="file" accept="image/*" onChange={handleLogoChange} />
        </div>
        <div className="col-md-6">
          <h2>Watermark Upload</h2>
          <input type="file" accept="image/*" onChange={handleWatermarkChange} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h2>Digital Stamp Upload</h2>
          <input type="file" accept="image/*" onChange={handleDigitalStampChange} />
        </div>
        <div className="col-md-6">
          <h2>Digital Signature Upload</h2>
          <input type="file" accept="image/*" onChange={handleDigitalSignatureChange} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h2>Footer</h2>
          <textarea
            className="form-control"
            placeholder="Enter footer text here..."
            value={footerText}
            onChange={handleFooterTextChange}
          ></textarea>
          <button className="btn btn-primary mt-3" onClick={handlePreview}>
            Preview Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfTemplateForm;
