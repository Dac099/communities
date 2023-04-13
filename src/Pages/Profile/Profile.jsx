import { supabase } from "../../supabase/Connection";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then((dataSession) => {
      if (!dataSession.data.session.user) {
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
      <h1>Profile User</h1>
      <button onClick={() => supabase.auth.signOut()}>salir</button>
    </>
  );
};
