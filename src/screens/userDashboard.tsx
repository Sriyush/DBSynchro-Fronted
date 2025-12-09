import { MainContent } from "@/components/UserDashboard/Maincontent";
import { Sidebar } from "@/components/UserDashboard/sidebar";
import { useUser } from "@/store/ZustandStore";

export function UserDashboard() {
  const { user } = useUser();
  const tables = user?.tables;

  return (
    <div className="flex pt-20 px-10 gap-10 min-h-screen bg-gray-50   ">
      <Sidebar  info={user} tables={tables}/>

      <MainContent user={user} tables={tables} />
    </div>
  );
}
