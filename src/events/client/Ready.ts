import { Events } from "discord.js";
import Event from "../../base/classes/Event";
import CustomClient from "../../base/classes/CustomClient";
import colors from "@colors/colors"


export default class Ready extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.ClientReady,
      description: "Ready event",
      once: true,
    });
  }

  async Execute(...args: any[]) {
    console.log(colors.green(`✅ - Logged in as ${this.client.user?.tag}`));
  }
}
