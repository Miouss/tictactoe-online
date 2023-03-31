export async function fetchServer(url: string, options: RequestInit) {
  const headers = { "Content-Type": "application/json" };
  options = { ...options, headers };

  const response = await fetch(url, options);

  const data = await response.json();

  if (!response.ok) throw { status: response.status, message: data.message };

  return data;
}
