import React from "react";
import { Meta, Story } from "@storybook/react";
import { PlayerList, Props } from "./PlayerList";
import { MockPlayer } from "../../business-logic/game";

export default {
  title: "Components/PlayerList",
  component: PlayerList,
} as Meta;

const Template: Story<Props> = (args) => <PlayerList {...args} />;

export const Default = Template.bind({});
Default.args = {
  players: [
    new MockPlayer(),
    new MockPlayer(),
    new MockPlayer(),
    new MockPlayer(),
  ],
};
