"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/index.ts
var components_exports = {};
__export(components_exports, {
  accordion: () => accordion,
  accordionItem: () => accordionItem,
  autocomplete: () => autocomplete,
  avatar: () => avatar,
  avatarGroup: () => avatarGroup,
  badge: () => badge,
  breadcrumbItem: () => breadcrumbItem,
  breadcrumbs: () => breadcrumbs,
  button: () => button,
  buttonGroup: () => buttonGroup,
  calendar: () => calendar,
  card: () => card,
  checkbox: () => checkbox,
  checkboxGroup: () => checkboxGroup,
  chip: () => chip,
  circularProgress: () => circularProgress,
  code: () => code,
  dateInput: () => dateInput,
  datePicker: () => datePicker,
  dateRangePicker: () => dateRangePicker,
  divider: () => divider,
  drip: () => drip,
  dropdown: () => dropdown,
  dropdownItem: () => dropdownItem,
  dropdownMenu: () => dropdownMenu,
  dropdownSection: () => dropdownSection,
  image: () => image,
  input: () => input,
  kbd: () => kbd,
  link: () => link,
  linkAnchorClasses: () => linkAnchorClasses,
  listbox: () => menu,
  listboxItem: () => menuItem,
  listboxSection: () => menuSection,
  menu: () => menu,
  menuItem: () => menuItem,
  menuSection: () => menuSection,
  modal: () => modal,
  navbar: () => navbar,
  pagination: () => pagination,
  popover: () => popover,
  progress: () => progress,
  radio: () => radio,
  radioGroup: () => radioGroup,
  scrollShadow: () => scrollShadow,
  select: () => select,
  skeleton: () => skeleton,
  slider: () => slider,
  snippet: () => snippet,
  spacer: () => spacer,
  spinner: () => spinner,
  table: () => table,
  tabs: () => tabs,
  toggle: () => toggle,
  user: () => user
});
module.exports = __toCommonJS(components_exports);

// src/utils/tv.ts
var import_tailwind_variants = require("tailwind-variants");

// src/utils/tw-merge-config.ts
var COMMON_UNITS = ["small", "medium", "large"];
var twMergeConfig = {
  theme: {
    opacity: ["disabled"],
    spacing: ["divider"],
    borderWidth: COMMON_UNITS,
    borderRadius: COMMON_UNITS
  },
  classGroups: {
    shadow: [{ shadow: COMMON_UNITS }],
    "font-size": [{ text: ["tiny", ...COMMON_UNITS] }],
    "bg-image": ["bg-stripe-gradient"]
  }
};

// src/utils/tv.ts
var tv = (options, config) => {
  var _a, _b, _c;
  return (0, import_tailwind_variants.tv)(options, {
    ...config,
    twMerge: (_a = config == null ? void 0 : config.twMerge) != null ? _a : true,
    twMergeConfig: {
      ...config == null ? void 0 : config.twMergeConfig,
      theme: {
        ...(_b = config == null ? void 0 : config.twMergeConfig) == null ? void 0 : _b.theme,
        ...twMergeConfig.theme
      },
      classGroups: {
        ...(_c = config == null ? void 0 : config.twMergeConfig) == null ? void 0 : _c.classGroups,
        ...twMergeConfig.classGroups
      }
    }
  });
};

// src/utils/classes.ts
var dataFocusVisibleClasses = [
  "outline-none",
  "data-[focus-visible=true]:z-10",
  "data-[focus-visible=true]:outline-2",
  "data-[focus-visible=true]:outline-focus",
  "data-[focus-visible=true]:outline-offset-2"
];
var groupDataFocusVisibleClasses = [
  "outline-none",
  "group-data-[focus-visible=true]:z-10",
  "group-data-[focus-visible=true]:ring-2",
  "group-data-[focus-visible=true]:ring-focus",
  "group-data-[focus-visible=true]:ring-offset-2",
  "group-data-[focus-visible=true]:ring-offset-background"
];
var ringClasses = [
  "outline-none",
  "ring-2",
  "ring-focus",
  "ring-offset-2",
  "ring-offset-background"
];
var translateCenterClasses = [
  "absolute",
  "top-1/2",
  "left-1/2",
  "-translate-x-1/2",
  "-translate-y-1/2"
];
var collapseAdjacentVariantBorders = {
  default: ["[&+.border-medium.border-default]:ms-[calc(theme(borderWidth.medium)*-1)]"],
  primary: ["[&+.border-medium.border-primary]:ms-[calc(theme(borderWidth.medium)*-1)]"],
  secondary: ["[&+.border-medium.border-secondary]:ms-[calc(theme(borderWidth.medium)*-1)]"],
  success: ["[&+.border-medium.border-success]:ms-[calc(theme(borderWidth.medium)*-1)]"],
  warning: ["[&+.border-medium.border-warning]:ms-[calc(theme(borderWidth.medium)*-1)]"],
  danger: ["[&+.border-medium.border-danger]:ms-[calc(theme(borderWidth.medium)*-1)]"]
};

// src/utils/variants.ts
var solid = {
  default: "bg-default text-default-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  danger: "bg-danger text-danger-foreground",
  foreground: "bg-foreground text-background"
};
var shadow = {
  default: "shadow-lg shadow-default/50 bg-default text-default-foreground",
  primary: "shadow-lg shadow-primary/40 bg-primary text-primary-foreground",
  secondary: "shadow-lg shadow-secondary/40 bg-secondary text-secondary-foreground",
  success: "shadow-lg shadow-success/40 bg-success text-success-foreground",
  warning: "shadow-lg shadow-warning/40 bg-warning text-warning-foreground",
  danger: "shadow-lg shadow-danger/40 bg-danger text-danger-foreground",
  foreground: "shadow-lg shadow-foreground/40 bg-foreground text-background"
};
var bordered = {
  default: "bg-transparent border-default text-foreground",
  primary: "bg-transparent border-primary text-primary",
  secondary: "bg-transparent border-secondary text-secondary",
  success: "bg-transparent border-success text-success",
  warning: "bg-transparent border-warning text-warning",
  danger: "bg-transparent border-danger text-danger",
  foreground: "bg-transparent border-foreground text-foreground"
};
var flat = {
  default: "bg-default/40 text-default-foreground",
  primary: "bg-primary/20 text-primary",
  secondary: "bg-secondary/20 text-secondary",
  success: "bg-success/20 text-success-600 dark:text-success",
  warning: "bg-warning/20 text-warning-600 dark:text-warning",
  danger: "bg-danger/20 text-danger dark:text-danger-500",
  foreground: "bg-foreground/10 text-foreground"
};
var faded = {
  default: "border-default bg-default-100 text-default-foreground",
  primary: "border-default bg-default-100 text-primary",
  secondary: "border-default bg-default-100 text-secondary",
  success: "border-default bg-default-100 text-success",
  warning: "border-default bg-default-100 text-warning",
  danger: "border-default bg-default-100 text-danger",
  foreground: "border-default bg-default-100 text-foreground"
};
var light = {
  default: "bg-transparent text-default-foreground",
  primary: "bg-transparent text-primary",
  secondary: "bg-transparent text-secondary",
  success: "bg-transparent text-success",
  warning: "bg-transparent text-warning",
  danger: "bg-transparent text-danger",
  foreground: "bg-transparent text-foreground"
};
var ghost = {
  default: "border-default text-default-foreground hover:!bg-default",
  primary: "border-primary text-primary hover:!text-primary-foreground hover:!bg-primary",
  secondary: "border-secondary text-secondary hover:text-secondary-foreground hover:!bg-secondary",
  success: "border-success text-success hover:!text-success-foreground hover:!bg-success",
  warning: "border-warning text-warning hover:!text-warning-foreground hover:!bg-warning",
  danger: "border-danger text-danger hover:!text-danger-foreground hover:!bg-danger",
  foreground: "border-foreground text-foreground hover:!bg-foreground"
};
var colorVariants = {
  solid,
  shadow,
  bordered,
  flat,
  faded,
  light,
  ghost
};

// src/components/avatar.ts
var avatar = tv({
  slots: {
    base: [
      "flex",
      "relative",
      "justify-center",
      "items-center",
      "box-border",
      "overflow-hidden",
      "align-middle",
      "text-white",
      "z-0",
      ...dataFocusVisibleClasses
    ],
    img: [
      "flex",
      "object-cover",
      "w-full",
      "h-full",
      "transition-opacity",
      "!duration-500",
      "opacity-0",
      "data-[loaded=true]:opacity-100"
    ],
    fallback: [...translateCenterClasses, "flex", "items-center", "justify-center"],
    name: [...translateCenterClasses, "font-normal", "text-center", "text-inherit"],
    icon: [
      ...translateCenterClasses,
      "flex",
      "items-center",
      "justify-center",
      "text-inherit",
      "w-full",
      "h-full"
    ]
  },
  variants: {
    size: {
      sm: {
        base: "w-8 h-8 text-tiny"
      },
      md: {
        base: "w-10 h-10 text-tiny"
      },
      lg: {
        base: "w-14 h-14 text-small"
      }
    },
    color: {
      default: {
        base: colorVariants.solid.default
      },
      primary: {
        base: colorVariants.solid.primary
      },
      secondary: {
        base: colorVariants.solid.secondary
      },
      success: {
        base: colorVariants.solid.success
      },
      warning: {
        base: colorVariants.solid.warning
      },
      danger: {
        base: colorVariants.solid.danger
      }
    },
    radius: {
      none: {
        base: "rounded-none"
      },
      sm: {
        base: "rounded-small"
      },
      md: {
        base: "rounded-medium"
      },
      lg: {
        base: "rounded-large"
      },
      full: {
        base: "rounded-full"
      }
    },
    isBordered: {
      true: {
        base: "ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark"
      }
    },
    isDisabled: {
      true: {
        base: "opacity-disabled"
      }
    },
    isInGroup: {
      true: {
        base: [
          "-ms-2 data-[hover=true]:-translate-x-3 rtl:data-[hover=true]:translate-x-3 transition-transform",
          "data-[focus-visible=true]:-translate-x-3 rtl:data-[focus-visible=true]:translate-x-3"
        ]
      }
    },
    isInGridGroup: {
      true: {
        base: "m-0 data-[hover=true]:translate-x-0"
      }
    },
    disableAnimation: {
      true: {
        base: "transition-none",
        img: "transition-none"
      },
      false: {}
    }
  },
  defaultVariants: {
    size: "md",
    color: "default",
    radius: "full"
  },
  compoundVariants: [
    {
      color: "default",
      isBordered: true,
      class: {
        base: "ring-default"
      }
    },
    {
      color: "primary",
      isBordered: true,
      class: {
        base: "ring-primary"
      }
    },
    {
      color: "secondary",
      isBordered: true,
      class: {
        base: "ring-secondary"
      }
    },
    {
      color: "success",
      isBordered: true,
      class: {
        base: "ring-success"
      }
    },
    {
      color: "warning",
      isBordered: true,
      class: {
        base: "ring-warning"
      }
    },
    {
      color: "danger",
      isBordered: true,
      class: {
        base: "ring-danger"
      }
    }
  ]
});
var avatarGroup = tv({
  slots: {
    base: "flex items-center justify-center h-auto w-max",
    count: "hover:-translate-x-0"
  },
  variants: {
    isGrid: {
      true: "inline-grid grid-cols-4 gap-3"
    }
  }
});

// src/components/card.ts
var card = tv({
  slots: {
    base: [
      "flex",
      "flex-col",
      "relative",
      "overflow-hidden",
      "h-auto",
      "outline-none",
      "text-foreground",
      "box-border",
      "bg-content1",
      ...dataFocusVisibleClasses
    ],
    header: [
      "flex",
      "p-3",
      "z-10",
      "w-full",
      "justify-start",
      "items-center",
      "shrink-0",
      "overflow-inherit",
      "color-inherit",
      "subpixel-antialiased"
    ],
    body: [
      "relative",
      "flex",
      "flex-1",
      "w-full",
      "p-3",
      "flex-auto",
      "flex-col",
      "place-content-inherit",
      "align-items-inherit",
      "h-auto",
      "break-words",
      "text-left",
      "overflow-y-auto",
      "subpixel-antialiased"
    ],
    footer: [
      "p-3",
      "h-auto",
      "flex",
      "w-full",
      "items-center",
      "overflow-hidden",
      "color-inherit",
      "subpixel-antialiased"
    ]
  },
  variants: {
    shadow: {
      none: {
        base: "shadow-none"
      },
      sm: {
        base: "shadow-small"
      },
      md: {
        base: "shadow-medium"
      },
      lg: {
        base: "shadow-large"
      }
    },
    radius: {
      none: {
        base: "rounded-none",
        header: "rounded-none",
        footer: "rounded-none"
      },
      sm: {
        base: "rounded-small",
        header: "rounded-t-small",
        footer: "rounded-b-small"
      },
      md: {
        base: "rounded-medium",
        header: "rounded-t-medium",
        footer: "rounded-b-medium"
      },
      lg: {
        base: "rounded-large",
        header: "rounded-t-large",
        footer: "rounded-b-large"
      }
    },
    fullWidth: {
      true: {
        base: "w-full"
      }
    },
    isHoverable: {
      true: {
        base: "data-[hover=true]:bg-content2 dark:data-[hover=true]:bg-content2"
      }
    },
    isPressable: {
      true: { base: "cursor-pointer" }
    },
    isBlurred: {
      true: {
        base: [
          "bg-background/80",
          "dark:bg-background/20",
          "backdrop-blur-md",
          "backdrop-saturate-150"
        ]
      }
    },
    isFooterBlurred: {
      true: {
        footer: ["bg-background/10", "backdrop-blur", "backdrop-saturate-150"]
      }
    },
    isDisabled: {
      true: {
        base: "opacity-disabled cursor-not-allowed"
      }
    },
    disableAnimation: {
      true: "",
      false: { base: "transition-transform-background motion-reduce:transition-none" }
    }
  },
  compoundVariants: [
    {
      isPressable: true,
      class: "data-[pressed=true]:scale-[0.97] tap-highlight-transparent"
    }
  ],
  defaultVariants: {
    radius: "lg",
    shadow: "md",
    fullWidth: false,
    isHoverable: false,
    isPressable: false,
    isDisabled: false,
    isFooterBlurred: false
  }
});

// src/components/link.ts
var link = tv({
  base: [
    "relative inline-flex items-center outline-none tap-highlight-transparent",
    ...dataFocusVisibleClasses
  ],
  variants: {
    size: {
      sm: "text-small",
      md: "text-medium",
      lg: "text-large"
    },
    color: {
      foreground: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger"
    },
    underline: {
      none: "no-underline",
      hover: "hover:underline",
      always: "underline",
      active: "active:underline",
      focus: "focus:underline"
    },
    isBlock: {
      true: [
        "px-2",
        "py-1",
        "hover:after:opacity-100",
        "after:content-['']",
        "after:inset-0",
        "after:opacity-0",
        "after:w-full",
        "after:h-full",
        "after:rounded-xl",
        "after:transition-background",
        "after:absolute"
      ],
      false: "hover:opacity-80 active:opacity-disabled transition-opacity"
    },
    isDisabled: {
      true: "opacity-disabled cursor-default pointer-events-none"
    },
    disableAnimation: {
      true: "after:transition-none transition-none"
    }
  },
  compoundVariants: [
    {
      isBlock: true,
      color: "foreground",
      class: "hover:after:bg-foreground/10"
    },
    {
      isBlock: true,
      color: "primary",
      class: "hover:after:bg-primary/20"
    },
    {
      isBlock: true,
      color: "secondary",
      class: "hover:after:bg-secondary/20"
    },
    {
      isBlock: true,
      color: "success",
      class: "hover:after:bg-success/20"
    },
    {
      isBlock: true,
      color: "warning",
      class: "hover:after:bg-warning/20"
    },
    {
      isBlock: true,
      color: "danger",
      class: "hover:after:bg-danger/20"
    },
    {
      underline: ["hover", "always", "active", "focus"],
      class: "underline-offset-4"
    }
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
    isBlock: false,
    underline: "none",
    isDisabled: false
  }
});
var linkAnchorClasses = "flex mx-1 text-current self-center";

// src/components/user.ts
var user = tv({
  slots: {
    base: [
      "inline-flex items-center justify-center gap-2 rounded-small outline-none",
      ...dataFocusVisibleClasses
    ],
    wrapper: "inline-flex flex-col items-start",
    name: "text-small text-inherit",
    description: "text-tiny text-foreground-400"
  }
});

// src/components/button.ts
var button = tv({
  base: [
    "z-0",
    "group",
    "relative",
    "inline-flex",
    "items-center",
    "justify-center",
    "box-border",
    "appearance-none",
    "outline-none",
    "select-none",
    "whitespace-nowrap",
    "min-w-max",
    "font-normal",
    "subpixel-antialiased",
    "overflow-hidden",
    "tap-highlight-transparent",
    "data-[pressed=true]:scale-[0.97]",
    ...dataFocusVisibleClasses
  ],
  variants: {
    variant: {
      solid: "",
      bordered: "border-medium bg-transparent",
      light: "bg-transparent",
      flat: "",
      faded: "border-medium",
      shadow: "",
      ghost: "border-medium bg-transparent"
    },
    size: {
      sm: "px-3 min-w-16 h-8 text-tiny gap-2 rounded-small",
      md: "px-4 min-w-20 h-10 text-small gap-2 rounded-medium",
      lg: "px-6 min-w-24 h-12 text-medium gap-3 rounded-large"
    },
    color: {
      default: "",
      primary: "",
      secondary: "",
      success: "",
      warning: "",
      danger: ""
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-small",
      md: "rounded-medium",
      lg: "rounded-large",
      full: "rounded-full"
    },
    fullWidth: {
      true: "w-full"
    },
    isDisabled: {
      true: "opacity-disabled pointer-events-none"
    },
    isInGroup: {
      true: "[&:not(:first-child):not(:last-child)]:rounded-none"
    },
    isIconOnly: {
      true: "px-0 !gap-0",
      false: "[&>svg]:max-w-[theme(spacing.8)]"
    },
    disableAnimation: {
      true: "!transition-none data-[pressed=true]:scale-100",
      false: "transition-transform-colors-opacity motion-reduce:transition-none"
    }
  },
  defaultVariants: {
    size: "md",
    variant: "solid",
    color: "default",
    fullWidth: false,
    isDisabled: false,
    isInGroup: false
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "default",
      class: colorVariants.solid.default
    },
    {
      variant: "solid",
      color: "primary",
      class: colorVariants.solid.primary
    },
    {
      variant: "solid",
      color: "secondary",
      class: colorVariants.solid.secondary
    },
    {
      variant: "solid",
      color: "success",
      class: colorVariants.solid.success
    },
    {
      variant: "solid",
      color: "warning",
      class: colorVariants.solid.warning
    },
    {
      variant: "solid",
      color: "danger",
      class: colorVariants.solid.danger
    },
    {
      variant: "shadow",
      color: "default",
      class: colorVariants.shadow.default
    },
    {
      variant: "shadow",
      color: "primary",
      class: colorVariants.shadow.primary
    },
    {
      variant: "shadow",
      color: "secondary",
      class: colorVariants.shadow.secondary
    },
    {
      variant: "shadow",
      color: "success",
      class: colorVariants.shadow.success
    },
    {
      variant: "shadow",
      color: "warning",
      class: colorVariants.shadow.warning
    },
    {
      variant: "shadow",
      color: "danger",
      class: colorVariants.shadow.danger
    },
    {
      variant: "bordered",
      color: "default",
      class: colorVariants.bordered.default
    },
    {
      variant: "bordered",
      color: "primary",
      class: colorVariants.bordered.primary
    },
    {
      variant: "bordered",
      color: "secondary",
      class: colorVariants.bordered.secondary
    },
    {
      variant: "bordered",
      color: "success",
      class: colorVariants.bordered.success
    },
    {
      variant: "bordered",
      color: "warning",
      class: colorVariants.bordered.warning
    },
    {
      variant: "bordered",
      color: "danger",
      class: colorVariants.bordered.danger
    },
    {
      variant: "flat",
      color: "default",
      class: colorVariants.flat.default
    },
    {
      variant: "flat",
      color: "primary",
      class: colorVariants.flat.primary
    },
    {
      variant: "flat",
      color: "secondary",
      class: colorVariants.flat.secondary
    },
    {
      variant: "flat",
      color: "success",
      class: colorVariants.flat.success
    },
    {
      variant: "flat",
      color: "warning",
      class: colorVariants.flat.warning
    },
    {
      variant: "flat",
      color: "danger",
      class: colorVariants.flat.danger
    },
    {
      variant: "faded",
      color: "default",
      class: colorVariants.faded.default
    },
    {
      variant: "faded",
      color: "primary",
      class: colorVariants.faded.primary
    },
    {
      variant: "faded",
      color: "secondary",
      class: colorVariants.faded.secondary
    },
    {
      variant: "faded",
      color: "success",
      class: colorVariants.faded.success
    },
    {
      variant: "faded",
      color: "warning",
      class: colorVariants.faded.warning
    },
    {
      variant: "faded",
      color: "danger",
      class: colorVariants.faded.danger
    },
    {
      variant: "light",
      color: "default",
      class: [colorVariants.light.default, "data-[hover=true]:bg-default/40"]
    },
    {
      variant: "light",
      color: "primary",
      class: [colorVariants.light.primary, "data-[hover=true]:bg-primary/20"]
    },
    {
      variant: "light",
      color: "secondary",
      class: [colorVariants.light.secondary, "data-[hover=true]:bg-secondary/20"]
    },
    {
      variant: "light",
      color: "success",
      class: [colorVariants.light.success, "data-[hover=true]:bg-success/20"]
    },
    {
      variant: "light",
      color: "warning",
      class: [colorVariants.light.warning, "data-[hover=true]:bg-warning/20"]
    },
    {
      variant: "light",
      color: "danger",
      class: [colorVariants.light.danger, "data-[hover=true]:bg-danger/20"]
    },
    {
      variant: "ghost",
      color: "default",
      class: colorVariants.ghost.default
    },
    {
      variant: "ghost",
      color: "primary",
      class: colorVariants.ghost.primary
    },
    {
      variant: "ghost",
      color: "secondary",
      class: colorVariants.ghost.secondary
    },
    {
      variant: "ghost",
      color: "success",
      class: colorVariants.ghost.success
    },
    {
      variant: "ghost",
      color: "warning",
      class: colorVariants.ghost.warning
    },
    {
      variant: "ghost",
      color: "danger",
      class: colorVariants.ghost.danger
    },
    {
      isInGroup: true,
      class: "rounded-none first:rounded-s-medium last:rounded-e-medium"
    },
    {
      isInGroup: true,
      size: "sm",
      class: "rounded-none first:rounded-s-small last:rounded-e-small"
    },
    {
      isInGroup: true,
      size: "md",
      class: "rounded-none first:rounded-s-medium last:rounded-e-medium"
    },
    {
      isInGroup: true,
      size: "lg",
      class: "rounded-none first:rounded-s-large last:rounded-e-large"
    },
    {
      isInGroup: true,
      isRounded: true,
      class: "rounded-none first:rounded-s-full last:rounded-e-full"
    },
    {
      isInGroup: true,
      radius: "none",
      class: "rounded-none first:rounded-s-none last:rounded-e-none"
    },
    {
      isInGroup: true,
      radius: "sm",
      class: "rounded-none first:rounded-s-small last:rounded-e-small"
    },
    {
      isInGroup: true,
      radius: "md",
      class: "rounded-none first:rounded-s-medium last:rounded-e-medium"
    },
    {
      isInGroup: true,
      radius: "lg",
      class: "rounded-none first:rounded-s-large last:rounded-e-large"
    },
    {
      isInGroup: true,
      radius: "full",
      class: "rounded-none first:rounded-s-full last:rounded-e-full"
    },
    {
      isInGroup: true,
      variant: ["ghost", "bordered"],
      color: "default",
      className: collapseAdjacentVariantBorders.default
    },
    {
      isInGroup: true,
      variant: ["ghost", "bordered"],
      color: "primary",
      className: collapseAdjacentVariantBorders.primary
    },
    {
      isInGroup: true,
      variant: ["ghost", "bordered"],
      color: "secondary",
      className: collapseAdjacentVariantBorders.secondary
    },
    {
      isInGroup: true,
      variant: ["ghost", "bordered"],
      color: "success",
      className: collapseAdjacentVariantBorders.success
    },
    {
      isInGroup: true,
      variant: ["ghost", "bordered"],
      color: "warning",
      className: collapseAdjacentVariantBorders.warning
    },
    {
      isInGroup: true,
      variant: ["ghost", "bordered"],
      color: "danger",
      className: collapseAdjacentVariantBorders.danger
    },
    {
      isIconOnly: true,
      size: "sm",
      class: "min-w-8 w-8 h-8"
    },
    {
      isIconOnly: true,
      size: "md",
      class: "min-w-10 w-10 h-10"
    },
    {
      isIconOnly: true,
      size: "lg",
      class: "min-w-12 w-12 h-12"
    },
    {
      variant: ["solid", "faded", "flat", "bordered", "shadow"],
      class: "data-[hover=true]:opacity-hover"
    }
  ]
});
var buttonGroup = tv({
  base: "inline-flex items-center justify-center h-auto",
  variants: {
    fullWidth: {
      true: "w-full"
    }
  },
  defaultVariants: {
    fullWidth: false
  }
});

