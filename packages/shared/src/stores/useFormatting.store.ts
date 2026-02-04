import type { TextAlign } from "@elbruso/types/enums";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type TextDecoration = "none" | "underline";

export interface FormattingState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  alignment: TextAlign;
  fontSize: number;
  fontFamily: string;
  textColor: string | null;
  backgroundColor: string | null;

  setBold: (value: boolean) => void;
  toggleBold: () => void;
  setItalic: (value: boolean) => void;
  toggleItalic: () => void;
  setUnderline: (value: boolean) => void;
  toggleUnderline: () => void;
  setAlignment: (align: TextAlign) => void;
  setFontSize: (size: number) => void;
  setFontFamily: (family: string) => void;
  setTextColor: (color: string | null) => void;
  setBackgroundColor: (color: string | null) => void;
  resetFormatting: () => void;
  setFromCellStyle: (style: Partial<FormattingState>) => void;
}

export const useFormattingStore = create<FormattingState>()(
  subscribeWithSelector((set) => ({
    isBold: false,
    isItalic: false,
    isUnderline: false,
    alignment: "left",
    fontSize: 10,
    fontFamily: "Roboto",
    textColor: null,
    backgroundColor: null,

    setBold: (value) => set({ isBold: value }),
    toggleBold: () => set((state) => ({ isBold: !state.isBold })),
    setItalic: (value) => set({ isItalic: value }),
    toggleItalic: () => set((state) => ({ isItalic: !state.isItalic })),
    setUnderline: (value) => set({ isUnderline: value }),
    toggleUnderline: () => set((state) => ({ isUnderline: !state.isUnderline })),
    setAlignment: (align) => set({ alignment: align }),
    setFontSize: (size) => set({ fontSize: size }),
    setFontFamily: (family) => set({ fontFamily: family }),
    setTextColor: (color) => set({ textColor: color }),
    setBackgroundColor: (color) => set({ backgroundColor: color }),

    resetFormatting: () =>
      set({
        isBold: false,
        isItalic: false,
        isUnderline: false,
        alignment: "left",
        fontSize: 10,
        fontFamily: "Roboto",
        textColor: null,
        backgroundColor: null,
      }),

    setFromCellStyle: (style) =>
      set((state) => ({
        isBold: style.isBold ?? state.isBold,
        isItalic: style.isItalic ?? state.isItalic,
        isUnderline: style.isUnderline ?? state.isUnderline,
        alignment: style.alignment ?? state.alignment,
        fontSize: style.fontSize ?? state.fontSize,
        fontFamily: style.fontFamily ?? state.fontFamily,
        textColor: style.textColor ?? state.textColor,
        backgroundColor: style.backgroundColor ?? state.backgroundColor,
      })),
  })),
);
