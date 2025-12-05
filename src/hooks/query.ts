import { useMutation, useQuery } from "@tanstack/react-query";
import { createSync, fetchSheet, previewSheet, runSync, UserData } from "../helpers/api";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: UserData,
    retry: false,       
  });
}

export function useRunSync(){
    return useMutation({
        mutationFn: (id: number) => runSync(id),
    })
}

export function usePreviewSheet(sheetId: string){
  return useQuery({
    queryKey: ["preview", sheetId],
    queryFn: () => previewSheet(sheetId),
     enabled: !!sheetId,
  })
}

export function useCreateSync(){
  return useMutation({
    mutationFn: createSync
  })
}

export function useCheckTable(sheetId: string) {
  return useQuery({
    queryKey: ["checkTable", sheetId],
    queryFn: () => fetchSheet(sheetId),
    enabled: !!sheetId,
  })
}