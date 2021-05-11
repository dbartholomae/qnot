import React from "react";
import { Meta, Story } from "@storybook/react";
import { RoundSummaryView } from "./RoundSummaryView";

export default {
  title: "Game steps/Round Summary",
  component: RoundSummaryView,
} as Meta;

const Template: Story<{}> = (args) => <RoundSummaryView {...args} />;

export const Default = Template.bind({});
Default.args = {};
