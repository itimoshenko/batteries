import { renderHook, act } from '@testing-library/react-hooks';
import useResource from '..';

import { OnLoad, UseResourceOptions } from '../types';

// @ts-ignore
const mockOnLoad: OnLoad<any, any> = jest.fn(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ id: 1, name: 'Test' });
  }, 1000);
}));

const options: UseResourceOptions<any, any, any> = {
  defaultResource: {},
  onLoad: mockOnLoad,
};

describe.skip('useResource', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the default resource', () => {
    const { result } = renderHook(() => useResource(options));
    expect(result.current.resource).toEqual({});
  });

  it('should call onLoad with the correct options', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useResource(options));
    act(() => {
      result.current.load({ id: 1 });
    });
    await waitForNextUpdate();
    expect(mockOnLoad).toHaveBeenCalledWith({ id: 1 });
  });

  it('should set the resource when onLoad resolves', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useResource(options));
    act(() => {
      result.current.load({});
    });
    await waitForNextUpdate();
    expect(result.current.resource).toEqual({ id: 1, name: 'Test' });
  });

  it('should set isLoading to true while the resource is being loaded', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useResource(options));
    expect(result.current.isLoading).toBe(false);
    act(() => {
      result.current.load({});
    });
    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
  });

  it('should set error when onLoad rejects', async () => {
    const mockOnError = jest.fn();
    const { result, waitForNextUpdate } = renderHook(
      () => useResource({ ...options, onError: mockOnError }),
    );
    const error = new Error('Failed to load resource');
    // @ts-ignore
    mockOnLoad.mockRejectedValueOnce(error);
    act(() => {
      result.current.load({});
    });
    await waitForNextUpdate();
    expect(result.current.error).toBe(error);
    expect(mockOnError).toHaveBeenCalledWith(error);
  });

  it('should cancel the previous load when load is called again', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useResource(options));
    act(() => {
      result.current.load({});
      result.current.load({});
    });
    expect(mockOnLoad).toHaveBeenCalledTimes(2);
    await waitForNextUpdate();
    expect(mockOnLoad).toHaveBeenCalledTimes(2);
  });

  it('should cancel the current load when cancelLoad is called', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useResource(options));
    act(() => {
      result.current.load({});
      result.current.cancelLoad();
    });
    expect(mockOnLoad).toHaveBeenCalledTimes(1);
    await waitForNextUpdate();
    expect(result.current.resource).toEqual({});
  });
});
