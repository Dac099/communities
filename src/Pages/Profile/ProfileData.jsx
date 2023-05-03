import { sectionData, username, userInfo } from "./Profile.module.css";

export const ProfileData = ({userData}) => {
  return (userData != null &&
    <section className={sectionData}>
      <div className={username}>
        <p>Nombre de usuario</p>
        <div>
          {userData.data.username}
        </div>
      </div>

      <div className={userInfo}>
          <div>Conexiones con personas</div>
          <div>{userData.connections}</div>
          <div>Integrado en grupos</div>
          <div>{userData.groups_joined}</div>
          <div>Actividades realizadas</div>
          <div>{userData.dates_elements}</div>
      </div>
    </section>
  );
}