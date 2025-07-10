import React from 'react';

const Vulnerabilities: React.FC = () => {
  const vulnerabilities = [
    { id: 1, name: 'SQL Injection', severity: 'Critic', status: 'Open', bounty: 500 },
    { id: 2, name: 'XSS Reflected', severity: 'High', status: 'In Progress', bounty: 300 },
    { id: 3, name: 'CSRF Token Missing', severity: 'Medium', status: 'Open', bounty: 200 },
    { id: 4, name: 'Information Disclosure', severity: 'Low', status: 'Resolved', bounty: 100 },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critic': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'text-red-600 bg-red-100';
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      case 'Resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-semibold mb-6">Vulnerabilidades</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vulnerabilidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recompensa</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vulnerabilities.map((vuln) => (
              <tr key={vuln.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{vuln.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vuln.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(vuln.severity)}`}>
                    {vuln.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vuln.status)}`}>
                    {vuln.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{vuln.bounty} puntos</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vulnerabilities; 