// src/components/drip.ts
var drip = tv({
  base: ["absolute", "will-change-transform", "bg-current", "rounded-full", "animate-drip-expand"]
});

// src/components/spinner.ts
var spinner = tv({
  slots: {
    base: "relative inline-flex flex-col gap-2 items-center justify-center",
    wrapper: "relative flex",
    circle1: [
      "absolute",
      "w-full",
      "h-full",
      "rounded-full",
      "animate-spinner-ease-spin",
      "border-2",
      "border-solid",
      "border-t-transparent",
      "border-l-transparent",
      "border-r-transparent"
    ],
    circle2: [
      "absolute",
      "w-full",
      "h-full",
      "rounded-full",
      "opacity-75",
      "animate-spinner-linear-spin",
      "border-2",
      "border-dotted",
      "border-t-transparent",
      "border-l-transparent",
      "border-r-transparent"
    ],
    label: "text-foreground dark:text-foreground-dark font-regular"
  },
  variants: {
    size: {
      sm: {
        wrapper: "w-5 h-5",
        circle1: "border-2",
        circle2: "border-2",
        label: "text-small"
      },
      md: {
        wrapper: "w-8 h-8",
        circle1: "border-3",
        circle2: "border-3",
        label: "text-medium"
      },
      lg: {
        wrapper: "w-10 h-10",
        circle1: "border-3",
        circle2: "border-3",
        label: "text-large"
      }
    },
    color: {
      current: {
        circle1: "border-b-current",
        circle2: "border-b-current"
      },
      white: {
        circle1: "border-b-white",
        circle2: "border-b-white"
      },
      default: {
        circle1: "border-b-default",
        circle2: "border-b-default"
      },
      primary: {
        circle1: "border-b-primary",
        circle2: "border-b-primary"
      },
      secondary: {
        circle1: "border-b-secondary",
        circle2: "border-b-secondary"
      },
      success: {
        circle1: "border-b-success",
        circle2: "border-b-success"
      },
      warning: {
        circle1: "border-b-warning",
        circle2: "border-b-warning"
      },
      danger: {
        circle1: "border-b-danger",
        circle2: "border-b-danger"
      }
    },
    labelColor: {
      foreground: {
        label: "text-foreground"
      },
      primary: {
        label: "text-primary"
      },
      secondary: {
        label: "text-secondary"
      },
      success: {
        label: "text-success"
      },
      warning: {
        label: "text-warning"
      },
      danger: {
        label: "text-danger"
      }
    }
  },
  defaultVariants: {
    size: "md",
    color: "primary",
    labelColor: "foreground"
  }
});

// src/components/code.ts
var code = tv({
  base: ["px-2", "py-1", "h-fit", "font-mono", "font-normal", "inline-block", "whitespace-nowrap"],
  variants: {
    color: {
      default: colorVariants.flat.default,
      primary: colorVariants.flat.primary,
      secondary: colorVariants.flat.secondary,
      success: colorVariants.flat.success,
      warning: colorVariants.flat.warning,
      danger: colorVariants.flat.danger
    },
    size: {
      sm: "text-small",
      md: "text-medium",
      lg: "text-large"
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-small",
      md: "rounded-medium",
      lg: "rounded-large",
      full: "rounded-full"
    }
  },
  defaultVariants: {
    color: "default",
    size: "sm",
    radius: "sm"
  }
});

// src/components/popover.ts
var popover = tv({
  slots: {
    base: [
      "z-0",
      "relative",
      "bg-transparent",
      "before:content-['']",
      "before:hidden",
      "before:z-[-1]",
      "before:absolute",
      "before:rotate-45",
      "before:w-2.5",
      "before:h-2.5",
      "before:rounded-sm",
      "data-[arrow=true]:before:block",
      "data-[placement=top]:before:-bottom-[calc(theme(spacing.5)/4_-_1.5px)]",
      "data-[placement=top]:before:left-1/2",
      "data-[placement=top]:before:-translate-x-1/2",
      "data-[placement=top-start]:before:-bottom-[calc(theme(spacing.5)/4_-_1.5px)]",
      "data-[placement=top-start]:before:left-3",
      "data-[placement=top-end]:before:-bottom-[calc(theme(spacing.5)/4_-_1.5px)]",
      "data-[placement=top-end]:before:right-3",
      "data-[placement=bottom]:before:-top-[calc(theme(spacing.5)/4_-_1.5px)]",
      "data-[placement=bottom]:before:left-1/2",
      "data-[placement=bottom]:before:-translate-x-1/2",
      "data-[placement=bottom-start]:before:-top-[calc(theme(spacing.5)/4_-_1.5px)]",
      "data-[placement=bottom-start]:before:left-3",
      "data-[placement=bottom-end]:before:-top-[calc(theme(spacing.5)/4_-_1.5px)]",
      "data-[placement=bottom-end]:before:right-3",
      "data-[placement=left]:before:-right-[calc(theme(spacing.5)/4_-_2px)]",
      "data-[placement=left]:before:top-1/2",
      "data-[placement=left]:before:-translate-y-1/2",
      "data-[placement=left-start]:before:-right-[calc(theme(spacing.5)/4_-_3px)]",
      "data-[placement=left-start]:before:top-1/4",
      "data-[placement=left-end]:before:-right-[calc(theme(spacing.5)/4_-_3px)]",
      "data-[placement=left-end]:before:bottom-1/4",
      "data-[placement=right]:before:-left-[calc(theme(spacing.5)/4_-_2px)]",
      "data-[placement=right]:before:top-1/2",
      "data-[placement=right]:before:-translate-y-1/2",
      "data-[placement=right-start]:before:-left-[calc(theme(spacing.5)/4_-_3px)]",
      "data-[placement=right-start]:before:top-1/4",
      "data-[placement=right-end]:before:-left-[calc(theme(spacing.5)/4_-_3px)]",
      "data-[placement=right-end]:before:bottom-1/4",
      ...dataFocusVisibleClasses
    ],
    content: [
      "z-10",
      "px-2.5",
      "py-1",
      "w-full",
      "inline-flex",
      "flex-col",
      "items-center",
      "justify-center",
      "box-border",
      "subpixel-antialiased",
      "outline-none",
      "box-border"
    ],
    trigger: ["z-10"],
    backdrop: ["hidden"],
    arrow: []
  },
  variants: {
    size: {
      sm: { content: "text-tiny" },
      md: { content: "text-small" },
      lg: { content: "text-medium" }
    },
    color: {
      default: {
        base: "before:bg-content1 before:shadow-small",
        content: "bg-content1"
      },
      foreground: {
        base: "before:bg-foreground",
        content: colorVariants.solid.foreground
      },
      primary: {
        base: "before:bg-primary",
        content: colorVariants.solid.primary
      },
      secondary: {
        base: "before:bg-secondary",
        content: colorVariants.solid.secondary
      },
      success: {
        base: "before:bg-success",
        content: colorVariants.solid.success
      },
      warning: {
        base: "before:bg-warning",
        content: colorVariants.solid.warning
      },
      danger: {
        base: "before:bg-danger",
        content: colorVariants.solid.danger
      }
    },
    radius: {
      none: { content: "rounded-none" },
      sm: { content: "rounded-small" },
      md: { content: "rounded-medium" },
      lg: { content: "rounded-large" },
      full: { content: "rounded-full" }
    },
    shadow: {
      sm: {
        content: "shadow-small"
      },
      md: {
        content: "shadow-medium"
      },
      lg: {
        content: "shadow-large"
      }
    },
    backdrop: {
      transparent: {},
      opaque: {
        backdrop: "bg-overlay/50 backdrop-opacity-disabled"
      },
      blur: {
        backdrop: "backdrop-blur-sm backdrop-saturate-150 bg-overlay/30"
      }
    },
    triggerScaleOnOpen: {
      true: {
        trigger: ["aria-expanded:scale-[0.97]", "aria-expanded:opacity-70", "subpixel-antialiased"]
      },
      false: {}
    },
    disableAnimation: {
      true: {
        base: "animate-none"
      }
    },
    isTriggerDisabled: {
      true: {
        trigger: "opacity-disabled pointer-events-none"
      },
      false: {}
    }
  },
  defaultVariants: {
    color: "default",
    radius: "lg",
    size: "md",
    shadow: "md",
    backdrop: "transparent",
    triggerScaleOnOpen: true
  },
  compoundVariants: [
    {
      backdrop: ["opaque", "blur"],
      class: {
        backdrop: "block w-full h-full fixed inset-0 -z-30"
      }
    }
  ]
});

// src/components/snippet.ts
var snippet = tv({
  slots: {
    base: "inline-flex items-center justify-between h-fit rounded-large gap-2",
    pre: "bg-transparent text-inherit font-mono font-normal inline-block whitespace-nowrap",
    content: "flex flex-col",
    symbol: "select-none",
    copyButton: [
      "group",
      "relative",
      "z-10",
      "text-large",
      "text-inherit",
      "data-[hover=true]:bg-transparent"
    ],
    copyIcon: [
      "absolute text-inherit opacity-100 scale-100 group-data-[copied=true]:opacity-0 group-data-[copied=true]:scale-50"
    ],
    checkIcon: [
      "absolute text-inherit opacity-0 scale-50 group-data-[copied=true]:opacity-100 group-data-[copied=true]:scale-100"
    ]
  },
  variants: {
    variant: {
      flat: "",
      solid: "",
      bordered: "border-medium bg-transparent",
      shadow: ""
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {}
    },
    size: {
      sm: {
        base: "px-1.5 py-0.5 text-tiny rounded-small"
      },
      md: {
        base: "px-3 py-1.5 text-small rounded-medium"
      },
      lg: {
        base: "px-4 py-2 text-medium rounded-large"
      }
    },
    radius: {
      none: {
        base: "rounded-none"
      },
      sm: {
        base: "rounded-small"
      },
      md: {
        base: "rounded-medium"
      },
      lg: {
        base: "rounded-large"
      }
    },
    fullWidth: {
      true: {
        base: "w-full"
      }
    },
    disableAnimation: {
      true: {},
      false: {
        copyIcon: "transition-transform-opacity",
        checkIcon: "transition-transform-opacity"
      }
    }
  },
  defaultVariants: {
    color: "default",
    variant: "flat",
    size: "md",
    fullWidth: false
  },
  compoundVariants: [
    {
      variant: ["solid", "shadow"],
      color: "default",
      class: {
        copyButton: "data-[focus-visible]:outline-default-foreground"
      }
    },
    {
      variant: ["solid", "shadow"],
      color: "primary",
      class: {
        copyButton: "data-[focus-visible]:outline-primary-foreground"
      }
    },
    {
      variant: ["solid", "shadow"],
      color: "secondary",
      class: {
        copyButton: "data-[focus-visible]:outline-secondary-foreground"
      }
    },
    {
      variant: ["solid", "shadow"],
      color: "success",
      class: {
        copyButton: "data-[focus-visible]:outline-success-foreground"
      }
    },
    {
      variant: ["solid", "shadow"],
      color: "warning",
      class: {
        copyButton: "data-[focus-visible]:outline-warning-foreground"
      }
    },
    {
      variant: ["solid", "shadow"],
      color: "danger",
      class: {
        copyButton: "data-[focus-visible]:outline-danger-foreground"
      }
    },
    {
      variant: "flat",
      color: "default",
      class: {
        base: colorVariants.flat.default
      }
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        base: colorVariants.flat.primary
      }
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: colorVariants.flat.secondary
      }
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: colorVariants.flat.success
      }
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: colorVariants.flat.warning
      }
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        base: colorVariants.flat.danger
      }
    },
    {
      variant: "solid",
      color: "default",
      class: {
        base: colorVariants.solid.default
      }
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        base: colorVariants.solid.primary
      }
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: colorVariants.solid.secondary
      }
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: colorVariants.solid.success
      }
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: colorVariants.solid.warning
      }
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        base: colorVariants.solid.danger
      }
    },
    {
      variant: "shadow",
      color: "default",
      class: {
        base: colorVariants.shadow.default
      }
    },
    {
      variant: "shadow",
      color: "primary",
      class: {
        base: colorVariants.shadow.primary
      }
    },
    {
      variant: "shadow",
      color: "secondary",
      class: {
        base: colorVariants.shadow.secondary
      }
    },
    {
      variant: "shadow",
      color: "success",
      class: {
        base: colorVariants.shadow.success
      }
    },
    {
      variant: "shadow",
      color: "warning",
      class: {
        base: colorVariants.shadow.warning
      }
    },
    {
      variant: "shadow",
      color: "danger",
      class: {
        base: colorVariants.shadow.danger
      }
    },
    {
      variant: "bordered",
      color: "default",
      class: {
        base: colorVariants.bordered.default
      }
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        base: colorVariants.bordered.primary
      }
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        base: colorVariants.bordered.secondary
      }
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        base: colorVariants.bordered.success
      }
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        base: colorVariants.bordered.warning
      }
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        base: colorVariants.bordered.danger
      }
    }
  ]
});

// src/components/chip.ts
var chip = tv({
  slots: {
    base: [
      "relative",
      "max-w-fit",
      "min-w-min",
      "inline-flex",
      "items-center",
      "justify-between",
      "box-border",
      "whitespace-nowrap"
    ],
    content: "flex-1 text-inherit font-normal",
    dot: ["w-2", "h-2", "ml-1", "rounded-full"],
    avatar: "flex-shrink-0",
    closeButton: [
      "z-10",
      "appearance-none",
      "outline-none",
      "select-none",
      "transition-opacity",
      "opacity-70",
      "hover:opacity-100",
      "cursor-pointer",
      "active:opacity-disabled",
      "tap-highlight-transparent"
    ]
  },
  variants: {
    variant: {
      solid: {},
      bordered: {
        base: "border-medium bg-transparent"
      },
      light: {
        base: "bg-transparent"
      },
      flat: {},
      faded: {
        base: "border-medium"
      },
      shadow: {},
      dot: {
        base: "border-medium border-default text-foreground bg-transparent"
      }
    },
    color: {
      default: {
        dot: "bg-default-400"
      },
      primary: {
        dot: "bg-primary"
      },
      secondary: {
        dot: "bg-secondary"
      },
      success: {
        dot: "bg-success"
      },
      warning: {
        dot: "bg-warning"
      },
      danger: {
        dot: "bg-danger"
      }
    },
    size: {
      sm: {
        base: "px-1 h-6 text-tiny",
        content: "px-1",
        closeButton: "text-medium",
        avatar: "w-4 h-4"
      },
      md: {
        base: "px-1 h-7 text-small",
        content: "px-2",
        closeButton: "text-large",
        avatar: "w-5 h-5"
      },
      lg: {
        base: "px-2 h-8 text-medium",
        content: "px-2",
        closeButton: "text-xl",
        avatar: "w-6 h-6"
      }
    },
    radius: {
      none: {
        base: "rounded-none"
      },
      sm: {
        base: "rounded-small"
      },
      md: {
        base: "rounded-medium"
      },
      lg: {
        base: "rounded-large"
      },
      full: {
        base: "rounded-full"
      }
    },
    isOneChar: {
      true: {},
      false: {}
    },
    isCloseable: {
      true: {},
      false: {}
    },
    hasStartContent: {
      true: {}
    },
    hasEndContent: {
      true: {}
    },
    isDisabled: {
      true: { base: "opacity-disabled pointer-events-none" }
    },
    isCloseButtonFocusVisible: {
      true: {
        closeButton: [...ringClasses, "ring-1", "rounded-full"]
      }
    }
  },
  defaultVariants: {
    variant: "solid",
    color: "default",
    size: "md",
    radius: "full",
    isDisabled: false
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "default",
      class: {
        base: colorVariants.solid.default
      }
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        base: colorVariants.solid.primary
      }
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: colorVariants.solid.secondary
      }
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: colorVariants.solid.success
      }
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: colorVariants.solid.warning
      }
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        base: colorVariants.solid.danger
      }
    },
    {
      variant: "shadow",
      color: "default",
      class: {
        base: colorVariants.shadow.default
      }
    },
    {
      variant: "shadow",
      color: "primary",
      class: {
        base: colorVariants.shadow.primary
      }
    },
    {
      variant: "shadow",
      color: "secondary",
      class: {
        base: colorVariants.shadow.secondary
      }
    },
    {
      variant: "shadow",
      color: "success",
      class: {
        base: colorVariants.shadow.success
      }
    },
    {
      variant: "shadow",
      color: "warning",
      class: {
        base: colorVariants.shadow.warning
      }
    },
    {
      variant: "shadow",
      color: "danger",
      class: {
        base: colorVariants.shadow.danger
      }
    },
    {
      variant: "bordered",
      color: "default",
      class: {
        base: colorVariants.bordered.default
      }
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        base: colorVariants.bordered.primary
      }
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        base: colorVariants.bordered.secondary
      }
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        base: colorVariants.bordered.success
      }
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        base: colorVariants.bordered.warning
      }
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        base: colorVariants.bordered.danger
      }
    },
    {
      variant: "flat",
      color: "default",
      class: {
        base: colorVariants.flat.default
      }
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        base: colorVariants.flat.primary
      }
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: colorVariants.flat.secondary
      }
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: colorVariants.flat.success
      }
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: colorVariants.flat.warning
      }
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        base: colorVariants.flat.danger
      }
    },
    {
      variant: "faded",
      color: "default",
      class: {
        base: colorVariants.faded.default
      }
    },
    {
      variant: "faded",
      color: "primary",
      class: {
        base: colorVariants.faded.primary
      }
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        base: colorVariants.faded.secondary
      }
    },
    {
      variant: "faded",
      color: "success",
      class: {
        base: colorVariants.faded.success
      }
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        base: colorVariants.faded.warning
      }
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        base: colorVariants.faded.danger
      }
    },
    {
      variant: "light",
      color: "default",
      class: {
        base: colorVariants.light.default
      }
    },
    {
      variant: "light",
      color: "primary",
      class: {
        base: colorVariants.light.primary
      }
    },
    {
      variant: "light",
      color: "secondary",
      class: {
        base: colorVariants.light.secondary
      }
    },
    {
      variant: "light",
      color: "success",
      class: {
        base: colorVariants.light.success
      }
    },
    {
      variant: "light",
      color: "warning",
      class: {
        base: colorVariants.light.warning
      }
    },
    {
      variant: "light",
      color: "danger",
      class: {
        base: colorVariants.light.danger
      }
    },
    {
      isOneChar: true,
      hasStartContent: false,
      hasEndContent: false,
      size: "sm",
      class: {
        base: "w-5 h-5 min-w-5 min-h-5"
      }
    },
    {
      isOneChar: true,
      hasStartContent: false,
      hasEndContent: false,
      size: "md",
      class: {
        base: "w-6 h-6 min-w-6 min-h-6"
      }
    },
    {
      isOneChar: true,
      hasStartContent: false,
      hasEndContent: false,
      size: "lg",
      class: {
        base: "w-7 h-7 min-w-7 min-h-7"
      }
    },
    {
      isOneChar: true,
      isCloseable: false,
      hasStartContent: false,
      hasEndContent: false,
      class: {
        base: "px-0 justify-center",
        content: "px-0 flex-none"
      }
    },
    {
      isOneChar: true,
      isCloseable: true,
      hasStartContent: false,
      hasEndContent: false,
      class: {
        base: "w-auto"
      }
    },
    {
      isOneChar: true,
      variant: "dot",
      class: {
        base: "w-auto h-7 px-1 items-center",
        content: "px-2"
      }
    },
    {
      hasStartContent: true,
      size: "sm",
      class: {
        content: "pl-0.5"
      }
    },
    {
      hasStartContent: true,
      size: ["md", "lg"],
      class: {
        content: "pl-1"
      }
    },
    {
      hasEndContent: true,
      size: "sm",
      class: {
        content: "pr-0.5"
      }
    },
    {
      hasEndContent: true,
      size: ["md", "lg"],
      class: {
        content: "pr-1"
      }
    }
  ]
});

// src/components/badge.ts
var badge = tv({
  slots: {
    base: ["relative", "inline-flex", "shrink-0"],
    badge: [
      "flex",
      "z-10",
      "flex-wrap",
      "absolute",
      "box-border",
      "rounded-full",
      "whitespace-nowrap",
      "place-content-center",
      "origin-center",
      "items-center",
      "text-inherit",
      "select-none",
      "font-regular",
      "scale-100",
      "opacity-100",
      "subpixel-antialiased",
      "data-[invisible=true]:scale-0",
      "data-[invisible=true]:opacity-0"
    ]
  },
  variants: {
    variant: {
      solid: {},
      flat: {},
      faded: {
        badge: "border-medium"
      },
      shadow: {}
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {}
    },
    size: {
      sm: {
        badge: "px-1 text-tiny"
      },
      md: {
        badge: "px-1 text-small"
      },
      lg: {
        badge: "px-1 text-small"
      }
    },
    placement: {
      "top-right": {},
      "top-left": {},
      "bottom-right": {},
      "bottom-left": {}
    },
    shape: {
      circle: {},
      rectangle: {}
    },
    isInvisible: {
      true: {}
    },
    isOneChar: {
      true: {
        badge: "px-0"
      }
    },
    isDot: {
      true: {}
    },
    disableAnimation: {
      true: {
        badge: "transition-none"
      },
      false: {
        badge: "transition-transform-opacity !ease-soft-spring !duration-300"
      }
    },
    showOutline: {
      true: {
        badge: "border-2 border-background"
      },
      false: {
        badge: "border-transparent border-0"
      }
    }
  },
  defaultVariants: {
    variant: "solid",
    color: "default",
    size: "md",
    shape: "rectangle",
    placement: "top-right",
    showOutline: true,
    isInvisible: false
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "default",
      class: {
        badge: colorVariants.solid.default
      }
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        badge: colorVariants.solid.primary
      }
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        badge: colorVariants.solid.secondary
      }
    },
    {
      variant: "solid",
      color: "success",
      class: {
        badge: colorVariants.solid.success
      }
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        badge: colorVariants.solid.warning
      }
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        badge: colorVariants.solid.danger
      }
    },
    {
      variant: "shadow",
      color: "default",
      class: {
        badge: colorVariants.shadow.default
      }
    },
    {
      variant: "shadow",
      color: "primary",
      class: {
        badge: colorVariants.shadow.primary
      }
    },
    {
      variant: "shadow",
      color: "secondary",
      class: {
        badge: colorVariants.shadow.secondary
      }
    },
    {
      variant: "shadow",
      color: "success",
      class: {
        badge: colorVariants.shadow.success
      }
    },
    {
      variant: "shadow",
      color: "warning",
      class: {
        badge: colorVariants.shadow.warning
      }
    },
    {
      variant: "shadow",
      color: "danger",
      class: {
        badge: colorVariants.shadow.danger
      }
    },
    {
      variant: "flat",
      color: "default",
      class: {
        badge: colorVariants.flat.default
      }
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        badge: colorVariants.flat.primary
      }
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        badge: colorVariants.flat.secondary
      }
    },
    {
      variant: "flat",
      color: "success",
      class: {
        badge: colorVariants.flat.success
      }
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        badge: colorVariants.flat.warning
      }
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        badge: colorVariants.flat.danger
      }
    },
    {
      variant: "faded",
      color: "default",
      class: {
        badge: colorVariants.faded.default
      }
    },
    {
      variant: "faded",
      color: "primary",
      class: {
        badge: colorVariants.faded.primary
      }
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        badge: colorVariants.faded.secondary
      }
    },
    {
      variant: "faded",
      color: "success",
      class: {
        badge: colorVariants.faded.success
      }
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        badge: colorVariants.faded.warning
      }
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        badge: colorVariants.faded.danger
      }
    },
    {
      isOneChar: true,
      size: "sm",
      class: {
        badge: "w-4 h-4 min-w-4 min-h-4"
      }
    },
    {
      isOneChar: true,
      size: "md",
      class: {
        badge: "w-5 h-5 min-w-5 min-h-5"
      }
    },
    {
      isOneChar: true,
      size: "lg",
      class: {
        badge: "w-6 h-6 min-w-6 min-h-6"
      }
    },
    {
      isDot: true,
      size: "sm",
      class: {
        badge: "w-3 h-3 min-w-3 min-h-3"
      }
    },
    {
      isDot: true,
      size: "md",
      class: {
        badge: "w-3.5 h-3.5 min-w-3.5 min-h-3.5"
      }
    },
    {
      isDot: true,
      size: "lg",
      class: {
        badge: "w-4 h-4 min-w-4 min-h-4"
      }
    },
    {
      placement: "top-right",
      shape: "rectangle",
      class: {
        badge: "top-[5%] right-[5%] translate-x-1/2 -translate-y-1/2"
      }
    },
    {
      placement: "top-left",
      shape: "rectangle",
      class: {
        badge: "top-[5%] left-[5%] -translate-x-1/2 -translate-y-1/2"
      }
    },
    {
      placement: "bottom-right",
      shape: "rectangle",
      class: {
        badge: "bottom-[5%] right-[5%] translate-x-1/2 translate-y-1/2"
      }
    },
    {
      placement: "bottom-left",
      shape: "rectangle",
      class: {
        badge: "bottom-[5%] left-[5%] -translate-x-1/2 translate-y-1/2"
      }
    },
    {
      placement: "top-right",
      shape: "circle",
      class: {
        badge: "top-[10%] right-[10%] translate-x-1/2 -translate-y-1/2"
      }
    },
    {
      placement: "top-left",
      shape: "circle",
      class: {
        badge: "top-[10%] left-[10%] -translate-x-1/2 -translate-y-1/2"
      }
    },
    {
      placement: "bottom-right",
      shape: "circle",
      class: {
        badge: "bottom-[10%] right-[10%] translate-x-1/2 translate-y-1/2"
      }
    },
    {
      placement: "bottom-left",
      shape: "circle",
      class: {
        badge: "bottom-[10%] left-[10%] -translate-x-1/2 translate-y-1/2"
      }
    }
  ]
});

