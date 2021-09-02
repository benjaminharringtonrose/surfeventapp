import { User } from "../common";

export const userHasCompletedProfile = (user?: User) =>
  !!user?.firstName && !!user?.lastName && !!user?.gender && !!user?.avatar;

export const userHasCompletedUserRole = (user?: User) => !user?.isUserRolePending;
