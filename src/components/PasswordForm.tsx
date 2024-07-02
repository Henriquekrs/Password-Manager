import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PasswordFormProps } from '../types/formTypes';

const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  font-family: 'Open Sans', sans-serif;
  align-items: center;
  border: 1px solid #403e3e1c;
  justify-content: center;
  height: 65vh;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 10px 12px 14px 5px rgba(0, 0, 0, 0.2);
  background-color: rgb(255 255 255 / 19%);

  @media (max-width: 768px) {
    justify-content: center;
    height: 60vh;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 300px;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    margin-top: 5px;
  }

  @media (max-width: 768px) {
    width: 70vw;

    input {
      padding: 7px;
      font-size: 14px;
    }
  }
`;

const Button = styled.button`
  background-color: #009828;
  font-family: 'Open Sans', sans-serif;
  box-shadow: 10px 12px 14px 5px rgba(0, 0, 0, 0.2);
  color: #fff;
  border: none;
  padding: 14px 20px;
  border-radius: 5px;
  font-size: 16px;
  width: 250px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #17c800;
  }

  @media (max-width: 768px) {
    width: 50vw;
    padding: 10px 15px;
  }
`;

const LabelPassword = styled.label`
  display: flex;
  align-items: center;
  margin-top: 10px;

  input {
    margin-right: 10px;
  }
`;

const Span = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

export function PasswordForm({
  onPasswordSaves,
  onShowOff,
}: PasswordFormProps) {
  const [validName, setValidName] = useState(true);
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [Password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);
  const [Url, setUrl] = useState('');
  const [validUrl, setValidUrl] = useState(true);
  const [ShowPassword, setShowPassword] = useState(true);

  useEffect(() => {}, [ShowPassword]);

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isEmailValid = validationEmail(Email);
    const isPasswordValid = validationPassword(Password);
    const isUrlValid = validationUrl(Url);
    const isNameValid = validationName(Name);
    const isFormValid =
      isEmailValid && isPasswordValid && isUrlValid && isNameValid;
    if (isFormValid) {
      const passwordsData = JSON.parse(
        localStorage.getItem('passwords') || '[]'
      );
      const newData = { Name, Email, Password, Url };
      const updatedData = [...passwordsData, newData];

      localStorage.setItem('passwords', JSON.stringify(updatedData));
      onPasswordSaves({ Name, Email, Password, Url });
      onShowOff();
    }
  };

  const validationEmail = (email: string) => {
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const isValid = regexEmail.test(email);
    setValidEmail(isValid);
    return isValid;
  };

  const validationPassword = (password: string) => {
    const regexPassword = /^(?=.*\d)(?=.*[A-Z])/;
    const isValid = regexPassword.test(password);
    setValidPassword(isValid);
    return isValid;
  };

  const validationUrl = (url: string) => {
    const isValid = !!url;
    setValidUrl(isValid);
    return isValid;
  };

  const validationName = (name: string) => {
    const isValid = !!name;
    setValidName(isValid);
    return isValid;
  };

  const handleShowOff = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onShowOff();
  };

  return (
    <div>
      <ContainerForm>
        <Label>
          Nome:
          <input
            type="text"
            value={Name}
            onChange={(e) => {
              setName(e.target.value);
              setValidName(!!e.target.value);
            }}
          />
          {!validName && <Span>Nome inválido</Span>}
        </Label>
        <Label>
          Email ou Usuário:
          <input
            type="text"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
              setValidEmail(validationEmail(e.target.value));
            }}
          />
          {!validEmail && <Span>Email inválido</Span>}
        </Label>
        {ShowPassword ? (
          <Label>
            Senha:
            <input
              type="password"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
                setValidPassword(validationPassword(e.target.value));
              }}
            />
            {!validPassword && <Span>Senha inválida</Span>}
          </Label>
        ) : (
          <Label>
            Senha:
            <input
              type="text"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
                setValidPassword(validationPassword(e.target.value));
              }}
            />
            {!validPassword && <Span>Senha inválida</Span>}
          </Label>
        )}
        <LabelPassword>
          <input
            type="checkbox"
            onChange={() => setShowPassword(!ShowPassword)}
          />
          Mostrar senha
        </LabelPassword>
        <Label>
          URL:
          <input
            type="text"
            value={Url}
            onChange={(e) => {
              setUrl(e.target.value);
              setValidUrl(!!e.target.value);
            }}
          />
          {!validUrl && <Span>URL inválida</Span>}
        </Label>
        <Button onClick={handleFormSubmit} type="submit">
          Salvar
        </Button>
        <Button onClick={handleShowOff}>Cancelar</Button>
      </ContainerForm>
    </div>
  );
}
