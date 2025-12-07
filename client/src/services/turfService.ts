const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function getAllTurfs() {
  const response = await fetch(`${API_BASE}/turfs`);
  if (!response.ok) throw new Error("Failed to fetch turfs");
  return response.json();
}

export async function getTurfById(id: string) {
  const response = await fetch(`${API_BASE}/turfs/${id}`);
  if (!response.ok) throw new Error("Failed to fetch turf");
  return response.json();
}