import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import { satisfactionKeys } from "../../utils/queryKeys";

const getSatisfaction = async () => {
  const { data } = await api.get("/encuestas_satisfaccion");
  return data;
};

const useSatisfaction = () => {
  return useQuery({
    queryKey: satisfactionKeys.details(),
    queryFn: getSatisfaction,
    staleTime: Infinity,
    notifyOnChangeProps: ["data", "error"],
  });
};

export default useSatisfaction;