// src/components/checkbox.ts
var checkbox = tv({
  slots: {
    base: "group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2",
    wrapper: [
      "relative",
      "inline-flex",
      "items-center",
      "justify-center",
      "flex-shrink-0",
      "overflow-hidden",
      "before:content-['']",
      "before:absolute",
      "before:inset-0",
      "before:border-solid",
      "before:border-2",
      "before:box-border",
      "before:border-default",
      "after:content-['']",
      "after:absolute",
      "after:inset-0",
      "after:scale-50",
      "after:opacity-0",
      "after:origin-center",
      "group-data-[selected=true]:after:scale-100",
      "group-data-[selected=true]:after:opacity-100",
      "group-data-[hover=true]:before:bg-default-100",
      ...groupDataFocusVisibleClasses
    ],
    icon: "z-10 w-4 h-3 opacity-0 group-data-[selected=true]:opacity-100",
    label: "relative text-foreground select-none"
  },
  variants: {
    color: {
      default: {
        wrapper: "after:bg-default after:text-default-foreground text-default-foreground"
      },
      primary: {
        wrapper: "after:bg-primary after:text-primary-foreground text-primary-foreground"
      },
      secondary: {
        wrapper: "after:bg-secondary after:text-secondary-foreground text-secondary-foreground"
      },
      success: {
        wrapper: "after:bg-success after:text-success-foreground text-success-foreground"
      },
      warning: {
        wrapper: "after:bg-warning after:text-warning-foreground text-warning-foreground"
      },
      danger: {
        wrapper: "after:bg-danger after:text-danger-foreground text-danger-foreground"
      }
    },
    size: {
      sm: {
        wrapper: [
          "w-4 h-4 mr-2 rtl:ml-2 rtl:mr-[unset]",
          "rounded-[calc(theme(borderRadius.medium)*0.5)]",
          "before:rounded-[calc(theme(borderRadius.medium)*0.5)]",
          "after:rounded-[calc(theme(borderRadius.medium)*0.5)]"
        ],
        label: "text-small",
        icon: "w-3 h-2"
      },
      md: {
        wrapper: [
          "w-5 h-5 mr-2 rtl:ml-2 rtl:mr-[unset]",
          "rounded-[calc(theme(borderRadius.medium)*0.6)]",
          "before:rounded-[calc(theme(borderRadius.medium)*0.6)]",
          "after:rounded-[calc(theme(borderRadius.medium)*0.6)]"
        ],
        label: "text-medium",
        icon: "w-4 h-3"
      },
      lg: {
        wrapper: [
          "w-6 h-6 mr-2 rtl:ml-2 rtl:mr-[unset]",
          "rounded-[calc(theme(borderRadius.medium)*0.7)]",
          "before:rounded-[calc(theme(borderRadius.medium)*0.7)]",
          "after:rounded-[calc(theme(borderRadius.medium)*0.7)]"
        ],
        label: "text-large",
        icon: "w-5 h-4"
      }
    },
    radius: {
      none: {
        wrapper: "rounded-none before:rounded-none after:rounded-none"
      },
      sm: {
        wrapper: [
          "rounded-[calc(theme(borderRadius.medium)*0.5)]",
          "before:rounded-[calc(theme(borderRadius.medium)*0.5)]",
          "after:rounded-[calc(theme(borderRadius.medium)*0.5)]"
        ]
      },
      md: {
        wrapper: [
          "rounded-[calc(theme(borderRadius.medium)*0.6)]",
          "before:rounded-[calc(theme(borderRadius.medium)*0.6)]",
          "after:rounded-[calc(theme(borderRadius.medium)*0.6)]"
        ]
      },
      lg: {
        wrapper: [
          "rounded-[calc(theme(borderRadius.medium)*0.7)]",
          "before:rounded-[calc(theme(borderRadius.medium)*0.7)]",
          "after:rounded-[calc(theme(borderRadius.medium)*0.7)]"
        ]
      },
      full: {
        wrapper: "rounded-full before:rounded-full after:rounded-full"
      }
    },
    lineThrough: {
      true: {
        label: [
          "inline-flex",
          "items-center",
          "justify-center",
          "before:content-['']",
          "before:absolute",
          "before:bg-foreground",
          "before:w-0",
          "before:h-0.5",
          "group-data-[selected=true]:opacity-60",
          "group-data-[selected=true]:before:w-full"
        ]
      }
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none"
      }
    },
    isInvalid: {
      true: {
        wrapper: "before:border-danger",
        label: "text-danger"
      }
    },
    disableAnimation: {
      true: {
        wrapper: "transition-none",
        icon: "transition-none",
        label: "transition-none"
      },
      false: {
        wrapper: [
          "before:transition-colors",
          "group-data-[pressed=true]:scale-95",
          "transition-transform",
          "after:transition-transform-opacity",
          "after:!ease-linear",
          "after:!duration-200",
          "motion-reduce:transition-none"
        ],
        icon: "transition-opacity motion-reduce:transition-none",
        label: "transition-colors-opacity before:transition-width motion-reduce:transition-none"
      }
    }
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    isDisabled: false,
    lineThrough: false
  }
});
var checkboxGroup = tv({
  slots: {
    base: "relative flex flex-col gap-2",
    label: "relative text-medium text-foreground-500",
    wrapper: "flex flex-col flex-wrap gap-2 data-[orientation=horizontal]:flex-row",
    description: "text-small text-foreground-400",
    errorMessage: "text-small text-danger"
  },
  variants: {
    isRequired: {
      true: {
        label: "after:content-['*'] after:text-danger after:ml-0.5"
      }
    },
    isInvalid: {
      true: {
        description: "text-danger"
      }
    },
    disableAnimation: {
      true: {},
      false: {
        description: "transition-colors !duration-150 motion-reduce:transition-none"
      }
    }
  },
  defaultVariants: {
    isInvalid: false,
    isRequired: false
  }
});

// src/components/radio.ts
var radio = tv({
  slots: {
    base: "group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2",
    wrapper: [
      "relative",
      "inline-flex",
      "items-center",
      "justify-center",
      "flex-shrink-0",
      "overflow-hidden",
      "border-solid",
      "border-medium",
      "box-border",
      "border-default",
      "rounded-full",
      "group-data-[hover-unselected=true]:bg-default-100",
      ...groupDataFocusVisibleClasses
    ],
    labelWrapper: "flex flex-col ml-1",
    control: [
      "z-10",
      "w-2",
      "h-2",
      "opacity-0",
      "scale-0",
      "origin-center",
      "rounded-full",
      "group-data-[selected=true]:opacity-100",
      "group-data-[selected=true]:scale-100"
    ],
    label: "relative text-foreground select-none",
    description: "relative text-foreground-400"
  },
  variants: {
    color: {
      default: {
        control: "bg-default-500 text-default-foreground",
        wrapper: "group-data-[selected=true]:border-default-500"
      },
      primary: {
        control: "bg-primary text-primary-foreground",
        wrapper: "group-data-[selected=true]:border-primary"
      },
      secondary: {
        control: "bg-secondary text-secondary-foreground",
        wrapper: "group-data-[selected=true]:border-secondary"
      },
      success: {
        control: "bg-success text-success-foreground",
        wrapper: "group-data-[selected=true]:border-success"
      },
      warning: {
        control: "bg-warning text-warning-foreground",
        wrapper: "group-data-[selected=true]:border-warning"
      },
      danger: {
        control: "bg-danger text-danger-foreground",
        wrapper: "group-data-[selected=true]:border-danger"
      }
    },
    size: {
      sm: {
        wrapper: "w-4 h-4",
        control: "w-1.5 h-1.5",
        labelWrapper: "ml-1",
        label: "text-small",
        description: "text-tiny"
      },
      md: {
        wrapper: "w-5 h-5",
        control: "w-2 h-2",
        labelWrapper: "ml-2 rtl:mr-2 rtl:ml-[unset]",
        label: "text-medium",
        description: "text-small"
      },
      lg: {
        wrapper: "w-6 h-6",
        control: "w-2.5 h-2.5",
        labelWrapper: "ml-2 rtl:mr-2 rtl:ml-[unset]",
        label: "text-large",
        description: "text-medium"
      }
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none"
      }
    },
    isInvalid: {
      true: {
        control: "bg-danger text-danger-foreground",
        wrapper: "border-danger group-data-[selected=true]:border-danger",
        label: "text-danger",
        description: "text-danger-300"
      }
    },
    disableAnimation: {
      true: {},
      false: {
        wrapper: [
          "group-data-[pressed=true]:scale-95",
          "transition-transform-colors",
          "motion-reduce:transition-none"
        ],
        control: "transition-transform-opacity motion-reduce:transition-none",
        label: "transition-colors motion-reduce:transition-none",
        description: "transition-colors motion-reduce:transition-none"
      }
    }
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    isDisabled: false,
    isInvalid: false
  }
});
var radioGroup = tv({
  slots: {
    base: "relative flex flex-col gap-2",
    label: "relative text-foreground-500",
    wrapper: "flex flex-col flex-wrap gap-2 data-[orientation=horizontal]:flex-row",
    description: "text-tiny text-foreground-400",
    errorMessage: "text-tiny text-danger"
  },
  variants: {
    isRequired: {
      true: {
        label: "after:content-['*'] after:text-danger after:ml-0.5"
      }
    },
    isInvalid: {
      true: {
        description: "text-danger"
      }
    },
    disableAnimation: {
      true: {},
      false: {
        description: "transition-colors !duration-150 motion-reduce:transition-none"
      }
    }
  },
  defaultVariants: {
    isInvalid: false,
    isRequired: false
  }
});

// src/components/pagination.ts
var pagination = tv({
  slots: {
    base: ["p-2.5", "-m-2.5", "overflow-x-scroll", "scrollbar-hide"],
    wrapper: [
      "flex",
      "flex-nowrap",
      "h-fit",
      "max-w-fit",
      "relative",
      "gap-1",
      "items-center",
      "overflow-visible"
    ],
    item: ["tap-highlight-transparent", "select-none", "touch-none"],
    prev: "",
    next: "",
    cursor: [
      "absolute",
      "flex",
      "overflow-visible",
      "items-center",
      "justify-center",
      "origin-center",
      "left-0",
      "select-none",
      "touch-none",
      "pointer-events-none",
      "z-20"
    ],
    forwardIcon: "hidden group-hover:block group-data-[focus-visible=true]:block data-[before=true]:rotate-180",
    ellipsis: "group-hover:hidden group-data-[focus-visible=true]:hidden",
    chevronNext: "rotate-180"
  },
  variants: {
    variant: {
      bordered: {
        item: [
          "border-medium",
          "border-default",
          "bg-transparent",
          "data-[hover=true]:bg-default-100"
        ]
      },
      light: {
        item: "bg-transparent"
      },
      flat: {},
      faded: {
        item: ["border-medium", "border-default"]
      }
    },
    color: {
      default: {
        cursor: colorVariants.solid.default
      },
      primary: {
        cursor: colorVariants.solid.primary
      },
      secondary: {
        cursor: colorVariants.solid.secondary
      },
      success: {
        cursor: colorVariants.solid.success
      },
      warning: {
        cursor: colorVariants.solid.warning
      },
      danger: {
        cursor: colorVariants.solid.danger
      }
    },
    size: {
      sm: {},
      md: {},
      lg: {}
    },
    radius: {
      none: {},
      sm: {},
      md: {},
      lg: {},
      full: {}
    },
    isCompact: {
      true: {
        wrapper: "gap-0 shadow-sm",
        item: [
          "shadow-none",
          "first-of-type:rounded-r-none",
          "last-of-type:rounded-l-none",
          "[&:not(:first-of-type):not(:last-of-type)]:rounded-none"
        ],
        prev: "!rounded-r-none",
        next: "!rounded-l-none"
      }
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none"
      }
    },
    showShadow: {
      true: {}
    },
    disableCursorAnimation: {
      true: {
        cursor: "hidden"
      }
    },
    disableAnimation: {
      true: {
        item: "transition-none",
        cursor: "transition-none"
      },
      false: {
        item: ["data-[pressed=true]:scale-[0.97]", "transition-transform-background"],
        cursor: [
          "data-[moving=true]:transition-transform",
          "!data-[moving=true]:duration-300",
          "opacity-0",
          "data-[moving]:opacity-100"
        ]
      }
    }
  },
  defaultVariants: {
    variant: "flat",
    color: "primary",
    size: "md",
    radius: "md",
    isCompact: false,
    isDisabled: false,
    showShadow: false,
    disableCursorAnimation: false
  },
  compoundVariants: [
    {
      showShadow: true,
      color: "default",
      class: {
        cursor: [colorVariants.shadow.default, "shadow-md"]
      }
    },
    {
      showShadow: true,
      color: "primary",
      class: {
        cursor: [colorVariants.shadow.primary, "shadow-md"]
      }
    },
    {
      showShadow: true,
      color: "secondary",
      class: {
        cursor: [colorVariants.shadow.secondary, "shadow-md"]
      }
    },
    {
      showShadow: true,
      color: "success",
      class: {
        cursor: [colorVariants.shadow.success, "shadow-md"]
      }
    },
    {
      showShadow: true,
      color: "warning",
      class: {
        cursor: [colorVariants.shadow.warning, "shadow-md"]
      }
    },
    {
      showShadow: true,
      color: "danger",
      class: {
        cursor: [colorVariants.shadow.danger, "shadow-md"]
      }
    },
    {
      isCompact: true,
      variant: "bordered",
      class: {
        item: "[&:not(:first-of-type)]:ml-[calc(theme(borderWidth.2)*-1)]"
      }
    },
    {
      disableCursorAnimation: true,
      color: "default",
      class: {
        item: [
          "data-[active=true]:bg-default-400",
          "data-[active=true]:border-default-400",
          "data-[active=true]:text-default-foreground"
        ]
      }
    },
    {
      disableCursorAnimation: true,
      color: "primary",
      class: {
        item: [
          "data-[active=true]:bg-primary",
          "data-[active=true]:border-primary",
          "data-[active=true]:text-primary-foreground"
        ]
      }
    },
    {
      disableCursorAnimation: true,
      color: "secondary",
      class: {
        item: [
          "data-[active=true]:bg-secondary",
          "data-[active=true]:border-secondary",
          "data-[active=true]:text-secondary-foreground"
        ]
      }
    },
    {
      disableCursorAnimation: true,
      color: "success",
      class: {
        item: [
          "data-[active=true]:bg-success",
          "data-[active=true]:border-success",
          "data-[active=true]:text-success-foreground"
        ]
      }
    },
    {
      disableCursorAnimation: true,
      color: "warning",
      class: {
        item: [
          "data-[active=true]:bg-warning",
          "data-[active=true]:border-warning",
          "data-[active=true]:text-warning-foreground"
        ]
      }
    },
    {
      disableCursorAnimation: true,
      color: "danger",
      class: {
        item: [
          "data-[active=true]:bg-danger",
          "data-[active=true]:border-danger",
          "data-[active=true]:text-danger-foreground"
        ]
      }
    },
    {
      disableCursorAnimation: true,
      showShadow: true,
      color: "default",
      class: {
        item: ["data-[active=true]:shadow-md", "data-[active=true]:shadow-default/50"]
      }
    },
    {
      disableCursorAnimation: true,
      showShadow: true,
      color: "primary",
      class: {
        item: ["data-[active=true]:shadow-md", "data-[active=true]:shadow-primary/40"]
      }
    },
    {
      disableCursorAnimation: true,
      showShadow: true,
      color: "secondary",
      class: {
        item: ["data-[active=true]:shadow-md", "data-[active=true]:shadow-secondary/40"]
      }
    },
    {
      disableCursorAnimation: true,
      showShadow: true,
      color: "success",
      class: {
        item: ["data-[active=true]:shadow-md", "data-[active=true]:shadow-success/40"]
      }
    },
    {
      disableCursorAnimation: true,
      showShadow: true,
      color: "warning",
      class: {
        item: ["data-[active=true]:shadow-md", "data-[active=true]:shadow-warning/40"]
      }
    },
    {
      disableCursorAnimation: true,
      showShadow: true,
      color: "danger",
      class: {
        item: ["data-[active=true]:shadow-md", "data-[active=true]:shadow-danger/40"]
      }
    }
  ],
  compoundSlots: [
    {
      slots: ["item", "prev", "next"],
      class: [
        "flex",
        "flex-wrap",
        "truncate",
        "box-border",
        "outline-none",
        "items-center",
        "justify-center",
        "text-default-foreground",
        ...dataFocusVisibleClasses,
        "data-[disabled=true]:text-default-300",
        "data-[disabled=true]:pointer-events-none"
      ]
    },
    {
      slots: ["item", "prev", "next"],
      variant: ["flat", "bordered", "faded"],
      class: ["shadow-sm"]
    },
    {
      slots: ["item", "prev", "next"],
      variant: "flat",
      class: [
        "bg-default-100",
        "[&[data-hover=true]:not([data-active=true])]:bg-default-200",
        "active:bg-default-300"
      ]
    },
    {
      slots: ["item", "prev", "next"],
      variant: "faded",
      class: [
        "bg-default-50",
        "[&[data-hover=true]:not([data-active=true])]:bg-default-100",
        "active:bg-default-200"
      ]
    },
    {
      slots: ["item", "prev", "next"],
      variant: "light",
      class: [
        "[&[data-hover=true]:not([data-active=true])]:bg-default-100",
        "active:bg-default-200"
      ]
    },
    {
      slots: ["item", "cursor", "prev", "next"],
      size: "sm",
      class: "min-w-8 w-8 h-8 text-tiny"
    },
    {
      slots: ["item", "cursor", "prev", "next"],
      size: "md",
      class: "min-w-9 w-9 h-9 text-small"
    },
    {
      slots: ["item", "cursor", "prev", "next"],
      size: "lg",
      class: "min-w-10 w-10 h-10 text-medium"
    },
    {
      slots: ["wrapper", "item", "cursor", "prev", "next"],
      radius: "none",
      class: "rounded-none"
    },
    {
      slots: ["wrapper", "item", "cursor", "prev", "next"],
      radius: "sm",
      class: "rounded-small"
    },
    {
      slots: ["wrapper", "item", "cursor", "prev", "next"],
      radius: "md",
      class: "rounded-medium"
    },
    {
      slots: ["wrapper", "item", "cursor", "prev", "next"],
      radius: "lg",
      class: "rounded-large"
    },
    {
      slots: ["wrapper", "item", "cursor", "prev", "next"],
      radius: "full",
      class: "rounded-full"
    }
  ]
});

// src/components/toggle.ts
var toggle = tv({
  slots: {
    base: "group relative max-w-fit inline-flex items-center justify-start cursor-pointer touch-none tap-highlight-transparent",
    wrapper: [
      "px-1",
      "relative",
      "inline-flex",
      "items-center",
      "justify-start",
      "flex-shrink-0",
      "overflow-hidden",
      "bg-default-200",
      "rounded-full",
      ...groupDataFocusVisibleClasses
    ],
    thumb: [
      "z-10",
      "flex",
      "items-center",
      "justify-center",
      "bg-white",
      "shadow-small",
      "rounded-full",
      "origin-right"
    ],
    startContent: "z-0 absolute left-1.5 rtl:right-1.5 rtl:left-[unset] text-current",
    endContent: "z-0 absolute right-1.5 rtl:left-1.5 rtl:right-[unset] text-default-600",
    thumbIcon: "text-black",
    label: "relative text-foreground select-none"
  },
  variants: {
    color: {
      default: {
        wrapper: [
          "group-data-[selected=true]:bg-default-400",
          "group-data-[selected=true]:text-default-foreground"
        ]
      },
      primary: {
        wrapper: [
          "group-data-[selected=true]:bg-primary",
          "group-data-[selected=true]:text-primary-foreground"
        ]
      },
      secondary: {
        wrapper: [
          "group-data-[selected=true]:bg-secondary",
          "group-data-[selected=true]:text-secondary-foreground"
        ]
      },
      success: {
        wrapper: [
          "group-data-[selected=true]:bg-success",
          "group-data-[selected=true]:text-success-foreground"
        ]
      },
      warning: {
        wrapper: [
          "group-data-[selected=true]:bg-warning",
          "group-data-[selected=true]:text-warning-foreground"
        ]
      },
      danger: {
        wrapper: [
          "group-data-[selected=true]:bg-danger",
          "data-[selected=true]:text-danger-foreground"
        ]
      }
    },
    size: {
      sm: {
        wrapper: "w-10 h-6 mr-2 rtl:ml-2 rtl:mr-[unset]",
        thumb: [
          "w-4 h-4 text-tiny",
          "group-data-[selected=true]:ml-4 rtl:group-data-[selected=true]:ml-0 rtl:group-data-[selected=true]:mr-4"
        ],
        endContent: "text-tiny",
        startContent: "text-tiny",
        label: "text-small"
      },
      md: {
        wrapper: "w-12 h-7 mr-2 rtl:ml-2 rtl:mr-[unset]",
        thumb: [
          "w-5 h-5 text-small",
          "group-data-[selected=true]:ml-5 rtl:group-data-[selected=true]:ml-0 rtl:group-data-[selected=true]:mr-5"
        ],
        endContent: "text-small",
        startContent: "text-small",
        label: "text-medium"
      },
      lg: {
        wrapper: "w-14 h-8 mr-2 rtl:ml-2 rtl:mr-[unset]",
        thumb: [
          "w-6 h-6 text-medium",
          "group-data-[selected=true]:ml-6 rtl:group-data-[selected=true]:ml-0 rtl:group-data-[selected=true]:mr-6"
        ],
        endContent: "text-medium",
        startContent: "text-medium",
        label: "text-large"
      }
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none"
      }
    },
    disableAnimation: {
      true: {
        wrapper: "transition-none",
        thumb: "transition-none"
      },
      false: {
        wrapper: "transition-background",
        thumb: "transition-all",
        startContent: [
          "opacity-0",
          "scale-50",
          "transition-transform-opacity",
          "group-data-[selected=true]:scale-100",
          "group-data-[selected=true]:opacity-100"
        ],
        endContent: [
          "opacity-100",
          "transition-transform-opacity",
          "group-data-[selected=true]:translate-x-3",
          "group-data-[selected=true]:opacity-0"
        ]
      }
    }
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    isDisabled: false
  },
  compoundVariants: [
    {
      disableAnimation: false,
      size: "sm",
      class: {
        thumb: ["group-data-[pressed=true]:w-5", "group-data-[selected]:group-data-[pressed]:ml-3"]
      }
    },
    {
      disableAnimation: false,
      size: "md",
      class: {
        thumb: ["group-data-[pressed=true]:w-6", "group-data-[selected]:group-data-[pressed]:ml-4"]
      }
    },
    {
      disableAnimation: false,
      size: "lg",
      class: {
        thumb: ["group-data-[pressed=true]:w-7", "group-data-[selected]:group-data-[pressed]:ml-5"]
      }
    }
  ]
});

