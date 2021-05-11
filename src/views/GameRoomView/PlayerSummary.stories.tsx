import React from "react";
import { Meta, Story } from "@storybook/react";
import { PlayerSummary, Props } from "./PlayerSummary";
import { MockPlayer } from "../../business-logic/game";

export default {
  title: "Components/PlayerSummary",
  component: PlayerSummary,
} as Meta;

const Template: Story<Props> = (args) => <PlayerSummary {...args} />;

const players = Array.from(Array(5)).map(() => new MockPlayer());
export const Default = Template.bind({});
Default.args = {
  player: {
    ...players[0],
    guesses: [
      [players[0].id, players[1].id],
      [players[0].id, players[2].id],
    ],
    pointChange: 3,
    points: 3,
  },
  players,
};
