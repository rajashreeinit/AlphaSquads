export interface User {
  id: number;
  name: string;
  email: string;
  role: string | null;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string | null;
  user: User | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
