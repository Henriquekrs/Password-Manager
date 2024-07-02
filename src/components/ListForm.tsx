import styled from 'styled-components';
import { ListFormProps, PasswordFormProps } from '../types/formTypes';

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #999999ba;
  background-color: #92929252;
  box-shadow: 10px 12px 14px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  width: 40vw;
  height: 80vh;

  @media (max-width: 768px) {
    width: 90vw;
    height: 55vh;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #e8e8e8;
  font-family: 'Open Sans', sans-serif;
  height: 55vh;

  @media (max-width: 768px) {
    font-size: 24px;
    height: 6vh;
    margin: 0;
  }
`;

const List = styled.ul`
  width: 35vw;
  height: 430vw;
  overflow-y: scroll;
  margin-bottom: 10vh;
  padding: 0;

  @media (max-width: 768px) {
    width: 85vw;
    height: 45vh;
    margin: 0;
    overflow-y: scroll;
  }
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 5px 10px 10px 1px rgba(0, 0, 0, 0.2);
  background-color: #ffffff14;
  padding: 10px 15px;
  width: 30vw;
  border-radius: 10px;
  margin: 5px 0px;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    width: 76vw;
  }
`;

const ItemText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #ffffff;
  margin: 0px 5px 0px 0px;

  span {
    font-weight: bold;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const DeleteButton = styled.button`
  background-color: #c0000099;
  font-family: 'Open Sans', sans-serif;
  border-radius: 5px;
  padding: 5px;
  border: none;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  align-self: center;
`;

function ListForm({
  passwordsData,
  isHidden,
  setPasswordsData,
}: ListFormProps) {
  const handleDelete = (index: number) => () => {
    const updatedPasswords = passwordsData.filter((_, i) => i !== index);
    setPasswordsData(updatedPasswords);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
  };

  return (
    <ContainerDiv>
      <Title>Lista de senhas</Title>
      <List>
        {passwordsData.map((password, index) => (
          <ListItem key={index}>
            <div>
              {Object.entries(password).map(([key, value]) => (
                <ItemText key={key}>
                  <span>{`${key}: `}</span>
                  {isHidden && key === 'Password'
                    ? '*'.repeat(value.length)
                    : value}
                </ItemText>
              ))}
            </div>
            <DeleteButton onClick={handleDelete(index)}>Excluir</DeleteButton>
          </ListItem>
        ))}
      </List>
    </ContainerDiv>
  );
}

export default ListForm;
