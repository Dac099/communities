import { TfiSave as Save } from "react-icons/tfi";
import {
  getUserData,
  updateUserEmail,
  updateUserMeta,
  updateUserPassword
} from "../../utilities/manageDB";
import { useEffect, useState } from "react";
import { PageLoader } from '../../components/PageLoader/PageLoader';
import { useNavigate } from "react-router-dom";
import { profileData } from "./ProfileSettings.module.css";

export const UpdateProfileData = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [newData, setNewData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const userData = await getUserData();
        setFormData({
          email: userData.email,
          username: userData.user_metadata.username,
        });

      } catch (error) {
        setIsError(error);

      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //Validar en que campos se hicieron los cambios 
    //Para cada campo llamar a un metodo que actualice solo ese campos
    //Redireccionar al perfil del usuario

    if (newData.username !== "") {
      if (newData.username !== formData.username) {
        updateUserMeta(newData.username);
      }
    }

    if (newData.email !== "") {
      if (newData.email !== formData.email) {
        updateUserEmail(newData.email);
      }
    }

    if (newData.password !== "") {
      if (newData.password !== formData.password) {
        updateUserPassword(newData.password);
      }
    }

    setNewData({
      username: "",
      password: "",
    });
  }

  const handleChange = (e) => {
    switch (e.target.name) {
      case "username":
        setNewData({
          ...newData,
          username: e.target.value
        });
        break;

      case "email":
        setNewData({
          ...newData,
          email: e.target.value
        })
        break;

      case "password":
        break;
    }
  }

  if (isError) {
    return <h1>{isError.message}</h1>;
  }

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <form onSubmit={(e) => {
      handleSubmit(e);
    }}
      className={profileData}
    >
      <div>
        <label htmlFor="username">Nombre de usuario</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder={formData.username}
          onChange={(e) => {
            handleChange(e);
          }}
          value={newData.username}
        />
      </div>

      <div>
        <label htmlFor="email">Correo</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder={formData.email}
          onChange={(e) => {
            handleChange(e);
          }}
          value={newData.email}
        />
      </div>

      <div>
        <label htmlFor="password">Consetraña</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </div>

      <button type="submit">
        <Save />
      </button>
    </form>
  );
}