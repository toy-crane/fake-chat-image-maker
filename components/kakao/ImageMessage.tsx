import Image from 'next/image';
import { ImageMessageProps } from './types';
import { format } from 'date-fns';

export function ImageMessage({ message }: ImageMessageProps) {
  const { imageUrl, alt, sender, timestamp, isUser } = message;
  
  const formatTime = (date: Date) => {
    return format(date, "h:mm a");
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="flex items-end gap-2">
          <span className="text-xs text-gray-500">{formatTime(timestamp)}</span>
          <div className="max-w-xs">
            <Image
              src={imageUrl}
              alt={alt}
              width={150}
              height={150}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 mb-4">
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
        {sender.avatar ? (
          <img 
            src={sender.avatar}
            alt={sender.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-xs">{sender.name[0]}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-700 mb-1">{sender.name}</span>
        <div className="flex items-end gap-2">
          <div className="max-w-xs">
            <Image
              src={imageUrl}
              alt={alt}
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
          <span className="text-xs text-gray-500">{formatTime(timestamp)}</span>
        </div>
      </div>
    </div>
  );
}