import React from "react";
import Image from "next/image";

interface InstagramUser {
  id: string;
  name: string;
  avatar: string;
  username: string;
}

interface InstagramChatHeaderProps {
  user: InstagramUser;
  onBack: () => void;
  onPhoneCall: () => void;
  onVideoCall: () => void;
}

export function InstagramChatHeader({
  user,
  onBack,
  onPhoneCall,
  onVideoCall,
}: InstagramChatHeaderProps) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200"
      data-testid="instagram-chat-header"
    >
      {/* Left side - Back button and user info */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onBack}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          data-testid="back-button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-700"
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={user.avatar}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.username}</p>
          </div>
        </div>
      </div>

      {/* Right side - Action buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onPhoneCall}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          data-testid="phone-button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-700"
          >
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={onVideoCall}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          data-testid="video-button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-700"
          >
            <polygon
              points="23 7 16 12 23 17 23 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="1"
              y="5"
              width="15"
              height="14"
              rx="2"
              ry="2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}