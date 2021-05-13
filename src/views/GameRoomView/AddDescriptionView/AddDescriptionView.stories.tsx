import React from "react";
import { Meta, Story } from "@storybook/react";
import { AddDescriptionView, Props } from "./AddDescriptionView";
import { action } from "@storybook/addon-actions";

export default {
  title: "Game steps/Add Description",
  component: AddDescriptionView,
} as Meta;

const Template: Story<Props> = (args) => <AddDescriptionView {...args} />;

export const Default = Template.bind({
  onChoose: action("onChoose"),
});
Default.args = {};
