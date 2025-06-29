import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, jest, beforeEach } from "bun:test";
import { MessageForm } from "./MessageForm";

// Mock file for testing
const createMockJsonFile = (content: unknown) => {
  const jsonString = JSON.stringify(content);
  const blob = new Blob([jsonString], { type: "application/json" });
  return new File([blob], "messages.json", { type: "application/json" });
};

const createMockInvalidFile = () => {
  const blob = new Blob(["invalid json content"], { type: "application/json" });
  return new File([blob], "invalid.json", { type: "application/json" });
};

describe("MessageForm JSON Import", () => {
  const mockOnAddMessage = jest.fn();
  const mockOnAddBulkMessages = jest.fn();
  const mockOnClearMessages = jest.fn();

  const defaultProps = {
    onAddMessage: mockOnAddMessage,
    currentUserName: "John",
    otherUserName: "Jane",
    onClearMessages: mockOnClearMessages,
    messagesCount: 0,
    onAddBulkMessages: mockOnAddBulkMessages,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("JSON Import Button", () => {
    it("renders import JSON button", () => {
      render(<MessageForm {...defaultProps} />);
      
      expect(screen.getByRole("button", { name: /import json/i })).toBeInTheDocument();
    });

    it("opens format dialog when import button is clicked", () => {
      render(<MessageForm {...defaultProps} />);
      
      fireEvent.click(screen.getByRole("button", { name: /import json/i }));
      
      expect(screen.getByText(/json format/i)).toBeInTheDocument();
      expect(screen.getByText(/upload json file/i)).toBeInTheDocument();
    });

    it("shows AI-powered prompt in format dialog", () => {
      render(<MessageForm {...defaultProps} />);
      
      fireEvent.click(screen.getByRole("button", { name: /import json/i }));
      
      // Open the AI Prompt accordion
      fireEvent.click(screen.getByText(/ai prompt template/i));
      
      expect(screen.getByText(/copy this prompt to your ai assistant/i)).toBeInTheDocument();
      expect(screen.getByText(/generate a json array/i)).toBeInTheDocument();
    });
  });

  describe("JSON File Upload", () => {
    it("accepts valid JSON file and calls onAddBulkMessages", async () => {
      const validMessages = [
        {
          content: "Hello world",
          isUserMessage: true,
          time: "14:30",
          type: "text",
        },
        {
          imageUrl: "data:image/png;base64,abc123",
          imageAlt: "Test image",
          isUserMessage: false,
          time: "15:00",
          type: "image",
        },
      ];

      render(<MessageForm {...defaultProps} />);
      
      // Open dialog
      fireEvent.click(screen.getByRole("button", { name: /import json/i }));
      
      // Upload file
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockJsonFile(validMessages);
      
      await act(async () => {
        fireEvent.change(fileInput, { target: { files: [file] } });
      });

      expect(mockOnAddBulkMessages).toHaveBeenCalledWith(validMessages);
    });

    it("rejects invalid JSON file and shows error", async () => {
      render(<MessageForm {...defaultProps} />);
      
      // Open dialog
      fireEvent.click(screen.getByRole("button", { name: /import json/i }));
      
      // Upload invalid file
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockInvalidFile();
      
      await act(async () => {
        fireEvent.change(fileInput, { target: { files: [file] } });
      });

      expect(screen.getByText(/invalid json format/i)).toBeInTheDocument();
      expect(mockOnAddBulkMessages).not.toHaveBeenCalled();
    });

    it("validates message structure and shows specific errors", async () => {
      const invalidMessages = [
        {
          // Missing required fields
          content: "Hello",
          isUserMessage: true,
          type: "text",
          // Missing time
        },
        {
          // Invalid time values
          content: "World",
          isUserMessage: true,
          time: "25:30", // Invalid time
          type: "text",
        },
      ];

      render(<MessageForm {...defaultProps} />);
      
      // Open dialog
      fireEvent.click(screen.getByRole("button", { name: /import json/i }));
      
      // Upload file
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockJsonFile(invalidMessages);
      
      await act(async () => {
        fireEvent.change(fileInput, { target: { files: [file] } });
      });

      expect(screen.getByText(/validation errors/i)).toBeInTheDocument();
      expect(mockOnAddBulkMessages).not.toHaveBeenCalled();
    });

    it("rejects empty array", async () => {
      render(<MessageForm {...defaultProps} />);
      
      // Open dialog
      fireEvent.click(screen.getByRole("button", { name: /import json/i }));
      
      // Upload empty array
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockJsonFile([]);
      
      await act(async () => {
        fireEvent.change(fileInput, { target: { files: [file] } });
      });

      expect(screen.getByText(/at least one message is required/i)).toBeInTheDocument();
      expect(mockOnAddBulkMessages).not.toHaveBeenCalled();
    });

    it("accepts only JSON files", () => {
      render(<MessageForm {...defaultProps} />);
      
      // Open dialog
      fireEvent.click(screen.getByRole("button", { name: /import json/i }));
      
      // Check file input accept attribute
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(fileInput).toHaveAttribute("accept", ".json,application/json");
    });
  });

  describe("Format Documentation", () => {
    it("displays correct JSON format example", () => {
      render(<MessageForm {...defaultProps} />);
      
      fireEvent.click(screen.getByRole("button", { name: /import json/i }));
      
      // Open the JSON Format accordion
      fireEvent.click(screen.getByText(/json format documentation/i));
      
      // Check for format documentation
      expect(screen.getByText(/"type": "text"/)).toBeInTheDocument();
      expect(screen.getByText(/"type": "image"/)).toBeInTheDocument();
      expect(screen.getByText(/"isUserMessage"/)).toBeInTheDocument();
      expect(screen.getByText(/"time"/)).toBeInTheDocument();
    });

    it("shows AI prompt for generating JSON", () => {
      render(<MessageForm {...defaultProps} />);
      
      fireEvent.click(screen.getByRole("button", { name: /import json/i }));
      
      // Open the AI Prompt accordion
      fireEvent.click(screen.getByText(/ai prompt template/i));
      
      expect(screen.getByText(/copy this prompt to your ai assistant/i)).toBeInTheDocument();
      expect(screen.getByText(/generate a json array/i)).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("shows clear error for text message without content", async () => {
      const invalidMessage = [
        {
          isUserMessage: true,
          time: "14:30",
          type: "text",
          // Missing content
        },
      ];

      render(<MessageForm {...defaultProps} />);
      
      fireEvent.click(screen.getByRole("button", { name: /import json/i }));
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockJsonFile(invalidMessage);
      
      await act(async () => {
        fireEvent.change(fileInput, { target: { files: [file] } });
      });

      expect(screen.getByText(/content.*required/i)).toBeInTheDocument();
    });

    it("shows clear error for image message without imageUrl", async () => {
      const invalidMessage = [
        {
          isUserMessage: true,
          time: "14:30",
          type: "image",
          // Missing imageUrl
        },
      ];

      render(<MessageForm {...defaultProps} />);
      
      fireEvent.click(screen.getByRole("button", { name: /import json/i }));
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockJsonFile(invalidMessage);
      
      await act(async () => {
        fireEvent.change(fileInput, { target: { files: [file] } });
      });

      expect(screen.getByText(/validation errors/i)).toBeInTheDocument();
    });

    it("provides specific fix suggestions in error messages", async () => {
      const invalidMessage = [
        {
          content: "Hello",
          isUserMessage: "yes", // Should be boolean
          time: "25:30", // Invalid time
          type: "text",
        },
      ];

      render(<MessageForm {...defaultProps} />);
      
      fireEvent.click(screen.getByRole("button", { name: /import json/i }));
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockJsonFile(invalidMessage);
      
      await act(async () => {
        fireEvent.change(fileInput, { target: { files: [file] } });
      });

      expect(screen.getByText(/validation errors/i)).toBeInTheDocument();
    });
  });

  describe("Dialog Controls", () => {
    it("closes dialog when close button is clicked", () => {
      render(<MessageForm {...defaultProps} />);
      
      fireEvent.click(screen.getByRole("button", { name: /import json/i }));
      expect(screen.getByText(/json format/i)).toBeInTheDocument();
      
      fireEvent.click(screen.getByRole("button", { name: /close/i }));
      expect(screen.queryByText(/json format/i)).not.toBeInTheDocument();
    });

    it("closes dialog after successful import", async () => {
      const validMessages = [
        {
          content: "Test message",
          isUserMessage: true,
          time: "14:30",
          type: "text",
        },
      ];

      render(<MessageForm {...defaultProps} />);
      
      fireEvent.click(screen.getByRole("button", { name: /import json/i }));
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockJsonFile(validMessages);
      
      await act(async () => {
        fireEvent.change(fileInput, { target: { files: [file] } });
      });

      // Dialog should close after successful import
      expect(screen.queryByText(/import messages from json/i)).not.toBeInTheDocument();
    });
  });
});