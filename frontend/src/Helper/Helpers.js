const BASE_URL = "http://localhost:7025/api/admin";

async function Helpers(url, method = "GET", data = null, headers = {}) {
  let token = localStorage.getItem("token");
  try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { authorization: token }),
        ...headers, // Merge custom headers
      },
      body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(BASE_URL + url, options);
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log(error);
  }
}

export default Helpers;
