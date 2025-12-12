import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {

  previewSheet,
  UserData,
  handleCreateTable,
  viewTable,
  checkSheet,
  SyncTable,
} from "../helpers/api";

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
      columns,
      rows,
    }: {
      selectedSheet: string;
      columns: string[];
      rows: string[][];
    }) =>
      handleCreateTable(sheetId, selectedSheet, columns,rows),

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