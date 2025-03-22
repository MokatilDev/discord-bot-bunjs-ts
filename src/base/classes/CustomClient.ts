import { Client } from "discord.js";
import type ICustomClient from "../interfaces/ICustomClient";
import type IHandler from "../interfaces/IHandler";
import Handler from "./Handler";

export default class CustomClient extends Client implements ICustomClient {
  handler: IHandler;

  constructor() {
    super({ intents: [] });
    this.handler = new Handler(this);
  }

  Init() {
    this.LoadEvents();

    this.login(process.env.TOKEN)
      .catch((err) => {
        console.log(err);
      });
  }

  LoadEvents() {
    this.handler.LoadEvents();
  }
}
