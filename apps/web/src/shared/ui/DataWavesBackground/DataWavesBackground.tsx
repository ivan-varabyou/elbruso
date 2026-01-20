"use client";

import React, { useEffect, useRef } from "react";

export const DataWavesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const mouse = { x: -1000, y: -1000 };
    const particles: Particle[] = [];
    const waveCount = 3;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      value: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 10 + 10;
        this.value = Math.random() > 0.5 ? Math.floor(Math.random() * 100).toString() : (Math.random() > 0.5 ? "↑" : "↓");
        this.alpha = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Interaction with mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        }

        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(26, 115, 232, ${this.alpha})`;
        ctx.font = `${this.size}px Inter, sans-serif`;
        ctx.fillText(this.value, this.x, this.y);
      }
    }

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      particles.length = 0;
      for (let i = 0; i < 40; i++) {
        particles.push(new Particle());
      }
    };

    const drawWaves = (time: number) => {
      if (!ctx) return;
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(26, 115, 232, ${0.05 - i * 0.01})`;
        ctx.lineWidth = 1;

        const offset = i * 200;
        const frequency = 0.001;
        const amplitude = 50 - i * 10;

        for (let x = 0; x <= w; x += 10) {
          // Wave affected by mouse
          const dx = mouse.x - x;
          const mouseEffect = Math.max(0, (300 - Math.abs(dx)) / 300);
          
          const y = h * 0.6 + 
                    Math.sin(x * frequency + time * 0.001 + offset) * amplitude +
                    Math.cos(x * 0.002 + time * 0.0005) * 20 +
                    (mouseEffect * -30); // Wave reacts to mouse

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      drawWaves(time);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    const onResize = () => init();
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    init();
    animate(0);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
    />
  );
};
