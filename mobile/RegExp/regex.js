export const emailRegex = new RegExp(
  "[a-zA-Z0-9_.+-]+@(hotmail|gmail|googlemail|yahoo|gmx|ymail|outlook|live)(.com)$"
);
export const passwordRegex = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?_!@.$%^&*-]).{8,}$"
);
export const usernameRegex = new RegExp("^[A-Za-z0-9_-]{4,24}$");
export const aboutMeRegex = new RegExp(
  "^[A-Za-z0-9_!()#^?@.$%^&,\\s-]{0,240}$"
);
export const nameRegex = new RegExp("^[A-Za-z]{3,24}$");

export const validateRegex = (typeRegex, input) => {
  return typeRegex.test(input);
};
