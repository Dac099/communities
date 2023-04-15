import { supabase } from "../../supabase/Connection";
import { useState, useEffect, useRef } from "react";
import { sectionData } from "./Profile.module.css";

export const ProfileData = (props) => {
  const user = useRef({});

  supabase.auth.getUser()    
    .then(userData => {
      user.current = {
        id : userData.data.user.id,
        email: userData.data.user.email,
        data: userData.data.user.user_metadata          
      };

      
      getJoinedGroups(user.current.id)
      .then(count => user.current.joined_groups = count);
      
      console.log(user.current);
    })

  const getJoinedGroups = async (user_id) => {    
    const {count, error} = await supabase
    .from('comunities')
    .select('user_id', {count:"exact"})
    .eq('user_id', user_id);

    if(error) return error;

    return count;
  }

  const getconections = () => {

  }

  const getActivities = () => {

  }

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