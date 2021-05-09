import React from "react";
import { Meta, Story } from "@storybook/react";
import { JoinRoomView, Props } from "./JoinRoomView";

export default {
  title: "Views/JoinRoomView",
  component: JoinRoomView,
} as Meta;

const Template: Story<Props> = (args) => <JoinRoomView {...args} />;

export const Default = Template.bind({});
Default.args = { roomCode: "my-room-code" };
