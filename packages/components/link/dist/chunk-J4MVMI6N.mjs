"use client";
import {
  useLink
} from "./chunk-UUF4FQYI.mjs";

// src/link.tsx
import { forwardRef } from "@nextui-org/system";
import { LinkIcon } from "@nextui-org/shared-icons";
import { linkAnchorClasses } from "@nextui-org/theme";
var Link = forwardRef((props, ref) => {
  const {
    Component,
    children,
    showAnchorIcon,
    anchorIcon = <LinkIcon className={linkAnchorClasses} />,
    getLinkProps
  } = useLink({
    ref,
    ...props
  });
  return <Component {...getLinkProps()}><>
    {children}
    {showAnchorIcon && anchorIcon}
  </></Component>;
});
Link.displayName = "NextUI.Link";
var link_default = Link;

export {
  link_default
};
