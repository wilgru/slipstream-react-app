import { Button } from "./Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconName: "gear",
    size: "md",
    type: "button",
    variant: "block"
  }
};
