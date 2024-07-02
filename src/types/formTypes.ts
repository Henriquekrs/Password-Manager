export type PasswordListProps = {
  passwordsData: DataPassword[];
  isHidden: boolean;
  setPasswordsData: (passwordsData: DataPassword[]) => void;
};

export type PasswordFormProps = {
  onPasswordSaves: (data: DataPassword) => void;
  onShowOff: () => void;
  isHidden: boolean;
};

export type DataPassword = {
  Name: string;
  Email: string;
  Password: string;
  Url: string;
};
