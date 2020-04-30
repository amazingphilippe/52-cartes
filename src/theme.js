const buttons = {
  borderRadius: "none",
  fontFamily: "body",
  fontSize: "text",
  border: "0",
  height: 40,
  p: 0,
  px: 3,
  outline: "none",
  appearance: "none",
  cursor: "pointer",
  "&::-moz-focus-inner": {
    border: "0px none !important",
  },
  "&:focus": {
    boxShadow: (theme) => theme.shadows.focus,
  },
  "&:active": {
    boxShadow: (theme) => theme.shadows.inner,
  },
};

const input = {
  borderRadius: "none",
  height: 40,
  border: "input",
  bg: "background",
  p: 0,
  px: 2,
  fontFamily: "body",
  fontSize: "text",
  outline: "none",
  "&:focus": {
    outline: "none",
    boxShadow: (theme) => theme.shadows.focus,
  },
};

export default {
  fonts: {
    body: "'Radnika', sans-serif",
    heading: "'Radnika', sans-serif",
  },
  fontWeights: {
    body: "normal",
    heading: "normal",
    label: 600,
    bold: "bold",
    positive: "500", // on light backgrounds
    negative: "normal", // on dark backgrounds
  },
  fontSizes: {
    text: 18,
    heading: 27,
  },
  colors: {
    text: "#000",
    background: "#fff",
    focus: "#FF88DC",
    primary: {
      main: "#DFE172",
      100: "#FCFBE5",
      200: "#F5F3BD",
      300: "#ECEC96",
      400: "#DFE172", //Main
      500: "#B8BD5E",
      600: "#92984A",
      700: "#6D7337",
      800: "#484E24",
      900: "#242812",
    },
    red: {
      main: "#FF5154",
      100: "#FFB8BE",
      200: "#FF949A",
      300: "#FF7277",
      400: "#FF5154", //Main
      500: "#D54342",
      600: "#AA3833",
      700: "#802C25",
      800: "#561F18",
      900: "#2B100C",
    },
    blue: {
      main: "#91A6FF",
    },
    gray: {
      100: "#E8E8E8",
      200: "#D0D0D0",
      300: "#B9B9B9",
      400: "#A1A1A1",
      500: "#898989",
      600: "#727272",
      700: "#5A5A5A",
      800: "#434343",
      900: "#2B2B2B",
    },
    teal: {
      900: "#061214",
      800: "#113135",
      700: "#1C5254",
      600: "#297373", //Main
      500: "#418C8B",
      400: "#5BA3A1",
      300: "#77B8B6",
      200: "#94CCC9",
      100: "#B4DDDB",
    },
  },
  borders: {
    input: "2px solid",
    "2px": "2px solid",
  },
  radii: {
    none: 0,
    full: 999,
  },
  shadows: {
    focus: (theme) => `0 0 0 4px ${theme.colors.focus}`,
    you: (theme) => `0 0 0 4px ${theme.colors.blue.main}`,
    elevate: (theme) => `8px 6px 0 0 ${theme.colors.gray[100]}`,
    inner: () => "inset 0 0 0 4px rgba(0,0,0,0.5)",
  },
  sizes: {
    full: "100%",
  },
  text: {
    h1: {
      fontFamily: "heading",
      fontSize: 36,
      lineHeight: 1.15,
      fontWeight: "heading",
      color: "text",
      my: 0,
    },
    h2: {
      fontFamily: "heading",
      fontSize: 27,
      lineHeight: 1.15,
      fontWeight: "heading",
      color: "text",
      my: 0,
    },
    errorMessage: {
      fontFamily: "body",
      fontSize: "text",
      fontWeight: 600,
      color: "red.600",
    },
    button: {
      ...buttons,
      display: "flex",
      alignItems: "center",
    },
  },
  forms: {
    input: { ...input },
    select: { ...input },
    label: {
      display: "flex",
      flexFlow: "column",
      "> p": {
        fontFamily: "body",
        fontSize: "text",
        fontWeight: "label",
        my: 0,
        mb: 2,
      },
    },
  },
  buttons: {
    primary: {
      ...buttons,
      color: "text",
      fontWeight: "positive",
      bg: "primary.main",
      "&:hover": {
        bg: "primary.500",
      },
    },
    danger: {
      ...buttons,
      color: "white",
      fontWeight: "negative",
      bg: "red.600",
      "&:hover": {
        bg: "red.700",
      },
    },
    go: {
      ...buttons,
      color: "white",
      fontWeight: "negative",
      bg: "teal.600",
      "&:hover": {
        bg: "teal.700",
      },
    },
    disabled: {
      ...buttons,
      color: "text",
      bg: "gray.200",
      cursor: "unset",
      "&:active": {
        boxShadow: "none",
      },
    },
    card: {
      ...buttons,
      color: "text",
      bg: "gray.200",
      border: "2px",
      borderColor: "gray.400",
      "&:hover": {
        borderColor: "gray.800",
      },
    },
    cardValue: {
      ...buttons,
      color: "text",
      border: "2px",
      borderColor: "gray.200",
      bg: "white",
      overflow: "hidden",
      "&:focus": {
        boxShadow: (theme) => theme.shadows.focus,
        zIndex: 99,
      },
    },
  },
  styles: {
    spinner: {
      color: "primary.main",
    },
  },
  layout: {
    stack: {
      display: "flex",
      flexDirection: "column",
    },
    menu: {
      display: "flex",
      flexDirection: "row",
      bg: "gray.900",
      p: 3,
    },
  },
};
