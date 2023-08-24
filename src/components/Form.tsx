import React, { useState, useEffect } from 'react';

type FormProps = {
  onCancel: () => void;
  onCadastrar: (nomeServico: string, login: string, senha: string, url: string) => void;
  setMostrarFormulario: (value: boolean) => void;
};

function Form({ onCancel, onCadastrar, setMostrarFormulario }: FormProps) {
  const [nomeServico, setNomeServico] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [url, setUrl] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCadastrarSenha = (event: React.FormEvent) => {
    event.preventDefault();

    if (nomeServico.trim() === ''
    || login.trim() === ''
    || senha.trim() === ''
    || url.trim() === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    onCadastrar(nomeServico, login, senha, url);

    setNomeServico('');
    setLogin('');
    setSenha('');
    setUrl('');
  };

  const handleCancelar = () => {
    onCancel();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'nome-do-servico') {
      setNomeServico(value);
    } else if (name === 'login') {
      setLogin(value);
    } else if (name === 'senha') {
      setSenha(value);
    } else if (name === 'url') {
      setUrl(value);
    }
  };

  const isPasswordValid = (): boolean => {
    return (
      senha.length >= 8 && senha.length <= 16 && /\d/.test(senha) && /[a-zA-Z]/.test(senha) && /[!@#$%^&*()_+[\]{};':"\\|,.<>?/`~]/.test(senha)
    );
  };

  const validateForm = () => {
    const isNomeServicoValid = nomeServico.trim() !== '';
    const isLoginValid = login.trim() !== '';
    const isSenhaValid = isPasswordValid();
    const isUrlValid = url.trim() !== '';

    setIsFormValid(isNomeServicoValid && isLoginValid && isSenhaValid && isUrlValid);
  };

  useEffect(() => {
    validateForm();
  }, [nomeServico, login, senha, url]);

  const getPasswordValidationClass = (condition: boolean) => {
    return condition ? 'valid-password-check' : 'invalid-password-check';
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={ handleCadastrarSenha }>
      <label htmlFor="nome-do-servico">Nome do Serviço</label>
      <input
        type="text"
        id="nome-do-servico"
        name="nome-do-servico"
        value={ nomeServico }
        onChange={ handleInputChange }
      />

      <label htmlFor="login">Login</label>
      <input
        type="text"
        id="login"
        name="login"
        value={ login }
        onChange={ handleInputChange }
      />

      <label htmlFor="senha">Senha</label>
      <div>
        <input
          type={ showPassword ? 'text' : 'password' }
          id="senha"
          name="senha"
          value={ senha }
          onChange={ handleInputChange }
          required
        />
        <button type="button" onClick={ toggleShowPassword }>
          Mostrar Senha
        </button>
      </div>

      <div
      className={ getPasswordValidationClass(senha.length >= 8) }>Possuir 8 ou mais caracteres</div>
      <div
      className={ getPasswordValidationClass(senha.length <= 16) }>Possuir até 16 caracteres</div>
      <div
      className={ getPasswordValidationClass(/\d/.test(senha) && /[a-zA-Z]/.test(senha)) }>
        Possuir letras e números
      </div>
      <div className={ getPasswordValidationClass(/[!@#$%^&*()_+[\]{};':"\\|,.<>?/`~]/.test(senha)) }>
        Possuir algum caractere especial
      </div>

      <label htmlFor="url">URL</label>
      <input type="text" id="url" name="url" value={ url } onChange={ handleInputChange } />

      <button type="submit" id="cadastrar" name="cadastrar" disabled={ !isFormValid }>
        Cadastrar
      </button>

      <button type="button" id="cancelar" name="cancelar" onClick={ handleCancelar }>
        Cancelar
      </button>
    </form>
  );
}

export default Form;
