import { useState, useEffect } from "react";

/* H/T: 
  Avoiding Race Conditions and Memory Leaks in React useEffect
  https://javascript.plainenglish.io/avoiding-race-conditions-and-memory-leaks-in-react-useeffect-2034b8a0a3c7
*/


export const useFetchWithAbort = (
  endpoint,
  options
) => {
  const [fetchedData, setFetchedData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint, {
          ...options,
          signal: abortController.signal,
        });
        const newData = await response.json();
        setIsLoading(false);
        setFetchedData(newData);
      } catch (error) {
        if (error.name === "AbortError") {
          setError(error);
          setIsLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [endpoint, options]);

  return { fetchedData, isLoading, error };
};