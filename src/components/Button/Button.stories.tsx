import { Button } from "./Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Button,
  title: "Atoms/Button",
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <span style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button {...args} iconName={undefined}>
        Settings
      </Button>
      <Button {...args}>Settings</Button>
      <Button {...args} />
    </span>
  ),
  args: {
    iconName: "gear",
    size: "md",
    type: "button",
    variant: "block",
  },
};
