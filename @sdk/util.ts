// Adds query string to a given api endpoint url
export const withParams = (path = '', params: Record<string, string>) => {
  if (Object.keys(params).length > 0)
    return path + '?' + new URLSearchParams(params).toString();
  return path;
};

// Mixin to type annotate fetch response
export const fetcher = async <T>(f: Promise<Response>) => {
  const response = await f;
  const data: T = await response.json();
  return data;
};
