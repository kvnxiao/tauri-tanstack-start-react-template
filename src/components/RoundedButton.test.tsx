import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RoundedButton } from "./RoundedButton";

afterEach(() => {
  cleanup();
});

describe("RoundedButton", () => {
  it("renders with the provided title", () => {
    render(<RoundedButton onClick={() => {}} title="Click me" />);
    expect(screen.getByRole("button", { name: "Click me" })).toBeDefined();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<RoundedButton onClick={handleClick} title="Click me" />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
