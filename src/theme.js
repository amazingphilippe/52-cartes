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
    heading: "'Sporting Grotesque', sans-serif",
    murmure: "Le Murmure",
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
    heading: 21,
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
      900: "#17182B",
      800: "#353860",
      700: "#535B95",
      600: "#717FCA",
      500: "#91A6FF", //Main
      400: "#9DB4FF",
      300: "#AFC4FF",
      200: "#C6D7FF",
      100: "#E3EDFF",
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
    alphaBlack: {
      0: "#00000000",
      10: "#0000002B",
      20: "#00000043",
      30: "#0000005A",
      40: "#00000072",
      50: "#00000089",
      60: "#000000A1",
      70: "#000000B9",
      80: "#000000D0",
      90: "#000000E8",
      100: "#000000FF",
    },
    teal: {
      main: "#297373",
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
    purple: {
      main: "#442B48",
      900: "#0D070D",
      800: "#2A192B",
      700: "#442B48", // main
      600: "#5F4663",
      500: "#7A627E",
      400: "#947F98",
      300: "#AE9CB2",
      200: "#C7BACA",
      100: "#E0D9E2",
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
    elevate: (theme) => `8px 6px 0 0 ${theme.colors.alphaBlack[10]}`,
    action: (theme) => `0 0 0 4px ${theme.colors.alphaBlack[70]}`,
    inner: (theme) => `inset 0 0 0 4px ${theme.colors.alphaBlack[50]}`,
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
      fontSize: 21,
      lineHeight: 1.15,
      fontWeight: "heading",
      color: "text",
      my: 0,
    },
    h3: {
      fontFamily: "heading",
      fontSize: 18,
      lineHeight: 1.15,
      fontWeight: "bold",
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
      cursor: "inherit",
      "&:active": {
        boxShadow: "none",
      },
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
      color: "white",
      fontWeight: "negative",
      bg: "purple.main",
      "&:hover": {
        bg: "purple.800",
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
      display: "flex",
      flexDirection: "column",
      pl: 0,
      pr: 0,
      color: "text",
      border: "2px",
      borderColor: "gray.200",
      bg: "white",
      overflow: "hidden",
      "&:focus": {
        boxShadow: (theme) => theme.shadows.focus,
        zIndex: 99,
      },
      "&:hover": {
        borderColor: "gray.400",
      },
    },
    action: {
      ...buttons,
      color: "white",
      fontWeight: "negative",
      pl: 4,
      pr: 4,
      bg: "purple.main",
      borderRadius: "full",
      height: "auto",
      "&:hover": {
        bg: "purple.800",
      },
    },
    change: {
      ...buttons,
      width: "51px",
      height: "51px",
      bg: "0",
      pl: 2,
      pr: 2,
      "&:active": {
        boxShadow: (theme) => `0 0 0 4px ${theme.colors.text}`,
      },
      "&:hover": {
        boxShadow: (theme) => `0 0 0 4px ${theme.colors.gray[500]}`,
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
    stitchBox: {
      p: 3,
      bg: "gray.100",
      outline: "2px dashed silver",
      outlineOffset: "-4px",
    },
    menu: {
      display: "flex",
      flexDirection: "row",
      bg: "gray.900",
      p: 3,
    },
  },
};
