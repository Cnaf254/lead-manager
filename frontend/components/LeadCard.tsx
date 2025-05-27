import React from 'react';
import { Lead } from '@/types/api';

interface LeadCardProps {
  lead: Lead;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  // Define status colors based on the lead's status
  const statusColors: { [key: string]: string } = {
    New: 'bg-green-100 text-green-800',
    Contacted: 'bg-blue-100 text-blue-800',
    Qualified: 'bg-yellow-100 text-yellow-800',
    Lost: 'bg-red-100 text-red-800',
    // Add more statuses as needed
  };

  const statusClass = statusColors[lead.status] || 'bg-gray-100 text-gray-800';

  return (
    <div className="w-[384px] rounded-lg overflow-hidden shadow-lg bg-gray-100 hover:shadow-xl transition-shadow duration-300 mb-10">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl text-gray-800">{lead.name}</h3>
          <p className="text-gray-600 text-sm">{lead.email}</p>
        </div>
        <div className="flex justify-between items-center">
          <span
            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${statusClass}`}
          >
            {lead.status}
          </span>
          <p className="text-gray-500 text-sm">
            Created: {new Date(lead.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;