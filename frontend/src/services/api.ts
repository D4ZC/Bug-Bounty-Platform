const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: { email: string; password: string; username: string }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // User endpoints
  async getUsers() {
    return this.request('/users');
  }

  async getUserById(id: string) {
    return this.request(`/users/${id}`);
  }

  async createUser(userData: { username: string; email: string; role?: string }) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: string, userData: Partial<{ username: string; email: string; role: string; points: number; team: string }>) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Team endpoints
  async getTeams() {
    return this.request('/teams');
  }

  async getTeamById(id: string) {
    return this.request(`/teams/${id}`);
  }

  async createTeam(teamData: { name: string; description?: string }) {
    return this.request('/teams', {
      method: 'POST',
      body: JSON.stringify(teamData),
    });
  }

  async updateTeam(id: string, teamData: Partial<{ name: string; description: string }>) {
    return this.request(`/teams/${id}`, {
      method: 'PUT',
      body: JSON.stringify(teamData),
    });
  }

  async deleteTeam(id: string) {
    return this.request(`/teams/${id}`, {
      method: 'DELETE',
    });
  }

  // Vulnerability endpoints
  async getVulnerabilities() {
    return this.request('/vulnerabilities');
  }

  async getVulnerabilityById(id: string) {
    return this.request(`/vulnerabilities/${id}`);
  }

  async createVulnerability(vulnerabilityData: {
    title: string;
    description: string;
    severity: string;
    status: string;
    reportedBy: string;
  }) {
    return this.request('/vulnerabilities', {
      method: 'POST',
      body: JSON.stringify(vulnerabilityData),
    });
  }

  async updateVulnerability(id: string, vulnerabilityData: Partial<{
    title: string;
    description: string;
    severity: string;
    status: string;
  }>) {
    return this.request(`/vulnerabilities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(vulnerabilityData),
    });
  }

  async deleteVulnerability(id: string) {
    return this.request(`/vulnerabilities/${id}`, {
      method: 'DELETE',
    });
  }

  // Challenge endpoints
  async getChallenges() {
    return this.request('/challenges');
  }

  async getChallengeById(id: string) {
    return this.request(`/challenges/${id}`);
  }

  async createChallenge(challengeData: {
    title: string;
    description: string;
    difficulty: string;
    points: number;
  }) {
    return this.request('/challenges', {
      method: 'POST',
      body: JSON.stringify(challengeData),
    });
  }

  async updateChallenge(id: string, challengeData: Partial<{
    title: string;
    description: string;
    difficulty: string;
    points: number;
  }>) {
    return this.request(`/challenges/${id}`, {
      method: 'PUT',
      body: JSON.stringify(challengeData),
    });
  }

  async deleteChallenge(id: string) {
    return this.request(`/challenges/${id}`, {
      method: 'DELETE',
    });
  }

  // Shop endpoints
  async getShopItems() {
    return this.request('/shop');
  }

  async getShopItemById(id: string) {
    return this.request(`/shop/${id}`);
  }

  async purchaseItem(id: string) {
    return this.request(`/shop/${id}/purchase`, {
      method: 'POST',
    });
  }

  // Contribution endpoints
  async getContributions() {
    return this.request('/contributions');
  }

  async getContributionById(id: string) {
    return this.request(`/contributions/${id}`);
  }

  async createContribution(contributionData: {
    title: string;
    description: string;
    type: string;
    submittedBy: string;
  }) {
    return this.request('/contributions', {
      method: 'POST',
      body: JSON.stringify(contributionData),
    });
  }

  async updateContribution(id: string, contributionData: Partial<{
    title: string;
    description: string;
    type: string;
    status: string;
  }>) {
    return this.request(`/contributions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contributionData),
    });
  }

  async deleteContribution(id: string) {
    return this.request(`/contributions/${id}`, {
      method: 'DELETE',
    });
  }

  // Ranking endpoints
  async getUserRanking() {
    return this.request('/rankings/users');
  }

  async getTeamRanking() {
    return this.request('/rankings/teams');
  }

  // Admin endpoints
  async getAdminStats() {
    return this.request('/admin/stats');
  }

  async getAdminUsers() {
    return this.request('/admin/users');
  }

  async updateUserRole(userId: string, role: string) {
    return this.request(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }


}

const apiService = new ApiService();
export default apiService; 