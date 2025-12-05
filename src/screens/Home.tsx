import { useEffect } from "react";
import { useMe } from "../hooks/query";
import { useUser } from "../store/ZustandStore";
import { HeroSection } from "../components/Home/Hero";

export function Home() {
  const { data } = useMe();
  // const user = useUser((s) => s.user);
  const setUser = useUser((s) => s.setUser);

  useEffect(() => {
    if (data?.dbUser) {
      setUser({
        id: data.dbUser.supabaseId,
        email: data.dbUser.email,
        name: data.dbUser.name,
        avatar: data.dbUser.avatar,
      });
    }
  }, [data]);

  return (
    <div className="pt-24 h-screen">
        <HeroSection/>
    </div>
  );
}
