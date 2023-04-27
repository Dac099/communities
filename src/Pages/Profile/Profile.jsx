import { supabase } from "../../supabase/Connection";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainCard } from "../../components/MainCard/MainCard";
import { NavBar } from "../../components/NavBar/NavBar";
import { ProfileData } from "./ProfileData";
import { ProfilePicture } from "./ProfilePicture";
import { getGroupsByUserId, getConectionsByUserId, getActivitiesByUserId } from "../../utilities/manageDB";
import { cardLayout } from "./Profile.module.css";


export const Profile = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then((dataSession) => {
      if (!dataSession.data.session) {
        navigate("/login");
      }
    });

    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const { data: { user }, error } = await supabase.auth.getUser();

        const total_groups = await getGroupsByUserId(user.id);
        const countConections = await  getConectionsByUserId(user.id);
        const total_elements = await getActivitiesByUserId(user.id);

        if(error) {
          throw new Error(error.message);
        }

        setUserData({
          id: user.id,
          email: user.email,
          data: user.user_metadata,
          dates_elements: total_elements,
          groups_joined: total_groups,
          connections: countConections
        })
        
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, []);

  if(error){
    return <h1>Error</h1>
  }

  if(isLoading){
    return <h1>Cargando</h1>
  }

  return (
    <>
      <NavBar />
      <MainCard styles={cardLayout}>
        <ProfilePicture />
        <ProfileData userData={userData}/>
      </MainCard>
    </>
  );
};
