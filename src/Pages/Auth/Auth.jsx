import { useState, useEffect } from "react";
import { supabase } from "../../supabase/Connection.js";
import {
  article,
  control__auth,
  btn_selected,
  form,
  container,
  btn_submit,
  input__error,
  error__msg,
  animated_error,
  password_error,
} from "./index.module.css";
import { Button } from "../../components/Button/Button.jsx";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if(session){
        navigate("/");
      }
    })
  }, []);

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [isSignUp, setIsSignUp] = useState(false);

  const [errorInput, setErrorInput] = useState({
    message: "",
    onError: false,
  });

  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (newValue, target) => {
    setErrorInput({
      message: "",
      onError: false,
    });

    setPasswordError(false);

    if (target == "email") {
      setDataForm({
        ...dataForm,
        email: newValue,
      });
    }

    if (target == "password") {
      setDataForm({
        ...dataForm,
        password: newValue,
      });
    }

    if (target == "username") {
      setDataForm({
        ...dataForm,
        username: newValue,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isInputEmpty()) {
      setErrorInput({
        message: "Debes de llenar los campos",
        onError: true,
      });
      return;
    }

    if (!isPasswordValid()) {
      setPasswordError(true);
      return;
    }

    if (isSignUp) {
      supabaseSignUp().then((userData) => {
        console.log(userData);
      });

      return;
    }

    supabaseSingIn();

    setDataForm({
      email: "",
      password: "",
    });
  };

  const isInputEmpty = () => {
    const { email, password, username } = dataForm;

    if (isSignUp) {
      return email == "" || password == "" || username == "";
    }

    return email == "" || password == "";
  };

  const isPasswordValid = () => {
    const { password } = dataForm;
    const regex = /[_!@0-9.&]+/;

    return password.length >= 6 && regex.test(password);
  };

  const supabaseSingIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: dataForm.email,
      password: dataForm.password,
    });

    if (error) {
      setErrorInput({
        message: "Credenciales invalidas",
        onError: true,
      });
      return;
    }

    return data;
  };

  const supabaseSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: dataForm.email,
      password: dataForm.password,
      options: {
        data: {
          username: dataForm.username
        }
      }
    });

    if (error) {
      const error_msg =
        error.message === "User already registered"
          ? "Este usuario ya ha sido registrado"
          : error.message;
      setErrorInput({
        message: error_msg,
        onError: true,
      });
      return;
    }

    return data;
  };

  return (
    <article className={article}>
      <h2>{isSignUp ? "Registrate" : "Inicia Sesión"}</h2>

      <section className={control__auth}>
        <Button
          type="buton"
          action={() => setIsSignUp(false)}
          styles={!isSignUp ? btn_selected : ""}
        >
          Iniciar Sesion
        </Button>
        <Button
          type="buton"
          action={() => setIsSignUp(true)}
          styles={isSignUp ? btn_selected : ""}
        >
          Registrarse
        </Button>
      </section>

      <section className={container}>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className={form}
        >
          <div>
            <p
              className={
                errorInput.onError ? `${error__msg} ${animated_error}` : ""
              }
            >
              {errorInput.message}
            </p>
            <label htmlFor="inputEmail">Correo electrónico</label>
            <input
              type="email"
              id="inputEmail"
              name="inputEmail"
              placeholder="ejemplo@site.com"
              value={dataForm.email}
              onChange={(e) => handleChange(e.target.value, "email")}
              className={
                errorInput.onError ? `${input__error} ${animated_error}` : ""
              }
            />
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="inputUsername">Nombre de usuario</label>
              <input
                type="text"
                id="inputUsername"
                name="inputUsername"
                placeholder="Nombre ejemplo_01"
                className={
                  errorInput.onError ? `${input__error} ${animated_error}` : ""
                }
                onChange={e => handleChange(e.target.value, "username")}
                value={dataForm.username}
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
              onChange={(e) => handleChange(e.target.value, "password")}
              placeholder="************"
              className={
                errorInput.onError || passwordError
                  ? `${input__error} ${animated_error}`
                  : ""
              }
            />
            {passwordError && (
              <div
                className={
                  passwordError ? `${animated_error} ${password_error}` : ""
                }
              >
                La contraseña debe contar con:
                <ul>
                  <li>Más de 6 caracteres</li>
                  <li>
                    un caracter especial como: "números del 0 al 9", "_", "!",
                    "." o "&"
                  </li>
                </ul>
              </div>
            )}
          </div>

          <Button type="submit" styles={btn_submit}>
            {isSignUp ? "Registrarse" : "Iniciar"}
          </Button>
        </form>
      </section>
    </article>
  );
};
