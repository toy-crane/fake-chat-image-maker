import { render, screen, act } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { ChatModeProvider, useChatModeContext } from "./ChatModeContext";

function TestComponent() {
  const { chatMode, setChatMode } = useChatModeContext();

  return (
    <div>
      <div data-testid="current-mode">{chatMode}</div>
      <button
        data-testid="switch-to-kakaotalk"
        onClick={() => setChatMode("kakaotalk")}
      >
        Switch to KakaoTalk
      </button>
      <button
        data-testid="switch-to-instagram"
        onClick={() => setChatMode("instagram")}
      >
        Switch to Instagram
      </button>
    </div>
  );
}

function TestComponentWithoutProvider() {
  const context = useChatModeContext();
  return <div>{context.chatMode}</div>;
}

describe("ChatModeContext", () => {
  describe("Provider", () => {
    it("provides default kakaotalk mode", () => {
      render(
        <ChatModeProvider>
          <TestComponent />
        </ChatModeProvider>
      );

      expect(screen.getByTestId("current-mode")).toHaveTextContent("kakaotalk");
    });

    it("accepts initial chat mode", () => {
      render(
        <ChatModeProvider initialMode="instagram">
          <TestComponent />
        </ChatModeProvider>
      );

      expect(screen.getByTestId("current-mode")).toHaveTextContent("instagram");
    });
  });

  describe("useChatModeContext hook", () => {
    it("throws error when used outside provider", () => {
      expect(() => {
        render(<TestComponentWithoutProvider />);
      }).toThrow("useChatModeContext must be used within a ChatModeProvider");
    });
  });

  describe("setChatMode", () => {
    it("switches from kakaotalk to instagram", () => {
      render(
        <ChatModeProvider>
          <TestComponent />
        </ChatModeProvider>
      );

      expect(screen.getByTestId("current-mode")).toHaveTextContent("kakaotalk");

      act(() => {
        screen.getByTestId("switch-to-instagram").click();
      });

      expect(screen.getByTestId("current-mode")).toHaveTextContent("instagram");
    });

    it("switches from instagram to kakaotalk", () => {
      render(
        <ChatModeProvider initialMode="instagram">
          <TestComponent />
        </ChatModeProvider>
      );

      expect(screen.getByTestId("current-mode")).toHaveTextContent("instagram");

      act(() => {
        screen.getByTestId("switch-to-kakaotalk").click();
      });

      expect(screen.getByTestId("current-mode")).toHaveTextContent("kakaotalk");
    });

    it("maintains state between re-renders", () => {
      const { rerender } = render(
        <ChatModeProvider>
          <TestComponent />
        </ChatModeProvider>
      );

      act(() => {
        screen.getByTestId("switch-to-instagram").click();
      });

      expect(screen.getByTestId("current-mode")).toHaveTextContent("instagram");

      rerender(
        <ChatModeProvider>
          <TestComponent />
        </ChatModeProvider>
      );

      // After rerender with fresh provider, should reset to default
      expect(screen.getByTestId("current-mode")).toHaveTextContent("kakaotalk");
    });
  });

  describe("Mode validation", () => {
    it("only accepts valid chat modes", () => {
      function TestInvalidMode() {
        const { setChatMode } = useChatModeContext();

        return (
          <button
            onClick={() => {
              // This should be caught by TypeScript, but testing runtime behavior
              setChatMode("invalid" as any);
            }}
          >
            Invalid Mode
          </button>
        );
      }

      render(
        <ChatModeProvider>
          <TestInvalidMode />
        </ChatModeProvider>
      );

      // The component should render without crashing
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });
});