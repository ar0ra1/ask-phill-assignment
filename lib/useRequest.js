import useSWR from "swr";
import axios from "axios";

export default function useRequest(request, { fallbackData, ...config } = {}) {
  return useSWR(
    request && JSON.stringify(request),
    () => axios(request || {}).then((response) => response.data),
    {
      ...config,
      fallbackData: fallbackData && {
        status: 206,
        statusText: "Loading...",
        headers: {},
        data: fallbackData,
      },
    }
  );
}
