import { useRef, useEffect } from "react";

interface QRCodeProps {
  url: string;
  size?: number;
}

export default function QRCode({ url, size = 120 }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, size, size);

    // Simple QR-like pattern (not real QR, but visual representation)
    const cellSize = Math.floor(size / 25);
    const data = hashString(url);

    ctx.fillStyle = "#20211f";
    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 25; col++) {
        // Corner patterns
        const isCorner = (row < 7 && col < 7) || (row < 7 && col > 17) || (row > 17 && col < 7);
        const isCornerInner = (row > 1 && row < 5 && col > 1 && col < 5) ||
          (row > 1 && row < 5 && col > 19 && col < 23) ||
          (row > 19 && row < 23 && col > 1 && col < 5);

        if (isCorner) {
          const isEdge = row === 0 || row === 6 || col === 0 || col === 6 ||
            (row < 7 && col === 18) || (row < 7 && col === 24) ||
            (row === 18 && col < 7) || (row === 24 && col < 7);
          const isInner = isCornerInner;
          if (isEdge || isInner) {
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
          }
        } else if (data[(row * 25 + col) % data.length] % 3 === 0) {
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    }
  }, [url, size]);

  function hashString(str: string): number[] {
    const result: number[] = [];
    for (let i = 0; i < 625; i++) {
      let hash = 0;
      for (let j = 0; j < str.length; j++) {
        hash = ((hash << 5) - hash + str.charCodeAt(j) + i) | 0;
      }
      result.push(Math.abs(hash));
    }
    return result;
  }

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <canvas ref={canvasRef} style={{ border: "1px solid var(--border)" }} />
      <span style={{ fontSize: 10, color: "var(--muted-foreground)" }}>امسح الرمز لل访问</span>
    </div>
  );
}
