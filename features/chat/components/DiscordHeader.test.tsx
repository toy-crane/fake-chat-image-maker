import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { DiscordHeader } from "./DiscordHeader";

describe("DiscordHeader", () => {
  it("displays channel name with # prefix", () => {
    render(<DiscordHeader channelName="general" serverName="Test Server" />);
    
    expect(screen.getByText("#general")).toBeInTheDocument();
  });

  it("displays server name", () => {
    render(<DiscordHeader channelName="general" serverName="Test Server" />);
    
    expect(screen.getByText("Test Server")).toBeInTheDocument();
  });

  it("applies Discord header styling", () => {
    render(<DiscordHeader channelName="general" serverName="Test Server" />);
    
    const header = screen.getByTestId("discord-header");
    expect(header).toHaveClass("bg-gray-700", "border-b", "border-gray-600");
  });

  it("shows Discord channel icon", () => {
    render(<DiscordHeader channelName="general" serverName="Test Server" />);
    
    expect(screen.getByTestId("channel-icon")).toBeInTheDocument();
  });

  it("displays member count", () => {
    render(<DiscordHeader channelName="general" serverName="Test Server" memberCount={42} />);
    
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("shows default member count when not provided", () => {
    render(<DiscordHeader channelName="general" serverName="Test Server" />);
    
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<DiscordHeader channelName="general" serverName="Test Server" />);
    
    expect(screen.getByTestId("header-actions")).toBeInTheDocument();
  });
});