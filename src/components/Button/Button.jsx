import { btn } from "./index.module.css";

export const Button = (props) => {
  return (
    <button
      className={`${btn} ${props.styles}`}
      onClick={props.action}
      type={props.type}
    >
      {props.children}
    </button>
  );
};
