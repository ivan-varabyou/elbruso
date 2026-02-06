"use client";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  DollarSign,
  Grid3x3,
  Italic,
  Link2,
  LucideIcon,
  Merge,
  Palette,
  Percent,
  Printer,
  Redo2,
  Underline,
  Undo2,
} from "lucide-react";

interface MainToolbarProps {
  onFormatBold?: () => void;
  onFormatItalic?: () => void;
  onFormatUnderline?: () => void;
  onAlignLeft?: () => void;
  onAlignCenter?: () => void;
  onAlignRight?: () => void;
  onTextColor?: (color: string) => void;
  onBackgroundColor?: (color: string) => void;
  onMergeCells?: () => void;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  alignment?: "left" | "center" | "right" | "justify";
}

export function MainToolbar({
  onFormatBold,
  onFormatItalic,
  onFormatUnderline,
  onAlignLeft,
  onAlignCenter,
  onAlignRight,
  onTextColor,
  onBackgroundColor,
  onMergeCells,
  isBold = false,
  isItalic = false,
  isUnderline = false,
  alignment = "left",
}: MainToolbarProps) {
  const ToolbarButton = ({
    icon: Icon,
    onClick,
    title,
    active = false,
    disabled = false,
  }: {
    icon: LucideIcon;
    onClick?: () => void;
    title: string;
    active?: boolean;
    disabled?: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded hover:bg-gray-100 transition-colors ${
        active ? "bg-gray-200" : ""
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      <Icon className="w-5 h-5 text-[#3c4043]" />
    </button>
  );

  const ToolbarDivider = () => <div className="w-px h-5 bg-[#dadce0] mx-1" />;

  return (
    <div className="border-b border-[#e2e2e2] bg-white px-4 py-1.5 flex items-center gap-1">
      {/* Print & Undo/Redo */}
      <ToolbarButton icon={Printer} title="Print (Ctrl+P)" disabled />
      <ToolbarButton icon={Undo2} title="Undo (Ctrl+Z)" disabled />
      <ToolbarButton icon={Redo2} title="Redo (Ctrl+Y)" disabled />

      <ToolbarDivider />

      {/* Zoom */}
      <button
        className="px-2 py-1 text-[13px] text-[#3c4043] hover:bg-gray-100 rounded flex items-center gap-1"
        title="Zoom"
      >
        100%
        <ChevronDown className="w-3 h-3" />
      </button>

      <ToolbarDivider />

      {/* Number Formatting */}
      <ToolbarButton icon={DollarSign} title="Format as currency" disabled />
      <ToolbarButton icon={Percent} title="Format as percent" disabled />

      <ToolbarDivider />

      {/* Font Family */}
      <button
        className="px-2 py-1 text-[13px] text-[#3c4043] hover:bg-gray-100 rounded flex items-center gap-1 min-w-[100px]"
        title="Font"
      >
        Roboto
        <ChevronDown className="w-3 h-3" />
      </button>

      {/* Font Size */}
      <button
        className="px-2 py-1 text-[13px] text-[#3c4043] hover:bg-gray-100 rounded flex items-center gap-1 min-w-[50px]"
        title="Font size"
      >
        10
        <ChevronDown className="w-3 h-3" />
      </button>

      <ToolbarDivider />

      {/* Text Formatting */}
      <ToolbarButton icon={Bold} title="Bold (Ctrl+B)" onClick={onFormatBold} active={isBold} />
      <ToolbarButton
        icon={Italic}
        title="Italic (Ctrl+I)"
        onClick={onFormatItalic}
        active={isItalic}
      />
      <ToolbarButton
        icon={Underline}
        title="Underline (Ctrl+U)"
        onClick={onFormatUnderline}
        active={isUnderline}
      />

      {/* Text Color */}
      <button
        className="p-1.5 rounded hover:bg-gray-100 transition-colors relative"
        title="Text color"
        onClick={() => onTextColor?.("#000000")}
      >
        <div className="flex flex-col items-center">
          <span className="text-[13px] font-medium">A</span>
          <div className="w-4 h-0.5 bg-black mt-0.5"></div>
        </div>
      </button>

      {/* Fill Color */}
      <button
        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
        title="Fill color"
        onClick={() => onBackgroundColor?.("#ffffff")}
      >
        <Palette className="w-4 h-4 text-[#3c4043]" />
      </button>

      <ToolbarDivider />

      {/* Link */}
      <ToolbarButton icon={Link2} title="Insert link (Ctrl+K)" disabled />

      <ToolbarDivider />

      {/* Alignment */}
      <ToolbarButton
        icon={AlignLeft}
        title="Align left"
        onClick={onAlignLeft}
        active={alignment === "left"}
      />
      <ToolbarButton
        icon={AlignCenter}
        title="Align center"
        onClick={onAlignCenter}
        active={alignment === "center"}
      />
      <ToolbarButton
        icon={AlignRight}
        title="Align right"
        onClick={onAlignRight}
        active={alignment === "right"}
      />

      <ToolbarDivider />

      {/* Borders & Merge */}
      <ToolbarButton icon={Grid3x3} title="Borders" disabled />
      <ToolbarButton icon={Merge} title="Merge cells" onClick={onMergeCells} disabled />
    </div>
  );
}
