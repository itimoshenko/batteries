type Load<OPTIONS> = (options: OPTIONS) => Promise<unknown>;
type CancelLoad = () => void;

export type OnLoad<OPTIONS, RESPONSE> = (options: OPTIONS) => Promise<RESPONSE> & {
  cancel: CancelLoad
};
type OnTransformData<RESPONSE, RESOURCE> = (data: RESPONSE) => RESOURCE;
type OnRejected = <E extends unknown>(e: E) => unknown;

export type UseResourceOptions<OPTIONS, RESPONSE, RESOURCE> = {
  loadImmediately?: boolean;
  initOptions?: Partial<OPTIONS>;
  defaultResource: RESOURCE;
  onLoad: OnLoad<OPTIONS, RESPONSE>;
  onTransformData?: OnTransformData<RESPONSE, RESOURCE>;
  onError?: OnRejected;
};

export type UseResourceReturnType<OPTIONS, RESOURCE> = {
  resource: RESOURCE;
  isLoading: boolean;
  error: unknown;
  load: Load<OPTIONS>;
  cancelLoad: CancelLoad;
};
