import React, { useState } from 'react';
import { Eye, MapPin, Calendar, AlertTriangle, CheckCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface RoadTableProps {
  onViewResults: (road: any) => void;
  searchQuery: string;
  dateFilter: string;
  statusFilter: string;
}

const RoadTable: React.FC<RoadTableProps> = ({ onViewResults, searchQuery, dateFilter, statusFilter }) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    },
    {
      id: 'RD006',
      location: 'Park Avenue, West',
      date: '2024-01-10',
      potholeCount: 7,
      status: 'Moderate',
      severity: 'Medium',
      distance: '2.1 km'
    },
    {
      id: 'RD007',
      location: 'Commerce Street, South',
      date: '2024-01-09',
      potholeCount: 2,
      status: 'Good',
      severity: 'Low',
      distance: '0.7 km'
    }
  ];

  // Filter roads based on search and filters
  const filteredRoads = mockRoads.filter(road => {
    const matchesSearch = searchQuery === '' || 
      road.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      road.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      road.status.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || road.status.toLowerCase() === statusFilter.toLowerCase();
    
    // TODO: Implement date filtering logic
    const matchesDate = true;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRoads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRoads = filteredRoads.slice(startIndex, startIndex + itemsPerPage);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Critical':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'Moderate':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'Good':
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Moderate':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Good':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-100">Recent Road Analyses</h3>
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span>Updated 2 mins ago</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800/50">
              <th className="text-left py-4 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Road ID</th>
              <th className="text-left py-4 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Location</th>
              <th className="text-left py-4 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
              <th className="text-left py-4 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Potholes</th>
              <th className="text-left py-4 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-left py-4 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRoads.map((road, index) => (
              <tr
                key={road.id}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`border-b border-slate-800/30 transition-all duration-200 ${
                  hoveredRow === index ? 'bg-slate-800/20 scale-[1.01]' : ''
                }`}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mr-3">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-slate-100 font-medium">{road.id}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-300">{road.location}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center text-slate-300">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    {road.date}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-slate-100 font-semibold">{road.potholeCount}</span>
                </td>
                <td className="py-4 px-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(road.status)}`}>
                    {getStatusIcon(road.status)}
                    <span className="ml-2">{road.status}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => onViewResults(road)}
                    className="flex items-center px-4 py-2 glass-button rounded-xl text-slate-100 transition-all duration-200 hover:scale-105"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-800/50">
          <div className="text-sm text-slate-400">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRoads.length)} of {filteredRoads.length} results
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center px-3 py-2 glass-button rounded-xl text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                      : 'glass-button text-slate-300 hover:scale-105'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-2 glass-button rounded-xl text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-200"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadTable;