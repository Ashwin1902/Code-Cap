import React from 'react';
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';

interface CardProps {
  imageUrl: string;
  name: string;
  mode: string;
  date: string;
  teamSize: number;
  hackURL: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, name, mode, date, teamSize, hackURL }) => {
  return (
    <div className="bg-gradient-to-r from-slate-950 to-gray-800  rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 relative overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-64 md:h-full object-cover transform hover:scale-105 transition-transform duration-300" 
          />
        </div>
        <div className="flex flex-col justify-between p-6 md:w-3/5">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-100 font-serif">{name}</h2>
            <div className="space-y-3 text-gray-100">
              <InfoItem label="Mode"  value={mode} />
              <InfoItem label="Last Date" value={date} />
              <InfoItem label="Team Size" value={teamSize.toString()} />
            </div>
          </div>
          <div className="mt-6">
            <a href={hackURL} target="_blank" rel="noopener noreferrer" title="Visit the hackathon website">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center text-sm">
    <span className="font-semibold text-yellow-500 w-28 md:text-xl text-lg">{label}:</span>
    <span className="text-gray-100 font-medium md:text-xl text-lg ">{value}</span>
  </div>
);

export default Card;