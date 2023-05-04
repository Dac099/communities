import { NavBar } from "../../components/NavBar/NavBar";
import { MainCard } from "../../components/MainCard/MainCard";
import { UpdateProfilePicture } from "./UpdateProfilePicture";
import { UpdateProfileData } from "./UpdateProfileData";
import { DeleteAccountBtn } from "./DeleteAccountBtn";
import { settingsLayout } from "./ProfileSettings.module.css";

export const ProfileSettings = () => {
  return <>
    <NavBar />
    <MainCard styles={ settingsLayout }>
      <UpdateProfilePicture />
      <UpdateProfileData />
      <DeleteAccountBtn />
    </MainCard>
  </>
}