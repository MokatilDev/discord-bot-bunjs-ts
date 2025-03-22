import { Client } from "discord.js";
import colors from "@colors/colors"
import type ICustomClient from "../interfaces/ICustomClient";

export default class CustomClient extends Client implements ICustomClient {
  constructor() {
    super({ intents: [] });
  }

  Init() {
    this.login(process.env.TOKEN)
      .then(() => {
        console.log(colors.green(`✅ - Logged in as ${this.user?.tag}`));
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
