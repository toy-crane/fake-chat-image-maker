import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { TelegramHeader } from "./TelegramHeader";

describe("TelegramHeader", () => {
  it("renders contact name", () => {
    render(<TelegramHeader title="Alex Smith" />);
    
    expect(screen.getByText("Alex Smith")).toBeInTheDocument();
  });

  it("displays 'last seen recently' status", () => {
    render(<TelegramHeader title="Alex Smith" />);
    
    expect(screen.getByText("last seen recently")).toBeInTheDocument();
  });

  it("renders back arrow icon", () => {
    render(<TelegramHeader title="Alex Smith" />);
    
    const backIcon = document.querySelector('[data-lucide="chevron-left"]');
    expect(backIcon).toBeInTheDocument();
  });

  it("has correct styling and layout", () => {
    render(<TelegramHeader title="Alex Smith" />);
    
    const header = screen.getByText("Alex Smith").closest('div');
    expect(header).toHaveClass('flex', 'items-center', 'justify-between');
  });

  it("displays contact info section with proper alignment", () => {
    render(<TelegramHeader title="Alex Smith" />);
    
    const nameElement = screen.getByText("Alex Smith");
    const statusElement = screen.getByText("last seen recently");
    
    expect(nameElement).toBeInTheDocument();
    expect(statusElement).toBeInTheDocument();
    
    // Check they are in the same container
    const contactInfoContainer = nameElement.parentElement;
    expect(contactInfoContainer).toContainElement(statusElement);
  });

  it("handles long contact names properly", () => {
    const longName = "Alexander Smith-Johnson Williams";
    render(<TelegramHeader title={longName} />);
    
    expect(screen.getByText(longName)).toBeInTheDocument();
  });

  it("handles empty title gracefully", () => {
    render(<TelegramHeader title="" />);
    
    expect(screen.getByText("last seen recently")).toBeInTheDocument();
  });
});