import { useEffect, useRef } from 'react';

export default function BlueprintHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for perspective reaction
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      targetRotY = ((mouseX - width / 2) / width) * 0.4;
      targetRotX = ((mouseY - height / 2) / height) * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 3D Wireframe Cube / Structural Tower Vertices & Edges
    const nodes: { x: number; y: number; z: number }[] = [];
    const edges: [number, number][] = [];

    // Create a 3D structural building grid
    const layers = 5;
    const size = 140;

    for (let l = 0; l < layers; l++) {
      const y = (l - (layers - 1) / 2) * 70;
      const s = size * (1 - l * 0.1);
      const startIdx = nodes.length;

      // 4 corners per level
      nodes.push({ x: -s, y: y, z: -s });
      nodes.push({ x: s, y: y, z: -s });
      nodes.push({ x: s, y: y, z: s });
      nodes.push({ x: -s, y: y, z: s });

      // Ring edges
      edges.push([startIdx, startIdx + 1]);
      edges.push([startIdx + 1, startIdx + 2]);
      edges.push([startIdx + 2, startIdx + 3]);
      edges.push([startIdx + 3, startIdx]);

      // Vertical columns connecting to layer below
      if (l > 0) {
        const prevIdx = startIdx - 4;
        edges.push([prevIdx, startIdx]);
        edges.push([prevIdx + 1, startIdx + 1]);
        edges.push([prevIdx + 2, startIdx + 2]);
        edges.push([prevIdx + 3, startIdx + 3]);

        // Cross braces for engineering feel
        edges.push([prevIdx, startIdx + 2]);
        edges.push([prevIdx + 1, startIdx + 3]);
      }
    }

    let angleY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth rotation dampening
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;
      angleY += 0.005;

      const totalAngleY = angleY + currentRotY;
      const totalAngleX = currentRotX + 0.3; // Default 30deg pitch down

      const cosY = Math.cos(totalAngleY);
      const sinY = Math.sin(totalAngleY);
      const cosX = Math.cos(totalAngleX);
      const sinX = Math.sin(totalAngleX);

      // Project 3D points to 2D canvas
      const projectedNodes: { x: number; y: number; scale: number }[] = [];
      const centerX = width * 0.72; // Position on the right side of hero
      const centerY = height * 0.48;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Rotate Y
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;

        // Rotate X
        const y1 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        // Perspective projection
        const perspective = 600;
        const scale = perspective / (perspective + z2 + 250);
        const px = x1 * scale + centerX;
        const py = y1 * scale + centerY;

        projectedNodes.push({ x: px, y: py, scale });
      }

      // Draw Grid Lines (Blueprint Floor)
      ctx.strokeStyle = 'rgba(224, 58, 0, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      const gridCount = 20;

      for (let i = -gridCount; i <= gridCount; i++) {
        ctx.beginPath();
        // Horizon perspective lines
        ctx.moveTo(0, centerY + i * 25);
        ctx.lineTo(width, centerY + i * 25);
        ctx.stroke();
      }

      // Draw 3D Edges
      ctx.strokeStyle = 'rgba(224, 58, 0, 0.55)';
      ctx.lineWidth = 1.5;

      for (let i = 0; i < edges.length; i++) {
        const p1 = projectedNodes[edges[i][0]];
        const p2 = projectedNodes[edges[i][1]];

        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, 'rgba(224, 58, 0, 0.7)');
        grad.addColorStop(1, 'rgba(30, 58, 95, 0.5)');

        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Draw Node Dots
      for (let i = 0; i < projectedNodes.length; i++) {
        const p = projectedNodes[i];
        ctx.fillStyle = '#f5f1e8';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2);
        ctx.fill();

        // Glowing pulse on nodes
        ctx.fillStyle = 'rgba(224, 58, 0, 0.4)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6 * p.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-85"
    />
  );
}
