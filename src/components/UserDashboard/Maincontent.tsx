import type { TableInfo, User } from "@/types/types";
import { TableList } from "./Tablelist";

export function MainContent({ tables, user }: {tables:TableInfo[] | undefined, user: User | null}) {
  return (
    <div className="flex flex-col w-full my-0 md:my-2">
      <div className="bg-white rounded-xl shadow p-6 mb-6 border border-gray-200">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-gray-600 mt-1">Your synced tables are listed below.</p>
      </div>

      {/* Synced Tables */}
      <TableList tables={tables} />
    </div>
  );
}
