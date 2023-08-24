import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import ListaSenhas from './components/ListaSenhas';

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarSenhas, setMostrarSenhas] = useState(true);
  const [senhasCadastradas, setSenhasCadastradas] = useState<
  { nomeServico: string; login: string; senha: string; url: string }[]
  >([]);

  const handleCadastrarSenha = () => {
    setMostrarFormulario(true);
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
  };

  const handleCheckboxChange = () => {
    setMostrarSenhas((prev) => !prev);
  };

  const handleRemoveSenha = (index: number) => {
    setSenhasCadastradas((prevSenhas) => prevSenhas.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Gerenciador de senhas</h1>
      { mostrarFormulario ? (
        <Form
          onCancel={ handleCancelar }
          onCadastrar={ (nomeServico, login, senha, url) => {
            setSenhasCadastradas((prevSenhas) => [
              ...prevSenhas,
              {
                nomeServico,
                login,
                senha,
                url,
              },
            ]);

            setMostrarFormulario(false);
            setMostrarSenhas(true);
          } }
          setMostrarFormulario={ setMostrarFormulario }
        />
      ) : (
        <button onClick={ handleCadastrarSenha }>Cadastrar nova senha</button>
      ) }

      {/* Checkbox to hide/show passwords */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={ mostrarSenhas }
            onChange={ handleCheckboxChange }
          />
          Esconder senhas
        </label>
      </div>

      {/* List of registered passwords */}
      <ListaSenhas
        senhas={ senhasCadastradas }
        onRemoveSenha={ handleRemoveSenha }
        showPasswords={ mostrarSenhas }
      />
    </div>
  );
}

export default App;
