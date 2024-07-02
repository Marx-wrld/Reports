import { PDFDocument, rgb,} from 'pdf-lib';
import qrcode from 'qrcode';

interface PdfProps {
  bankDetails: any;
  statementData: any;
  fromDate: string;
  toDate: string;
  accountNumber: string;
  currency: string;
  account_type: string;
  logoUrl: string;
  digitalStampUrl: string;
  digitalSignatureUrl: string;
  watermarkUrl: string;
  footerText: string;
}

const fetchImage = async (filename: string): Promise<ArrayBuffer> => {
  const proxyUrl = `http://localhost/transactX/image-proxy.php?image=${encodeURIComponent(filename)}`;
  const response = await fetch(proxyUrl);
  return response.arrayBuffer();
};

const generateQRCodeBytes = async (text: string): Promise<Uint8Array> => {
  try {
    const qrCodeDataURL = await qrcode.toDataURL(text);
    const base64Data = qrCodeDataURL.replace(/^data:image\/png;base64,/, '');
    const binaryData = atob(base64Data);
    const length = binaryData.length;
    const qrCodeBytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      qrCodeBytes[i] = binaryData.charCodeAt(i);
    }

    return qrCodeBytes;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

const getFilenameFromUrl = (url: string): string => {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
};

export const generateStatementPDF = async (pdfProps: PdfProps) => {
  try {
    const {
      statementData,
      fromDate,
      logoUrl,
      digitalStampUrl,
      digitalSignatureUrl,
    } = pdfProps;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Add NCBA logo to the far left in the header
    if (logoUrl) {
      const logoImageBytes = await fetchImage(getFilenameFromUrl(logoUrl));
      const logoImage = await pdfDoc.embedPng(logoImageBytes);

      const logoDims = { width: 130, height: 130 };
      page.drawImage(logoImage, { x: 10, y: page.getHeight() - logoDims.height, width: logoDims.width, height: logoDims.height });
    }

    // Add extra details and QR code on the same row
    const extraDetailsX = page.getWidth() - 200; // Adjust this value to push it to the farthest right

    if (statementData && statementData.length > 0) {
      page.drawText(`Opening Balance: ${parseFloat(statementData[0].open_bal).toLocaleString()}`, { x: extraDetailsX, y: page.getHeight() - 120 });
      page.drawText(`Payment In: ${parseFloat(statementData[0].amts_in).toLocaleString()}`, { x: extraDetailsX, y: page.getHeight() - 140 });
      page.drawText(`Payment Out: ${parseFloat(statementData[0].amts_out).toLocaleString()}`, { x: extraDetailsX, y: page.getHeight() - 160 });
      page.drawText(`Available Balance: ${parseFloat(statementData[0].working_balance).toLocaleString()}`, { x: extraDetailsX, y: page.getHeight() - 180 });
      page.drawText(`Closing Balance: ${parseFloat(statementData[0].closing_bal).toLocaleString()}`, { x: extraDetailsX, y: page.getHeight() - 200 });
      page.drawText(`Statement No: 1`, { x: extraDetailsX, y: page.getHeight() - 220 });
    }

    // Add content to the far left of the mid-section
    const midSectionX = 20;
    const midSectionY = page.getHeight() / 2;

    // Add the date, transaction type, details, value date, debit, credit, balance
    const transactionDetailsText = `Date: ${fromDate}\nTransaction Type: ${statementData[0].transaction_type}\nDetails: ${statementData[0].details}\nValue Date: ${statementData[0].value_date}\nDebit: ${statementData[0].dr_amnt}\nCredit: ${statementData[0].cr_amnt}\nBalance: ${statementData[0].amt}`;
    page.drawText(transactionDetailsText, { x: midSectionX, y: midSectionY });

    // Generate QR code image and embed on the far right
    const qrCodeText = 'https://demo.com'; // Replace with your QR code data
    const qrCodeImageBytes: Uint8Array = await generateQRCodeBytes(qrCodeText);
    const qrCodeImage = await pdfDoc.embedPng(qrCodeImageBytes);

    const qrDims = { width: 80, height: 80 };
    page.drawImage(qrCodeImage, {
      x: page.getWidth() - qrDims.width - 20,
      y: midSectionY,
      width: qrDims.width,
      height: qrDims.height,
    });

    // Add digital stamp at the bottom left
    if (digitalStampUrl) {
      const stampImageBytes = await fetchImage(getFilenameFromUrl(digitalStampUrl));
      const stampImage = await pdfDoc.embedPng(stampImageBytes);
      const stampDims = { width: stampImage.width / 2, height: stampImage.height / 2 };
      page.drawImage(stampImage, { x: 20, y: 20, width: stampDims.width, height: stampDims.height });
    }

    // Add digital signature at the bottom right
    if (digitalSignatureUrl) {
      const signatureImageBytes = await fetchImage(getFilenameFromUrl(digitalSignatureUrl));
      const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
      const signatureDims = { width: signatureImage.width / 2, height: signatureImage.height / 2 };
      page.drawImage(signatureImage, { x: page.getWidth() - signatureDims.width - 20, y: 20, width: signatureDims.width, height: signatureDims.height });

      // Add label for Branch Manager
      page.drawText('Branch Manager', { x: page.getWidth() - signatureDims.width - 20, y: 10, color: rgb(0, 0, 0) });
    }

    // Add watermark overlaying the entire page
    // if (watermarkUrl) {
    //   const watermarkImageBytes = await fetchImage(watermarkUrl);
    //   const watermarkImage = await pdfDoc.embedPng(watermarkImageBytes);
    //   const watermarkDims = { width: watermarkImage.width / 2, height: watermarkImage.height / 2 };
    //   page.drawImage(watermarkImage, { x: 0, y: 0, width: page.getWidth(), height: page.getHeight() });
    // }

    // Add footer
    // page.drawText(footerText, { x: 70, y: 20 });

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};