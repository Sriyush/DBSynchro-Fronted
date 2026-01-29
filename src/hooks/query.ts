import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {

  previewSheet,
  UserData,
  handleCreateTable,
  viewTable,
  checkSheet,
  SyncTable,
  addRow,
  addColumn,
  updateRow,
  api, // Exporting the new api object
} from "../helpers/api";

export { api }; // Re-exporting it for direct use in components

export function useUpdateRow(tableName: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: number | string; updates: Record<string, any> }) =>
      updateRow(tableName, id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["view-table", tableName] });
    },
  });
}

export function useAddRow(tableName: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (rowData: Record<string, any>) => addRow(tableName, rowData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["view-table", tableName] });
    },
  });
}

export function useAddColumn(tableName: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (columnName: string) => addColumn(tableName, columnName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["view-table", tableName] });
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: UserData,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}


export function usePreviewSheet(sheetId: string, tab?: string) {
  return useQuery({
    queryKey: ["preview", sheetId, tab ?? "default"],
    queryFn: () => previewSheet(sheetId, tab),
    enabled: !!sheetId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}


export function useCreateTable(sheetId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      selectedSheet,
      tableName,
      columns,
      rows,
    }: {
      selectedSheet: string;
      tableName: string;
      columns: string[];
      rows: string[][];
    }) =>
      handleCreateTable(sheetId, selectedSheet, tableName, columns,rows),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkTable", sheetId] });
    },
  });
}

export function useViewTable(tableName: string | null) {
  return useQuery({
    queryKey: ["view-table", tableName],
    queryFn: () => viewTable(tableName!),
    enabled: !!tableName,
  });
}

export function useCheckSheet(sheetId: string, sheetTab: string | null) {
  return useQuery({
    queryKey: ["checkTable", sheetId, sheetTab],
    queryFn: () => checkSheet(sheetId, sheetTab!),
    enabled: !!sheetId && !!sheetTab,
    refetchOnWindowFocus: false,
  });
}

export function useSyncTable(sheetId: string, sheetTab: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => SyncTable(sheetId, sheetTab),

    onSuccess: () => {
      // refresh metadata + preview
      queryClient.invalidateQueries({ queryKey: ["checkTable", sheetId, sheetTab] });
      queryClient.invalidateQueries({ queryKey: ["preview", sheetId, sheetTab] });
    },
  });
}