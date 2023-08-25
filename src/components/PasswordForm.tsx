import React, { useState } from 'react';

function PasswordForm() {
  const [showForm, setShowForm] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [serviceLogin, setServiceLogin] = useState('');
  const [servicePass, setServicePass] = useState('');
  const [serviceURL, setServiceURL] = useState('');
  const [enableRegBtn, setEnableRegBtn] = useState(true);
  const [valid1, setValid1] = useState('');
  const [valid2, setValid2] = useState('');
  const [valid3, setValid3] = useState('');
  const [valid4, setValid4] = useState('');
  const [servicesSave, setServiceSave] = useState<TypeServ[]>([]);

  type TypeServ = {
    service: string;
    login: string;
    passw: string;
    url: string;
  };

  const [hidePass, setHidePass] = useState(false);

  const toggleHidePass = () => {
    setHidePass(!hidePass);
  };

  const deleteService = (index: string) => {
    const newServices = servicesSave.filter((service) => service.service !== index);
    setServiceSave(newServices);
  };

  const addService = () => {
    const newService = {
      service: serviceName,
      login: serviceLogin,
      passw: servicePass,
      url: serviceURL,
    };
    setServiceSave([...servicesSave, newService]);
    setServiceName('');
    setServiceLogin('');
    setServicePass('');
    setServiceURL('');
    setEnableRegBtn(true);
    setShowForm(false);
  };

  function isValidPassword(password: string) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%#*?&]{8,16}$/;
    return passwordRegex.test(password);
  }

  function updateRegistrationButton(
    name: string,
    login: string,
    url: string,
    password: string,
  ) {
    const isNameFilled = name.trim() !== '';
    const isLoginFilled = login.trim() !== '';
    const isURLFilled = url.trim() !== '';
    const isPasswordValid = password.length >= 8
    && password.length <= 16
    && isValidPassword(password);

    setEnableRegBtn(!(isNameFilled && isLoginFilled && isURLFilled && isPasswordValid));
  }

  function handleFormSubmission() {
    updateRegistrationButton(serviceName, serviceLogin, serviceURL, servicePass);
  }

  const passCheck1 = () => {
    return servicePass.length < 16;
  };

  const passCheck2 = () => {
    return servicePass.length > 8;
  };

  const passCheck3 = () => {
    const check3 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return check3.test(servicePass);
  };

  const passCheck4 = () => {
    const check4 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return check4.test(servicePass);
  };

  const validation = (event: any) => {
    setServicePass(event.target.value);
    const pass1 = passCheck1();
    const pass2 = passCheck2();
    const pass3 = passCheck3();
    const pass4 = passCheck4();
    const pass = 'valid-password-check';
    const notPass = 'invalid-password-check';
    if (pass1 === true) {
      setValid1(pass);
    } else setValid1(notPass);
    if (pass2 === true) {
      setValid2(pass);
    } else setValid2(notPass);
    if (pass3 === true) {
      setValid3(pass);
    } else setValid3(notPass);
    if (pass4 === true) {
      setValid4(pass);
    } else setValid4(notPass);
  };

  return (
    <div>
      {showForm ? (
        <div>
          <form onChange={ handleFormSubmission }>
            <label>
              Nome do serviço
              <input
                type="text"
                value={ serviceName }
                onChange={ (event) => setServiceName(event.target.value) }
              />
            </label>
            <label>
              Login
              <input
                type="text"
                value={ serviceLogin }
                onChange={ (event) => setServiceLogin(event.target.value) }
              />
            </label>
            <label>
              Senha
              <input
                type="password"
                value={ servicePass }
                onChange={ (event) => validation(event) }
              />
            </label>
            <label>
              URL
              <input
                type="text"
                value={ serviceURL }
                onChange={ (event) => setServiceURL(event.target.value) }
              />
            </label>
            <button
              onClick={ () => addService() }
              type="button"
              disabled={ enableRegBtn }
            >
              Cadastrar
            </button>
            <button type="button" onClick={ () => setShowForm(!showForm) }>
              Cancelar
            </button>
          </form>
          <p className={ valid1 }>Possuir até 16 caracteres</p>
          <p className={ valid2 }>Possuir 8 ou mais caracteres</p>
          <p className={ valid3 }>Possuir letras e números</p>
          <p className={ valid4 }>Possuir algum caractere especial</p>
        </div>
      ) : (
        <>
          <div>
            { servicesSave.length === 0 ? (
              <p>Nenhuma senha cadastrada</p>
            ) : (
              <ul>
                { servicesSave.map((service, index) => (
                  <div key={ index }>
                    <li><a href={ service.url }>{ service.service }</a></li>
                    <li>{ service.login }</li>
                    <li>{ hidePass ? '******' : service.passw }</li>
                    <button
                      data-testid="remove-btn"
                      onClick={ () => deleteService(service.service) }
                    >
                      Remove Service
                    </button>
                  </div>
                )) }
              </ul>
            ) }
          </div>
          <button type="button" onClick={ () => setShowForm(!showForm) }>
            Cadastrar nova senha
          </button>
          <label>
            Esconder senhas
            <input
              type="checkbox"
              checked={ hidePass }
              onChange={ toggleHidePass }
            />
          </label>
        </>
      )}
    </div>
  );
}

export default PasswordForm;
