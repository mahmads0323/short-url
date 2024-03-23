const DELETE_API_URL =
  import.meta.env.VITE_DELETE_URL || "http://localhost:8000/url/delete";

const deleteUrl = async (id) => {
  const deleteHeaders = {
    idToDelete: id,
  };
  const response = await fetch(DELETE_API_URL, {
    method: "DELETE",
    headers: deleteHeaders,
    credentials: "include",
  });
  const responseData = await response.json();
  return responseData;
};

export default deleteUrl;
