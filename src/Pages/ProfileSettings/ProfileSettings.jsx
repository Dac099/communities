import { NavBar } from "../../components/NavBar/NavBar";
import { MainCard } from "../../components/MainCard/MainCard";
import { UpdateProfilePicture } from "./UpdateProfilePicture";

export const ProfileSettings = () => {
  return <>
    <NavBar />
    <MainCard>
      <UpdateProfilePicture />
    </MainCard>
  </>
}