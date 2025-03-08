import useAxios from "@/hooks/useAxios";
import getStatistics from "@/utils/getStatistics";
import { useEffect } from "react";

export default function StatisticsScreen() {
  const axiosClient = useAxios()
  useEffect(() => {
    getStatistics(axiosClient)
  })
}