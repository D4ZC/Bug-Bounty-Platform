// Mock de funciones de logService
module.exports = {
  getStats: async () => ({ total: 0, errors: 0, warnings: 0 }),
  getLogs: async () => ({ logs: [], total: 0 }),
  getUserLogs: async () => ({ logs: [], total: 0 }),
  getCategoryLogs: async () => ({ logs: [], total: 0 }),
  getErrorLogs: async () => ({ logs: [], total: 0 })
}; 