import { pictureSection } from "./Profile.module.css";
import { FaUserEdit, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const ProfilePicture = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile/settings");
  }

  return (
    <article className={pictureSection}>
      <div>
        <FaUserCircle />
        <div onClick={handleClick}> <FaUserEdit /> </div>
      </div>
    </article>
  );
}