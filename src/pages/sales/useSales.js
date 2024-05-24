import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import { salesKeys } from "../../utils/queryKeys";

const getSales = async () => {
  const { data } = await api.get("/volumen_ventas");
  return data;
};

const useSales = () => {
  return useQuery(
    {
      queryKey: salesKeys.details(),
      queryFn: getSales,
      staleTime: Infinity,
      notifyOnChangeProps: ["data", "error"],
    }
  );
};

export default useSales;
