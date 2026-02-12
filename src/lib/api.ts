// Configuración de la API - Cambia esta URL a la de tu servidor Django
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// ============ Tipos ============

export interface Cow {
  id: string;
  name: string;
  nickname: string;
  breed: string;
  tagCode: string;
  birthDate: string;
  deathDate?: string;
  sex: "Hembra" | "Macho";
  color: string;
  weight: string;
  owner: string;
  ownerId: string;
  status: "Activo" | "Fallecido";
  photo?: string;
  registeredAt: string;
}

export interface Owner {
  id: string;
  name: string;
  document: string;
  phone: string;
  address: string;
  cattleCount: number;
}

export interface DashboardStats {
  totalRegistered: number;
  recentBirths: number;
  deaths: number;
  registeredToday: number;
}

export interface CowCreatePayload {
  name: string;
  nickname: string;
  breed: string;
  sex: string;
  color: string;
  weight: string;
  tagCode: string;
  birthDate: string;
  birthPlace: string;
  observations: string;
  ownerId: string;
  photo?: File | null;
}

// ============ Helper para fetch ============

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      // Agrega aquí tu token de autenticación si usas uno:
      // "Authorization": `Bearer ${getToken()}`,
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Error de conexión con el servidor" }));
    throw new Error(error.detail || `Error ${res.status}`);
  }

  return res.json();
}

// ============ Endpoints de Ganado ============

export const cowsApi = {
  getAll: () => apiFetch<Cow[]>("/ganado/"),

  getById: (id: string) => apiFetch<Cow>(`/ganado/${id}/`),

  create: async (data: CowCreatePayload) => {
    // Si hay foto, usar FormData en vez de JSON
    if (data.photo) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value instanceof File ? value : String(value));
        }
      });

      const res = await fetch(`${API_BASE_URL}/ganado/`, {
        method: "POST",
        body: formData,
        // No poner Content-Type, el browser lo pone automáticamente con el boundary
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ detail: "Error al registrar" }));
        throw new Error(error.detail || `Error ${res.status}`);
      }
      return res.json() as Promise<Cow>;
    }

    return apiFetch<Cow>("/ganado/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getStats: () => apiFetch<DashboardStats>("/ganado/stats/"),
};

// ============ Endpoints de Propietarios ============

export const ownersApi = {
  getAll: () => apiFetch<Owner[]>("/propietarios/"),

  getById: (id: string) => apiFetch<Owner>(`/propietarios/${id}/`),
};

// ============ Endpoints de Documentos ============

export const documentsApi = {
  exportBirthCertificate: (cowId: string) =>
    apiFetch<Blob>(`/documentos/nacimiento/${cowId}/`, {
      headers: { Accept: "application/pdf" },
    }),

  exportDeathCertificate: (cowId: string) =>
    apiFetch<Blob>(`/documentos/defuncion/${cowId}/`, {
      headers: { Accept: "application/pdf" },
    }),

  exportDNI: (cowId: string) =>
    apiFetch<Blob>(`/documentos/dni/${cowId}/`, {
      headers: { Accept: "application/pdf" },
    }),
};
