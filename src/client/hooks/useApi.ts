import useSWR, { SWRResponse } from "swr";
import { ElevenApi } from "../../interfaces/api.schema";
import { useServices } from "./useServices";

export const useApi = <T extends keyof ElevenApi>(
  action: T,
  request: ElevenApi[T]["request"]
): SWRResponse<ElevenApi[T]["response"], { message: string }> => {
  const { client } = useServices();
  return useSWR({ action, request }, ({ action, request }) =>
    client.emit(action, request)
  );
};
