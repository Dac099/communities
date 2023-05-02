import { GridLoader as Loader } from "react-spinners";
import { containerLoader } from "./PageLoader.module.css";

export const PageLoader = () => {
  return <article className={containerLoader}>
    <Loader 
      color="#FF8E3C"
    />
  </article>
}