// src/components/accordion.ts
var accordion = tv({
  base: "px-2",
  variants: {
    variant: {
      light: "",
      shadow: "px-4 shadow-medium rounded-medium bg-content1",
      bordered: "px-4 border-medium border-divider rounded-medium",
      splitted: "flex flex-col gap-2"
    },
    fullWidth: {
      true: "w-full"
    }
  },
  defaultVariants: {
    variant: "light",
    fullWidth: true
  }
});
var accordionItem = tv({
  slots: {
    base: "",
    heading: "",
    trigger: [
      "flex py-4 w-full h-full gap-3 outline-none items-center tap-highlight-transparent",
      ...dataFocusVisibleClasses
    ],
    startContent: "flex-shrink-0",
    indicator: "text-default-400",
    titleWrapper: "flex-1 flex flex-col text-start",
    title: "text-foreground text-large",
    subtitle: "text-small text-foreground-500 font-normal",
    content: "py-2"
  },
  variants: {
    variant: {
      splitted: {
        base: "px-4 bg-content1 shadow-medium rounded-medium"
      }
    },
    isCompact: {
      true: {
        trigger: "py-2",
        title: "text-medium",
        subtitle: "text-small",
        indicator: "text-medium",
        content: "py-1"
      }
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none"
      }
    },
    hideIndicator: {
      true: {
        indicator: "hidden"
      }
    },
    disableAnimation: {
      true: {
        content: "hidden data-[open=true]:block"
      },
      false: {
        indicator: "transition-transform",
        trigger: "transition-opacity"
      }
    },
    disableIndicatorAnimation: {
      true: {
        indicator: "transition-none"
      },
      false: {
        indicator: "rotate-0 data-[open=true]:-rotate-90 rtl:-rotate-180 rtl:data-[open=true]:-rotate-90"
      }
    }
  },
  defaultVariants: {
    size: "md",
    radius: "lg",
    isDisabled: false,
    hideIndicator: false,
    disableIndicatorAnimation: false
  }
});

// src/components/progress.ts
var progress = tv(
  {
    slots: {
      base: "flex flex-col gap-2 w-full",
      label: "",
      labelWrapper: "flex justify-between",
      value: "",
      track: "z-0 relative bg-default-300/50 overflow-hidden",
      indicator: "h-full"
    },
    variants: {
      color: {
        default: {
          indicator: "bg-default-400"
        },
        primary: {
          indicator: "bg-primary"
        },
        secondary: {
          indicator: "bg-secondary"
        },
        success: {
          indicator: "bg-success"
        },
        warning: {
          indicator: "bg-warning"
        },
        danger: {
          indicator: "bg-danger"
        }
      },
      size: {
        sm: {
          label: "text-small",
          value: "text-small",
          track: "h-1"
        },
        md: {
          label: "text-medium",
          value: "text-medium",
          track: "h-3"
        },
        lg: {
          label: "text-large",
          value: "text-large",
          track: "h-5"
        }
      },
      radius: {
        none: {
          track: "rounded-none",
          indicator: "rounded-none"
        },
        sm: {
          track: "rounded-small",
          indicator: "rounded-small"
        },
        md: {
          track: "rounded-medium",
          indicator: "rounded-medium"
        },
        lg: {
          track: "rounded-large",
          indicator: "rounded-large"
        },
        full: {
          track: "rounded-full",
          indicator: "rounded-full"
        }
      },
      isStriped: {
        true: {
          indicator: "bg-stripe-gradient bg-[length:1.25rem_1.25rem]"
        }
      },
      isIndeterminate: {
        true: {
          indicator: ["absolute", "w-full", "origin-left", "animate-indeterminate-bar"]
        }
      },
      isDisabled: {
        true: {
          base: "opacity-disabled cursor-not-allowed"
        }
      },
      disableAnimation: {
        true: {},
        false: {
          indicator: "transition-transform !duration-500"
        }
      }
    },
    defaultVariants: {
      color: "primary",
      size: "md",
      radius: "full",
      isStriped: false,
      isIndeterminate: false,
      isDisabled: false
    },
    compoundVariants: [
      {
        disableAnimation: true,
        isIndeterminate: false,
        class: {
          indicator: "!transition-none motion-reduce:transition-none"
        }
      }
    ]
  },
  {
    twMerge: true
  }
);

// src/components/circular-progress.ts
var circularProgress = tv({
  slots: {
    base: "flex flex-col justify-center gap-1 max-w-fit items-center",
    label: "",
    svgWrapper: "relative block",
    svg: "z-0 relative overflow-hidden",
    track: "h-full stroke-default-300/50",
    indicator: "h-full stroke-current",
    value: "absolute font-normal inset-0 flex items-center justify-center"
  },
  variants: {
    color: {
      default: {
        svg: "text-default-400"
      },
      primary: {
        svg: "text-primary"
      },
      secondary: {
        svg: "text-secondary"
      },
      success: {
        svg: "text-success"
      },
      warning: {
        svg: "text-warning"
      },
      danger: {
        svg: "text-danger"
      }
    },
    size: {
      sm: {
        svg: "w-8 h-8",
        label: "text-small",
        value: "text-[0.5rem]"
      },
      md: {
        svg: "w-10 h-10",
        label: "text-small",
        value: "text-[0.55rem]"
      },
      lg: {
        svg: "w-12 h-12",
        label: "text-medium",
        value: "text-[0.6rem]"
      }
    },
    isIndeterminate: {
      true: {
        svg: "animate-spinner-ease-spin"
      }
    },
    isDisabled: {
      true: {
        base: "opacity-disabled cursor-not-allowed"
      }
    },
    disableAnimation: {
      true: {},
      false: {
        indicator: "transition-all !duration-500"
      }
    }
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    isDisabled: false
  },
  compoundVariants: [
    {
      disableAnimation: true,
      isIndeterminate: false,
      class: {
        svg: "!transition-none motion-reduce:transition-none"
      }
    }
  ]
});

// src/components/input.ts
var input = tv({
  slots: {
    base: "group flex flex-col data-[hidden=true]:hidden",
    label: [
      "absolute",
      "z-10",
      "pointer-events-none",
      "origin-top-left",
      "rtl:origin-top-right",
      "subpixel-antialiased",
      "block",
      "text-small",
      "text-foreground-500"
    ],
    mainWrapper: "h-full",
    inputWrapper: "relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3",
    innerWrapper: "inline-flex w-full items-center h-full box-border",
    input: [
      "w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none",
      "data-[has-start-content=true]:ps-1.5",
      "data-[has-end-content=true]:pe-1.5",
      "file:cursor-pointer file:bg-transparent file:border-0",
      "autofill:bg-transparent bg-clip-text"
    ],
    clearButton: [
      "p-2",
      "-m-2",
      "z-10",
      "hidden",
      "absolute",
      "right-3",
      "rtl:right-auto",
      "rtl:left-3",
      "appearance-none",
      "outline-none",
      "select-none",
      "opacity-0",
      "hover:!opacity-100",
      "cursor-pointer",
      "active:!opacity-70",
      "rounded-full",
      ...dataFocusVisibleClasses
    ],
    helperWrapper: "hidden group-data-[has-helper=true]:flex p-1 relative flex-col gap-1.5",
    description: "text-tiny text-foreground-400",
    errorMessage: "text-tiny text-danger"
  },
  variants: {
    variant: {
      flat: {
        inputWrapper: [
          "bg-default-100",
          "data-[hover=true]:bg-default-200",
          "group-data-[focus=true]:bg-default-100"
        ]
      },
      faded: {
        inputWrapper: [
          "bg-default-100",
          "border-medium",
          "border-default-200",
          "data-[hover=true]:border-default-400"
        ],
        value: "group-data-[has-value=true]:text-default-foreground"
      },
      bordered: {
        inputWrapper: [
          "border-medium",
          "border-default-200",
          "data-[hover=true]:border-default-400",
          "group-data-[focus=true]:border-default-foreground"
        ]
      },
      underlined: {
        inputWrapper: [
          "!px-1",
          "!pb-0",
          "!gap-0",
          "relative",
          "box-border",
          "border-b-medium",
          "shadow-[0_1px_0px_0_rgba(0,0,0,0.05)]",
          "border-default-200",
          "!rounded-none",
          "hover:border-default-300",
          "after:content-['']",
          "after:w-0",
          "after:origin-center",
          "after:bg-default-foreground",
          "after:absolute",
          "after:left-1/2",
          "after:-translate-x-1/2",
          "after:-bottom-[2px]",
          "after:h-[2px]",
          "group-data-[focus=true]:after:w-full"
        ],
        innerWrapper: "pb-1",
        label: "group-data-[filled-within=true]:text-foreground"
      }
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {}
    },
    size: {
      sm: {
        label: "text-tiny",
        inputWrapper: "h-8 min-h-8 px-2 rounded-small",
        input: "text-small",
        clearButton: "text-medium"
      },
      md: {
        inputWrapper: "h-10 min-h-10 rounded-medium",
        input: "text-small",
        clearButton: "text-large"
      },
      lg: {
        inputWrapper: "h-12 min-h-12 rounded-large",
        input: "text-medium",
        clearButton: "text-large"
      }
    },
    radius: {
      none: {
        inputWrapper: "rounded-none"
      },
      sm: {
        inputWrapper: "rounded-small"
      },
      md: {
        inputWrapper: "rounded-medium"
      },
      lg: {
        inputWrapper: "rounded-large"
      },
      full: {
        inputWrapper: "rounded-full"
      }
    },
    labelPlacement: {
      outside: {
        mainWrapper: "flex flex-col"
      },
      "outside-left": {
        base: "flex-row items-center flex-nowrap data-[has-helper=true]:items-start",
        inputWrapper: "flex-1",
        mainWrapper: "flex flex-col",
        label: "relative text-foreground pr-2 rtl:pr-0 rtl:pl-2"
      },
      inside: {
        label: "text-tiny cursor-text",
        inputWrapper: "flex-col items-start justify-center gap-0",
        innerWrapper: "group-data-[has-label=true]:items-end"
      }
    },
    fullWidth: {
      true: {
        base: "w-full"
      }
    },
    isClearable: {
      true: {
        input: "peer pr-6 rtl:pr-0 rtl:pl-6",
        clearButton: "peer-data-[filled=true]:opacity-70 peer-data-[filled=true]:block"
      }
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
        inputWrapper: "pointer-events-none",
        label: "pointer-events-none"
      }
    },
    isInvalid: {
      true: {
        label: "!text-danger",
        input: "!placeholder:text-danger !text-danger"
      }
    },
    isRequired: {
      true: {
        label: "after:content-['*'] after:text-danger after:ml-0.5 rtl:after:ml-[unset] rtl:after:mr-0.5"
      }
    },
    isMultiline: {
      true: {
        label: "relative",
        inputWrapper: "!h-auto",
        innerWrapper: "items-start group-data-[has-label=true]:items-start",
        input: "resize-none data-[hide-scroll=true]:scrollbar-hide"
      }
    },
    disableAnimation: {
      true: {
        input: "transition-none",
        inputWrapper: "transition-none",
        label: "transition-none"
      },
      false: {
        inputWrapper: "transition-background motion-reduce:transition-none !duration-150",
        label: [
          "will-change-auto",
          "!duration-200",
          "!ease-out",
          "motion-reduce:transition-none",
          "transition-[transform,color,left,opacity]"
        ],
        clearButton: ["transition-opacity", "motion-reduce:transition-none"]
      }
    }
  },
  defaultVariants: {
    variant: "flat",
    color: "default",
    size: "md",
    fullWidth: true,
    labelPlacement: "inside",
    isDisabled: false,
    isMultiline: false
  },
  compoundVariants: [
    {
      variant: "flat",
      color: "default",
      class: {
        input: "group-data-[has-value=true]:text-default-foreground"
      }
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        inputWrapper: [
          "bg-primary-50",
          "data-[hover=true]:bg-primary-100",
          "text-primary",
          "group-data-[focus=true]:bg-primary-50",
          "placeholder:text-primary"
        ],
        input: "placeholder:text-primary",
        label: "text-primary"
      }
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        inputWrapper: [
          "bg-secondary-50",
          "text-secondary",
          "data-[hover=true]:bg-secondary-100",
          "group-data-[focus=true]:bg-secondary-50",
          "placeholder:text-secondary"
        ],
        input: "placeholder:text-secondary",
        label: "text-secondary"
      }
    },
    {
      variant: "flat",
      color: "success",
      class: {
        inputWrapper: [
          "bg-success-50",
          "text-success-600",
          "dark:text-success",
          "placeholder:text-success-600",
          "dark:placeholder:text-success",
          "data-[hover=true]:bg-success-100",
          "group-data-[focus=true]:bg-success-50"
        ],
        input: "placeholder:text-success-600 dark:placeholder:text-success",
        label: "text-success-600 dark:text-success"
      }
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        inputWrapper: [
          "bg-warning-50",
          "text-warning-600",
          "dark:text-warning",
          "placeholder:text-warning-600",
          "dark:placeholder:text-warning",
          "data-[hover=true]:bg-warning-100",
          "group-data-[focus=true]:bg-warning-50"
        ],
        input: "placeholder:text-warning-600 dark:placeholder:text-warning",
        label: "text-warning-600 dark:text-warning"
      }
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        inputWrapper: [
          "bg-danger-50",
          "text-danger",
          "dark:text-danger-500",
          "placeholder:text-danger",
          "dark:placeholder:text-danger-500",
          "data-[hover=true]:bg-danger-100",
          "group-data-[focus=true]:bg-danger-50"
        ],
        input: "placeholder:text-danger dark:placeholder:text-danger-500",
        label: "text-danger dark:text-danger-500"
      }
    },
    {
      variant: "faded",
      color: "primary",
      class: {
        label: "text-primary",
        inputWrapper: "data-[hover=true]:border-primary focus-within:border-primary"
      }
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        label: "text-secondary",
        inputWrapper: "data-[hover=true]:border-secondary focus-within:border-secondary"
      }
    },
    {
      variant: "faded",
      color: "success",
      class: {
        label: "text-success",
        inputWrapper: "data-[hover=true]:border-success focus-within:border-success"
      }
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        label: "text-warning",
        inputWrapper: "data-[hover=true]:border-warning focus-within:border-warning"
      }
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        label: "text-danger",
        inputWrapper: "data-[hover=true]:border-danger focus-within:border-danger"
      }
    },
    {
      variant: "underlined",
      color: "default",
      class: {
        input: "group-data-[has-value=true]:text-foreground"
      }
    },
    {
      variant: "underlined",
      color: "primary",
      class: {
        inputWrapper: "after:bg-primary",
        label: "text-primary"
      }
    },
    {
      variant: "underlined",
      color: "secondary",
      class: {
        inputWrapper: "after:bg-secondary",
        label: "text-secondary"
      }
    },
    {
      variant: "underlined",
      color: "success",
      class: {
        inputWrapper: "after:bg-success",
        label: "text-success"
      }
    },
    {
      variant: "underlined",
      color: "warning",
      class: {
        inputWrapper: "after:bg-warning",
        label: "text-warning"
      }
    },
    {
      variant: "underlined",
      color: "danger",
      class: {
        inputWrapper: "after:bg-danger",
        label: "text-danger"
      }
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        inputWrapper: "group-data-[focus=true]:border-primary",
        label: "text-primary"
      }
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        inputWrapper: "group-data-[focus=true]:border-secondary",
        label: "text-secondary"
      }
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        inputWrapper: "group-data-[focus=true]:border-success",
        label: "text-success"
      }
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        inputWrapper: "group-data-[focus=true]:border-warning",
        label: "text-warning"
      }
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        inputWrapper: "group-data-[focus=true]:border-danger",
        label: "text-danger"
      }
    },
    {
      labelPlacement: "inside",
      color: "default",
      class: {
        label: "group-data-[filled-within=true]:text-default-600"
      }
    },
    {
      labelPlacement: "outside",
      color: "default",
      class: {
        label: "group-data-[filled-within=true]:text-foreground"
      }
    },
    {
      radius: "full",
      size: ["sm"],
      class: {
        inputWrapper: "px-3"
      }
    },
    {
      radius: "full",
      size: "md",
      class: {
        inputWrapper: "px-4"
      }
    },
    {
      radius: "full",
      size: "lg",
      class: {
        inputWrapper: "px-5"
      }
    },
    {
      disableAnimation: false,
      variant: ["faded", "bordered"],
      class: {
        inputWrapper: "transition-colors motion-reduce:transition-none"
      }
    },
    {
      disableAnimation: false,
      variant: "underlined",
      class: {
        inputWrapper: "after:transition-width motion-reduce:after:transition-none"
      }
    },
    {
      variant: ["flat", "faded"],
      class: {
        inputWrapper: [
          ...groupDataFocusVisibleClasses
        ]
      }
    },
    {
      isInvalid: true,
      variant: "flat",
      class: {
        inputWrapper: [
          "!bg-danger-50",
          "data-[hover=true]:!bg-danger-100",
          "group-data-[focus=true]:!bg-danger-50"
        ]
      }
    },
    {
      isInvalid: true,
      variant: "bordered",
      class: {
        inputWrapper: "!border-danger group-data-[focus=true]:!border-danger"
      }
    },
    {
      isInvalid: true,
      variant: "underlined",
      class: {
        inputWrapper: "after:!bg-danger"
      }
    },
    {
      labelPlacement: "inside",
      size: "sm",
      class: {
        inputWrapper: "h-12 py-1.5 px-3"
      }
    },
    {
      labelPlacement: "inside",
      size: "md",
      class: {
        inputWrapper: "h-14 py-2"
      }
    },
    {
      labelPlacement: "inside",
      size: "lg",
      class: {
        label: "text-small",
        inputWrapper: "h-16 py-2.5 gap-0"
      }
    },
    {
      labelPlacement: "inside",
      size: "sm",
      variant: ["bordered", "faded"],
      class: {
        inputWrapper: "py-1"
      }
    },
    {
      labelPlacement: ["inside", "outside"],
      class: {
        label: ["group-data-[filled-within=true]:pointer-events-auto"]
      }
    },
    {
      labelPlacement: "outside",
      isMultiline: false,
      class: {
        base: "group relative justify-end",
        label: [
          "pb-0",
          "z-20",
          "top-1/2",
          "-translate-y-1/2",
          "group-data-[filled-within=true]:left-0"
        ]
      }
    },
    {
      labelPlacement: ["inside"],
      class: {
        label: ["group-data-[filled-within=true]:scale-85"]
      }
    },
    {
      labelPlacement: ["inside"],
      variant: "flat",
      class: {
        innerWrapper: "pb-0.5"
      }
    },
    {
      variant: "underlined",
      size: "sm",
      class: {
        innerWrapper: "pb-1"
      }
    },
    {
      variant: "underlined",
      size: ["md", "lg"],
      class: {
        innerWrapper: "pb-1.5"
      }
    },
    {
      labelPlacement: "inside",
      size: ["sm", "md"],
      class: {
        label: "text-small"
      }
    },
    {
      labelPlacement: "inside",
      isMultiline: false,
      size: "sm",
      class: {
        label: [
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.tiny)/2_-_8px)]"
        ]
      }
    },
    {
      labelPlacement: "inside",
      isMultiline: false,
      size: "md",
      class: {
        label: [
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px)]"
        ]
      }
    },
    {
      labelPlacement: "inside",
      isMultiline: false,
      size: "lg",
      class: {
        label: [
          "text-medium",
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_8px)]"
        ]
      }
    },
    {
      labelPlacement: "inside",
      variant: ["faded", "bordered"],
      isMultiline: false,
      size: "sm",
      class: {
        label: [
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.tiny)/2_-_8px_-_theme(borderWidth.medium))]"
        ]
      }
    },
    {
      labelPlacement: "inside",
      variant: ["faded", "bordered"],
      isMultiline: false,
      size: "md",
      class: {
        label: [
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px_-_theme(borderWidth.medium))]"
        ]
      }
    },
    {
      labelPlacement: "inside",
      variant: ["faded", "bordered"],
      isMultiline: false,
      size: "lg",
      class: {
        label: [
          "text-medium",
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_8px_-_theme(borderWidth.medium))]"
        ]
      }
    },
    {
      labelPlacement: "inside",
      variant: "underlined",
      isMultiline: false,
      size: "sm",
      class: {
        label: [
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.tiny)/2_-_5px)]"
        ]
      }
    },
    {
      labelPlacement: "inside",
      variant: "underlined",
      isMultiline: false,
      size: "md",
      class: {
        label: [
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_3.5px)]"
        ]
      }
    },
    {
      labelPlacement: "inside",
      variant: "underlined",
      size: "lg",
      isMultiline: false,
      class: {
        label: [
          "text-medium",
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_4px)]"
        ]
      }
    },
    {
      labelPlacement: "outside",
      size: "sm",
      isMultiline: false,
      class: {
        label: [
          "left-2",
          "text-tiny",
          "group-data-[filled-within=true]:-translate-y-[calc(100%_+_theme(fontSize.tiny)/2_+_16px)]"
        ],
        base: "data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_8px)]"
      }
    },
    {
      labelPlacement: "outside",
      size: "md",
      isMultiline: false,
      class: {
        label: [
          "left-3",
          "rtl:left-auto",
          "rtl:right-3",
          "text-small",
          "group-data-[filled-within=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_20px)]"
        ],
        base: "data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_10px)]"
      }
    },
    {
      labelPlacement: "outside",
      size: "lg",
      isMultiline: false,
      class: {
        label: [
          "left-3",
          "rtl:left-auto",
          "rtl:right-3",
          "text-medium",
          "group-data-[filled-within=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_24px)]"
        ],
        base: "data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_12px)]"
      }
    },
    {
      labelPlacement: "outside-left",
      size: "sm",
      class: {
        label: "group-data-[has-helper=true]:pt-2"
      }
    },
    {
      labelPlacement: "outside-left",
      size: "md",
      class: {
        label: "group-data-[has-helper=true]:pt-3"
      }
    },
    {
      labelPlacement: "outside-left",
      size: "lg",
      class: {
        label: "group-data-[has-helper=true]:pt-4"
      }
    },
    {
      labelPlacement: ["outside", "outside-left"],
      isMultiline: true,
      class: {
        inputWrapper: "py-2"
      }
    },
    {
      labelPlacement: "outside",
      isMultiline: true,
      class: {
        label: "pb-1.5"
      }
    },
    {
      labelPlacement: "inside",
      isMultiline: true,
      class: {
        label: "pb-0.5",
        input: "pt-0"
      }
    },
    {
      isMultiline: true,
      disableAnimation: false,
      class: {
        input: "transition-height !duration-100 motion-reduce:transition-none"
      }
    },
    {
      labelPlacement: ["inside", "outside"],
      class: {
        label: ["pe-2", "max-w-full", "text-ellipsis", "overflow-hidden"]
      }
    },
    {
      isMultiline: true,
      radius: "full",
      class: {
        inputWrapper: "data-[has-multiple-rows=true]:rounded-large"
      }
    }
  ]
});

