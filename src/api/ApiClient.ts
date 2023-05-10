class ApiClient {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private static pendingRequests = new Map<Promise<unknown>, AbortController>();

  private static toJSON = (response: Response) => response.json();

  private static handleError = (e: unknown) => Promise.reject(e);

  private static cancelRequest = (req: Promise<unknown>) => {
    ApiClient.pendingRequests.get(req)?.abort();
  };

  public static request = <R>(
    input: RequestInfo,
    init: RequestInit = {},
    onFulfilled = ApiClient.toJSON,
    onRejected = ApiClient.handleError,
  ): Promise<R> & { cancel: () => void } => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const req = fetch(input, { signal, ...init })
      .then(onFulfilled)
      .catch(onRejected)
      .finally(() => {
        ApiClient.pendingRequests.delete(req);
      });

    ApiClient.pendingRequests.set(req, abortController);

    const cancel = () => ApiClient.cancelRequest(req);

    return Object.assign(req, { cancel });
  };
}

export default ApiClient;
