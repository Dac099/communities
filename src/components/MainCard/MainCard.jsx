import { card, cardContainer } from "./MainCard.module.css";

export const MainCard = (props) => {
  return (
    <article className={cardContainer}>
      <article
        className={`${card} ${props.styles}`}
      >
        {props.children}
      </article>
    </article>
  );
}