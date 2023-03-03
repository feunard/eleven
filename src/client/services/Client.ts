import { ElevenApi } from "../../interfaces/api.schema";

export class Client {
  public async emit<T extends keyof ElevenApi>(
    action: T,
    request: ElevenApi[T]["request"]
  ): Promise<ElevenApi[T]["response"]> {
    const response = await fetch(`/api/${action}`, {
      method: "post",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.status !== 200) {
      throw new Error(json.message);
    }

    return json;
  }
}
