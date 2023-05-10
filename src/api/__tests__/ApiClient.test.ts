import ApiClient from '../ApiClient';

global.fetch = jest.fn();

describe('ApiClient', () => {
  describe('request', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should make a successful request', async () => {
      const response = { data: 'response data' };

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(response),
      } as Response);

      const result = await ApiClient.request('/api/data');
      expect(result).toEqual(response);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('/api/data', { signal: expect.any(AbortSignal) });
    });

    it('should handle errors', async () => {
      const error = new Error('Request failed');
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(error);

      await expect(ApiClient.request('/api/data')).rejects.toThrow(error);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('/api/data', { signal: expect.any(AbortSignal) });
    });

    it('should cancel a request', async () => {
      const abortSpy = jest.spyOn(AbortController.prototype, 'abort');
      jest.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}));

      const request = ApiClient.request('/api/data');
      request.cancel();

      expect(abortSpy).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('/api/data', { signal: expect.any(AbortSignal) });
    });
  });
});
