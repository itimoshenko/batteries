import {
  useState, useCallback, useEffect, useRef, useMemo,
} from 'react';

import { OnLoad, UseResourceOptions, UseResourceReturnType } from './types';

const useResource = <OPTIONS, RESPONSE, RESOURCE>({
  loadImmediately = false,
  initOptions = {},
  defaultResource,
  onLoad,
  onTransformData = (data: RESPONSE): RESOURCE => data as unknown as RESOURCE,
  onError = () => {},
}: UseResourceOptions<OPTIONS, RESPONSE, RESOURCE>): UseResourceReturnType<
  OPTIONS,
  RESOURCE
  > => {
  const [resource, setResource] = useState<RESOURCE>(defaultResource);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const prevReq = useRef<ReturnType<OnLoad<OPTIONS, RESPONSE>>>();

  const cancelLoad = useCallback(() => {
    if (prevReq.current) {
      prevReq.current.cancel();
    }
  }, []);

  const handleError = useCallback((e: unknown) => {
    setError(e);
    onError(e);
  }, [onError]);

  const load = useCallback(
    (options: OPTIONS) => {
      setIsLoading(true);

      cancelLoad();

      const req = onLoad({ ...initOptions, ...options });

      prevReq.current = req;

      return req
        .then(onTransformData)
        .then(setResource)
        .catch(onError)
        .finally(() => setIsLoading(false));
    },
    [initOptions, cancelLoad, onLoad, onTransformData, onError],
  );

  useEffect(() => {
    if (loadImmediately) {
      try {
        load(initOptions as OPTIONS);
      } catch (e: unknown) {
        handleError(e);
      }
    }

    return () => {
      cancelLoad();
    };
  }, []);

  const result = useMemo(() => ({
    resource,
    isLoading,
    error,
    load,
    cancelLoad,
  }), [resource, isLoading, error, load, cancelLoad]);

  return result;
};

export default useResource;
