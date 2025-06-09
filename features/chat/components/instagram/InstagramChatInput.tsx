import React, { useState, KeyboardEvent } from "react";

interface InstagramChatInputProps {
  onSendMessage: (message: string) => void;
  onCamera: () => void;
  onMicrophone: () => void;
  onGallery: () => void;
  onSticker: () => void;
  onMore: () => void;
}

export function InstagramChatInput({
  onSendMessage,
  onCamera,
  onMicrophone,
  onGallery,
  onSticker,
  onMore,
}: InstagramChatInputProps) {
  const [message, setMessage] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSendMessage(message.trim());
        setMessage("");
      }
    }
  };

  return (
    <div
      className="flex items-center px-4 py-3 bg-white border-t border-gray-200"
      data-testid="instagram-chat-input"
    >
      {/* Camera button */}
      <button
        onClick={onCamera}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
        data-testid="camera-button"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[#8B3DFF]"
        >
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
          <path
            d="m12 1-3 3H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4l-3-3z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Message input */}
      <div className="flex-1 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message..."
          className="w-full px-4 py-2 bg-gray-100 rounded-full border-none outline-none text-gray-900 placeholder-gray-500"
        />
      </div>

      {/* Right side buttons */}
      <div className="flex items-center ml-2 space-x-1">
        {/* Microphone */}
        <button
          onClick={onMicrophone}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          data-testid="microphone-button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-600"
          >
            <path
              d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 10v2a7 7 0 0 1-14 0v-2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="12"
              y1="19"
              x2="12"
              y2="23"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="8"
              y1="23"
              x2="16"
              y2="23"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Gallery */}
        <button
          onClick={onGallery}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          data-testid="gallery-button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-600"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              ry="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2" />
            <path
              d="m21 15-5-5L5 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Sticker */}
        <button
          onClick={onSticker}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          data-testid="sticker-button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-600"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path
              d="m9 9h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m15 9h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m9.5 13h5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* More */}
        <button
          onClick={onMore}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          data-testid="more-button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-600"
          >
            <circle cx="12" cy="5" r="2" fill="currentColor" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <circle cx="12" cy="19" r="2" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}