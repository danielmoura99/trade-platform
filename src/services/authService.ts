import api from "./api";

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

class AuthService {
  // Login
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
      const { token, user } = response.data;

      // Armazenar token
      localStorage.setItem("authToken", token);

      return response.data;
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      throw error;
    }
  }

  // Logout
  logout(): void {
    localStorage.removeItem("authToken");
  }

  // Verificar se usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken");
  }

  // Obter usuário atual
  getCurrentUser(): any {
    const userStr = localStorage.getItem("userProfile");
    return userStr ? JSON.parse(userStr) : null;
  }
}

export default new AuthService();
