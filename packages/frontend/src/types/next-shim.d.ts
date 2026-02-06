declare module "next/navigation" {
  export type NavigationHookResult = boolean;

  export interface NavigationHookValue {
    push(href: string): void;
    replace(href: string): void;
    back(): void;
    forward(): void;
    refresh(): void;
    prefetch(href: string): void;
  }

  export function useRouter(): NavigationHookValue;
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
  export function useParams<T = Record<string, string | string[] | undefined>>(): T;
  export function useSearchParam(key: string): string | string[] | null;
  export function useSelectedLayoutSegment(): string | null;
  export function useSelectedLayoutSegments(): string[];
  export function useNavigation(): NavigationHookValue;
}

declare module "next/link" {
  import { Component, LinkHTMLAttributes } from "react";

  interface LinkProps extends Omit<LinkHTMLAttributes<HTMLAnchorElement>, "href"> {
    href: string;
    replace?: boolean;
    scroll?: boolean;
    prefetch?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    legacyBehavior?: boolean;
    unmount?: boolean;
  }

  export default function Link(props: LinkProps): JSX.Element;
}

declare module "next/image" {
  import { ImgHTMLAttributes } from "react";

  interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    fill?: boolean;
    loading?: "eager" | "lazy";
    priority?: boolean;
    placeholder?: "blur" | "empty";
    blurDataURL?: string;
    sizes?: string;
    quality?: number | string;
  }

  export default function Image(props: ImageProps): JSX.Element;
}
