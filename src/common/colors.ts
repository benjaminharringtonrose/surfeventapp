export const sharedColors = {
  primary: "#006EE6",
  primaryVariant: "#3700B3",
  secondary: "03DAC6",
  primaryDark: "#002366",
  accent: "#FFDAB9",
  actionable: "#FA8072",
  white: "#FFFFFF",
  black: "#000000",
  grey50: "#FAFAFA",
  grey100: "#f5f5f5",
  grey200: "#E6E6E6",
  grey500: "#BDBDBD",
  grey700: "#A3A3A3",
  grey800: "#424242",
  almostBlack: "#262626",
  almostWhite: "#F7F7F7",
  greyscale1: "#383838",
  greyscale2: "#343434",
  greyscale3: "#333333",
  greyscale4: "#2e2e2e",
  greyscale5: "#2c2c2c",
  greyscale6: "#272727",
  greyscale7: "#242424",
  greyscale8: "#222222",
  greyscale9: "#1e1e1e",
  greyscale10: "#121212",
  yellowCream: "#f4d47c",
  success: "#27ae60",
  error: "#cf6679",
  red: "#e74c3c",
  orange: "#f39c12",
};

export const LightTheme = {
  ...sharedColors,
  background: sharedColors.almostWhite,
  header: sharedColors.almostBlack,
  input: sharedColors.grey50,
  button: sharedColors.primary,
  card: sharedColors.white,
  cardDark: sharedColors.almostWhite,
  borderColor: sharedColors.grey200,
  icon: sharedColors.almostBlack,
  segmentControl: sharedColors.grey700 as string | undefined,
  headerText: sharedColors.almostBlack,
  subheaderText: sharedColors.grey800,
  bodyText: sharedColors.grey800,
};

export const DarkTheme = {
  ...sharedColors,
  background: sharedColors.greyscale10,
  input: sharedColors.grey50,
  button: sharedColors.primary,
  card: sharedColors.greyscale6,
  cardDark: sharedColors.greyscale9,
  borderColor: sharedColors.greyscale5,
  icon: sharedColors.primary,
  segmentControl: undefined as string | undefined,
  headerText: sharedColors.white,
  subheaderText: sharedColors.grey700,
  bodyText: sharedColors.white,
};

export type Theme = typeof DarkTheme;
