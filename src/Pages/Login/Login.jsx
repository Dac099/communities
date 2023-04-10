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

    validateInputs();
    validatePassword();

    setDataForm({
      email: '',
      password: '',
      username: ''
    });
  }

  const validateInputs = () => {
    const {email, password, username} = dataForm;

    if(props.signup){
      if(email == '' || password == '' || username == ''){
        alert("Debes de llenar los campos correctamente");
      }
    }

    if(email == '' || password == ''){
      alert("Debes de llenar los campos correctamente");
    }
  }

  const validatePassword = () => {
    const {password} = dataForm;
    const regex = /[_!@0-9.&]+/;

    if(!(password.length > 8 && regex.test(password))){
      alert(`La contraseña debe contar con más de 8 caracteres y con almenos un caracter especial como: "números del 0 al 9", "_", "!", "." o "&"`);
    }
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
