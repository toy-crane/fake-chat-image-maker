import { useState } from "react";
import { Plus, Smile, Mic, Send } from "lucide-react";
import { DiscordInputProps } from "./discord-types";

export function DiscordInput({
  channelName,
  onSendMessage,
  onAttach,
  onEmoji,
  placeholder,
}: DiscordInputProps) {
  const [message, setMessage] = useState("");
  
  const defaultPlaceholder = placeholder || `Message #${channelName}`;
  const hasMessage = message.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSendMessage) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div 
      data-testid="discord-input" 
      className="bg-gray-600 rounded-lg mx-4 mb-4 p-3"
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <button
          type="button"
          onClick={onAttach}
          data-testid="attachment-button"
          className="text-gray-400 hover:text-gray-300 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={defaultPlaceholder}
            className="w-full bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={onEmoji}
          data-testid="emoji-button"
          className="text-gray-400 hover:text-gray-300 transition-colors"
        >
          <Smile className="w-6 h-6" />
        </button>

        <button
          type="submit"
          data-testid={hasMessage ? "send-button" : "mic-button"}
          className="text-gray-400 hover:text-gray-300 transition-colors"
        >
          {hasMessage ? (
            <Send className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>
      </form>
    </div>
  );
}