"use client";

import React, { useEffect, useRef } from "react";

export const InteractiveGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const mouse = { x: 0, y: 0 };
    const gap = 30;
    const points: { x: number; y: number; ox: number; oy: number }[] = [];

    const init = () => {
      points.length = 0;
      for (let x = 0; x <= w + gap; x += gap) {
        for (let y = 0; y <= h + gap; y += gap) {
          points.push({ x, y, ox: x, oy: y });
        }
      }
    };

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    init();

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(26, 115, 232, 0.15)";
      ctx.lineWidth = 0.5;

      points.forEach((p) => {
        const dx = mouse.x - p.ox;
        const dy = mouse.y - p.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          p.x = p.ox - dx * force * 0.4;
          p.y = p.oy - dy * force * 0.4;
        } else {
          p.x += (p.ox - p.x) * 0.1;
          p.y += (p.oy - p.y) * 0.1;
        }
      });

      // Draw horizontal lines
      for (let y = 0; y <= h + gap; y += gap) {
        ctx.beginPath();
        const row = points.filter((p) => p.oy === y);
        row.sort((a, b) => a.ox - b.ox);
        if (row.length > 0) {
          ctx.moveTo(row[0].x, row[0].y);
          for (let i = 1; i < row.length; i++) {
            ctx.lineTo(row[i].x, row[i].y);
          }
        }
        ctx.stroke();
      }

      // Draw vertical lines
      for (let x = 0; x <= w + gap; x += gap) {
        ctx.beginPath();
        const col = points.filter((p) => p.ox === x);
        col.sort((a, b) => a.oy - b.oy);
        if (col.length > 0) {
          ctx.moveTo(col[0].x, col[0].y);
          for (let i = 1; i < col.length; i++) {
            ctx.lineTo(col[i].x, col[i].y);
          }
        }
        ctx.stroke();
      }

      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
    />
  );
};
