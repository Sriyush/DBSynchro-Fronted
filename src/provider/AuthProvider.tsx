import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useUser } from "../store/ZustandStore";
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useUser((s) => s.setUser);

  useEffect(() => {
    // Check on app load
    supabase.auth.getSession().then(({ data}) => {
      const session = data.session;
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.full_name,
          avatar: session.user.user_metadata.avatar_url,
        });
        console.log("AuthProvider - User " ,session.user.user_metadata.avatar_url);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
        setUser({
        id: session.user.id,
        email: session.user.email!,
        name: session.user.user_metadata.full_name,
        avatar: session.user.user_metadata.avatar_url,
        });
    } else {
        setUser(null);
    }
    });

    return () => {
    authListener?.subscription.unsubscribe();
    };

  }, []);

  return <>{children}</>;
}