// src/components/dropdown.ts
var dropdown = tv({
  base: ["w-full", "p-1", "min-w-[200px]"]
});
var dropdownItem = tv({
  slots: {
    base: [
      "flex",
      "group",
      "gap-2",
      "items-center",
      "justify-between",
      "relative",
      "px-2",
      "py-1.5",
      "w-full",
      "h-full",
      "box-border",
      "rounded-small",
      "outline-none",
      "cursor-pointer",
      "tap-highlight-transparent",
      "data-[pressed=true]:opacity-70",
      ...dataFocusVisibleClasses,
      "data-[focus-visible=true]:dark:ring-offset-background-content1"
    ],
    wrapper: "w-full flex flex-col items-start justify-center",
    title: "flex-1 text-small font-normal truncate",
    description: ["w-full", "text-tiny", "text-foreground-500", "group-hover:text-current"],
    selectedIcon: ["text-inherit", "w-3", "h-3", "flex-shrink-0"],
    shortcut: [
      "px-1",
      "py-0.5",
      "rounded",
      "font-sans",
      "text-foreground-500",
      "text-tiny",
      "border-small",
      "border-default-300",
      "group-hover:border-current"
    ]
  },
  variants: {
    variant: {
      solid: {
        base: ""
      },
      bordered: {
        base: "border-medium border-transparent bg-transparent"
      },
      light: {
        base: "bg-transparent"
      },
      faded: {
        base: "border-small border-transparent hover:border-default data-[hover=true]:bg-default-100"
      },
      flat: {
        base: ""
      },
      shadow: {
        base: "data-[hover=true]:shadow-lg"
      }
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {}
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none"
      }
    },
    disableAnimation: {
      true: {},
      false: {}
    }
  },
  defaultVariants: {
    variant: "solid",
    color: "default"
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "default",
      class: {
        base: "data-[hover=true]:bg-default data-[hover=true]:text-default-foreground"
      }
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        base: "data-[hover=true]:bg-primary data-[hover=true]:text-primary-foreground"
      }
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: "data-[hover=true]:bg-secondary data-[hover=true]:text-secondary-foreground"
      }
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: "data-[hover=true]:bg-success data-[hover=true]:text-success-foreground"
      }
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: "data-[hover=true]:bg-warning data-[hover=true]:text-warning-foreground"
      }
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        base: "data-[hover=true]:bg-danger data-[hover=true]:text-danger-foreground"
      }
    },
    {
      variant: "shadow",
      color: "default",
      class: {
        base: "data-[hover=true]:shadow-default/50 data-[hover=true]:bg-default data-[hover=true]:text-default-foreground"
      }
    },
    {
      variant: "shadow",
      color: "primary",
      class: {
        base: "data-[hover=true]:shadow-primary/30 data-[hover=true]:bg-primary data-[hover=true]:text-primary-foreground"
      }
    },
    {
      variant: "shadow",
      color: "secondary",
      class: {
        base: "data-[hover=true]:shadow-secondary/30 data-[hover=true]:bg-secondary data-[hover=true]:text-secondary-foreground"
      }
    },
    {
      variant: "shadow",
      color: "success",
      class: {
        base: "data-[hover=true]:shadow-success/30 data-[hover=true]:bg-success data-[hover=true]:text-success-foreground"
      }
    },
    {
      variant: "shadow",
      color: "warning",
      class: {
        base: "data-[hover=true]:shadow-warning/30 data-[hover=true]:bg-warning data-[hover=true]:text-warning-foreground"
      }
    },
    {
      variant: "shadow",
      color: "danger",
      class: {
        base: "data-[hover=true]:shadow-danger/30 data-[hover=true]:bg-danger data-[hover=true]:text-danger-foreground"
      }
    },
    {
      variant: "bordered",
      color: "default",
      class: {
        base: "data-[hover=true]:border-default"
      }
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        base: "data-[hover=true]:border-primary data-[hover=true]:text-primary"
      }
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        base: "data-[hover=true]:border-secondary data-[hover=true]:text-secondary"
      }
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        base: "data-[hover=true]:border-success data-[hover=true]:text-success"
      }
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        base: "data-[hover=true]:border-warning data-[hover=true]:text-warning"
      }
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        base: "data-[hover=true]:border-danger data-[hover=true]:text-danger"
      }
    },
    {
      variant: "flat",
      color: "default",
      class: {
        base: "data-[hover=true]:bg-default/40 data-[hover=true]:text-default-foreground"
      }
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        base: "data-[hover=true]:bg-primary/20 data-[hover=true]:text-primary"
      }
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: "data-[hover=true]:bg-secondary/20 data-[hover=true]:text-secondary"
      }
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: "data-[hover=true]:bg-success/20 data-[hover=true]:text-success "
      }
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: "data-[hover=true]:bg-warning/20 data-[hover=true]:text-warning"
      }
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        base: "data-[hover=true]:bg-danger/20 data-[hover=true]:text-danger"
      }
    },
    {
      variant: "faded",
      color: "default",
      class: {
        base: "data-[hover=true]:text-default-foreground"
      }
    },
    {
      variant: "faded",
      color: "primary",
      class: {
        base: "data-[hover=true]:text-primary"
      }
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        base: "data-[hover=true]:text-secondary"
      }
    },
    {
      variant: "faded",
      color: "success",
      class: {
        base: "data-[hover=true]:text-success"
      }
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        base: "data-[hover=true]:text-warning"
      }
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        base: "data-[hover=true]:text-danger"
      }
    },
    {
      variant: "light",
      color: "default",
      class: {
        base: "data-[hover=true]:text-default-500"
      }
    },
    {
      variant: "light",
      color: "primary",
      class: {
        base: "data-[hover=true]:text-primary"
      }
    },
    {
      variant: "light",
      color: "secondary",
      class: {
        base: "data-[hover=true]:text-secondary"
      }
    },
    {
      variant: "light",
      color: "success",
      class: {
        base: "data-[hover=true]:text-success"
      }
    },
    {
      variant: "light",
      color: "warning",
      class: {
        base: "data-[hover=true]:text-warning"
      }
    },
    {
      variant: "light",
      color: "danger",
      class: {
        base: "data-[hover=true]:text-danger"
      }
    }
  ]
});
var dropdownSection = tv({
  slots: {
    base: "relative mb-2",
    heading: "pl-1 text-tiny text-foreground-500",
    group: "data-[has-title=true]:pt-1",
    divider: "mt-2"
  }
});
var dropdownMenu = tv({
  base: "w-full flex flex-col gap-0.5 p-1"
});

// src/components/image.ts
var image = tv({
  slots: {
    wrapper: "relative shadow-black/5",
    zoomedWrapper: "relative overflow-hidden rounded-inherit",
    img: "relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100",
    blurredImg: [
      "absolute",
      "z-0",
      "inset-0",
      "w-full",
      "h-full",
      "object-cover",
      "filter",
      "blur-lg",
      "scale-105",
      "saturate-150",
      "opacity-30",
      "translate-y-1"
    ]
  },
  variants: {
    radius: {
      none: {},
      sm: {},
      md: {},
      lg: {},
      full: {}
    },
    shadow: {
      none: {
        wrapper: "shadow-none",
        img: "shadow-none"
      },
      sm: {
        wrapper: "shadow-small",
        img: "shadow-small"
      },
      md: {
        wrapper: "shadow-medium",
        img: "shadow-medium"
      },
      lg: {
        wrapper: "shadow-large",
        img: "shadow-large"
      }
    },
    isZoomed: {
      true: {
        img: ["object-cover", "transform", "hover:scale-125"]
      }
    },
    showSkeleton: {
      true: {
        wrapper: ["group", "relative", "overflow-hidden", "bg-content3 dark:bg-content2"],
        img: "opacity-0"
      }
    },
    disableAnimation: {
      true: {
        img: "transition-none"
      },
      false: {
        img: "transition-transform-opacity motion-reduce:transition-none !duration-300"
      }
    }
  },
  defaultVariants: {
    radius: "lg",
    shadow: "none",
    isZoomed: false,
    isBlurred: false,
    showSkeleton: false
  },
  compoundVariants: [
    {
      showSkeleton: true,
      disableAnimation: false,
      class: {
        wrapper: [
          "before:opacity-100",
          "before:absolute",
          "before:inset-0",
          "before:-translate-x-full",
          "before:animate-[shimmer_2s_infinite]",
          "before:border-t",
          "before:border-content4/30",
          "before:bg-gradient-to-r",
          "before:from-transparent",
          "before:via-content4",
          "dark:before:via-default-700/10",
          "before:to-transparent",
          "after:opacity-100",
          "after:absolute",
          "after:inset-0",
          "after:-z-10",
          "after:bg-content3",
          "dark:after:bg-content2"
        ]
      }
    }
  ],
  compoundSlots: [
    {
      slots: ["wrapper", "img", "blurredImg", "zoomedWrapper"],
      radius: "none",
      class: "rounded-none"
    },
    {
      slots: ["wrapper", "img", "blurredImg", "zoomedWrapper"],
      radius: "full",
      class: "rounded-full"
    },
    {
      slots: ["wrapper", "img", "blurredImg", "zoomedWrapper"],
      radius: "sm",
      class: "rounded-small"
    },
    {
      slots: ["wrapper", "img", "blurredImg", "zoomedWrapper"],
      radius: "md",
      class: "rounded-md"
    },
    {
      slots: ["wrapper", "img", "blurredImg", "zoomedWrapper"],
      radius: "lg",
      class: "rounded-large"
    }
  ]
});

// src/components/modal.ts
var modal = tv({
  slots: {
    wrapper: [
      "flex",
      "w-screen",
      "h-[100dvh]",
      "fixed",
      "inset-0",
      "z-50",
      "overflow-x-auto",
      "justify-center"
    ],
    base: [
      "flex",
      "flex-col",
      "relative",
      "bg-white",
      "z-50",
      "w-full",
      "box-border",
      "bg-content1",
      "outline-none",
      "mx-1",
      "my-1",
      "sm:mx-6",
      "sm:my-16"
    ],
    backdrop: "z-50",
    header: "flex py-4 px-6 flex-initial text-large font-semibold",
    body: "flex flex-1 flex-col gap-3 px-6 py-2",
    footer: "flex flex-row gap-2 px-6 py-4 justify-end",
    closeButton: [
      "absolute",
      "appearance-none",
      "outline-none",
      "select-none",
      "top-1",
      "right-1",
      "rtl:left-1",
      "rtl:right-[unset]",
      "p-2",
      "text-foreground-500",
      "rounded-full",
      "hover:bg-default-100",
      "active:bg-default-200",
      "tap-highlight-transparent",
      ...dataFocusVisibleClasses
    ]
  },
  variants: {
    size: {
      xs: {
        base: "max-w-xs"
      },
      sm: {
        base: "max-w-sm"
      },
      md: {
        base: "max-w-md"
      },
      lg: {
        base: "max-w-lg"
      },
      xl: {
        base: "max-w-xl"
      },
      "2xl": {
        base: "max-w-2xl"
      },
      "3xl": {
        base: "max-w-3xl"
      },
      "4xl": {
        base: "max-w-4xl"
      },
      "5xl": {
        base: "max-w-5xl"
      },
      full: {
        base: "my-0 mx-0 sm:mx-0 sm:my-0 max-w-full h-[100dvh] !rounded-none"
      }
    },
    radius: {
      none: { base: "rounded-none" },
      sm: { base: "rounded-small" },
      md: { base: "rounded-medium" },
      lg: { base: "rounded-large" }
    },
    placement: {
      auto: {
        wrapper: "items-end sm:items-center"
      },
      center: {
        wrapper: "items-center sm:items-center"
      },
      top: {
        wrapper: "items-start sm:items-start"
      },
      "top-center": {
        wrapper: "items-start sm:items-center"
      },
      bottom: {
        wrapper: "items-end sm:items-end"
      },
      "bottom-center": {
        wrapper: "items-end sm:items-center"
      }
    },
    shadow: {
      sm: {
        base: "shadow-small"
      },
      md: {
        base: "shadow-medium"
      },
      lg: {
        base: "shadow-large"
      }
    },
    backdrop: {
      transparent: {
        backdrop: "hidden"
      },
      opaque: {
        backdrop: "bg-overlay/50 backdrop-opacity-disabled"
      },
      blur: {
        backdrop: "backdrop-blur-md backdrop-saturate-150 bg-overlay/30"
      }
    },
    scrollBehavior: {
      normal: {
        base: "overflow-y-hidden"
      },
      inside: {
        base: "max-h-[calc(100%_-_8rem)]",
        body: "overflow-y-auto"
      },
      outside: {
        wrapper: "items-start sm:items-start overflow-y-auto",
        base: "my-16"
      }
    },
    disableAnimation: {
      false: {
        wrapper: [
          "[--scale-enter:100%]",
          "[--scale-exit:100%]",
          "[--slide-enter:0px]",
          "[--slide-exit:80px]",
          "sm:[--scale-enter:100%]",
          "sm:[--scale-exit:103%]",
          "sm:[--slide-enter:0px]",
          "sm:[--slide-exit:0px]"
        ]
      }
    }
  },
  defaultVariants: {
    size: "md",
    radius: "lg",
    shadow: "sm",
    placement: "auto",
    backdrop: "opaque",
    scrollBehavior: "normal"
  },
  compoundVariants: [
    {
      backdrop: ["opaque", "blur"],
      class: {
        backdrop: "w-screen h-screen fixed inset-0"
      }
    }
  ]
});

// src/components/navbar.ts
var navbar = tv({
  slots: {
    base: [
      "flex",
      "z-40",
      "w-full",
      "h-auto",
      "items-center",
      "justify-center",
      "data-[menu-open=true]:border-none"
    ],
    wrapper: [
      "z-40",
      "flex",
      "px-6",
      "gap-4",
      "w-full",
      "flex-row",
      "relative",
      "flex-nowrap",
      "items-center",
      "justify-between",
      "h-[var(--navbar-height)]"
    ],
    toggle: [
      "group",
      "flex",
      "items-center",
      "justify-center",
      "w-6",
      "h-full",
      "outline-none",
      "rounded-small",
      "tap-highlight-transparent",
      ...dataFocusVisibleClasses
    ],
    srOnly: ["sr-only"],
    toggleIcon: [
      "w-full",
      "h-full",
      "pointer-events-none",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "text-inherit",
      "group-data-[pressed=true]:opacity-70",
      "transition-opacity",
      "before:content-['']",
      "before:block",
      "before:h-px",
      "before:w-6",
      "before:bg-current",
      "before:transition-transform",
      "before:duration-150",
      "before:-translate-y-1",
      "before:rotate-0",
      "group-data-[open=true]:before:translate-y-px",
      "group-data-[open=true]:before:rotate-45",
      "after:content-['']",
      "after:block",
      "after:h-px",
      "after:w-6",
      "after:bg-current",
      "after:transition-transform",
      "after:duration-150",
      "after:translate-y-1",
      "after:rotate-0",
      "group-data-[open=true]:after:translate-y-0",
      "group-data-[open=true]:after:-rotate-45"
    ],
    brand: [
      "flex",
      "basis-0",
      "flex-row",
      "flex-grow",
      "flex-nowrap",
      "justify-start",
      "bg-transparent",
      "items-center",
      "no-underline",
      "text-medium",
      "whitespace-nowrap",
      "box-border"
    ],
    content: [
      "flex",
      "gap-4",
      "h-full",
      "flex-row",
      "flex-nowrap",
      "items-center",
      "data-[justify=start]:justify-start",
      "data-[justify=start]:flex-grow",
      "data-[justify=start]:basis-0",
      "data-[justify=center]:justify-center",
      "data-[justify=end]:justify-end",
      "data-[justify=end]:flex-grow",
      "data-[justify=end]:basis-0"
    ],
    item: [
      "text-medium",
      "whitespace-nowrap",
      "box-border",
      "list-none",
      "data-[active=true]:font-semibold"
    ],
    menu: [
      "z-30",
      "px-6",
      "pt-2",
      "fixed",
      "flex",
      "max-w-full",
      "top-[var(--navbar-height)]",
      "inset-x-0",
      "bottom-0",
      "w-screen",
      "flex-col",
      "gap-2",
      "overflow-y-auto"
    ],
    menuItem: [
      "text-large",
      "data-[active=true]:font-semibold"
    ]
  },
  variants: {
    position: {
      static: {
        base: "static"
      },
      sticky: {
        base: "sticky top-0 inset-x-0"
      }
    },
    maxWidth: {
      sm: {
        wrapper: "max-w-[640px]"
      },
      md: {
        wrapper: "max-w-[768px]"
      },
      lg: {
        wrapper: "max-w-[1024px]"
      },
      xl: {
        wrapper: "max-w-[1280px]"
      },
      "2xl": {
        wrapper: "max-w-[1536px]"
      },
      full: {
        wrapper: "max-w-full"
      }
    },
    hideOnScroll: {
      true: {
        base: ["sticky", "top-0", "inset-x-0"]
      }
    },
    isBordered: {
      true: {
        base: ["border-b", "border-divider"]
      }
    },
    isBlurred: {
      false: {
        base: "bg-background",
        menu: "bg-background"
      },
      true: {
        base: [
          "backdrop-blur-lg",
          "data-[menu-open=true]:backdrop-blur-xl",
          "backdrop-saturate-150",
          "bg-background/70"
        ],
        menu: ["backdrop-blur-xl", "backdrop-saturate-150", "bg-background/70"]
      }
    },
    disableAnimation: {
      true: {
        menu: ["hidden", "h-[calc(100dvh_-_var(--navbar-height))]", "data-[open=true]:flex"]
      }
    }
  },
  defaultVariants: {
    maxWidth: "lg",
    position: "sticky",
    isBlurred: true
  }
});

// src/components/table.ts
var table = tv({
  slots: {
    base: "flex flex-col relative gap-4",
    wrapper: [
      "p-4",
      "z-0",
      "flex",
      "flex-col",
      "relative",
      "justify-between",
      "gap-4",
      "shadow-small",
      "bg-content1",
      "overflow-auto"
    ],
    table: "min-w-full h-auto",
    thead: "[&>tr]:first:rounded-lg",
    tbody: "",
    tr: ["group", "outline-none", ...dataFocusVisibleClasses],
    th: [
      "group",
      "px-3",
      "h-10",
      "align-middle",
      "bg-default-100",
      "whitespace-nowrap",
      "text-foreground-500",
      "text-tiny",
      "font-semibold",
      "first:rounded-l-lg",
      "rtl:first:rounded-r-lg",
      "rtl:first:rounded-l-[unset]",
      "last:rounded-r-lg",
      "rtl:last:rounded-l-lg",
      "rtl:last:rounded-r-[unset]",
      "outline-none",
      "data-[sortable=true]:cursor-pointer",
      "data-[hover=true]:text-foreground-400",
      ...dataFocusVisibleClasses
    ],
    td: [
      "py-2",
      "px-3",
      "relative",
      "align-middle",
      "whitespace-normal",
      "text-small",
      "font-normal",
      "outline-none",
      "[&>*]:z-1",
      "[&>*]:relative",
      ...dataFocusVisibleClasses,
      "before:content-['']",
      "before:absolute",
      "before:z-0",
      "before:inset-0",
      "before:opacity-0",
      "data-[selected=true]:before:opacity-100",
      "group-data-[disabled=true]:text-foreground-300",
      "group-data-[disabled=true]:cursor-not-allowed"
    ],
    tfoot: "",
    sortIcon: [
      "ml-2",
      "mb-px",
      "opacity-0",
      "text-inherit",
      "inline-block",
      "transition-transform-opacity",
      "data-[visible=true]:opacity-100",
      "group-data-[hover=true]:opacity-100",
      "data-[direction=ascending]:rotate-180"
    ],
    emptyWrapper: "text-foreground-400 align-middle text-center h-40",
    loadingWrapper: "absolute inset-0 flex items-center justify-center"
  },
  variants: {
    color: {
      default: {
        td: "before:bg-default/60 data-[selected=true]:text-default-foreground"
      },
      primary: {
        td: "before:bg-primary/20 data-[selected=true]:text-primary"
      },
      secondary: {
        td: "before:bg-secondary/20 data-[selected=true]:text-secondary"
      },
      success: {
        td: "before:bg-success/20 data-[selected=true]:text-success-600 dark:data-[selected=true]:text-success"
      },
      warning: {
        td: "before:bg-warning/20 data-[selected=true]:text-warning-600 dark:data-[selected=true]:text-warning"
      },
      danger: {
        td: "before:bg-danger/20 data-[selected=true]:text-danger dark:data-[selected=true]:text-danger-500"
      }
    },
    layout: {
      auto: {
        table: "table-auto"
      },
      fixed: {
        table: "table-fixed"
      }
    },
    radius: {
      none: {
        wrapper: "rounded-none"
      },
      sm: {
        wrapper: "rounded-small"
      },
      md: {
        wrapper: "rounded-medium"
      },
      lg: {
        wrapper: "rounded-large"
      }
    },
    shadow: {
      none: {
        wrapper: "shadow-none"
      },
      sm: {
        wrapper: "shadow-small"
      },
      md: {
        wrapper: "shadow-medium"
      },
      lg: {
        wrapper: "shadow-large"
      }
    },
    hideHeader: {
      true: {
        thead: "hidden"
      }
    },
    isStriped: {
      true: {
        td: [
          "group-data-[odd=true]:before:bg-default-100",
          "group-data-[odd=true]:before:opacity-100",
          "group-data-[odd=true]:before:-z-10"
        ]
      }
    },
    isCompact: {
      true: {
        td: "py-1"
      },
      false: {}
    },
    isHeaderSticky: {
      true: {
        thead: "sticky top-0 z-20 [&>tr]:first:shadow-small"
      }
    },
    isSelectable: {
      true: {
        tr: "cursor-default",
        td: [
          "group-aria-[selected=false]:group-data-[hover=true]:before:bg-default-100",
          "group-aria-[selected=false]:group-data-[hover=true]:before:opacity-70"
        ]
      }
    },
    isMultiSelectable: {
      true: {
        td: [
          "group-data-[first=true]:first:before:rounded-tl-lg",
          "group-data-[first=true]:rtl:first:before:rounded-tr-lg",
          "group-data-[first=true]:rtl:first:before:rounded-tl-[unset]",
          "group-data-[first=true]:last:before:rounded-tr-lg",
          "group-data-[first=true]:rtl:last:before:rounded-tl-lg",
          "group-data-[first=true]:rtl:last:before:rounded-tr-[unset]",
          "group-data-[middle=true]:before:rounded-none",
          "group-data-[last=true]:first:before:rounded-bl-lg",
          "group-data-[last=true]:rtl:first:before:rounded-br-lg",
          "group-data-[last=true]:rtl:first:before:rounded-bl-[unset]",
          "group-data-[last=true]:last:before:rounded-br-lg",
          "group-data-[last=true]:rtl:last:before:rounded-bl-lg",
          "group-data-[last=true]:rtl:last:before:rounded-br-[unset]"
        ]
      },
      false: {
        td: [
          "first:before:rounded-l-lg",
          "rtl:first:before:rounded-r-lg",
          "rtl:first:before:rounded-l-[unset]",
          "last:before:rounded-r-lg",
          "rtl:last:before:rounded-l-lg",
          "rtl:last:before:rounded-r-[unset]"
        ]
      }
    },
    fullWidth: {
      true: {
        base: "w-full",
        wrapper: "w-full",
        table: "w-full"
      }
    },
    align: {
      start: {
        th: "text-start",
        td: "text-start"
      },
      center: {
        th: "text-center",
        td: "text-center"
      },
      end: {
        th: "text-end",
        td: "text-end"
      }
    }
  },
  defaultVariants: {
    layout: "auto",
    shadow: "sm",
    radius: "lg",
    color: "default",
    isCompact: false,
    hideHeader: false,
    isStriped: false,
    fullWidth: true,
    align: "start"
  },
  compoundVariants: [
    {
      isStriped: true,
      color: "default",
      class: {
        td: "group-data-[odd=true]:data-[selected=true]:before:bg-default/60"
      }
    },
    {
      isStriped: true,
      color: "primary",
      class: {
        td: "group-data-[odd=true]:data-[selected=true]:before:bg-primary/20"
      }
    },
    {
      isStriped: true,
      color: "secondary",
      class: {
        td: "group-data-[odd=true]:data-[selected=true]:before:bg-secondary/20"
      }
    },
    {
      isStriped: true,
      color: "success",
      class: {
        td: "group-data-[odd=true]:data-[selected=true]:before:bg-success/20"
      }
    },
    {
      isStriped: true,
      color: "warning",
      class: {
        td: "group-data-[odd=true]:data-[selected=true]:before:bg-warning/20"
      }
    },
    {
      isStriped: true,
      color: "danger",
      class: {
        td: "group-data-[odd=true]:data-[selected=true]:before:bg-danger/20"
      }
    }
  ]
});

// src/components/spacer.ts
var spacer = tv({
  base: "w-px h-px inline-block",
  variants: {
    isInline: {
      true: "inline-block",
      false: "block"
    }
  },
  defaultVariants: {
    isInline: false
  }
});

// src/components/divider.ts
var divider = tv({
  base: "shrink-0 bg-divider border-none",
  variants: {
    orientation: {
      horizontal: "w-full h-divider",
      vertical: "h-full w-divider"
    }
  },
  defaultVariants: {
    orientation: "horizontal"
  }
});

// src/components/kbd.ts
var kbd = tv({
  slots: {
    base: [
      "px-1.5",
      "py-0.5",
      "inline-flex",
      "space-x-0.5",
      "rtl:space-x-reverse",
      "items-center",
      "font-sans",
      "font-normal",
      "text-center",
      "text-small",
      "shadow-small",
      "bg-default-100",
      "text-foreground-600",
      "rounded-small"
    ],
    abbr: "no-underline",
    content: ""
  },
  variants: {},
  defaultVariants: {}
});

