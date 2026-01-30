"use client";

import React, { useEffect, useRef } from "react";

interface Cell {
  value: string | number;
  type: 'text' | 'number' | 'header';
  isChanging?: boolean;
  targetValue?: string | number;
}

export const DataWavesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Настройки таблицы
    const cellWidth = 120;
    const cellHeight = 40;
    const cols = Math.ceil(w / cellWidth) + 2;
    const rows = Math.ceil(h / cellHeight) + 2;

    // Цвета Google Sheets
    const colors = {
      gridLine: '#E0E0E0',
      headerBg: '#F8F9FA',
      headerText: '#5F6368',
      cellBg: '#FFFFFF',
      cellText: '#202124',
      highlightBg: '#E8F0FE',
      highlightText: '#1A73E8',
      changingBg: '#FFF9E6',
    };

    // Заголовки колонок
    const headers = [
      'Регион',
      'Q1 2024',
      'Q2 2024',
      'Q3 2024',
      'Q4 2024',
      'Рост %',
      'Статус',
      'Прогноз',
      'Рост',
      'Критерий 1',
      'Критерий 2',
      'Критерий 3',
      'Критерий 4',
      'Критерий 5',
    ];

    // Данные регионов
    const regions = [
      'Москва', 'Санкт-Петербург', 'Татарстан', 'Свердловская обл.',
      'Краснодарский край', 'Ростовская обл.', 'Нижегородская обл.',
      'Челябинская обл.', 'Самарская обл.', 'Омская обл.'
    ];

    const statuses = ['✓ Активно', '↑ Рост', '→ Стабильно', '⚡ Высокий'];

    // Создание таблицы
    const table: Cell[][] = [];

    // Заголовки
    const headerRow: Cell[] = headers.map(h => ({ value: h, type: 'header' as const }));
    table.push(headerRow);

    // Данные
    for (let i = 0; i < rows - 1; i++) {
      const row: Cell[] = [];
      row.push({ value: regions[i % regions.length], type: 'text' as const });

      // Числовые данные
      for (let j = 1; j < cols - 2; j++) {
        row.push({
          value: Math.floor(Math.random() * 500) + 100,
          type: 'number' as const,
          isChanging: false
        });
      }

      // Процент роста
      row.push({
        value: `+${(Math.random() * 30 + 5).toFixed(1)}%`,
        type: 'text' as const
      });

      // Статус
      row.push({
        value: statuses[Math.floor(Math.random() * statuses.length)],
        type: 'text' as const
      });

      table.push(row);
    }

    // Анимация изменения данных
    const updateRandomCell = () => {
      const row = Math.floor(Math.random() * (table.length - 1)) + 1;
      const col = Math.floor(Math.random() * (table[row].length - 3)) + 1;

      if (table[row] && table[row][col] && table[row][col].type === 'number') {
        const cell = table[row][col];
        cell.isChanging = true;
        cell.targetValue = Math.floor(Math.random() * 500) + 100;

        setTimeout(() => {
          if (cell.targetValue !== undefined) {
            cell.value = cell.targetValue;
            cell.isChanging = false;
          }
        }, 600);
      }
    };

    // Обновление данных каждые 2 секунды
    const updateInterval = setInterval(() => {
      for (let i = 0; i < 3; i++) {
        updateRandomCell();
      }
    }, 2000);

    const drawTable = () => {
      ctx.clearRect(0, 0, w, h);

      // Фон
      ctx.fillStyle = '#F8F9FA';
      ctx.fillRect(0, 0, w, h);

      // Рисуем ячейки
      for (let row = 0; row < table.length; row++) {
        for (let col = 0; col < table[row].length; col++) {
          const x = col * cellWidth;
          const y = row * cellHeight;
          const cell = table[row][col];

          // Фон ячейки
          if (cell.type === 'header') {
            ctx.fillStyle = colors.headerBg;
          } else if (cell.isChanging) {
            ctx.fillStyle = colors.changingBg;
          } else {
            ctx.fillStyle = colors.cellBg;
          }
          ctx.fillRect(x, y, cellWidth, cellHeight);

          // Границы
          ctx.strokeStyle = colors.gridLine;
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, cellWidth, cellHeight);

          // Текст
          ctx.fillStyle = cell.type === 'header' ? colors.headerText :
            cell.isChanging ? colors.highlightText : colors.cellText;
          ctx.font = cell.type === 'header' ?
            'bold 11px "Inter", sans-serif' :
            '11px "Inter", sans-serif';
          ctx.textAlign = cell.type === 'number' ? 'right' : 'left';
          ctx.textBaseline = 'middle';

          const textX = cell.type === 'number' ? x + cellWidth - 12 : x + 12;
          const textY = y + cellHeight / 2;

          // Анимация изменения
          if (cell.isChanging) {
            ctx.save();
            ctx.globalAlpha = 0.5 + Math.sin(Date.now() / 200) * 0.3;
          }

          ctx.fillText(String(cell.value), textX, textY);

          if (cell.isChanging) {
            ctx.restore();

            // Индикатор изменения
            ctx.fillStyle = colors.highlightText;
            ctx.beginPath();
            ctx.arc(x + cellWidth - 8, y + 8, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Тень для заголовка
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, cellHeight, w, 2);
    };

    const animate = () => {
      drawTable();
      requestAnimationFrame(animate);
    };

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize);

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      clearInterval(updateInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-screen w-screen pointer-events-none opacity-15 z-0"
    />
  );
};
