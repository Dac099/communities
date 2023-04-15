import { card } from "./MainCard.module.css";

export const MainCard = (props) => {
  return (
    <article 
      className={`${card} ${props.styles}`}
    >
      {props.children}
    </article>
  );
}