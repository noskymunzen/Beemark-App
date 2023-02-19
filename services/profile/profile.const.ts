import { ChangePassError } from "./profile.enum";

export const ChangePassErrorMsg: { [key in ChangePassError]?: string } = {
  [ChangePassError.CurrentPassIsNotValid]: "Current password is not valid.",
};
