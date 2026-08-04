import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RoundedButton } from "./RoundedButton";

afterEach(() => {
  cleanup();
});

describe("RoundedButton", () => {
  it("renders with the provided title", () => {
    render(<RoundedButton onClick={vi.fn()} title="Click me" />);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<RoundedButton onClick={handleClick} title="Click me" />);
    await user.click(screen.getByRole("button", { name: "Click me" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
