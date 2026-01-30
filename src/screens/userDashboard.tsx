import { MainContent } from "@/components/UserDashboard/Maincontent";
import { Sidebar } from "@/components/UserDashboard/sidebar";
import { useUser } from "@/store/ZustandStore";

export function UserDashboard() {
  const { user } = useUser();
  const tables = user?.tables;

  return (
    <div className="flex flex-col md:flex-row pt-24 px-4 md:px-10 gap-6 md:gap-10 min-h-screen bg-gray-50">
      <Sidebar info={user} tables={tables}/>

      <div className="flex-1 overflow-y-auto pb-20">
        <MainContent user={user} tables={tables} />
      </div>
    </div>
  );
}
