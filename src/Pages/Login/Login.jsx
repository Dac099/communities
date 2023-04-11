import { useState } from "react";
import { supabase } from "../../supabase/Connection.js";
import { saveData } from "../../utilities/manageLocalStorage.js";

export const Login = () => {
  const [dataForm, setDataForm] = useState({
    email: '',
    password: '',
    username: ''
  });

  const [isSignUp, setIsSignUp] = useState(false);
  
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

    if(isInputEmpty()){
      alert("Debes de llenar los campos");
      return;
    }

    if(!isPasswordValid()){
      alert(`La contraseña debe contar con más de 6 caracteres y con almenos un caracter especial como: "números del 0 al 9", "_", "!", "." o "&"`);
      return;
    }

    setDataForm({
      email: '',
      password: '',
      username: ''
    });

    supabaseSingIn()
    .then(userData => {
      saveData(userData.session, "session");
    })
  }

  const isInputEmpty = () => {
    const {email, password, username} = dataForm;

    if(isSignUp){
      return (email === '' || password === '' || username === '');
    }

    return (email == '' || password == '');
  }

  const isPasswordValid = () => {
    const {password} = dataForm;
    const regex = /[_!@0-9.&]+/;

    return (password.length >= 6 && regex.test(password));
  }

  const supabaseSingIn = async() => {
    const {data, error} = await supabase.auth.signInWithPassword({
      email: dataForm.email,
      password: dataForm.password
    });

    if(error){
      alert(error.message);
      return;
    }

    console.log(data);
    return data;
  }

  return (
    <article>
      <h2>{isSignUp ? "Registrate" : "Inicia Sesión"}</h2>

      <section>
          <button type="buton" onClick={() => setIsSignUp(false)}>LogIn</button>
          <button type="buton" onClick={() => setIsSignUp(true)}>SignUp</button>
      </section>

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

        {isSignUp && (
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
          {isSignUp ? "Registrarse" : "Iniciar Sesión"}
        </button>
      </form>
    </article>
  );
};
