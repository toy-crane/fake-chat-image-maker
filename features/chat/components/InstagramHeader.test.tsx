import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { InstagramHeader } from "./InstagramHeader";

describe("InstagramHeader", () => {
  it("renders with correct title", () => {
    const title = "John Doe";
    render(<InstagramHeader title={title} />);

    expect(screen.getByTestId("instagram-header")).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("has Instagram-style dark background", () => {
    render(<InstagramHeader title="Test User" />);

    const header = screen.getByTestId("instagram-header");
    expect(header).toHaveClass("bg-black");
  });

  it("displays back arrow icon", () => {
    render(<InstagramHeader title="Test User" />);

    expect(screen.getByTestId("back-arrow")).toBeInTheDocument();
  });

  it("displays video call icon", () => {
    render(<InstagramHeader title="Test User" />);

    expect(screen.getByTestId("video-call-icon")).toBeInTheDocument();
  });

  it("displays phone call icon", () => {
    render(<InstagramHeader title="Test User" />);

    expect(screen.getByTestId("phone-call-icon")).toBeInTheDocument();
  });

  it("displays info icon", () => {
    render(<InstagramHeader title="Test User" />);

    expect(screen.getByTestId("info-icon")).toBeInTheDocument();
  });

  it("has correct text styling for dark theme", () => {
    render(<InstagramHeader title="Test User" />);

    const titleElement = screen.getByText("Test User");
    expect(titleElement).toHaveClass("text-white");
  });

  it("uses proper spacing and layout", () => {
    render(<InstagramHeader title="Test User" />);

    const header = screen.getByTestId("instagram-header");
    expect(header).toHaveClass("flex");
    expect(header).toHaveClass("items-center");
    expect(header).toHaveClass("justify-between");
    expect(header).toHaveClass("px-4");
    expect(header).toHaveClass("py-3");
  });

  it("handles long usernames properly", () => {
    const longTitle = "Very Long Username That Should Be Handled Properly";
    render(<InstagramHeader title={longTitle} />);

    const titleElement = screen.getByText(longTitle);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("truncate"); // Should truncate long names
  });

  it("has proper icon sizes", () => {
    render(<InstagramHeader title="Test User" />);

    const backArrow = screen.getByTestId("back-arrow");
    const videoIcon = screen.getByTestId("video-call-icon");
    const phoneIcon = screen.getByTestId("phone-call-icon"); 
    const infoIcon = screen.getByTestId("info-icon");

    [backArrow, videoIcon, phoneIcon, infoIcon].forEach(icon => {
      expect(icon).toHaveClass("w-6");
      expect(icon).toHaveClass("h-6");
    });
  });
});