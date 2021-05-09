import React from "react";
import { Meta, Story } from "@storybook/react";
import { MyWord } from "./MyWord";

export default {
  title: "Views/MyWord",
  component: MyWord,
} as Meta;

const Template: Story<{}> = (args) => <MyWord {...args} />;

export const Default = Template.bind({});
Default.args = {};
