import { sharedColors } from "./colors";

const borderRadius = 10;

export const shared = {
  borderRadius,
  shadow: {
    shadowColor: sharedColors.black,
    shadowOffset: { width: 7, height: 2 },
    shadowOpacity: 0.2,
    elevation: 8,
  },
  card: {
    backgroundColor: sharedColors.greyscale6,
    borderRadius,
  },
};
