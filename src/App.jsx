import { useEffect } from "react";
import { supabase } from "./supabase/Connection";
import { Login } from "./Pages/Auth/Auth";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Profile } from "./Pages/Profile/Profile";
import { NotFound } from "./Pages/NotFound/NotFound";
import { ProfileSettings } from "./Pages/ProfileSettings/ProfileSettings";

export const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } 
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/settings" element={<ProfileSettings />}/>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};
