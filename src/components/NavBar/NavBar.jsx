import { nav, option, navCard, selected } from "./NavBar.module.css";
import { useLocation } from "react-router-dom";
import { FaRegUser as Profile } from "react-icons/fa";
import { HiOutlineUserGroup as Groups } from "react-icons/hi";
import { BsPlugin as Conection } from "react-icons/bs";

export const NavBar = (props) => {
  const location = useLocation();
  let navBarData = {};

  switch (location.pathname) {
    case "/":
      navBarData = {
        title: "Tú Perfil",
        option: "perfil"
      };
      break;

    case "/profile/settings":
      navBarData = {  
        title: "Configura tú perfil",
        option: "perfil"
      }
      break;

    case "/grupos":
      navBarData = {
        title: "Tús Grupos",
        option: "grupos"
      }
      break;

    case "/conexiones":
      navBarData = {
        title: "Tús Conexiones",
        opotion: "conexiones"
      }
      break;

    default:
      navBarData = {
        title: "No sé dónde estoy",
        option: "perfil"
      };
      break;
  }

  return (
    <article className={nav}>
      <section
        className={navCard}
      >
        <Groups className={`${option} ${navBarData.option === "grupos" ? selected : ""}`}/>
        <Conection className={`${option} ${navBarData.option === "conexiones" ? selected : ""}`}/>
        <Profile className={`${option} ${navBarData.option === "perfil" ? selected : ""}`}/>
      </section>

      <section
        className={navCard}
      >
        {navBarData.title}
      </section>
    </article>
  );
}