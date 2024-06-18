export const validationEmail = (email: string) => {
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return regexEmail.test(email);
};

export const validationPassword = (password: string) => {
  const regexPassword = /^(?=.*\d)(?=.*[A-Z])/;
  return regexPassword.test(password);
};

export const validationUrl = (url: string) => !!url;

export const validationName = (name: string) => !!name;
