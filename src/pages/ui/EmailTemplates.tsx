import React, { useState } from 'react';
import './styles.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

// Header Component
interface HeaderProps {
  onChange: (headerData: any) => void;
}

const Header: React.FC<HeaderProps> = ({ onChange }) => {
  const [logo, setLogo] = useState<File | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState('14px');
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setLogo(files[0]);
    }
  };

  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCompanyName = event.target.value;
    setCompanyName(newCompanyName);
    onChange({ logo, companyName: newCompanyName, backgroundColor, textColor, fontSize, layout });
  };

  const handleBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBackgroundColor = event.target.value;
    setBackgroundColor(newBackgroundColor);
    onChange({ logo, companyName, backgroundColor: newBackgroundColor, textColor, fontSize, layout });
  };

  const handleTextColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTextColor = event.target.value;
    setTextColor(newTextColor);
    onChange({ logo, companyName, backgroundColor, textColor: newTextColor, fontSize, layout });
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFontSize = event.target.value;
    setFontSize(newFontSize);
    onChange({ logo, companyName, backgroundColor, textColor, fontSize: newFontSize, layout });
  };

  const handleLayoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedLayout = event.target.value as 'horizontal' | 'vertical';
    setLayout(selectedLayout);
    onChange({ logo, companyName, backgroundColor, textColor, fontSize, layout: selectedLayout });
  };

  return (
    <div className="header-container">
      <div className="header-styling">
        <h3>Header Styling</h3>
        <label>Background Color:</label>
        <input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
        <label>Text Color:</label>
        <input type="color" value={textColor} onChange={handleTextColorChange} />
        <label>Font Size:</label>
        <input type="text" value={fontSize} onChange={handleFontSizeChange} />
        <label>Layout:</label>
        <div>
          <label>
            <input
              type="radio"
              value="horizontal"
              checked={layout === 'horizontal'}
              onChange={handleLayoutChange}
            />
            Horizontal
          </label>
          <label>
            <input
              type="radio"
              value="vertical"
              checked={layout === 'vertical'}
              onChange={handleLayoutChange}
            />
            Vertical
          </label>
        </div>
      </div>
      <div className="header-content">
        <h3>Header Content</h3>
        <label>Upload Logo:</label>
        <input type="file" onChange={handleLogoChange} />
        <label>Company Name:</label>
        <input type="text" value={companyName} onChange={handleCompanyNameChange} />
        {/* Additional options */}
        <label>Contact Information:</label>
        <input type="text" placeholder="Phone, Email, etc." />
        <label>Website Link:</label>
        <input type="text" placeholder="www.example.com" />
        <label>Social Media Links:</label>
        <input type="text" placeholder="Facebook, Twitter, etc." />
      </div>
    </div>
  );
};

// Footer Component
interface FooterProps {
  onChange: (footerData: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onChange }) => {
  const [contactDetails, setContactDetails] = useState('');
  const [footerText, setFooterText] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState('14px');
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newContact = event.target.value;
    setContactDetails(newContact);
    onChange({ contactDetails: newContact, footerText, backgroundColor, textColor, fontSize, layout });
  };

  const handleFooterTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFooterText = event.target.value;
    setFooterText(newFooterText);
    onChange({ contactDetails, footerText: newFooterText, backgroundColor, textColor, fontSize, layout });
  };

  const handleBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBackgroundColor = event.target.value;
    setBackgroundColor(newBackgroundColor);
    onChange({ contactDetails, footerText, backgroundColor: newBackgroundColor, textColor, fontSize, layout });
  };

  const handleTextColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTextColor = event.target.value;
    setTextColor(newTextColor);
    onChange({ contactDetails, footerText, backgroundColor, textColor: newTextColor, fontSize, layout });
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFontSize = event.target.value;
    setFontSize(newFontSize);
    onChange({ contactDetails, footerText, backgroundColor, textColor, fontSize: newFontSize, layout });
  };

  const handleLayoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedLayout = event.target.value as 'horizontal' | 'vertical';
    setLayout(selectedLayout);
    onChange({ contactDetails, footerText, backgroundColor, textColor, fontSize, layout: selectedLayout });
  };

  return (
    <div className="footer-container">
      <div className="footer-styling">
        <h3>Footer Styling</h3>
        <label>Background Color:</label>
        <input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
        <label>Text Color:</label>
        <input type="color" value={textColor} onChange={handleTextColorChange} />
        <label>Font Size:</label>
        <input type="text" value={fontSize} onChange={handleFontSizeChange} />
        <label>Layout:</label>
        <div>
          <label>
            <input
              type="radio"
              value="horizontal"
              checked={layout === 'horizontal'}
              onChange={handleLayoutChange}
            />
            Horizontal
          </label>
          <label>
            <input
              type="radio"
              value="vertical"
              checked={layout === 'vertical'}
              onChange={handleLayoutChange}
            />
            Vertical
          </label>
        </div>
      </div>
      <div className="footer-content">
        <h3>Footer Content</h3>
        <label>Contact Details:</label>
        <input type="text" value={contactDetails} onChange={handleContactChange} />
        <label>Footer Text:</label>
        <input type="text" value={footerText} onChange={handleFooterTextChange} />
      </div>
    </div>
  );
};

// Main Email Template Component
const EmailTemplate: React.FC = () => {
  const navigate = useNavigate();
  const [headerData, setHeaderData] = useState({});
  const [footerData, setFooterData] = useState({});

  

  const handleHeaderChange = (newHeaderData: any) => {
    setHeaderData(newHeaderData);
  };


  const handleFooterChange = (newFooterData: any) => {
    setFooterData(newFooterData);
  };

  const previewEmail = () => {
    // Send the form details to the '/transactional_email' URL
    navigate('/transactional_email', {
      state: {
        headerData,
        footerData,
      },
    });
  };

  return (
    <div>
      <h2>Email Template Editor</h2>
      <Header onChange={handleHeaderChange} />
      <Footer onChange={handleFooterChange} />
      <button onClick={previewEmail}>Preview Email</button>
    </div>
  );
};
export default EmailTemplate;
