export type PasswordFormProps = {
  onPasswordSaves: (passwordsData: {
    Name: string;
    Email: string;
    Password: string;
    Url: string;
  }) => void;
  onShowOff: () => void;
  isHidden: boolean;
};

export type ListFormProps = {
  passwordsData: DataPassword[];
  isHidden: boolean;
  setPasswordsData: React.Dispatch<React.SetStateAction<DataPassword[]>>;
};

export type DataPassword = {
  Name: string;
  Email: string;
  Password: string;
  Url: string;
};
