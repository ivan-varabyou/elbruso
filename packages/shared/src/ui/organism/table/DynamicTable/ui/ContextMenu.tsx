import { useEffect, useState } from 'react';

interface ContextMenuItem {
  label: string;
  action: () => void;
  shortcut?: string;
  separator?: boolean;
  disabled?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    // Adjust position if menu goes off screen
    const menuWidth = 250;
    const menuHeight = items.length * 36;
    
    const adjustedX = x + menuWidth > window.innerWidth ? x - menuWidth : x;
    const adjustedY = y + menuHeight > window.innerHeight ? y - menuHeight : y;
    
    setPosition({ x: adjustedX, y: adjustedY });
  }, [x, y, items.length]);

  useEffect(() => {
    const handleClick = () => onClose();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-lg border border-zinc-200 py-1 min-w-[200px]"
      style={{ left: position.x, top: position.y }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, index) => {
        if (item.separator) {
          return (
            <div
              key={`separator-${index}`}
              className="h-px bg-zinc-200 my-1"
            />
          );
        }

        return (
          <button
            key={index}
            className={`
              w-full px-4 py-2 text-left text-sm flex items-center justify-between
              ${item.disabled 
                ? 'text-zinc-400 cursor-not-allowed' 
                : 'text-zinc-700 hover:bg-zinc-100 cursor-pointer'
              }
            `}
            onClick={(e) => {
              e.stopPropagation();
              if (!item.disabled) {
                item.action();
                onClose();
              }
            }}
            disabled={item.disabled}
          >
            <span>{item.label}</span>
            {item.shortcut && (
              <span className="text-xs text-zinc-400 ml-4">{item.shortcut}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
