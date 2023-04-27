import { supabase } from "../supabase/Connection";

export const getGroupsByUserId = async (user_id) => {
  const { data, error } = await supabase
    .from("comunities")
    .select("group_id, groups(*)")
    .eq("user_id", user_id)

  if (error) return error;

  return data;
};

export const getConectionsByUserId = async (user_id) => {
  const { count, error } = await supabase
    .from("conections")
    .select("user_id", { count: "exact" })
    .eq("user_id", user_id)

  if (error) return error;

  return count;
}

export const getActivitiesByUserId = async (user_id) => {
  const {data, error} = await supabase
    .from("elemements")
    .select("elements.*")
}