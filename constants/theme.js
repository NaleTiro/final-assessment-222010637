const palette = {
  primary: "#2563eb", // Modern blue
  secondary: "#ec4899", // Modern pink
  success: "#10b981", // Modern green
  warning: "#f59e0b", // Modern yellow
  error: "#ef4444", // Modern red
  dark: "#0f172a", // Dark blue-gray
  light: "#f8fafc", // Light gray
  white: "#ffffff",
  black: "#000000",
};

export default {
  colors: {
    ...palette,
    background: palette.light,
    card: palette.white,
    text: palette.dark,
    textSecondary: "#64748b",
    border: "#e2e8f0",
    shadowColor: palette.dark,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  radii: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  typography: {
    h1: { fontSize: 32, fontWeight: "700", lineHeight: 40 },
    h2: { fontSize: 24, fontWeight: "700", lineHeight: 32 },
    h3: { fontSize: 20, fontWeight: "600", lineHeight: 28 },
    body: { fontSize: 16, lineHeight: 24 },
    bodySmall: { fontSize: 14, lineHeight: 20 },
    caption: { fontSize: 12, lineHeight: 16 },
  },
  button: {
    primary: {
      backgroundColor: palette.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    secondary: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: palette.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
  },
  input: {
    base: {
      backgroundColor: palette.white,
      borderWidth: 1,
      borderColor: "#e2e8f0",
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
    },
    focused: {
      borderColor: palette.primary,
    },
    error: {
      borderColor: palette.error,
    },
  },
};
