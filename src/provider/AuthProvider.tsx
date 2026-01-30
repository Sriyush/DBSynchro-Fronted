import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useUser } from "../store/ZustandStore";
import { useNavigate } from "react-router-dom";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, resetUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Check for initial session (including URL hash handling)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata.full_name,
          email: session.user.email!,
          avatar: session.user.user_metadata.avatar_url,
          id: session.user.id,
        });
      }
    });

    // 2. Listen for auth changes (Login, Logout, Token Refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event);
      if (session?.user) {
        setUser({
          name: session.user.user_metadata.full_name,
          email: session.user.email!,
          avatar: session.user.user_metadata.avatar_url,
          id: session.user.id,
        });
        
        // Optional: If we just signed in, maybe redirect to dashboard?
        if (event === "SIGNED_IN") {
           // We can decide logic here, but keeping it simple for now
        }

      } else if (event === "SIGNED_OUT") {
        resetUser();
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, resetUser, navigate]);

  return <>{children}</>;
}
