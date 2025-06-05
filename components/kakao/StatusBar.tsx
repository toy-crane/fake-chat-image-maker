import { Calendar, Signal, Wifi, Battery } from 'lucide-react';
import { StatusBarProps } from './types';

export function StatusBar({ time }: StatusBarProps) {
  return (
    <div className="bg-white px-6 py-2 flex items-center justify-between text-black text-lg font-medium">
      <div className="flex items-center gap-1">
        <span>{time}</span>
        <Calendar className="w-4 h-4 ml-1" />
      </div>
      <div className="flex items-center gap-1">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <Battery className="w-4 h-4" />
      </div>
    </div>
  );
}