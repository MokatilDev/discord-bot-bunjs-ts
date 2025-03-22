import type CustomClient from "../classes/CustomClient";

export default interface IHandler {
  client: CustomClient;
  LoadEvents(): void;
}
