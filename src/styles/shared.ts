import { colors } from "./colors";

const borderRadius = 14;

export const shared = {
  borderRadius,
  spacing: {
    tiny: 4,
    xsmall: 8,
    small: 16,
    base: 24,
    large: 48,
    xlarge: 64,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 3, height: 1 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius,
  },
};
