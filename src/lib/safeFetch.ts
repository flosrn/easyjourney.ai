import type z from "zod";

export async function safeFetch<T>(
  schema: z.Schema<T>,
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw await newHTTPError("Unsuccessful response", response, init?.method);
  }

  const json = await response.json().catch(() => {
    throw newHTTPError("Not a JSON body", response, init?.method);
  });

  const result = schema.safeParse(json);
  if (!result.success) {
    throw await newHTTPError(
      "Unexpected response schema",
      response,
      init?.method
    );
  }

  return result.data;
}

async function newHTTPError(
  reason: string,
  response: Response,
  method?: string
) {
  const text = await response.text().catch(() => null);
  const message = `Error fetching ${method} ${response.url} ${response.status}. ${reason}`;
  console.error(`${message}. Response body: ${text}`);
  return new HTTPError(response.status, message);
}

export class HTTPError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.status = status;
  }
}
