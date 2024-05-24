import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import { callsKeys } from "../../utils/queryKeys";

const getCalls = async () => {
  const { data } = await api.get("/llamadas");
  return data;
};

const useCalls = () => {
  return useQuery(
    {
      queryKey: callsKeys.details(),
      queryFn: getCalls,
      staleTime: Infinity,
      notifyOnChangeProps: ["data", "error"],
    }
  );
};

export default useCalls;
