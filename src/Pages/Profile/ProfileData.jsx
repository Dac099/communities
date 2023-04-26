import { supabase } from "../../supabase/Connection";
import { useState, useEffect, useRef } from "react";
import { sectionData } from "./Profile.module.css";
import { getGroupsByUserId, getConectionsByUserId } from "../../utilities/manageDB";

export const ProfileData = (props) => {
  const userData = useRef({});

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();

      console.log(await getGroupsByUserId(user.id));

      userData.current = {
        id: user.id,
        email: user.email,
        data: user.user_metadata,
        dates_elements: 0,
        groups_joined: 0,
        connections: 0
      };

      console.log("User: ", userData.current);
    })();
  }, []);

  return (
    <section className={sectionData}>
      <div>
        <p>Nombre de usuario</p>
        <div>
          {/* {user.current.data.username} */}
        </div>
      </div>

      <div>
        <div>
          <div>Conexiones con personas</div>
          <div></div>
        </div>
        <div>
          <div>Miembro de grupos</div>
          <div></div>
        </div>
        <div>
          <div>Actividades realizadas</div>
          <div></div>
        </div>
      </div>
    </section>
  );
}