// src/components/tabs.ts
var tabs = tv({
  slots: {
    base: "inline-flex",
    tabList: [
      "flex",
      "p-1",
      "h-fit",
      "gap-2",
      "items-center",
      "flex-nowrap",
      "overflow-x-scroll",
      "scrollbar-hide",
      "bg-default-100"
    ],
    tab: [
      "z-0",
      "w-full",
      "px-3",
      "py-1",
      "flex",
      "group",
      "relative",
      "justify-center",
      "items-center",
      "outline-none",
      "cursor-pointer",
      "transition-opacity",
      "tap-highlight-transparent",
      "data-[disabled=true]:cursor-not-allowed",
      "data-[disabled=true]:opacity-30",
      "data-[hover-unselected=true]:opacity-disabled",
      ...dataFocusVisibleClasses
    ],
    tabContent: [
      "relative",
      "z-10",
      "text-inherit",
      "whitespace-nowrap",
      "transition-colors",
      "text-default-500",
      "group-data-[selected=true]:text-foreground"
    ],
    cursor: ["absolute", "z-0", "bg-white"],
    panel: [
      "py-3",
      "px-1",
      "outline-none",
      "data-[inert=true]:hidden",
      ...dataFocusVisibleClasses
    ],
    wrapper: []
  },
  variants: {
    variant: {
      solid: {
        cursor: "inset-0"
      },
      light: {
        tabList: "bg-transparent dark:bg-transparent",
        cursor: "inset-0"
      },
      underlined: {
        tabList: "bg-transparent dark:bg-transparent",
        cursor: "h-[2px] w-[80%] bottom-0 shadow-[0_1px_0px_0_rgba(0,0,0,0.05)]"
      },
      bordered: {
        tabList: "bg-transparent dark:bg-transparent border-medium border-default-200 shadow-sm",
        cursor: "inset-0"
      }
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {}
    },
    size: {
      sm: {
        tabList: "rounded-medium",
        tab: "h-7 text-tiny rounded-small",
        cursor: "rounded-small"
      },
      md: {
        tabList: "rounded-medium",
        tab: "h-8 text-small rounded-small",
        cursor: "rounded-small"
      },
      lg: {
        tabList: "rounded-large",
        tab: "h-9 text-medium rounded-medium",
        cursor: "rounded-medium"
      }
    },
    radius: {
      none: {
        tabList: "rounded-none",
        tab: "rounded-none",
        cursor: "rounded-none"
      },
      sm: {
        tabList: "rounded-medium",
        tab: "rounded-small",
        cursor: "rounded-small"
      },
      md: {
        tabList: "rounded-medium",
        tab: "rounded-small",
        cursor: "rounded-small"
      },
      lg: {
        tabList: "rounded-large",
        tab: "rounded-medium",
        cursor: "rounded-medium"
      },
      full: {
        tabList: "rounded-full",
        tab: "rounded-full",
        cursor: "rounded-full"
      }
    },
    fullWidth: {
      true: {
        base: "w-full",
        tabList: "w-full"
      }
    },
    isDisabled: {
      true: {
        tabList: "opacity-disabled pointer-events-none"
      }
    },
    disableAnimation: {
      true: {
        tab: "transition-none",
        tabContent: "transition-none"
      }
    },
    placement: {
      top: {},
      start: {
        tabList: "flex-col",
        panel: "py-0 px-3",
        wrapper: "flex"
      },
      end: {
        tabList: "flex-col",
        panel: "py-0 px-3",
        wrapper: "flex flex-row-reverse"
      },
      bottom: {
        wrapper: "flex flex-col-reverse"
      }
    }
  },
  defaultVariants: {
    color: "default",
    variant: "solid",
    size: "md",
    fullWidth: false,
    isDisabled: false
  },
  compoundVariants: [
    {
      variant: ["solid", "bordered", "light"],
      color: "default",
      class: {
        cursor: ["bg-background", "dark:bg-default", "shadow-small"],
        tabContent: "group-data-[selected=true]:text-default-foreground"
      }
    },
    {
      variant: ["solid", "bordered", "light"],
      color: "primary",
      class: {
        cursor: colorVariants.solid.primary,
        tabContent: "group-data-[selected=true]:text-primary-foreground"
      }
    },
    {
      variant: ["solid", "bordered", "light"],
      color: "secondary",
      class: {
        cursor: colorVariants.solid.secondary,
        tabContent: "group-data-[selected=true]:text-secondary-foreground"
      }
    },
    {
      variant: ["solid", "bordered", "light"],
      color: "success",
      class: {
        cursor: colorVariants.solid.success,
        tabContent: "group-data-[selected=true]:text-success-foreground"
      }
    },
    {
      variant: ["solid", "bordered", "light"],
      color: "warning",
      class: {
        cursor: colorVariants.solid.warning,
        tabContent: "group-data-[selected=true]:text-warning-foreground"
      }
    },
    {
      variant: ["solid", "bordered", "light"],
      color: "danger",
      class: {
        cursor: colorVariants.solid.danger,
        tabContent: "group-data-[selected=true]:text-danger-foreground"
      }
    },
    {
      variant: "underlined",
      color: "default",
      class: {
        cursor: "bg-foreground",
        tabContent: "group-data-[selected=true]:text-foreground"
      }
    },
    {
      variant: "underlined",
      color: "primary",
      class: {
        cursor: "bg-primary",
        tabContent: "group-data-[selected=true]:text-primary"
      }
    },
    {
      variant: "underlined",
      color: "secondary",
      class: {
        cursor: "bg-secondary",
        tabContent: "group-data-[selected=true]:text-secondary"
      }
    },
    {
      variant: "underlined",
      color: "success",
      class: {
        cursor: "bg-success",
        tabContent: "group-data-[selected=true]:text-success"
      }
    },
    {
      variant: "underlined",
      color: "warning",
      class: {
        cursor: "bg-warning",
        tabContent: "group-data-[selected=true]:text-warning"
      }
    },
    {
      variant: "underlined",
      color: "danger",
      class: {
        cursor: "bg-danger",
        tabContent: "group-data-[selected=true]:text-danger"
      }
    },
    {
      disableAnimation: true,
      variant: "underlined",
      class: {
        tab: [
          "after:content-['']",
          "after:absolute",
          "after:bottom-0",
          "after:h-[2px]",
          "after:w-[80%]",
          "after:opacity-0",
          "after:shadow-[0_1px_0px_0_rgba(0,0,0,0.05)]",
          "data-[selected=true]:after:opacity-100"
        ]
      }
    },
    {
      disableAnimation: true,
      color: "default",
      variant: ["solid", "bordered", "light"],
      class: {
        tab: "data-[selected=true]:bg-default data-[selected=true]:text-default-foreground"
      }
    },
    {
      disableAnimation: true,
      color: "primary",
      variant: ["solid", "bordered", "light"],
      class: {
        tab: "data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
      }
    },
    {
      disableAnimation: true,
      color: "secondary",
      variant: ["solid", "bordered", "light"],
      class: {
        tab: "data-[selected=true]:bg-secondary data-[selected=true]:text-secondary-foreground"
      }
    },
    {
      disableAnimation: true,
      color: "success",
      variant: ["solid", "bordered", "light"],
      class: {
        tab: "data-[selected=true]:bg-success data-[selected=true]:text-success-foreground"
      }
    },
    {
      disableAnimation: true,
      color: "warning",
      variant: ["solid", "bordered", "light"],
      class: {
        tab: "data-[selected=true]:bg-warning data-[selected=true]:text-warning-foreground"
      }
    },
    {
      disableAnimation: true,
      color: "danger",
      variant: ["solid", "bordered", "light"],
      class: {
        tab: "data-[selected=true]:bg-danger data-[selected=true]:text-danger-foreground"
      }
    },
    {
      disableAnimation: true,
      color: "default",
      variant: "underlined",
      class: {
        tab: "data-[selected=true]:after:bg-foreground"
      }
    },
    {
      disableAnimation: true,
      color: "primary",
      variant: "underlined",
      class: {
        tab: "data-[selected=true]:after:bg-primary"
      }
    },
    {
      disableAnimation: true,
      color: "secondary",
      variant: "underlined",
      class: {
        tab: "data-[selected=true]:after:bg-secondary"
      }
    },
    {
      disableAnimation: true,
      color: "success",
      variant: "underlined",
      class: {
        tab: "data-[selected=true]:after:bg-success"
      }
    },
    {
      disableAnimation: true,
      color: "warning",
      variant: "underlined",
      class: {
        tab: "data-[selected=true]:after:bg-warning"
      }
    },
    {
      disableAnimation: true,
      color: "danger",
      variant: "underlined",
      class: {
        tab: "data-[selected=true]:after:bg-danger"
      }
    }
  ],
  compoundSlots: [
    {
      variant: "underlined",
      slots: ["tab", "tabList", "cursor"],
      class: ["rounded-none"]
    }
  ]
});

// src/components/skeleton.ts
var skeleton = tv({
  slots: {
    base: [
      "group",
      "relative",
      "overflow-hidden",
      "bg-content3 dark:bg-content2",
      "pointer-events-none",
      "before:opacity-100",
      "before:absolute",
      "before:inset-0",
      "before:-translate-x-full",
      "before:animate-[shimmer_2s_infinite]",
      "before:border-t",
      "before:border-content4/30",
      "before:bg-gradient-to-r",
      "before:from-transparent",
      "before:via-content4",
      "dark:before:via-default-700/10",
      "before:to-transparent",
      "after:opacity-100",
      "after:absolute",
      "after:inset-0",
      "after:-z-10",
      "after:bg-content3",
      "dark:after:bg-content2",
      "data-[loaded=true]:pointer-events-auto",
      "data-[loaded=true]:overflow-visible",
      "data-[loaded=true]:!bg-transparent",
      "data-[loaded=true]:before:opacity-0 data-[loaded=true]:before:animate-none",
      "data-[loaded=true]:after:opacity-0"
    ],
    content: ["opacity-0", "group-data-[loaded=true]:opacity-100"]
  },
  variants: {
    disableAnimation: {
      true: {
        base: "before:animate-none before:transition-none after:transition-none",
        content: "transition-none"
      },
      false: {
        base: "transition-background !duration-300 before:transition-opacity before:!duration-300",
        content: "transition-opacity motion-reduce:transition-none !duration-300"
      }
    }
  },
  defaultVariants: {}
});

// src/components/select.ts
var select = tv({
  slots: {
    base: ["group inline-flex flex-col relative w-full"],
    label: [
      "block",
      "absolute",
      "z-10",
      "origin-top-left",
      "rtl:origin-top-right",
      "subpixel-antialiased",
      "text-small",
      "text-foreground-500",
      "pointer-events-none"
    ],
    mainWrapper: "w-full flex flex-col",
    trigger: "relative px-3 gap-3 w-full inline-flex flex-row items-center shadow-sm outline-none tap-highlight-transparent",
    innerWrapper: "inline-flex h-full w-[calc(100%_-_theme(spacing.6))] min-h-4 items-center gap-1.5 box-border",
    selectorIcon: "absolute right-3 rtl:left-3 rtl:right-[unset] w-4 h-4",
    spinner: "absolute right-3 rtl:left-3 rtl:right-[unset]",
    value: ["text-foreground-500", "font-normal", "w-full", "text-left", "rtl:text-right"],
    listboxWrapper: "scroll-py-6 max-h-64 w-full",
    listbox: "",
    popoverContent: "w-full p-1 overflow-hidden",
    helperWrapper: "p-1 flex relative flex-col gap-1.5",
    description: "text-tiny text-foreground-400",
    errorMessage: "text-tiny text-danger"
  },
  variants: {
    variant: {
      flat: {
        trigger: [
          "bg-default-100",
          "data-[hover=true]:bg-default-200",
          "group-data-[focus=true]:bg-default-100"
        ]
      },
      faded: {
        trigger: [
          "bg-default-100",
          "border-medium",
          "border-default-200",
          "data-[hover=true]:border-default-400"
        ],
        value: "group-data-[has-value=true]:text-default-foreground"
      },
      bordered: {
        trigger: [
          "border-medium",
          "border-default-200",
          "data-[hover=true]:border-default-400",
          "data-[open=true]:border-default-foreground",
          "data-[focus=true]:border-default-foreground",
          "data-[focus=true]:border-default-foreground"
        ]
      },
      underlined: {
        trigger: [
          "!px-1",
          "!pb-0",
          "!gap-0",
          "relative",
          "box-border",
          "border-b-medium",
          "shadow-[0_1px_0px_0_rgba(0,0,0,0.05)]",
          "border-default-200",
          "!rounded-none",
          "hover:border-default-300",
          "after:content-['']",
          "after:w-0",
          "after:origin-center",
          "after:bg-default-foreground",
          "after:absolute",
          "after:left-1/2",
          "after:-translate-x-1/2",
          "after:-bottom-[2px]",
          "after:h-[2px]",
          "data-[open=true]:after:w-full",
          "data-[focus=true]:after:w-full"
        ],
        label: "group-data-[filled=true]:text-foreground"
      }
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {}
    },
    size: {
      sm: {
        label: "text-tiny",
        trigger: "h-8 min-h-8 px-2 rounded-small",
        value: "text-small"
      },
      md: {
        trigger: "h-10 min-h-10 rounded-medium",
        value: "text-small"
      },
      lg: {
        trigger: "h-12 min-h-12 rounded-large",
        value: "text-medium"
      }
    },
    radius: {
      none: {
        trigger: "rounded-none"
      },
      sm: {
        trigger: "rounded-small"
      },
      md: {
        trigger: "rounded-medium"
      },
      lg: {
        trigger: "rounded-large"
      },
      full: {
        trigger: "rounded-full"
      }
    },
    labelPlacement: {
      outside: {
        base: "flex flex-col"
      },
      "outside-left": {
        base: "flex-row items-center flex-nowrap items-start",
        label: "relative pr-2 rtl:pl-2 rtl:pr-[unset] text-foreground"
      },
      inside: {
        label: "text-tiny cursor-pointer",
        trigger: "flex-col items-start justify-center gap-0"
      }
    },
    fullWidth: {
      true: {
        base: "w-full"
      }
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
        trigger: "pointer-events-none"
      }
    },
    isInvalid: {
      true: {
        label: "!text-danger",
        value: "!text-danger",
        selectorIcon: "text-danger"
      }
    },
    isRequired: {
      true: {
        label: "after:content-['*'] after:text-danger after:ml-0.5"
      }
    },
    isMultiline: {
      true: {
        label: "relative",
        trigger: "!h-auto"
      },
      false: {
        value: "truncate"
      }
    },
    disableAnimation: {
      true: {
        trigger: "after:transition-none",
        base: "transition-none",
        label: "transition-none",
        selectorIcon: "transition-none"
      },
      false: {
        base: "transition-background motion-reduce:transition-none !duration-150",
        label: [
          "will-change-auto",
          "origin-top-left",
          "rtl:origin-top-right",
          "!duration-200",
          "!ease-out",
          "transition-[transform,color,left,opacity]",
          "motion-reduce:transition-none"
        ],
        selectorIcon: "transition-transform duration-150 ease motion-reduce:transition-none"
      }
    },
    disableSelectorIconRotation: {
      true: {},
      false: {
        selectorIcon: "data-[open=true]:rotate-180"
      }
    }
  },
  defaultVariants: {
    variant: "flat",
    color: "default",
    size: "md",
    labelPlacement: "inside",
    fullWidth: true,
    isDisabled: false,
    isMultiline: false,
    disableSelectorIconRotation: false
  },
  compoundVariants: [
    {
      variant: "flat",
      color: "default",
      class: {
        value: "group-data-[has-value=true]:text-default-foreground"
      }
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        trigger: [
          "bg-primary-50",
          "text-primary",
          "data-[hover=true]:bg-primary-100",
          "group-data-[focus=true]:bg-primary-50"
        ],
        value: "text-primary",
        label: "text-primary"
      }
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        trigger: [
          "bg-secondary-50",
          "text-secondary",
          "data-[hover=true]:bg-secondary-100",
          "group-data-[focus=true]:bg-secondary-50"
        ],
        value: "text-secondary",
        label: "text-secondary"
      }
    },
    {
      variant: "flat",
      color: "success",
      class: {
        trigger: [
          "bg-success-50",
          "text-success-600",
          "dark:text-success",
          "data-[hover=true]:bg-success-100",
          "group-data-[focus=true]:bg-success-50"
        ],
        value: "text-success-600 dark:text-success",
        label: "text-success-600 dark:text-success"
      }
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        trigger: [
          "bg-warning-50",
          "text-warning-600",
          "dark:text-warning",
          "data-[hover=true]:bg-warning-100",
          "group-data-[focus=true]:bg-warning-50"
        ],
        value: "text-warning-600 dark:text-warning",
        label: "text-warning-600 dark:text-warning"
      }
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        trigger: [
          "bg-danger-50",
          "text-danger",
          "dark:text-danger-500",
          "data-[hover=true]:bg-danger-100",
          "group-data-[focus=true]:bg-danger-50"
        ],
        value: "text-danger dark:text-danger-500",
        label: "text-danger dark:text-danger-500"
      }
    },
    {
      variant: "faded",
      color: "primary",
      class: {
        trigger: "data-[hover=true]:border-primary",
        label: "text-primary"
      }
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        trigger: "data-[hover=true]:border-secondary",
        label: "text-secondary"
      }
    },
    {
      variant: "faded",
      color: "success",
      class: {
        trigger: "data-[hover=true]:border-success",
        label: "text-success"
      }
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        trigger: "data-[hover=true]:border-warning",
        label: "text-warning"
      }
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        trigger: "data-[hover=true]:border-danger",
        label: "text-danger"
      }
    },
    {
      variant: "underlined",
      color: "default",
      class: {
        value: "group-data-[has-value=true]:text-foreground"
      }
    },
    {
      variant: "underlined",
      color: "primary",
      class: {
        trigger: "after:bg-primary",
        label: "text-primary"
      }
    },
    {
      variant: "underlined",
      color: "secondary",
      class: {
        trigger: "after:bg-secondary",
        label: "text-secondary"
      }
    },
    {
      variant: "underlined",
      color: "success",
      class: {
        trigger: "after:bg-success",
        label: "text-success"
      }
    },
    {
      variant: "underlined",
      color: "warning",
      class: {
        trigger: "after:bg-warning",
        label: "text-warning"
      }
    },
    {
      variant: "underlined",
      color: "danger",
      class: {
        trigger: "after:bg-danger",
        label: "text-danger"
      }
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        trigger: ["data-[open=true]:border-primary", "data-[focus=true]:border-primary"],
        label: "text-primary"
      }
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        trigger: ["data-[open=true]:border-secondary", "data-[focus=true]:border-secondary"],
        label: "text-secondary"
      }
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        trigger: ["data-[open=true]:border-success", "data-[focus=true]:border-success"],
        label: "text-success"
      }
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        trigger: ["data-[open=true]:border-warning", "data-[focus=true]:border-warning"],
        label: "text-warning"
      }
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        trigger: ["data-[open=true]:border-danger", "data-[focus=true]:border-danger"],
        label: "text-danger"
      }
    },
    {
      labelPlacement: "inside",
      color: "default",
      class: {
        label: "group-data-[filled=true]:text-default-600"
      }
    },
    {
      labelPlacement: "outside",
      color: "default",
      class: {
        label: "group-data-[filled=true]:text-foreground"
      }
    },
    {
      radius: "full",
      size: ["sm"],
      class: {
        trigger: "px-3"
      }
    },
    {
      radius: "full",
      size: "md",
      class: {
        trigger: "px-4"
      }
    },
    {
      radius: "full",
      size: "lg",
      class: {
        trigger: "px-5"
      }
    },
    {
      disableAnimation: false,
      variant: ["faded", "bordered"],
      class: {
        trigger: "transition-colors motion-reduce:transition-none"
      }
    },
    {
      disableAnimation: false,
      variant: "underlined",
      class: {
        trigger: "after:transition-width motion-reduce:after:transition-none"
      }
    },
    {
      variant: ["flat", "faded"],
      class: {
        trigger: [
          ...dataFocusVisibleClasses
        ]
      }
    },
    {
      isInvalid: true,
      variant: "flat",
      class: {
        trigger: [
          "bg-danger-50",
          "data-[hover=true]:bg-danger-100",
          "group-data-[focus=true]:bg-danger-50"
        ]
      }
    },
    {
      isInvalid: true,
      variant: "bordered",
      class: {
        trigger: "!border-danger group-data-[focus=true]:border-danger"
      }
    },
    {
      isInvalid: true,
      variant: "underlined",
      class: {
        trigger: "after:bg-danger"
      }
    },
    {
      labelPlacement: "inside",
      size: "sm",
      class: {
        trigger: "h-12 min-h-12 py-1.5 px-3"
      }
    },
    {
      labelPlacement: "inside",
      size: "md",
      class: {
        trigger: "h-14 min-h-14 py-2"
      }
    },
    {
      labelPlacement: "inside",
      size: "lg",
      class: {
        label: "text-small",
        trigger: "h-16 min-h-16 py-2.5 gap-0"
      }
    },
    {
      labelPlacement: ["inside", "outside"],
      class: {
        label: ["group-data-[filled=true]:pointer-events-auto"]
      }
    },
    {
      labelPlacement: "outside",
      isMultiline: false,
      class: {
        base: "group relative justify-end",
        label: [
          "pb-0",
          "z-20",
          "top-1/2",
          "-translate-y-1/2",
          "group-data-[filled=true]:left-0",
          "rtl:group-data-[filled=true]:right-0",
          "rtl:group-data-[filled=true]:left-[unset]"
        ]
      }
    },
    {
      labelPlacement: ["inside"],
      class: {
        label: "group-data-[filled=true]:scale-85"
      }
    },
    {
      labelPlacement: "inside",
      size: ["sm", "md"],
      class: {
        label: "text-small"
      }
    },
    {
      labelPlacement: "inside",
      isMultiline: false,
      size: "sm",
      class: {
        label: ["group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.tiny)/2_-_8px)]"],
        innerWrapper: "group-data-[has-label=true]:pt-4"
      }
    },
    {
      labelPlacement: "inside",
      isMultiline: false,
      size: "md",
      class: {
        label: [
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px)]"
        ],
        innerWrapper: "group-data-[has-label=true]:pt-4"
      }
    },
    {
      labelPlacement: "inside",
      isMultiline: false,
      size: "lg",
      class: {
        label: [
          "text-medium",
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_8px)]"
        ],
        innerWrapper: "group-data-[has-label=true]:pt-5"
      }
    },
    {
      labelPlacement: "inside",
      variant: ["faded", "bordered"],
      isMultiline: false,
      size: "sm",
      class: {
        label: [
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.tiny)/2_-_8px_-_theme(borderWidth.medium))]"
        ]
      }
    },
    {
      labelPlacement: "inside",
      variant: ["faded", "bordered"],
      isMultiline: false,
      size: "md",
      class: {
        label: [
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px_-_theme(borderWidth.medium))]"
        ]
      }
    },
    {
      labelPlacement: "inside",
      variant: ["faded", "bordered"],
      isMultiline: false,
      size: "lg",
      class: {
        label: [
          "text-medium",
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_8px_-_theme(borderWidth.medium))]"
        ]
      }
    },
    {
      labelPlacement: "inside",
      variant: "underlined",
      isMultiline: false,
      size: "sm",
      class: {
        label: ["group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.tiny)/2_-_5px)]"]
      }
    },
    {
      labelPlacement: "inside",
      variant: "underlined",
      isMultiline: false,
      size: "md",
      class: {
        label: [
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_3.5px)]"
        ]
      }
    },
    {
      labelPlacement: "inside",
      variant: "underlined",
      isMultiline: false,
      size: "lg",
      class: {
        label: [
          "text-medium",
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_4px)]"
        ]
      }
    },
    {
      labelPlacement: "outside",
      size: "sm",
      isMultiline: false,
      class: {
        label: [
          "left-2",
          "rtl:right-2",
          "rtl:left-[unset]",
          "text-tiny",
          "group-data-[filled=true]:-translate-y-[calc(100%_+_theme(fontSize.tiny)/2_+_16px)]"
        ],
        base: "data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_8px)]"
      }
    },
    {
      labelPlacement: "outside",
      isMultiline: false,
      size: "md",
      class: {
        label: [
          "left-3",
          "rtl:right-3",
          "rtl:left-[unset]",
          "text-small",
          "group-data-[filled=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_20px)]"
        ],
        base: "data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_10px)]"
      }
    },
    {
      labelPlacement: "outside",
      isMultiline: false,
      size: "lg",
      class: {
        label: [
          "left-3",
          "rtl:right-3",
          "rtl:left-[unset]",
          "text-medium",
          "group-data-[filled=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_24px)]"
        ],
        base: "data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_12px)]"
      }
    },
    {
      labelPlacement: "outside",
      isMultiline: true,
      class: {
        label: "pb-1.5"
      }
    },
    {
      labelPlacement: ["inside", "outside"],
      class: {
        label: ["pe-2", "max-w-full", "text-ellipsis", "overflow-hidden"]
      }
    }
  ]
});

