import { describe, expect, it } from "bun:test";
import { render, screen } from "@/testing-library";
import { InstagramStatusBar } from "./InstagramStatusBar";

describe("InstagramStatusBar", () => {
  it("renders status bar with time", () => {
    render(<InstagramStatusBar />);

    const statusBar = screen.getByTestId("instagram-status-bar");
    expect(statusBar).toBeInTheDocument();
    
    // Check for time display
    const timeElement = screen.getByTestId("status-time");
    expect(timeElement).toBeInTheDocument();
  });

  it("renders signal strength indicator", () => {
    render(<InstagramStatusBar />);

    const signalIndicator = screen.getByTestId("signal-indicator");
    expect(signalIndicator).toBeInTheDocument();
  });

  it("renders wifi indicator", () => {
    render(<InstagramStatusBar />);

    const wifiIndicator = screen.getByTestId("wifi-indicator");
    expect(wifiIndicator).toBeInTheDocument();
  });

  it("renders battery indicator", () => {
    render(<InstagramStatusBar />);

    const batteryIndicator = screen.getByTestId("battery-indicator");
    expect(batteryIndicator).toBeInTheDocument();
  });

  it("applies Instagram status bar styling", () => {
    render(<InstagramStatusBar />);

    const statusBar = screen.getByTestId("instagram-status-bar");
    expect(statusBar).toHaveClass("bg-white");
    expect(statusBar).toHaveClass("text-black");
  });

  it("displays current time", () => {
    render(<InstagramStatusBar />);

    const timeElement = screen.getByTestId("status-time");
    // The time should be in format like "8:39"
    expect(timeElement.textContent).toMatch(/^\d{1,2}:\d{2}$/);
  });
});