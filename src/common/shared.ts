import { sharedColors } from "./colors";

const borderRadius = 10;

export const shared = {
  borderRadius,
  shadow: {
    shadowColor: sharedColors.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  card: {
    borderRadius,
  },
};
