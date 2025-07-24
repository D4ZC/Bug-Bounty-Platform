export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  [key: string]: any;
}

export function login(email: string, password: string): Promise<{ token: string; user: AuthUser }>;
export function register(email: string, password: string): Promise<{ token: string; user: AuthUser }>;
export function logout(token: string): Promise<boolean>; 