// src/components/menu.ts
var menu = tv({
  slots: {
    base: "w-full relative flex flex-col gap-1 p-1",
    list: "w-full flex flex-col gap-0.5 outline-none",
    emptyContent: [
      "h-10",
      "px-2",
      "py-1.5",
      "w-full",
      "h-full",
      "text-foreground-400",
      "text-start"
    ]
  }
});
var menuItem = tv({
  slots: {
    base: [
      "flex",
      "group",
      "gap-2",
      "items-center",
      "justify-between",
      "relative",
      "px-2",
      "py-1.5",
      "w-full",
      "h-full",
      "box-border",
      "rounded-small",
      "subpixel-antialiased",
      "outline-none",
      "cursor-pointer",
      "tap-highlight-transparent",
      ...dataFocusVisibleClasses,
      "data-[focus-visible=true]:dark:ring-offset-background-content1"
    ],
    wrapper: "w-full flex flex-col items-start justify-center",
    title: "flex-1 text-small font-normal truncate",
    description: ["w-full", "text-tiny", "text-foreground-500", "group-hover:text-current"],
    selectedIcon: ["text-inherit", "w-3", "h-3", "flex-shrink-0"],
    shortcut: [
      "px-1",
      "py-0.5",
      "rounded",
      "font-sans",
      "text-foreground-500",
      "text-tiny",
      "border-small",
      "border-default-300",
      "group-hover:border-current"
    ]
  },
  variants: {
    variant: {
      solid: {
        base: ""
      },
      bordered: {
        base: "border-medium border-transparent bg-transparent"
      },
      light: {
        base: "bg-transparent"
      },
      faded: {
        base: [
          "border-small border-transparent hover:border-default data-[hover=true]:bg-default-100",
          "data-[selectable=true]:focus:border-default data-[selectable=true]:focus:bg-default-100"
        ]
      },
      flat: {
        base: ""
      },
      shadow: {
        base: "data-[hover=true]:shadow-lg"
      }
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {}
    },
    showDivider: {
      true: {
        base: [
          "mb-1.5",
          "after:content-['']",
          "after:absolute",
          "after:-bottom-1",
          "after:left-0",
          "after:right-0",
          "after:h-divider",
          "after:bg-divider"
        ]
      },
      false: {}
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none"
      }
    },
    disableAnimation: {
      true: {},
      false: {
        base: "data-[hover=true]:transition-colors"
      }
    }
  },
  defaultVariants: {
    variant: "solid",
    color: "default",
    showDivider: false
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "default",
      class: {
        base: [
          "data-[hover=true]:bg-default",
          "data-[hover=true]:text-default-foreground",
          "data-[selectable=true]:focus:bg-default",
          "data-[selectable=true]:focus:text-default-foreground"
        ]
      }
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        base: [
          "data-[hover=true]:bg-primary data-[hover=true]:text-primary-foreground",
          "data-[selectable=true]:focus:bg-primary data-[selectable=true]:focus:text-primary-foreground"
        ]
      }
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: [
          "data-[hover=true]:bg-secondary data-[hover=true]:text-secondary-foreground",
          "data-[selectable=true]:focus:bg-secondary data-[selectable=true]:focus:text-secondary-foreground"
        ]
      }
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: [
          "data-[hover=true]:bg-success data-[hover=true]:text-success-foreground",
          "data-[selectable=true]:focus:bg-success data-[selectable=true]:focus:text-success-foreground"
        ]
      }
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: [
          "data-[hover=true]:bg-warning data-[hover=true]:text-warning-foreground",
          "data-[selectable=true]:focus:bg-warning data-[selectable=true]:focus:text-warning-foreground"
        ]
      }
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        base: [
          "data-[hover=true]:bg-danger data-[hover=true]:text-danger-foreground",
          "data-[selectable=true]:focus:bg-danger data-[selectable=true]:focus:text-danger-foreground"
        ]
      }
    },
    {
      variant: "shadow",
      color: "default",
      class: {
        base: [
          "data-[hover=true]:shadow-default/50 data-[hover=true]:bg-default data-[hover=true]:text-default-foreground",
          "data-[selectable=true]:focus:shadow-default/50 data-[selectable=true]:focus:bg-default data-[selectable=true]:focus:text-default-foreground"
        ]
      }
    },
    {
      variant: "shadow",
      color: "primary",
      class: {
        base: [
          "data-[hover=true]:shadow-primary/30 data-[hover=true]:bg-primary data-[hover=true]:text-primary-foreground",
          "data-[selectable=true]:focus:shadow-primary/30 data-[selectable=true]:focus:bg-primary data-[selectable=true]:focus:text-primary-foreground"
        ]
      }
    },
    {
      variant: "shadow",
      color: "secondary",
      class: {
        base: [
          "data-[hover=true]:shadow-secondary/30 data-[hover=true]:bg-secondary data-[hover=true]:text-secondary-foreground",
          "data-[selectable=true]:focus:shadow-secondary/30 data-[selectable=true]:focus:bg-secondary data-[selectable=true]:focus:text-secondary-foreground"
        ]
      }
    },
    {
      variant: "shadow",
      color: "success",
      class: {
        base: [
          "data-[hover=true]:shadow-success/30 data-[hover=true]:bg-success data-[hover=true]:text-success-foreground",
          "data-[selectable=true]:focus:shadow-success/30 data-[selectable=true]:focus:bg-success data-[selectable=true]:focus:text-success-foreground"
        ]
      }
    },
    {
      variant: "shadow",
      color: "warning",
      class: {
        base: [
          "data-[hover=true]:shadow-warning/30 data-[hover=true]:bg-warning data-[hover=true]:text-warning-foreground",
          "data-[selectable=true]:focus:shadow-warning/30 data-[selectable=true]:focus:bg-warning data-[selectable=true]:focus:text-warning-foreground"
        ]
      }
    },
    {
      variant: "shadow",
      color: "danger",
      class: {
        base: [
          "data-[hover=true]:shadow-danger/30 data-[hover=true]:bg-danger data-[hover=true]:text-danger-foreground",
          "data-[selectable=true]:focus:shadow-danger/30 data-[selectable=true]:focus:bg-danger data-[selectable=true]:focus:text-danger-foreground"
        ]
      }
    },
    {
      variant: "bordered",
      color: "default",
      class: {
        base: ["data-[hover=true]:border-default", "data-[selectable=true]:focus:border-default"]
      }
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        base: [
          "data-[hover=true]:border-primary data-[hover=true]:text-primary",
          "data-[selectable=true]:focus:border-primary data-[selectable=true]:focus:text-primary"
        ]
      }
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        base: [
          "data-[hover=true]:border-secondary data-[hover=true]:text-secondary",
          "data-[selectable=true]:focus:border-secondary data-[selectable=true]:focus:text-secondary"
        ]
      }
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        base: [
          "data-[hover=true]:border-success data-[hover=true]:text-success",
          "data-[selectable=true]:focus:border-success data-[selectable=true]:focus:text-success"
        ]
      }
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        base: [
          "data-[hover=true]:border-warning data-[hover=true]:text-warning",
          "data-[selectable=true]:focus:border-warning data-[selectable=true]:focus:text-warning"
        ]
      }
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        base: [
          "data-[hover=true]:border-danger data-[hover=true]:text-danger",
          "data-[selectable=true]:focus:border-danger data-[selectable=true]:focus:text-danger"
        ]
      }
    },
    {
      variant: "flat",
      color: "default",
      class: {
        base: [
          "data-[hover=true]:bg-default/40",
          "data-[hover=true]:text-default-foreground",
          "data-[selectable=true]:focus:bg-default/40",
          "data-[selectable=true]:focus:text-default-foreground"
        ]
      }
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        base: [
          "data-[hover=true]:bg-primary/20 data-[hover=true]:text-primary",
          "data-[selectable=true]:focus:bg-primary/20 data-[selectable=true]:focus:text-primary"
        ]
      }
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: [
          "data-[hover=true]:bg-secondary/20 data-[hover=true]:text-secondary",
          "data-[selectable=true]:focus:bg-secondary/20 data-[selectable=true]:focus:text-secondary"
        ]
      }
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: [
          "data-[hover=true]:bg-success/20 data-[hover=true]:text-success",
          "data-[selectable=true]:focus:bg-success/20 data-[selectable=true]:focus:text-success"
        ]
      }
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: [
          "data-[hover=true]:bg-warning/20 data-[hover=true]:text-warning",
          "data-[selectable=true]:focus:bg-warning/20 data-[selectable=true]:focus:text-warning"
        ]
      }
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        base: [
          "data-[hover=true]:bg-danger/20 data-[hover=true]:text-danger",
          "data-[selectable=true]:focus:bg-danger/20 data-[selectable=true]:focus:text-danger"
        ]
      }
    },
    {
      variant: "faded",
      color: "default",
      class: {
        base: [
          "data-[hover=true]:text-default-foreground",
          "data-[selectable=true]:focus:text-default-foreground"
        ]
      }
    },
    {
      variant: "faded",
      color: "primary",
      class: {
        base: ["data-[hover=true]:text-primary", "data-[selectable=true]:focus:text-primary"]
      }
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        base: ["data-[hover=true]:text-secondary", "data-[selectable=true]:focus:text-secondary"]
      }
    },
    {
      variant: "faded",
      color: "success",
      class: {
        base: ["data-[hover=true]:text-success", "data-[selectable=true]:focus:text-success"]
      }
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        base: ["data-[hover=true]:text-warning", "data-[selectable=true]:focus:text-warning"]
      }
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        base: ["data-[hover=true]:text-danger", "data-[selectable=true]:focus:text-danger"]
      }
    },
    {
      variant: "light",
      color: "default",
      class: {
        base: [
          "data-[hover=true]:text-default-500",
          "data-[selectable=true]:focus:text-default-500"
        ]
      }
    },
    {
      variant: "light",
      color: "primary",
      class: {
        base: ["data-[hover=true]:text-primary", "data-[selectable=true]:focus:text-primary"]
      }
    },
    {
      variant: "light",
      color: "secondary",
      class: {
        base: ["data-[hover=true]:text-secondary", "data-[selectable=true]:focus:text-secondary"]
      }
    },
    {
      variant: "light",
      color: "success",
      class: {
        base: ["data-[hover=true]:text-success", "data-[selectable=true]:focus:text-success"]
      }
    },
    {
      variant: "light",
      color: "warning",
      class: {
        base: ["data-[hover=true]:text-warning", "data-[selectable=true]:focus:text-warning"]
      }
    },
    {
      variant: "light",
      color: "danger",
      class: {
        base: ["data-[hover=true]:text-danger", "data-[selectable=true]:focus:text-danger"]
      }
    }
  ]
});
var menuSection = tv({
  slots: {
    base: "relative mb-2",
    heading: "pl-1 text-tiny text-foreground-500",
    group: "data-[has-title=true]:pt-1",
    divider: "mt-2"
  }
});

// src/components/scroll-shadow.ts
var verticalShadow = [
  "data-[top-scroll=true]:[mask-image:linear-gradient(0deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
  "data-[bottom-scroll=true]:[mask-image:linear-gradient(180deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
  "data-[top-bottom-scroll=true]:[mask-image:linear-gradient(#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]"
];
var horizontalShadow = [
  "data-[left-scroll=true]:[mask-image:linear-gradient(270deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
  "data-[right-scroll=true]:[mask-image:linear-gradient(90deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
  "data-[left-right-scroll=true]:[mask-image:linear-gradient(to_right,#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]"
];
var scrollShadow = tv({
  base: [],
  variants: {
    orientation: {
      vertical: ["overflow-y-auto", ...verticalShadow],
      horizontal: ["overflow-x-auto", ...horizontalShadow]
    },
    hideScrollBar: {
      true: "scrollbar-hide",
      false: ""
    }
  },
  defaultVariants: {
    orientation: "vertical",
    hideScrollBar: false
  }
});

// src/components/slider.ts
var slider = tv({
  slots: {
    base: "flex flex-col w-full gap-1",
    labelWrapper: "w-full flex justify-between items-center",
    label: "",
    value: "",
    step: [
      "h-1.5",
      "w-1.5",
      "absolute",
      "rounded-full",
      "bg-default-300/50",
      "data-[in-range=true]:bg-background/50"
    ],
    mark: [
      "absolute",
      "text-small",
      "cursor-default",
      "opacity-50",
      "data-[in-range=true]:opacity-100"
    ],
    trackWrapper: "relative flex gap-2",
    track: ["flex", "w-full", "relative", "rounded-full", "bg-default-300/50"],
    filler: "h-full absolute",
    thumb: [
      "flex",
      "justify-center",
      "items-center",
      "before:absolute",
      "before:w-11",
      "before:h-11",
      "before:rounded-full",
      "after:shadow-small",
      "after:shadow-small",
      "after:bg-background",
      "data-[focused=true]:z-10",
      dataFocusVisibleClasses
    ],
    startContent: [],
    endContent: []
  },
  variants: {
    size: {
      sm: {
        label: "text-small",
        value: "text-small",
        thumb: "w-5 h-5 after:w-4 after:h-4",
        step: "data-[in-range=false]:bg-default-200"
      },
      md: {
        thumb: "w-6 h-6 after:w-5 after:h-5",
        label: "text-small",
        value: "text-small"
      },
      lg: {
        thumb: "h-7 w-7 after:w-5 after:h-5",
        step: "w-2 h-2",
        label: "text-medium",
        value: "text-medium",
        mark: "mt-2"
      }
    },
    radius: {
      none: {
        thumb: "rounded-none after:rounded-none"
      },
      sm: {
        thumb: "rounded-[calc(theme(borderRadius.small)/2)] after:rounded-[calc(theme(borderRadius.small)/3)]"
      },
      md: {
        thumb: "rounded-[calc(theme(borderRadius.medium)/2)] after:rounded-[calc(theme(borderRadius.medium)/3)]"
      },
      lg: {
        thumb: "rounded-[calc(theme(borderRadius.large)/1.5)] after:rounded-[calc(theme(borderRadius.large)/2)]"
      },
      full: {
        thumb: "rounded-full after:rounded-full"
      }
    },
    color: {
      foreground: {
        filler: "bg-foreground",
        thumb: "bg-foreground"
      },
      primary: {
        filler: "bg-primary",
        thumb: "bg-primary"
      },
      secondary: {
        filler: "bg-secondary",
        thumb: "bg-secondary"
      },
      success: {
        filler: "bg-success",
        thumb: "bg-success"
      },
      warning: {
        filler: "bg-warning",
        thumb: "bg-warning"
      },
      danger: {
        filler: "bg-danger",
        thumb: "bg-danger"
      }
    },
    isVertical: {
      true: {
        base: "w-auto h-full flex-col-reverse items-center",
        trackWrapper: "flex-col h-full justify-center items-center",
        filler: "w-full h-auto",
        thumb: "left-1/2",
        track: "h-full border-y-transparent",
        labelWrapper: "flex-col justify-center items-center",
        step: ["left-1/2", "-translate-x-1/2", "translate-y-1/2"],
        mark: ["left-1/2", "ml-1", "translate-x-1/2", "translate-y-1/2"]
      },
      false: {
        thumb: "top-1/2",
        trackWrapper: "items-center",
        track: "border-x-transparent",
        step: ["top-1/2", "-translate-x-1/2", "-translate-y-1/2"],
        mark: ["top-1/2", "mt-1", "-translate-x-1/2", "translate-y-1/2"]
      }
    },
    isDisabled: {
      false: {
        thumb: ["cursor-grab", "data-[dragging=true]:cursor-grabbing"]
      },
      true: {
        base: "opacity-disabled",
        thumb: "cursor-default"
      }
    },
    hasMarks: {
      true: {
        base: "mb-5",
        mark: "cursor-pointer"
      },
      false: {}
    },
    showOutline: {
      true: {
        thumb: "ring-2 ring-background"
      },
      false: {
        thumb: "ring-transparent border-0"
      }
    },
    hideValue: {
      true: {
        value: "sr-only"
      }
    },
    hideThumb: {
      true: {
        thumb: "sr-only",
        track: "cursor-pointer"
      }
    },
    hasSingleThumb: {
      true: {},
      false: {}
    },
    disableAnimation: {
      true: {
        thumb: "data-[dragging=true]:after:scale-100"
      },
      false: {
        thumb: "after:transition-all motion-reduce:after:transition-none",
        mark: "transition-opacity motion-reduce:transition-none"
      }
    },
    disableThumbScale: {
      true: {},
      false: {
        thumb: "data-[dragging=true]:after:scale-80"
      }
    }
  },
  compoundVariants: [
    {
      size: ["sm", "md"],
      showOutline: false,
      class: {
        thumb: "shadow-small"
      }
    },
    {
      size: "sm",
      color: "foreground",
      class: {
        step: "data-[in-range=true]:bg-foreground"
      }
    },
    {
      size: "sm",
      color: "primary",
      class: {
        step: "data-[in-range=true]:bg-primary"
      }
    },
    {
      size: "sm",
      color: "secondary",
      class: {
        step: "data-[in-range=true]:bg-secondary"
      }
    },
    {
      size: "sm",
      color: "success",
      class: {
        step: "data-[in-range=true]:bg-success"
      }
    },
    {
      size: "sm",
      color: "warning",
      class: {
        step: "data-[in-range=true]:bg-warning"
      }
    },
    {
      size: "sm",
      color: "danger",
      class: {
        step: "data-[in-range=true]:bg-danger"
      }
    },
    {
      size: "sm",
      isVertical: false,
      class: {
        track: "h-1 my-[calc((theme(spacing.5)-theme(spacing.1))/2)] border-x-[calc(theme(spacing.5)/2)]"
      }
    },
    {
      size: "md",
      isVertical: false,
      class: {
        track: "h-3 my-[calc((theme(spacing.6)-theme(spacing.3))/2)] border-x-[calc(theme(spacing.6)/2)]"
      }
    },
    {
      size: "lg",
      isVertical: false,
      class: {
        track: "h-7 my-[calc((theme(spacing.7)-theme(spacing.5))/2)] border-x-[calc(theme(spacing.7)/2)]"
      }
    },
    {
      size: "sm",
      isVertical: true,
      class: {
        track: "w-1 mx-[calc((theme(spacing.5)-theme(spacing.1))/2)] border-y-[calc(theme(spacing.5)/2)]"
      }
    },
    {
      size: "md",
      isVertical: true,
      class: {
        track: "w-3 mx-[calc((theme(spacing.6)-theme(spacing.3))/2)] border-y-[calc(theme(spacing.6)/2)]"
      }
    },
    {
      size: "lg",
      isVertical: true,
      class: {
        track: "w-7 mx-[calc((theme(spacing.7)-theme(spacing.5))/2)] border-y-[calc(theme(spacing.7)/2)]"
      }
    },
    {
      color: "foreground",
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: "border-s-foreground"
      }
    },
    {
      color: "primary",
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: "border-s-primary"
      }
    },
    {
      color: "secondary",
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: "border-s-secondary"
      }
    },
    {
      color: "success",
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: "border-s-success"
      }
    },
    {
      color: "warning",
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: "border-s-warning"
      }
    },
    {
      color: "danger",
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: "border-s-danger"
      }
    },
    {
      color: "foreground",
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: "border-b-foreground"
      }
    },
    {
      color: "primary",
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: "border-b-primary"
      }
    },
    {
      color: "secondary",
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: "border-b-secondary"
      }
    },
    {
      color: "success",
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: "border-b-success"
      }
    },
    {
      color: "warning",
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: "border-b-warning"
      }
    },
    {
      color: "danger",
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: "border-b-danger"
      }
    }
  ],
  defaultVariants: {
    size: "md",
    color: "primary",
    radius: "full",
    hideValue: false,
    hideThumb: false,
    isDisabled: false,
    disableThumbScale: false,
    showOutline: false
  }
});

// src/components/breadcrumbs.ts
var breadcrumbItem = tv({
  slots: {
    base: "flex items-center",
    item: [
      "flex gap-1 items-center",
      "cursor-pointer",
      "whitespace-nowrap",
      "line-clamp-1",
      "outline-none",
      "tap-highlight-transparent",
      ...dataFocusVisibleClasses
    ],
    separator: "text-default-400 px-1"
  },
  variants: {
    color: {
      foreground: {
        item: "text-foreground/50",
        separator: "text-foreground/50"
      },
      primary: {
        item: "text-primary/80",
        separator: "text-primary/80"
      },
      secondary: {
        item: "text-secondary/80",
        separator: "text-secondary/80"
      },
      success: {
        item: "text-success/80",
        separator: "text-success/80"
      },
      warning: {
        item: "text-warning/80",
        separator: "text-warning/80"
      },
      danger: {
        item: "text-danger/80",
        separator: "text-danger/80"
      }
    },
    size: {
      sm: {
        item: "text-tiny"
      },
      md: {
        item: "text-small"
      },
      lg: {
        item: "text-medium"
      }
    },
    underline: {
      none: {
        item: "no-underline"
      },
      hover: {
        item: "hover:underline"
      },
      always: {
        item: "underline"
      },
      active: {
        item: "active:underline"
      },
      focus: {
        item: "focus:underline"
      }
    },
    isCurrent: {
      true: {
        item: "cursor-default"
      },
      false: {
        item: ["hover:opacity-80", "active:opacity-disabled"]
      }
    },
    isDisabled: {
      true: {
        item: "opacity-disabled pointer-events-none",
        separator: "opacity-disabled"
      }
    },
    disableAnimation: {
      false: {
        item: "transition-opacity"
      },
      true: {
        item: "transition-none"
      }
    }
  },
  defaultVariants: {
    size: "md",
    color: "foreground",
    underline: "hover",
    isDisabled: false
  },
  compoundVariants: [
    {
      isCurrent: true,
      color: "foreground",
      class: {
        item: "text-foreground"
      }
    },
    {
      isCurrent: true,
      color: "primary",
      class: {
        item: "text-primary"
      }
    },
    {
      isCurrent: true,
      color: "secondary",
      class: {
        item: "text-secondary"
      }
    },
    {
      isCurrent: true,
      color: "success",
      class: {
        item: "text-success"
      }
    },
    {
      isCurrent: true,
      color: "warning",
      class: {
        item: "text-warning"
      }
    },
    {
      isCurrent: true,
      color: "danger",
      class: {
        item: "text-danger"
      }
    },
    {
      isCurrent: false,
      underline: "none",
      class: {
        item: "no-underline"
      }
    },
    {
      underline: ["hover", "always", "active", "focus"],
      class: "underline-offset-4"
    }
  ]
});
var breadcrumbs = tv({
  slots: {
    base: "",
    list: "flex flex-wrap list-none",
    ellipsis: "text-medium",
    separator: "text-default-400 px-1"
  },
  variants: {
    size: {
      sm: {},
      md: {},
      lg: {}
    },
    radius: {
      none: {
        list: "rounded-none"
      },
      sm: {
        list: "rounded-small"
      },
      md: {
        list: "rounded-medium"
      },
      lg: {
        list: "rounded-large"
      },
      full: {
        list: "rounded-full"
      }
    },
    variant: {
      solid: {
        list: "bg-default-100"
      },
      bordered: {
        list: "border-medium border-default-200 shadow-sm"
      },
      light: {}
    }
  },
  defaultVariants: {
    size: "md",
    radius: "sm",
    variant: "light"
  },
  compoundVariants: [
    {
      variant: ["solid", "bordered"],
      class: {
        list: "max-w-fit"
      }
    },
    {
      variant: ["solid", "bordered"],
      size: "sm",
      class: {
        list: "px-2 py-1"
      }
    },
    {
      variant: ["solid", "bordered"],
      size: "md",
      class: {
        list: "px-2.5 py-1.5"
      }
    },
    {
      variant: ["solid", "bordered"],
      size: "lg",
      class: {
        list: "px-3 py-2"
      }
    }
  ]
});

// src/components/autocomplete.ts
var autocomplete = tv({
  slots: {
    base: "group inline-flex flex-column w-full",
    listboxWrapper: "scroll-py-6 max-h-64 w-full",
    listbox: "",
    popoverContent: "w-full p-1 overflow-hidden",
    endContentWrapper: "relative flex h-full items-center -mr-2",
    clearButton: [
      "text-medium",
      "translate-x-1",
      "cursor-text",
      "opacity-0",
      "text-default-500",
      "group-data-[invalid=true]:text-danger",
      "data-[visible=true]:opacity-100",
      "data-[visible=true]:cursor-pointer",
      "sm:data-[visible=true]:opacity-0",
      "sm:group-data-[hover=true]:data-[visible=true]:opacity-100"
    ],
    selectorButton: "text-medium"
  },
  variants: {
    isClearable: {
      true: {},
      false: {
        clearButton: "hidden"
      }
    },
    disableAnimation: {
      true: {
        selectorButton: "transition-none"
      },
      false: {
        selectorButton: "transition-transform duration-150 ease motion-reduce:transition-none"
      }
    },
    disableSelectorIconRotation: {
      true: {},
      false: {
        selectorButton: "data-[open=true]:rotate-180"
      }
    }
  },
  defaultVariants: {
    isClearable: true,
    disableSelectorIconRotation: false
  }
});

