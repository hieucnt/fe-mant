const isAuthenticatedUser = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("is_authenticated") === "true";
  }
  return false;
};

export { isAuthenticatedUser };
