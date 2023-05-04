import { deleteBtn } from "./ProfileSettings.module.css";

export const DeleteAccountBtn = () => {
  const handleClick = () => {
    
  }

  return (
  <button 
    className={deleteBtn}
    onClick={() => handleClick()}
  >
    Eliminar cuenta
  </button>);
}