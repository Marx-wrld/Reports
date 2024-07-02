import { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw'; // Update the import statement

const DigitalStamp = () => {
  const canvasRef = useRef<CanvasDraw | null>(null); // Update the type

  const handleSave = () => {
    if (canvasRef.current) {
      const canvasData = canvasRef.current.getSaveData();
      console.log(canvasData);
    }
  };

  return (
    <div>
      <h1>Digital Stamp</h1>
      <CanvasDraw
        ref={(canvasDraw) => (canvasRef.current = canvasDraw)}
        brushColor="#000"
        canvasWidth={500}
        canvasHeight={500}
        hideGrid
        lazyRadius={0}
      />
      <button onClick={handleSave}>Save Digital Stamp</button>
    </div>
  );
};

export default DigitalStamp;