// src/components/calendar.ts
var calendar = tv({
  slots: {
    base: [
      "relative w-fit max-w-full shadow-small inline-block overflow-y-hidden",
      "rounded-large overflow-x-auto bg-default-50 dark:bg-background",
      "w-[calc(var(--visible-months)_*_var(--calendar-width))]"
    ],
    prevButton: [],
    nextButton: [],
    headerWrapper: [
      "px-4 py-2 flex items-center justify-between gap-2 bg-content1 overflow-hidden",
      "[&_.chevron-icon]:flex-none",
      "after:content-['']",
      "after:bg-content1 origin-top",
      "after:w-full after:h-0",
      "after:absolute after:top-0 after:left-0"
    ],
    header: "flex w-full items-center justify-center gap-2 z-10",
    title: "text-default-500 text-small font-medium",
    content: "w-[calc(var(--visible-months)_*_var(--calendar-width))]",
    gridWrapper: "flex max-w-full overflow-hidden pb-2 h-auto relative",
    grid: "w-full border-collapse z-0",
    gridHeader: "bg-content1 shadow-[0px_20px_20px_0px_rgb(0_0_0/0.05)]",
    gridHeaderRow: "px-4 pb-2 flex justify-center text-default-400",
    gridHeaderCell: "flex w-8 justify-center items-center font-medium text-small",
    gridBody: "",
    gridBodyRow: "flex justify-center items-center first:mt-2",
    cell: "py-0.5 px-0",
    cellButton: [
      "w-8 h-8 flex items-center text-foreground justify-center rounded-full",
      "box-border appearance-none select-none whitespace-nowrap font-normal",
      "subpixel-antialiased overflow-hidden tap-highlight-transparent",
      "data-[disabled=true]:text-default-300",
      "data-[disabled=true]:cursor-default",
      "data-[readonly=true]:cursor-default",
      "data-[disabled=true]:transition-none",
      "data-[unavailable=true]:text-default-300",
      "data-[unavailable=true]:cursor-default",
      "data-[unavailable=true]:line-through",
      ...dataFocusVisibleClasses
    ],
    pickerWrapper: "absolute inset-x-0 top-0 flex w-full h-[var(--picker-height)] justify-center opacity-0 pointer-events-none",
    pickerMonthList: "items-start",
    pickerYearList: "items-center",
    pickerHighlight: "h-8 bg-default-200 absolute w-[calc(100%_-_16px)] rounded-medium z-0 top-1/2 -translate-y-1/2 pointer-events-none",
    pickerItem: [
      "w-full flex text-foreground items-center h-8 leading-[32px] min-h-[32px] snap-center text-large z-20",
      "data-[pressed=true]:opacity-50",
      ...dataFocusVisibleClasses
    ],
    helperWrapper: "px-4 pb-2 max-w-[270px] flex justify-start flex-wrap items-center",
    errorMessage: "text-small text-danger break-words max-w-full"
  },
  variants: {
    color: {
      foreground: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {}
    },
    isRange: {
      true: {
        cellButton: [
          "relative",
          "overflow-visible",
          "before:content-[''] before:absolute before:inset-0 before:z-[-1] before:rounded-none",
          "data-[outside-month=true]:before:hidden",
          "data-[selected=true]:data-[range-selection=true]:data-[outside-month=true]:bg-transparent",
          "data-[selected=true]:data-[range-selection=true]:data-[outside-month=true]:text-default-300",
          "data-[range-start=true]:before:rounded-l-full",
          "data-[selection-start=true]:before:rounded-l-full",
          "data-[range-end=true]:before:rounded-r-full",
          "data-[selection-end=true]:before:rounded-r-full",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:rounded-full",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:rounded-full"
        ]
      },
      false: {}
    },
    hideDisabledDates: {
      true: {
        cellButton: "data-[disabled=true]:data-[outside-month=true]:opacity-0"
      },
      false: {}
    },
    isHeaderWrapperExpanded: {
      true: {
        headerWrapper: ["[&_.chevron-icon]:rotate-180", "after:h-full", "after:z-0"],
        pickerWrapper: "opacity-100 pointer-events-auto z-10",
        gridWrapper: "h-[var(--picker-height)] overflow-y-hidden",
        grid: "opacity-0 pointer-events-none",
        nextButton: "opacity-0 pointer-events-none",
        prevButton: "opacity-0 pointer-events-none"
      },
      false: {}
    },
    showMonthAndYearPickers: {
      true: {
        base: "[--picker-height:224px]",
        header: "h-8 bg-default-100 rounded-full"
      },
      false: {}
    },
    showShadow: {
      true: {
        cellButton: "data-[selected=true]:shadow-md"
      },
      false: {
        cellButton: "shadow-none data-[selected=true]:shadow-none"
      }
    },
    disableAnimation: {
      true: {
        cellButton: "transition-none"
      },
      false: {
        headerWrapper: ["[&_.chevron-icon]:transition-transform", "after:transition-height"],
        grid: "transition-opacity",
        cellButton: ["origin-center transition-[transform,background-color,color] !duration-150"],
        pickerWrapper: "transition-opacity !duration-250",
        pickerItem: "transition-opacity"
      }
    }
  },
  defaultVariants: {
    color: "primary",
    showShadow: false,
    hideDisabledDates: false,
    showMonthAndYearPickers: false
  },
  compoundVariants: [
    {
      isRange: false,
      color: "foreground",
      class: {
        cellButton: [
          "data-[hover=true]:bg-default-200",
          "data-[selected=true]:bg-foreground",
          "data-[selected=true]:text-background",
          "data-[hover=true]:bg-foreground-200",
          "data-[hover=true]:text-foreground-600",
          "data-[selected=true]:data-[hover=true]:bg-foreground",
          "data-[selected=true]:data-[hover=true]:text-background"
        ]
      }
    },
    {
      isRange: false,
      color: "primary",
      class: {
        cellButton: [
          "data-[selected=true]:bg-primary",
          "data-[selected=true]:text-primary-foreground",
          "data-[hover=true]:bg-primary-50",
          "data-[hover=true]:text-primary-400",
          "data-[selected=true]:data-[hover=true]:bg-primary",
          "data-[selected=true]:data-[hover=true]:text-primary-foreground"
        ]
      }
    },
    {
      isRange: false,
      color: "secondary",
      class: {
        cellButton: [
          "data-[selected=true]:bg-secondary",
          "data-[selected=true]:text-secondary-foreground",
          "data-[hover=true]:bg-secondary-50",
          "data-[hover=true]:text-secondary-400",
          "data-[selected=true]:data-[hover=true]:bg-secondary",
          "data-[selected=true]:data-[hover=true]:text-secondary-foreground"
        ]
      }
    },
    {
      isRange: false,
      color: "success",
      class: {
        cellButton: [
          "data-[selected=true]:bg-success",
          "data-[selected=true]:text-success-foreground",
          "data-[hover=true]:bg-success-100",
          "data-[hover=true]:text-success-600",
          "dark:data-[hover=true]:bg-success-50",
          "dark:data-[hover=true]:text-success-500",
          "data-[selected=true]:data-[hover=true]:bg-success",
          "dark:data-[selected=true]:data-[hover=true]:bg-success",
          "dark:data-[selected=true]:data-[hover=true]:text-success-foreground",
          "data-[selected=true]:data-[hover=true]:text-success-foreground"
        ]
      }
    },
    {
      isRange: false,
      color: "warning",
      class: {
        cellButton: [
          "data-[selected=true]:bg-warning",
          "data-[selected=true]:text-warning-foreground",
          "data-[hover=true]:bg-warning-100",
          "data-[hover=true]:text-warning-600",
          "dark:data-[hover=true]:bg-warning-50",
          "dark:data-[hover=true]:text-warning-500",
          "data-[selected=true]:data-[hover=true]:bg-warning",
          "dark:data-[selected=true]:data-[hover=true]:bg-warning",
          "dark:data-[selected=true]:data-[hover=true]:text-warning-foreground",
          "data-[selected=true]:data-[hover=true]:text-warning-foreground"
        ]
      }
    },
    {
      isRange: false,
      color: "danger",
      class: {
        cellButton: [
          "data-[selected=true]:bg-danger",
          "data-[selected=true]:text-danger-foreground",
          "data-[hover=true]:bg-danger-100",
          "data-[hover=true]:text-danger-500",
          "dark:data-[hover=true]:bg-danger-50",
          "dark:data-[hover=true]:text-danger-500",
          "data-[selected=true]:data-[hover=true]:bg-danger",
          "dark:data-[selected=true]:data-[hover=true]:bg-danger",
          "dark:data-[selected=true]:data-[hover=true]:text-danger-foreground",
          "data-[selected=true]:data-[hover=true]:text-danger-foreground"
        ]
      }
    },
    {
      isRange: true,
      color: "foreground",
      class: {
        cellButton: [
          "data-[selected=true]:data-[range-selection=true]:before:bg-foreground/10",
          "data-[selected=true]:data-[range-selection=true]:text-foreground",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-foreground",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-background",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-foreground",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-background"
        ]
      }
    },
    {
      isRange: true,
      color: "primary",
      class: {
        cellButton: [
          "data-[selected=true]:data-[range-selection=true]:before:bg-primary-50",
          "data-[selected=true]:data-[range-selection=true]:text-primary",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-primary",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-primary-foreground",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-primary",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-primary-foreground"
        ]
      }
    },
    {
      isRange: true,
      color: "secondary",
      class: {
        cellButton: [
          "data-[selected=true]:data-[range-selection=true]:before:bg-secondary-50",
          "data-[selected=true]:data-[range-selection=true]:text-secondary",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-secondary",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-secondary-foreground",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-secondary",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-secondary-foreground"
        ]
      }
    },
    {
      isRange: true,
      color: "success",
      class: {
        cellButton: [
          "data-[selected=true]:data-[range-selection=true]:before:bg-success-100",
          "data-[selected=true]:data-[range-selection=true]:text-success-600",
          "dark:data-[selected=true]:data-[range-selection=true]:before:bg-success-50",
          "dark:data-[selected=true]:data-[range-selection=true]:text-success-500",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-success",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-success-foreground",
          "dark:data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-success-foreground",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-success",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-success-foreground",
          "dark:data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-success-foreground"
        ]
      }
    },
    {
      isRange: true,
      color: "warning",
      class: {
        cellButton: [
          "data-[selected=true]:data-[range-selection=true]:before:bg-warning-100",
          "dark:data-[selected=true]:data-[range-selection=true]:before:bg-warning-50",
          "data-[selected=true]:data-[range-selection=true]:text-warning-500",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-warning",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-warning-foreground",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-warning",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-warning-foreground"
        ]
      }
    },
    {
      isRange: true,
      color: "danger",
      class: {
        cellButton: [
          "data-[selected=true]:data-[range-selection=true]:before:bg-danger-50",
          "data-[selected=true]:data-[range-selection=true]:text-danger-500",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-danger",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-danger-foreground",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-danger",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-danger-foreground"
        ]
      }
    },
    {
      showShadow: true,
      color: "foreground",
      class: {
        cellButton: "data-[selected=true]:shadow-foreground/40"
      }
    },
    {
      showShadow: true,
      color: "primary",
      class: {
        cellButton: "data-[selected=true]:shadow-primary/40"
      }
    },
    {
      showShadow: true,
      color: "secondary",
      class: {
        cellButton: "data-[selected=true]:shadow-secondary/40"
      }
    },
    {
      showShadow: true,
      color: "success",
      class: {
        cellButton: "data-[selected=true]:shadow-success/40"
      }
    },
    {
      showShadow: true,
      color: "warning",
      class: {
        cellButton: "data-[selected=true]:shadow-warning/40"
      }
    },
    {
      showShadow: true,
      color: "danger",
      class: {
        cellButton: "data-[selected=true]:shadow-danger/40"
      }
    },
    {
      showShadow: true,
      isRange: true,
      class: {
        cellButton: [
          "data-[selected=true]:shadow-none",
          "data-[selected=true]:data-[selection-start=true]:shadow-md",
          "data-[selected=true]:data-[selection-end=true]:shadow-md"
        ]
      }
    }
  ],
  compoundSlots: [
    {
      slots: ["prevButton", "nextButton"],
      class: ["text-medium", "text-default-400"]
    },
    {
      slots: ["pickerMonthList", "pickerYearList"],
      class: [
        "flex flex-col px-4 overflow-y-scroll scrollbar-hide snap-y snap-mandatory",
        "[--scroll-shadow-size:100px]",
        "[mask-image:linear-gradient(#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]"
      ]
    }
  ]
});

// src/components/date-input.ts
var dateInput = tv({
  slots: {
    base: "group flex flex-col",
    label: [
      "block subpixel-antialiased text-small text-default-600",
      "group-data-[required=true]:after:content-['*'] group-data-[required=true]:after:text-danger group-data-[required=true]:after:ml-0.5",
      "group-data-[invalid=true]:text-danger"
    ],
    inputWrapper: [
      "relative px-3 gap-3 w-full inline-flex flex-row items-center",
      "cursor-text tap-highlight-transparent shadow-sm"
    ],
    input: "flex h-full gap-x-0.5 w-full font-normal",
    innerWrapper: [
      "flex items-center text-default-400 w-full gap-x-2 h-6",
      "group-data-[invalid=true]:text-danger"
    ],
    segment: [
      "group first:-ml-0.5 [&:not(:first-child)]:-ml-1 px-0.5 my-auto box-content tabular-nums text-start",
      "inline-block outline-none focus:shadow-sm rounded-md",
      "text-foreground-500 data-[editable=true]:text-foreground",
      "data-[editable=true]:data-[placeholder=true]:text-foreground-500",
      "data-[invalid=true]:text-danger-300 data-[invalid=true]:data-[editable=true]:text-danger",
      "data-[invalid=true]:focus:bg-danger-400/50 dark:data-[invalid=true]:focus:bg-danger-400/20",
      "data-[invalid=true]:data-[editable=true]:focus:text-danger"
    ],
    helperWrapper: "hidden group-data-[has-helper=true]:flex p-1 relative flex-col gap-1.5",
    description: "text-tiny text-foreground-400",
    errorMessage: "text-tiny text-danger"
  },
  variants: {
    variant: {
      flat: {
        inputWrapper: [
          "bg-default-100",
          "hover:bg-default-200",
          "focus-within:hover:bg-default-100",
          "group-data-[invalid=true]:bg-danger-50",
          "group-data-[invalid=true]:hover:bg-danger-100",
          "group-data-[invalid=true]:focus-within:hover:bg-danger-50"
        ]
      },
      faded: {
        inputWrapper: [
          "bg-default-100",
          "border-medium",
          "border-default-200",
          "hover:border-default-400",
          "group-data-[invalid=true]:bg-danger-50",
          "group-data-[invalid=true]:hover:bg-danger-100",
          "group-data-[invalid=true]:focus-within:hover:bg-danger-50"
        ]
      },
      bordered: {
        inputWrapper: [
          "border-medium",
          "border-default-200",
          "hover:border-default-400",
          "focus-within:border-default-foreground",
          "focus-within:hover:border-default-foreground",
          "group-data-[invalid=true]:border-danger",
          "group-data-[invalid=true]:hover:border-danger",
          "group-data-[invalid=true]:focus-within:hover:border-danger"
        ]
      },
      underlined: {
        inputWrapper: [
          "px-1",
          "pb-1",
          "gap-0",
          "relative",
          "box-border",
          "border-b-medium",
          "shadow-[0_1px_0px_0_rgba(0,0,0,0.05)]",
          "border-default-200",
          "!rounded-none",
          "hover:border-default-300",
          "after:content-['']",
          "after:w-0",
          "after:origin-center",
          "after:bg-default-foreground",
          "after:absolute",
          "after:left-1/2",
          "after:-translate-x-1/2",
          "after:-bottom-[2px]",
          "after:h-[2px]",
          "focus-within:after:w-full",
          "group-data-[invalid=true]:after:bg-danger"
        ]
      }
    },
    color: {
      default: {
        segment: "focus:bg-default-400/50 data-[editable=true]:focus:text-default-foreground"
      },
      primary: {
        segment: "focus:bg-primary-400/50 data-[editable=true]:focus:text-primary"
      },
      secondary: {
        segment: "focus:bg-secondary-400/50 data-[editable=true]:focus:text-secondary"
      },
      success: {
        segment: "focus:bg-success-400/50 dark:focus:bg-success-400/20 data-[editable=true]:focus:text-success"
      },
      warning: {
        segment: "focus:bg-warning-400/50 dark:focus:bg-warning-400/20 data-[editable=true]:focus:text-warning"
      },
      danger: {
        segment: "focus:bg-danger-400/50 dark:focus:bg-danger-400/20 data-[editable=true]:focus:text-danger"
      }
    },
    size: {
      sm: {
        label: "text-tiny",
        input: "text-small",
        inputWrapper: "h-8 min-h-8 px-2 rounded-small"
      },
      md: {
        input: "text-small",
        inputWrapper: "h-10 min-h-10 rounded-medium",
        clearButton: "text-large"
      },
      lg: {
        input: "text-medium",
        inputWrapper: "h-12 min-h-12 rounded-large"
      }
    },
    radius: {
      none: {
        inputWrapper: "rounded-none"
      },
      sm: {
        inputWrapper: "rounded-small"
      },
      md: {
        inputWrapper: "rounded-medium"
      },
      lg: {
        inputWrapper: "rounded-large"
      },
      full: {
        inputWrapper: "rounded-full"
      }
    },
    labelPlacement: {
      outside: {
        base: "flex flex-col data-[has-helper=true]:pb-[calc(theme(fontSize.tiny)_+8px)] gap-y-1.5",
        label: "w-full text-foreground",
        helperWrapper: "absolute top-[calc(100%_+_2px)] left-0 rtl:right-0"
      },
      "outside-left": {
        base: "flex-row items-center data-[has-helper=true]:pb-[calc(theme(fontSize.tiny)_+_8px)] gap-x-2 flex-nowrap",
        label: "relative text-foreground",
        inputWrapper: "relative flex-1",
        helperWrapper: "absolute top-[calc(100%_+_2px)] left-0 rtl:right-0"
      },
      inside: {
        label: "w-full text-tiny cursor-text",
        inputWrapper: "flex-col items-start justify-center gap-0"
      }
    },
    fullWidth: {
      true: {
        base: "w-full",
        inputWrapper: "w-full"
      }
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
        inputWrapper: "pointer-events-none",
        label: "pointer-events-none"
      }
    },
    disableAnimation: {
      true: {
        label: "transition-none",
        input: "transition-none",
        inputWrapper: "transition-none"
      },
      false: {
        label: [
          "!ease-out",
          "!duration-200",
          "will-change-auto",
          "motion-reduce:transition-none",
          "transition-[color,opacity]"
        ],
        inputWrapper: "transition-background motion-reduce:transition-none !duration-150",
        segment: "transition-colors motion-reduce:transition-none"
      }
    }
  },
  defaultVariants: {
    variant: "flat",
    color: "default",
    size: "md",
    fullWidth: true,
    labelPlacement: "inside",
    isDisabled: false
  },
  compoundVariants: [
    {
      variant: "flat",
      color: "primary",
      class: {
        innerWrapper: "text-primary",
        inputWrapper: ["bg-primary-50", "hover:bg-primary-100", "focus-within:bg-primary-50"],
        segment: "text-primary-300 data-[editable=true]:data-[placeholder=true]:text-primary-300 data-[editable=true]:text-primary",
        label: "text-primary"
      }
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        innerWrapper: "text-secondary",
        inputWrapper: ["bg-secondary-50", "hover:bg-secondary-100", "focus-within:bg-secondary-50"],
        segment: "text-secondary-300 data-[editable=true]:data-[placeholder=true]:text-secondary-300 data-[editable=true]:text-secondary",
        label: "text-secondary"
      }
    },
    {
      variant: "flat",
      color: "success",
      class: {
        innerWrapper: "text-success-600 dark:text-success",
        inputWrapper: ["bg-success-50", "hover:bg-success-100", "focus-within:bg-success-50"],
        segment: "text-success-400 data-[editable=true]:data-[placeholder=true]:text-success-400 data-[editable=true]:text-success-600 data-[editable=true]:focus:text-success-600",
        label: "text-success-600 dark:text-success"
      }
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        innerWrapper: "text-warning-600 dark:text-warning",
        inputWrapper: ["bg-warning-50", "hover:bg-warning-100", "focus-within:bg-warning-50"],
        segment: "text-warning-400 data-[editable=true]:data-[placeholder=true]:text-warning-400 data-[editable=true]:text-warning-600 data-[editable=true]:focus:text-warning-600",
        label: "text-warning-600 dark:text-warning"
      }
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        innerWrapper: "text-danger",
        inputWrapper: ["bg-danger-50", "hover:bg-danger-100", "focus-within:bg-danger-50"],
        segment: "text-danger-300 data-[editable=true]:data-[placeholder=true]:text-danger-300 data-[editable=true]:text-danger",
        label: "text-danger"
      }
    },
    {
      variant: ["bordered", "faded"],
      color: "primary",
      class: {
        innerWrapper: "text-primary",
        inputWrapper: ["focus-within:border-primary", "focus-within:hover:border-primary"],
        label: "text-primary"
      }
    },
    {
      variant: ["bordered", "faded"],
      color: "secondary",
      class: {
        innerWrapper: "text-secondary",
        inputWrapper: ["focus-within:border-secondary", "focus-within:hover:border-secondary"],
        label: "text-secondary"
      }
    },
    {
      variant: ["bordered", "faded"],
      color: "success",
      class: {
        innerWrapper: "text-success",
        inputWrapper: ["focus-within:border-success", "focus-within:hover:border-success"],
        label: "text-success"
      }
    },
    {
      variant: ["bordered", "faded"],
      color: "warning",
      class: {
        innerWrapper: "text-warning",
        inputWrapper: ["focus-within:border-warning", "focus-within:hover:border-warning"],
        label: "text-warning"
      }
    },
    {
      variant: ["bordered", "faded"],
      color: "danger",
      class: {
        innerWrapper: "text-danger",
        inputWrapper: ["focus-within:border-danger", "focus-within:hover:border-danger"],
        label: "text-danger"
      }
    },
    {
      variant: "underlined",
      color: "primary",
      class: {
        innerWrapper: "text-primary",
        inputWrapper: "after:bg-primary",
        label: "text-primary"
      }
    },
    {
      variant: "underlined",
      color: "secondary",
      class: {
        innerWrapper: "text-secondary",
        inputWrapper: "after:bg-secondary",
        label: "text-secondary"
      }
    },
    {
      variant: "underlined",
      color: "success",
      class: {
        innerWrapper: "text-success",
        inputWrapper: "after:bg-success",
        label: "text-success"
      }
    },
    {
      variant: "underlined",
      color: "warning",
      class: {
        innerWrapper: "text-warning",
        inputWrapper: "after:bg-warning",
        label: "text-warning"
      }
    },
    {
      variant: "underlined",
      color: "danger",
      class: {
        innerWrapper: "text-danger",
        inputWrapper: "after:bg-danger",
        label: "text-danger"
      }
    },
    {
      labelPlacement: "inside",
      size: "sm",
      class: {
        inputWrapper: "h-12 py-1.5 px-3"
      }
    },
    {
      labelPlacement: "inside",
      size: "md",
      class: {
        inputWrapper: "h-14 py-2"
      }
    },
    {
      labelPlacement: "inside",
      size: "lg",
      class: {
        label: "text-small",
        inputWrapper: "h-16 py-2.5 gap-0"
      }
    },
    {
      disableAnimation: false,
      variant: ["faded", "bordered"],
      class: {
        inputWrapper: "transition-colors motion-reduce:transition-none"
      }
    },
    {
      disableAnimation: false,
      variant: "underlined",
      class: {
        inputWrapper: "after:transition-width motion-reduce:after:transition-none"
      }
    }
  ]
});

// src/components/date-picker.ts
var datePicker = tv({
  slots: {
    base: "group w-full",
    selectorButton: "-mr-2 text-inherit",
    selectorIcon: "text-lg text-inherit pointer-events-none flex-shrink-0",
    popoverContent: "p-0 w-full",
    calendar: "w-[calc(var(--visible-months)_*_var(--calendar-width))] shadow-none",
    calendarContent: "w-[calc(var(--visible-months)_*_var(--calendar-width))]",
    timeInputLabel: "font-medium",
    timeInput: "px-5 pb-4 flex-wrap gap-x-6"
  }
});
var dateRangePicker = tv({
  extend: datePicker,
  slots: {
    calendar: "group",
    bottomContent: "flex flex-col gap-y-2",
    timeInputWrapper: "flex flex-col group-data-[has-multiple-months=true]:flex-row",
    separator: "-mx-1 text-inherit"
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  accordion,
  accordionItem,
  autocomplete,
  avatar,
  avatarGroup,
  badge,
  breadcrumbItem,
  breadcrumbs,
  button,
  buttonGroup,
  calendar,
  card,
  checkbox,
  checkboxGroup,
  chip,
  circularProgress,
  code,
  dateInput,
  datePicker,
  dateRangePicker,
  divider,
  drip,
  dropdown,
  dropdownItem,
  dropdownMenu,
  dropdownSection,
  image,
  input,
  kbd,
  link,
  linkAnchorClasses,
  listbox,
  listboxItem,
  listboxSection,
  menu,
  menuItem,
  menuSection,
  modal,
  navbar,
  pagination,
  popover,
  progress,
  radio,
  radioGroup,
  scrollShadow,
  select,
  skeleton,
  slider,
  snippet,
  spacer,
  spinner,
  table,
  tabs,
  toggle,
  user
});
