export const getURL = () => {
  let url =
    process.env.REACT_APP_SITE_URL ||
    process.env.REACT_APP_FRONTEND_URL ||
    (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

  // Ensure URL starts with http/https
  if (typeof url === "string" && !url.startsWith("http")) {
    url = `https://${url}`;
  }

  // Ensure trailing slash
  if (typeof url === "string" && !url.endsWith("/")) {
    url = `${url}/`;
  }

  return url;
};
