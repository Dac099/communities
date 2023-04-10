import { useState } from "react";

export const Login = (props) => {
  const [dataForm, setDataForm] = useState({
    email: '',
    password: '',
    username: ''
  });
  
  const handleChange = (newValue, target) => {
    if(target == 'email'){
      setDataForm({
        ...dataForm,
        email: newValue,
      });
    }

    if(target == 'password'){
      setDataForm({
        ...dataForm,
        password: newValue,
      });
    }

    if(target == 'username'){
      setDataForm({
        ...dataForm,
        username: newValue
      });
    }


  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emptyFields){
      console.log(dataForm);
      return;
    }

    setDataForm({
      email: '',
      password: '',
      username: ''
    });
  }

  const emptyFields = () => {
    const {email, password, username} = dataForm;

    if(props.signup){
      if(email.length < 1 || password.length < 1 || username.length < 1){
        alert('Los campos deben de llenarse correctamente');
        return false;
      }
    }

    if(email.length < 1 || password.length < 1){
      alert('Usuario o contraseña incorrectos');
      return false;
    }

    return true;
  }

  return (
    <article>
      <h2>{props.signup ? "Registrate" : "Inicia Sesión"}</h2>
      <form onSubmit={e => {
        handleSubmit(e);
      }}>
        <div>
          <label htmlFor="inputEmail">Correo electrónico</label>
          <input
            type="email"
            id="inputEmail"
            name="inputEmail"
            placeholder="ejemplo@site.com"
            value={dataForm.email}
            onChange={(e) => handleChange(e.target.value, 'email')}
          />
        </div>

        {props.signup && (
          <div>
            <label htmlFor="inputUserName">Nombre de usuario</label>
            <input
              type="text"
              id="inputUserName"
              name="inputUserName"

              placeholder="MyUserName"
              value={dataForm.username}
              onChange={(e) => handleChange(e.target.value, 'username')}
            />
          </div>
        )}

        <div>
          <label htmlFor="inputPassword">Constraseña</label>
          <input
            type="password"
            id="inputPassword"
            name="inputPassword"
            value={dataForm.password}
            onChange={(e) => handleChange(e.target.value, 'password')}
          />
        </div>

        <button type="submit">
          {props.signup ? "Registrarse" : "Iniciar Sesión"}
        </button>
      </form>
    </article>
  );
};
