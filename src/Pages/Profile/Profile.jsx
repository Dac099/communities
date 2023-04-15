import { supabase } from "../../supabase/Connection";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainCard } from "../../components/MainCard/MainCard";
import { NavBar } from "../../components/NavBar/NavBar";
import { ProfileData } from "./ProfileData";

export const Profile = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then((dataSession) => {
      if (!dataSession.data.session) {
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
      <NavBar />
      <MainCard>
        <ProfileData />
      </MainCard>
    </>
  );
};
