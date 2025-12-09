import type { TableInfo, User } from "@/types/types";
import { TableList } from "./Tablelist";

export function MainContent({ tables, user }: {tables:TableInfo[] | undefined, user: User | null}) {
  return (
    <div className="flex flex-col w-full my-2 ">
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Your synced tables are listed below.</p>
      </div>

      {/* Synced Tables */}
      <TableList tables={tables} />
    </div>
  );
}
