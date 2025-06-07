export const typo = {
  // Font sizes
  sizes: {
    // Display
    display1: 48,
    display2: 40,
    display3: 32,

    // Headings
    h1: 28,
    h2: 24,
    h3: 20,
    h4: 18,
    h5: 16,
    h6: 14,

    // Body text
    bodyLarge: 18,
    bodyMedium: 16,
    bodySmall: 14,

    // Supporting text
    caption: 12,
    tiny: 10,
  },

  // Line heights (multiplier)
  lineHeights: {
    // Display
    display: 1.2,

    // Headings
    heading: 1.3,

    // Body text
    body: 1.5,

    // Supporting text
    tight: 1.25,
    relaxed: 1.75,
  },

  // Font weights (for web)
  weights: {
    regular: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
  },

  // Letter spacing
  letterSpacing: {
    tighter: -0.8,
    tight: -0.4,
    normal: 0,
    wide: 0.4,
    wider: 0.8,
  },
} as const;
