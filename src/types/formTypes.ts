export type PasswordFormProps = {
  onPasswordSaves: (passwordsData: {
    Name: string, Email: string, Password: string, Url: string }) => void;
  onShowOff: () => void;
  isHidden: boolean;
  setPasswordsData: (passwordsData: DataPassword[]) => void;
};

export type DataPassword = {
  Name: string,
  Email: string,
  Password: string,
  Url: string
};
