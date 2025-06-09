import { describe, expect, it } from "bun:test";
import { bulkImportSchema, messageFormSchema } from "./message";

describe("messageFormSchema", () => {
  it("validates a valid text message", () => {
    const validTextMessage = {
      content: "Hello world",
      isUserMessage: true,
      time: "14:30",
      type: "text" as const,
    };

    const result = messageFormSchema.parse(validTextMessage);
    expect(result).toEqual(validTextMessage);
  });

  it("validates a valid image message", () => {
    const validImageMessage = {
      imageUrl: "data:image/png;base64,abc123",
      imageAlt: "Test image",
      isUserMessage: false,
      time: "09:15",
      type: "image" as const,
    };

    const result = messageFormSchema.parse(validImageMessage);
    expect(result).toEqual(validImageMessage);
  });

  it("rejects text message without content", () => {
    const invalidMessage = {
      isUserMessage: true,
      time: "14:30",
      type: "text" as const,
    };

    expect(() => messageFormSchema.parse(invalidMessage)).toThrow();
  });

  it("rejects image message without imageUrl", () => {
    const invalidMessage = {
      isUserMessage: true,
      time: "14:30",
      type: "image" as const,
    };

    expect(() => messageFormSchema.parse(invalidMessage)).toThrow();
  });
});

describe("bulkImportSchema", () => {
  it("validates an array of valid messages", () => {
    const validBulkData = [
      {
        content: "First message",
        isUserMessage: true,
        time: "14:30",
        type: "text" as const,
      },
      {
        imageUrl: "data:image/png;base64,abc123",
        imageAlt: "Test image",
        isUserMessage: false,
        time: "09:15",
        type: "image" as const,
      },
    ];

    const result = bulkImportSchema.parse(validBulkData);
    expect(result).toEqual(validBulkData);
  });

  it("rejects empty array", () => {
    expect(() => bulkImportSchema.parse([])).toThrow(
      "At least one message is required"
    );
  });

  it("rejects array with invalid messages", () => {
    const invalidBulkData = [
      {
        content: "Valid message",
        isUserMessage: true,
        time: "14:30",
        type: "text" as const,
      },
      {
        // Invalid: no content or imageUrl
        isUserMessage: false,
        time: "09:15",
        type: "text" as const,
      },
    ];

    expect(() => bulkImportSchema.parse(invalidBulkData)).toThrow();
  });

  it("validates mixed text and image messages", () => {
    const mixedMessages = [
      {
        content: "Text message 1",
        isUserMessage: true,
        time: "10:00",
        type: "text" as const,
      },
      {
        imageUrl: "data:image/jpeg;base64,def456",
        imageAlt: "Photo",
        isUserMessage: false,
        time: "10:05",
        type: "image" as const,
      },
      {
        content: "Text message 2",
        isUserMessage: true,
        time: "10:10",
        type: "text" as const,
      },
    ];

    const result = bulkImportSchema.parse(mixedMessages);
    expect(result).toHaveLength(3);
    expect(result[0].type).toBe("text");
    expect(result[1].type).toBe("image");
    expect(result[2].type).toBe("text");
  });
});