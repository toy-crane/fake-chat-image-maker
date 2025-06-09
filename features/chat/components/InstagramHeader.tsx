import { ChevronLeft, Video, Phone, Info } from "lucide-react";
import { InstagramHeaderProps } from "./types";

export function InstagramHeader({ title }: InstagramHeaderProps) {
  return (
    <div 
      data-testid="instagram-header"
      className="bg-black px-4 py-3 flex items-center justify-between border-b border-gray-800"
    >
      <div className="flex items-center gap-3">
        <div className="p-1">
          <ChevronLeft 
            data-testid="back-arrow"
            className="w-6 h-6 text-white" 
          />
        </div>
        <span className="text-white font-medium truncate">{title}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="p-1">
          <Video 
            data-testid="video-call-icon"
            className="w-6 h-6 text-white" 
          />
        </div>
        <div className="p-1">
          <Phone 
            data-testid="phone-call-icon"
            className="w-6 h-6 text-white" 
          />
        </div>
        <div className="p-1">
          <Info 
            data-testid="info-icon"
            className="w-6 h-6 text-white" 
          />
        </div>
      </div>
    </div>
  );
}