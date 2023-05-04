import { supabase } from "../supabase/Connection";

export const getGroupsByUserId = async (user_id) => {
  const { count, error } = await supabase
    .from("comunities")
    .select("*", {count: "exact", head: true})
    .eq("user_id", user_id)

  if (error) return error;

  return count;
};

export const getConectionsByUserId = async (user_id) => {
  const { count, error } = await supabase
    .from("conections")
    .select("user_id", { count: "exact", head: true })
    .eq("user_id", user_id)

  if (error) return error;

  return count;
}

export const getActivitiesByUserId = async (user_id) => {
  const id_groups = await getIdGroupsByUserId(user_id);
  const total_elements = await getElementsInGroupsId(id_groups);

  return total_elements;
}

const getIdGroupsByUserId = async (user_id) => {
  const {data, error} = await supabase
    .from("comunities")
    .select('group_id')
    .eq("user_id", user_id);

  if (error) return error;

  const id_groups = [];

  for (let group of data){
    id_groups.push(group.group_id);
  }

  return id_groups;
}

const getElementsInGroupsId = async (id_groups) => {
  const { count, error } = await supabase
    .from("elements")
    .select("*", {count: "exact", head: true})
    .in("group_id", id_groups);
  
  return count;
}

export const getUserData = async() => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export const updateUserEmail = async(user_email) => {
  try {
    const { data, error } = await supabase.auth.updateUser(
      {
        email: user_email
      }
    );

    if(error) throw new Error(error.message);

    return data;
  } catch (error) {
    return error;
  }
}

export const updateUserPassword = async(user_password) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: user_password
    });

    if(error) throw new Error(error.message);

    return data;
  } catch (error) {
    return error;
  }
}

export const updateUserMeta = async(username) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        username: username
      }
    });

    if(error) throw new Error(error.message);

    return data;  
  } catch (error) {
    return error;
  }
}