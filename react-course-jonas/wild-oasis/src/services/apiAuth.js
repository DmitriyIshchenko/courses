import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // add optional data
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  // get the session from local storage
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  // we could get the user from local storage, but is more secure re-download the data from supabase
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  // only interested in user
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
