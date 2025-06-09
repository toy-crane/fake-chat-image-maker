import { Camera, Send } from "lucide-react";
import { InstagramInputProps } from "./types";

export function InstagramInput({
  onSendMessage,
  onAttach,
  onCamera,
  placeholder = "Message...",
}: InstagramInputProps) {
  return (
    <div 
      data-testid="instagram-input"
      className="bg-black px-4 py-3 flex items-center gap-3 border-t border-gray-800"
    >
      <div className="p-2">
        <Camera 
          className="w-6 h-6 text-gray-400" 
          onClick={onCamera}
        />
      </div>
      
      <div className="flex-1 bg-gray-800 rounded-full px-4 py-2 flex items-center">
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder-gray-400 text-sm outline-none"
        />
      </div>
      
      <div className="p-2">
        <Send 
          className="w-6 h-6 text-blue-500" 
          onClick={() => onSendMessage?.("")}
        />
      </div>
    </div>
  );
}