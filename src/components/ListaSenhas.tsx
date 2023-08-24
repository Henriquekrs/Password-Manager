import React from 'react';

type ListaSenhasProps = {
  senhas: { nomeServico: string; login: string; senha: string; url: string }[];
  onRemoveSenha: (index: number) => void;
  showPasswords: boolean;
};

const ListaSenhas: React.FC<ListaSenhasProps> = ({ senhas, onRemoveSenha, showPasswords }) => {
  return (
    <div>
      {senhas.length === 0 ? (
        <p>Nenhuma senha cadastrada</p>
      ) : (
        <ul>
          {senhas.map((senha, index) => (
            <li key={index}>
              <a href={senha.url}>{senha.nomeServico}</a>
              <br />
              Login: {senha.login}
              <br />
              Senha: {showPasswords ? senha.senha : '******'}
              <button data-testid={`remove-btn-${index}`} type="button" onClick={() => onRemoveSenha(index)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaSenhas;
