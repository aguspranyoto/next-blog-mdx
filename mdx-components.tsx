import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

const components: MDXComponents = {
  h1: ({ children }) => <h1 style={{ color: "#111", fontSize: 36 }}>{children}</h1>,
  img: (props) => <Image sizes="100vw" style={{ width: "100%", height: "auto" }} {...(props as ImageProps)} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
