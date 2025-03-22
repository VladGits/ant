import { useRef, useState, useEffect, MouseEvent } from "react";

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ResizableRectangle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rect, setRect] = useState<Rect>({ x: 50, y: 50, width: 200, height: 150 });
  const [draggingCorner, setDraggingCorner] = useState<boolean>(false);
  const [draggingRect, setDraggingRect] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(`${(rect.width / 10).toFixed(1)}m`, rect.x + rect.width / 2 - 15, rect.y - 5);
    ctx.fillText(`${(rect.width / 10).toFixed(1)}m`, rect.x + rect.width / 2 - 15, rect.y + rect.height + 20);
    ctx.fillText(`${(rect.height / 10).toFixed(1)}m`, rect.x - 50, rect.y + rect.height / 2 + 5);
    ctx.fillText(`${(rect.height / 10).toFixed(1)}m`, rect.x + rect.width + 10, rect.y + rect.height / 2 + 5);
  }, [rect]);

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (
      Math.abs(offsetX - (rect.x + rect.width)) < 10 &&
      Math.abs(offsetY - (rect.y + rect.height)) < 10
    ) {
      setDraggingCorner(true);
    } else if (offsetX > rect.x && offsetX < rect.x + rect.width && offsetY > rect.y && offsetY < rect.y + rect.height) {
      setDraggingRect(true);
      setDragOffset({ x: offsetX - rect.x, y: offsetY - rect.y });
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (draggingCorner) {
      setRect((prev) => ({
        ...prev,
        width: Math.max(50, offsetX - prev.x),
        height: Math.max(50, offsetY - prev.y),
      }));
    } else if (draggingRect) {
      setRect((prev) => ({
        ...prev,
        x: offsetX - dragOffset.x,
        y: offsetY - dragOffset.y,
      }));
    }
  };

  const handleMouseUp = () => {
    if (draggingCorner) {
      console.log(`Width: ${(rect.width / 10).toFixed(1)}m, Height: ${(rect.height / 10).toFixed(1)}m`);
    }
    setDraggingCorner(false);
    setDraggingRect(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      style={{ border: "1px solid black", cursor: "pointer" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};
