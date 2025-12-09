// import { useMe } from "@/hooks/query";
import type { TableInfo, User } from "@/types/types";

export function Sidebar({info, tables}: {info: User | null, tables:TableInfo[] | undefined}) {


  return (
    <aside className="w-120 bg-white shadow rounded-xl p-6  my-2  border-6 border-black h-[calc(100vh-120px)] sticky top-24">
      {/* USER CARD */}
      <div className="flex flex-col items-center text-center">
        <img
          src={info?.avatar}
          className="w-28 h-28 rounded-full border shadow"
        />
        <h2 className="text-xl font-bold mt-3">{info?.name}</h2>
        <p className="text-gray-600 text-sm">{info?.email}</p>
      </div>

      <hr className="my-5" />

      {/* TABLE LIST */}
      <h3 className="text-lg font-semibold mb-2">Synced Tables</h3>

      {tables?.length === 0 && (
        <p className="text-gray-500 text-sm">No tables created yet.</p>
      )}

      <ul className="space-y-2">
        {tables?.map((t: TableInfo) => (
          <li
            key={t.id}
            className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer transition border-2 border-black"
            // onClick={() => onSelectTable(t.tableName)}
          >
            <p className="font-medium">{t.tableName}</p>
            <p className="text-xs text-gray-500">
              {t.sheetTab} ({t.sheetId.slice(0, 8)}…)
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
