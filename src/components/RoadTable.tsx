import React, { useState } from 'react';
import { Eye, MapPin, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface RoadTableProps {
  onViewResults: (road: any) => void;
}

const RoadTable: React.FC<RoadTableProps> = ({ onViewResults }) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const mockRoads = [
    {
      id: 'RD001',
      location: 'Main Street, Downtown',
      date: '2024-01-15',
      potholeCount: 12,
      status: 'Critical',
      severity: 'High',
      distance: '2.5 km'
    },
    {
      id: 'RD002',
      location: 'Highway 101, North',
      date: '2024-01-14',
      potholeCount: 8,
      status: 'Moderate',
      severity: 'Medium',
      distance: '1.8 km'
    },
    {
      id: 'RD003',
      location: 'Oak Avenue, Residential',
      date: '2024-01-13',
      potholeCount: 3,
      status: 'Good',
      severity: 'Low',
      distance: '0.9 km'
    },
    {
      id: 'RD004',
      location: 'Industrial Blvd, East',
      date: '2024-01-12',
      potholeCount: 15,
      status: 'Critical',
      severity: 'High',
      distance: '3.2 km'
    },
    {
      id: 'RD005',
      location: 'Elm Street, Central',
      date: '2024-01-11',
      potholeCount: 5,
      status: 'Moderate',
      severity: 'Medium',
      distance: '1.2 km'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Critical':
        return <AlertTriangle className="w-3.5 h-3.5 text-red-400" />;
      case 'Moderate':
        return <Clock className="w-3.5 h-3.5 text-yellow-400" />;
      case 'Good':
        return <CheckCircle className="w-3.5 h-3.5 text-green-400" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Moderate':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Good':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl p-5 border border-slate-800 shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-slate-100">Recent Road Analyses</h2>
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span>Updated 2 mins ago</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left py-3 px-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Road ID</th>
              <th className="text-left py-3 px-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Location</th>
              <th className="text-left py-3 px-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
              <th className="text-left py-3 px-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Potholes</th>
              <th className="text-left py-3 px-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockRoads.map((road, index) => (
              <tr
                key={road.id}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`border-b border-slate-800/50 transition-all duration-200 ${
                  hoveredRow === index ? 'bg-slate-800/30' : ''
                }`}
              >
                <td className="py-3 px-3">
                  <div className="flex items-center">
                    <div className="w-7 h-7 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center mr-2.5">
                      <MapPin className="w-3.5 h-3.5 text-violet-400" />
                    </div>
                    <span className="text-slate-100 font-medium text-sm">{road.id}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-slate-300 text-sm">{road.location}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center text-slate-300 text-sm">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                    {road.date}
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className="text-slate-100 font-medium text-sm">{road.potholeCount}</span>
                </td>
                <td className="py-3 px-3">
                  <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(road.status)}`}>
                    {getStatusIcon(road.status)}
                    <span className="ml-1.5">{road.status}</span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <button
                    onClick={() => onViewResults(road)}
                    className="flex items-center px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg transition-all duration-200 border border-slate-700 hover:border-slate-600 text-sm"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1.5" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoadTable;