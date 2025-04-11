const extractQueryParams = (url: string) => {
  const queryString = url.split("?")[1];
  if (!queryString) return {};

  return Object.fromEntries(new URLSearchParams(queryString));
};

export default extractQueryParams;