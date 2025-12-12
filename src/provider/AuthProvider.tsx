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
        setUser((prev) => ({
          ...prev,
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.full_name,
          avatar: session.user.user_metadata.avatar_url,
        }));
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.provider_token) {
          localStorage.setItem("google_access_token", session.provider_token);
        }

        if (session?.provider_refresh_token) {
          localStorage.setItem("google_refresh_token", session.provider_refresh_token);
        }

        if (event === "SIGNED_OUT") {
          localStorage.removeItem("google_access_token");
          localStorage.removeItem("google_refresh_access");
          setUser(null); // reset everything
          return;
        }

        if (session?.user) {
          setUser((prev) => ({
            ...prev,
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata.full_name,
            avatar: session.user.user_metadata.avatar_url,
          }));
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
      setUser((prev) => ({
        ...prev,
        id: user.supabaseId,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        tables, // only place tables update should happen
      }));
    }
  }, [data, setUser]);

  return <>{children}</>;
}
