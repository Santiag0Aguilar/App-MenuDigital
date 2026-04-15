// utils/fetchGeneral.js
async function generalFetch(url, method = "GET", token) {
  if (!token) throw new Error("token is not defined");

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Loyverse ${response.status}: ${body}`);
  }

  return response.json();
}

export default generalFetch;
