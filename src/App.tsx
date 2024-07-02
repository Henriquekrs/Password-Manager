import './App.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { PasswordForm } from './components/PasswordForm';
import ListForm from './components/ListForm';
import { DataPassword } from './types/formTypes';

const Title = styled.h1`
  text-align: center;
  color: #ececec;
  font-family: 'Chakra Petch', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 40px;
  height: 20vh;
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 27px;
    height: 6vh;
    margin-top: 6vh;
  }
`;

const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media (max-width: 768px) {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
`;

const Button = styled.button`
  background-color: #ffffff14;
  font-family: 'Chakra Petch', sans-serif;
  font-weight: 400;
  font-style: normal;
  box-shadow: 10px 12px 14px 5px rgba(0, 0, 0, 0.2);
  color: #fff;
  border: none;
  padding: 14px 20px;
  border-radius: 5px;
  font-size: 16px;
  margin-top: -9vh;
  cursor: pointer;
  margin-bottom: 1vh;
  margin-right: 1vw;

  @media (max-width: 768px) {
    width: 40vw;
    margin-top: 10px;
    height: 8vh;
    padding: 0px;
  }
`;

const ContainerButton = styled.div`
  display: flex;
`;

const HeaderAuthor = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff66;
  position: absolute;
  top: 0px;
  width: 100vw;
  font-size: 20px;
  font-weight: 100;
  color: #000000;
  font-family: 'Open Sans', sans-serif;
  height: 5vh;
  margin: 0;
  padding: 0;

  a {
    margin-left: 1vw;
    margin-top: 0.5vw;
  }

  @media (max-width: 768px) {
    font-size: 17px;
    height: 5vh;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

const HideShowButton = styled(Button)<{ isHidden: boolean }>`
  background-color: ${({ isHidden }) => (isHidden ? '#FF0000' : '#008000')};
`;

function App() {
  const [showForm, setShowForm] = useState(false);
  const [passwordsData, setPasswordsData] = useState<DataPassword[]>([]);
  const [isHidden, setIsHidden] = useState(true);
  const handlePasswordSaves = (formData: DataPassword) => {
    setPasswordsData([...passwordsData, formData]);
  };

  useEffect(() => {
    const data = localStorage.getItem('passwords');
    if (data) {
      setPasswordsData(JSON.parse(data));
    }
  }, []);

  const handleHideShow = () => {
    setIsHidden(!isHidden);
  };

  return (
    <ContainerForm>
      <HeaderAuthor>
        Developed by Gustavo Henrique
        <a
          href="https://www.linkedin.com/in/henriquekrs/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/256/174/174857.png"
            alt="Ícone 2"
            width="24"
          />
        </a>
        <a
          href="https://github.com/Henriquekrs"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="Ícone 2"
            width="24"
          />
        </a>
      </HeaderAuthor>
      <Title>Gerenciador de senhas</Title>
      {showForm ? (
        <PasswordForm
          onPasswordSaves={handlePasswordSaves}
          onShowOff={() => setShowForm(false)}
          isHidden={isHidden}
        />
      ) : (
        <ListForm
          passwordsData={passwordsData}
          isHidden={isHidden}
          setPasswordsData={setPasswordsData}
        />
      )}
      {!showForm ? (
        <ContainerButton>
          <Button onClick={() => setShowForm(true)}>
            Cadastrar nova senha
          </Button>
          <HideShowButton onClick={handleHideShow} isHidden={isHidden}>
            {isHidden ? 'Mostrar senha' : 'Ocultar senha'}
          </HideShowButton>
        </ContainerButton>
      ) : null}
    </ContainerForm>
  );
}

export default App;
