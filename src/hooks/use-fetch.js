import { useState, useCallback } from 'react';

const useFetch = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (config, applyData) => {
    setIsLoading(true);

    try {
      const rawResponse = await fetch(config.url, {
        method: config.method || 'GET',
        headers: config.headers || {},
        body: config.body ? JSON.stringify(config.body) : null,
      });

      if (!rawResponse.ok) {
        throw new Error('Request failed!');
      }

      const response = await rawResponse.json();
      applyData(response);
    } catch (error) {
      setError(error.message || 'Something went wrong!');
    }

    setIsLoading(false);
  }, []);

  return { sendRequest, error, isLoading };
};

export default useFetch;
