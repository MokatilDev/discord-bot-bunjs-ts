import { glob } from "glob";
import type IHandler from "../interfaces/IHandler";
import type CustomClient from "./CustomClient";
import Event from "./Event";
import path from "path";

export default class Handler implements IHandler {
  client: CustomClient;

  constructor(client: CustomClient) {
    this.client = client;
  }

  async LoadEvents() {
    const files = (await glob(`src/events/**/*.ts`)).map((filePath) =>
      path.resolve(filePath)
    );

    files.map(async (file) => {
      const event: Event = new (await import(file)).default(this.client);

      if (!event.name) {
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(
            `[ERROR] Event ${file
              .split("/")
              .pop()} is missing the name property`
          )
        );
      }

      const execute = async (...args: any) => event.Execute(...args);

      // @ts-ignore
      if (event.once) this.client.once(event.name, execute);
      // @ts-ignore
      else this.client.on(event.name, execute);

      delete require.cache[require.resolve(file)];
    });
  }
}
