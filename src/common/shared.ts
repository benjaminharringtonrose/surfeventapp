import { colors } from "./colors";

const borderRadius = 10;

export const shared = {
  borderRadius,
  shadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 3, height: 1 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  card: {
    backgroundColor: colors.greyscale9,
    borderRadius,
  },
};
