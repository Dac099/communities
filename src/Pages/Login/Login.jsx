import { useState } from "react";

export const Login = (props) => {
  const [dataForm, setDataForm] = useState({
    email: '',
    password: '',
    username: ''
  });
  
  const handleChange = (newValue, target) => {
    switch(target){
      case 'email':
        break;
      case 'username':
        break;
      case 'password':
        break;
      default:
        console.log('Error in the form input field for Login/signup');
    }
  }

  return (
    <article>
      <h2>{props.signup ? "Registrate" : "Inicia Sesión"}</h2>
      <form>
        <div>
          <label htmlFor="inputEmail">Correo electrónico</label>
          <input
            type="email"
            id="inputEmail"
            name="inputEmail"
            placeholder="ejemplo@site.com"
            required
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
              required
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
            required
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
