import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {

  previewSheet,
  UserData,
  handleCreateTable,
  viewTable,
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

