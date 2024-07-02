import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Modal, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FaDownload, FaPlus, FaCalendarAlt, FaFont, FaUndo, FaPencilAlt } from 'react-icons/fa';

const ImageCrop = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedShape, setSelectedShape] = useState<string>('rectangle');
  const [fillColor, setFillColor] = useState<string>('#FF0000');
  const [strokeColor, setStrokeColor] = useState<string>('#000000');
  const [textColor, setTextColor] = useState<string>('#000000');
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [drawingMode, setDrawingMode] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  

  useEffect(() => {
    if (canvasRef.current) {
      const newCanvas = new fabric.Canvas(canvasRef.current);
      setCanvas(newCanvas);
    }
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.isDrawingMode = drawingMode;
    }
  }, [drawingMode]);

  const addShape = () => {
    if (!canvas) return;

    let shape: fabric.Object | null = null;

    switch (selectedShape) {
      case 'rectangle':
        shape = new fabric.Rect({
          width: 100,
          height: 100,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: 2,
          left: 50,
          top: 50,
        });
        break;
      case 'circle':
        shape = new fabric.Circle({
          radius: 50,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: 2,
          left: 150,
          top: 50,
        });
        break;
      default:
        break;
    }

    if (shape) {
      canvas.add(shape);
    }
  };

  const addTextToShape = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    const text = new fabric.Textbox('Your text here', {
      left: activeObject.left as number + 10,
      top: activeObject.top as number + 10,
      width: 100,
      fill: textColor,
      fontFamily: fontFamily,
    });

    canvas.add(text);
  };
  

  const handleShapeChange = (e: ChangeEvent<{ value: unknown }>) => {
    setSelectedShape(e.target.value as string);
  };

  const handleFillChange = (e: ChangeEvent<{ value: unknown }>) => {
    setFillColor(e.target.value as string);
  };

  const handleStrokeChange = (e: ChangeEvent<{ value: unknown }>) => {
    setStrokeColor(e.target.value as string);
  };

  const handleTextFillChange = (e: ChangeEvent<{ value: unknown }>) => {
    setTextColor(e.target.value as string);
  };

  const handleFontFamilyChange = (e: ChangeEvent<{ value: unknown }>) => {
    setFontFamily(e.target.value as string);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      loadImage(URL.createObjectURL(files[0]));
    }
  };
  

  const handleUndo = () => {
    if (canvas) {
      const objects = canvas.getObjects();
      if (objects.length > 0) {
        canvas.remove(objects[objects.length - 1]);
        canvas.renderAll();
      }
    }
  };

  const addCurrentDateToShape = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    const currentDate = new Date().toLocaleDateString(); // Get current date

    const text = new fabric.Textbox(currentDate, {
      left: activeObject.left as number + 10,
      top: activeObject.top as number + 30,
      width: 100,
      fill: '#000000', // Text color
    });

    canvas.add(text);
  };

  const toggleDrawingMode = () => {
    setDrawingMode(!drawingMode);
  };

const handleSave = () => {
    if (!canvas) return;
  
    // Convert canvas to PNG image data
    const imageData = canvas.toDataURL({ format: 'png' });
  
    // Create an anchor element
    const downloadLink = document.createElement('a');
    downloadLink.href = imageData;
    downloadLink.download = 'my_edited_canvas.png'; // Set the file name for download
  
    // Append the anchor element to the body
    document.body.appendChild(downloadLink);
  
    // Trigger a click on the anchor to initiate download
    downloadLink.click();
  
    // Remove the anchor element from the DOM
    document.body.removeChild(downloadLink);
  };
  

  const loadImage = (imageUrl: string) => {
    if (canvas) {
      fabric.Image.fromURL(imageUrl, (img) => {
        // Adjust the position and size of the uploaded image if needed
        img.set({
          left: 100,
          top: 100,
          scaleX: 0.5,
          scaleY: 0.5,
        });
  
        // Enable object controls for the image (resizing, rotating, etc.)
        img.setControlsVisibility({
          mt: false,
          mb: false,
          ml: false,
          mr: false,
        });
  
        // Allow the image to be draggable
        img.set({
          selectable: true,
          evented: true,
          hasControls: true,
          hasBorders: false,
        });
  
        canvas.add(img);
        canvas.renderAll();
      });
    }
  };

  const handlePreview = () => {
    if (!canvas) return;

    // Convert canvas to PNG image data
    const imageData = canvas.toDataURL({ format: 'png' });

    setPreviewImage(imageData); // Set the image data for preview
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

   

  return (
    <Container>
      <Row className="mt-3">
      <Col>
          <Form.Group controlId="shapeSelect">
            <Form.Label>Select Shape</Form.Label>
            <Form.Control as="select" value={selectedShape} onChange={handleShapeChange}>
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="fillColor">
            <Form.Label>Fill Color</Form.Label>
            <Form.Control type="color" value={fillColor} onChange={handleFillChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="strokeColor">
            <Form.Label>Stroke Color</Form.Label>
            <Form.Control type="color" value={strokeColor} onChange={handleStrokeChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="textColor">
            <Form.Label>Text Color</Form.Label>
            <Form.Control type="color" value={textColor} onChange={handleTextFillChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="fontFamilySelect">
            <Form.Label>Font Family</Form.Label>
            <Form.Control as="select" value={fontFamily} onChange={handleFontFamilyChange}>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <input type="file" onChange={handleFileChange} />
          <canvas
            ref={canvasRef}
            width={1300}
            height={600}
            style={{ border: '2px solid black', marginTop: '10px' }}
          />
        </Col>
      </Row>
            {/* Additional Form for saving */}
            <Row className="mt-3">
        <Col>
          <Button onClick={addShape} variant="primary">
            <FaPlus /> Add Selected Shape
          </Button>
        </Col>
        <Col>
          <Button onClick={addCurrentDateToShape} variant="primary">
            <FaCalendarAlt /> Add Current Date
          </Button>
        </Col>
        <Col>
          <Button onClick={addTextToShape} variant="primary">
            <FaFont /> Add Text to Shape
          </Button>
        </Col>
        <Col>
          <Button onClick={handleUndo} variant="primary">
            <FaUndo /> Undo
          </Button>
        </Col>
        <Col>
          <Button onClick={toggleDrawingMode} variant="primary">
            <FaPencilAlt /> {drawingMode ? 'Exit Draw' : 'Draw'}
          </Button>
        </Col>

        <Col>
            <Button onClick={handleSave} variant="primary">
            <FaDownload /> Download
            </Button>
        </Col>

        <Col>
          <Button onClick={handlePreview} variant="primary">
            <FaUndo /> Preview
          </Button>
        </Col>
      </Row>
         {/* Modal for Preview */}
         <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {previewImage && (
            <img src={previewImage} alt="Preview" style={{ maxWidth: '100%' }} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ImageCrop;
