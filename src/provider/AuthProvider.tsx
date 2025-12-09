import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useUser } from "../store/ZustandStore";
import { useMe } from "@/hooks/query";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useUser((s) => s.setUser);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;

      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.full_name,
          avatar: session.user.user_metadata.avatar_url,
          tables: [],
        });
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata.full_name,
            avatar: session.user.user_metadata.avatar_url,
            tables: [],
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [setUser]);

  const { data } = useMe();

  useEffect(() => {
    if (!data) return;
    const { user, tables } = data;

    if (user) {
      setUser({
        id: user.supabaseId,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        tables,
      });
    }
  }, [data, setUser]);

  return <>{children}</>;
}
