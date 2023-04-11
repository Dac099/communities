import { useState } from "react";
import { supabase } from "../../supabase/Connection.js";
import { saveData } from "../../utilities/manageLocalStorage.js";
import { article, control__auth, btn_selected, form, container, btn_submit } from "./index.module.css";
import { Button } from "../../components/Button/Button.jsx";

export const Login = () => {
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = (newValue, target) => {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isInputEmpty()) {
      alert("Debes de llenar los campos");
      return;
    }

    if (!isPasswordValid()) {
      alert(
        `La contraseña debe contar con más de 6 caracteres y con almenos un caracter especial como: "números del 0 al 9", "_", "!", "." o "&"`
      );
      return;
    }

    if (isSignUp) {
      supabaseSignUp().then((userData) => {
        saveData(userData.session, "session");
      });

      return;
    }

    supabaseSingIn().then((userData) => {
      saveData(userData.session, "session");
    });

    setDataForm({
      email: "",
      password: "",
    });
  };

  const isInputEmpty = () => {
    const { email, password } = dataForm;
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
      alert(error.message);
      return;
    }

    console.log(data);
    return data;
  };

  const supabaseSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: dataForm.email,
      password: dataForm.password,
    });

    if (error) {
      alert(error.message);
    }

    console.log(data);
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
            <label htmlFor="inputEmail">Correo electrónico</label>
            <input
              type="email"
              id="inputEmail"
              name="inputEmail"
              placeholder="ejemplo@site.com"
              value={dataForm.email}
              onChange={(e) => handleChange(e.target.value, "email")}
            />
          </div>

          <div>
            <label htmlFor="inputPassword">Constraseña</label>
            <input
              type="password"
              id="inputPassword"
              name="inputPassword"
              value={dataForm.password}
              onChange={(e) => handleChange(e.target.value, "password")}
              placeholder="************"
            />
          </div>

          <Button type="submit" styles={btn_submit}>{isSignUp ? "Registrarse" : "Iniciar"}</Button>
        </form>
      </section>
    </article>
  );
};
