import { ChevronLeft } from "lucide-react";

interface AppleHeaderProps {
  contactName: string;
}

export function AppleHeader({ contactName }: AppleHeaderProps) {
  return (
    <div 
      data-testid="apple-header"
      className="bg-gray-50 px-4 py-3 flex items-center border-b border-gray-200"
    >
      <button
        aria-label="Back"
        className="p-1 mr-3 text-blue-500"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="flex-1 flex flex-col items-center">
        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mb-1">
          <span className="text-white text-sm font-medium">
            {contactName.charAt(0)}
          </span>
        </div>
        
        <h1 className="text-sm font-medium text-black">
          {contactName}
        </h1>
      </div>

      <div className="w-6"></div>
    </div>
  );
}