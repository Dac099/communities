import { FaUserCircle } from "react-icons/fa";
import { profilePicture } from "./ProfileSettings.module.css";

export const UpdateProfilePicture = () => {
  return (
    <article className={profilePicture}>
      <FaUserCircle />
      <p>Subir foto de perfil</p>
    </article>
  );
}