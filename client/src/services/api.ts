const API_BASE = import.meta.env.VITE_API_URL || "";

// Helper function for API calls
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || error.error || "Request failed");
  }

  return response.json();
}

// ============ TURFS ============
export interface TurfAPI {
  _id: string;
  name: string;
  image: string;
  images?: string[];
  distance: number;
  rating: number;
  pricePerHour: number;
  address: string;
  isFavorite: boolean;
  description?: string;
  amenities?: string[];
  openTime?: string;
  closeTime?: string;
}

// Transform _id to id for frontend compatibility
function transformTurf(turf: TurfAPI) {
  return {
    ...turf,
    id: turf._id,
  };
}

export const turfService = {
  getAll: async () => {
    const turfs = await request<TurfAPI[]>("/api/turfs");
    return turfs.map(transformTurf);
  },

  getById: async (id: string) => {
    const turf = await request<TurfAPI>(`/api/turfs/${id}`);
    return transformTurf(turf);
  },

  getBookedSlots: async (turfId: string, date: string) => {
    return request<string[]>(`/api/turfs/${turfId}/booked-slots?date=${date}`);
  },
};

// ============ BOOKINGS ============
export interface BookingAPI {
  _id: string;
  turf: string | TurfAPI;
  user: string;
  bookingDate: string;
  bookingTime: string;
  duration: number;
  totalPrice: number;
  status: "confirmed" | "cancelled" | "completed";
}

export const bookingService = {
  getMyBookings: () => request<BookingAPI[]>("/api/users/current/bookings"),

  create: (
    turfId: string,
    data: {
      bookingDate: string;
      bookingTime: string;
      duration?: number;
      totalPrice?: number;
    }
  ) =>
    request<BookingAPI>(`/api/turfs/${turfId}/bookings`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  cancel: (bookingId: string) =>
    request(`/api/bookings/${bookingId}/cancel`, { method: "PUT" }),
};

// ============ AUTH ============
export interface UserAPI {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role: "CUSTOMER" | "COURTOWNER" | "ADMIN";
}

export const authService = {
  signup: (data: {
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  }) =>
    request<UserAPI>("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ ...data, role: "CUSTOMER" }),
    }),

  signin: (username: string, password: string) =>
    request<UserAPI>("/api/users/signin", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  signout: () =>
    request("/api/users/signout", { method: "POST" }),

  getProfile: () => request<UserAPI>("/api/users/profile"),

  updateProfile: (userId: string, data: Partial<UserAPI>) =>
    request<UserAPI>(`/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};