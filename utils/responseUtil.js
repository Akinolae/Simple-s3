const extractApiError = (error) => {
  if (typeof error === "object") {
    if (error.message === "Network Error") {
      return error.message;
    } else {
      return !!error.response ? error.response.data.message : error.message;
    }
  } else {
    return error;
  }
};
export { extractApiError };
