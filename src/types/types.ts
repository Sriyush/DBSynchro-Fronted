export interface User {
    id: string;
    email: string;
    name: string;
    avatar:string;
    tables: TableInfo[]
}

export interface TableInfo {
  id: string;
  userId: string;
  tableName: string;
  sheetId: string;
  sheetTab: string;
  mapping: Record<string,string>;
  createdAt: string
}

//    const { sheetId , sheetRange , tableName , mapping} = req.body;

export type CreateSync = {
  sheetId: string;
  sheetRange: string;
  userTableId: number;   // IMPORTANT
  mapping: Record<string, string>;
};

export interface UserState {
    user: User| null;
    setUser: (u: User | null) => void
}