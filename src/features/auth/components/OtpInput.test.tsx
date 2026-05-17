import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { OtpInput } from "./OtpInput";

describe("OtpInput", () => {
  it("supports paste and updates the code", () => {
    let currentValue = "";

    render(<OtpInput value={currentValue} onChange={(value) => (currentValue = value)} />);

    const firstInput = screen.getByLabelText("OTP raqami 1");

    fireEvent.paste(firstInput, {
      clipboardData: {
        getData: () => "123456",
      },
      preventDefault: () => undefined,
    });

    expect(currentValue).toBe("123456");
  });
});
