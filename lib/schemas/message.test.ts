import { describe, expect, it } from "bun:test";
import { bulkImportSchema, messageFormSchema } from "./message";

describe("messageFormSchema", () => {
  it("validates a valid text message", () => {
    const validTextMessage = {
      content: "Hello world",
      isUserMessage: true,
      hour: 14,
      minute: 30,
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
      hour: 9,
      minute: 15,
      type: "image" as const,
    };

    const result = messageFormSchema.parse(validImageMessage);
    expect(result).toEqual(validImageMessage);
  });

  it("rejects text message without content", () => {
    const invalidMessage = {
      isUserMessage: true,
      hour: 14,
      minute: 30,
      type: "text" as const,
    };

    expect(() => messageFormSchema.parse(invalidMessage)).toThrow();
  });

  it("rejects image message without imageUrl", () => {
    const invalidMessage = {
      isUserMessage: true,
      hour: 14,
      minute: 30,
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
        hour: 14,
        minute: 30,
        type: "text" as const,
      },
      {
        imageUrl: "data:image/png;base64,abc123",
        imageAlt: "Test image",
        isUserMessage: false,
        hour: 9,
        minute: 15,
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
        hour: 14,
        minute: 30,
        type: "text" as const,
      },
      {
        // Invalid: no content or imageUrl
        isUserMessage: false,
        hour: 9,
        minute: 15,
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
        hour: 10,
        minute: 0,
        type: "text" as const,
      },
      {
        imageUrl: "data:image/jpeg;base64,def456",
        imageAlt: "Photo",
        isUserMessage: false,
        hour: 10,
        minute: 5,
        type: "image" as const,
      },
      {
        content: "Text message 2",
        isUserMessage: true,
        hour: 10,
        minute: 10,
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