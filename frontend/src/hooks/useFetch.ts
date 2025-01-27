import { useState, useEffect } from "react";
import { FetchState } from "../@types/hooks/useFetch";

export function useFetch<T>(
  fetchFunction: () => Promise<T>,
  defaultValue: T,
  dependencies: any[] = []
): FetchState<T> {
  const [data, setData] = useState<T>(defaultValue);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError((err as Error).message || "Erro inesperado.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, error, isLoading };
}
