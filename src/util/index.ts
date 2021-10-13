import { IError, User } from "../common";

export const userHasCompletedProfile = (user?: User) =>
  !!user?.firstName && !!user?.lastName && !!user?.gender && !!user?.avatar;

export const userHasCompletedUserRole = (user?: User) => user?.state === "approved";

export const getError = (error: IError) => {
  return {
    code: error.code,
    stack: error.stack,
    message: error.message,
  };
};
