export interface User {
    id: string;
    email: string;
    name: string;
    avatar:string
}
//    const { sheetId , sheetRange , tableName , mapping} = req.body;

export interface CreateSync{
    sheetId: string;
    sheetRange: string;
    tableName: string;
    mapping: Record<string, string>;
}
export interface UserState {
    user: User| null;
    setUser: (u: User | null) => void
}