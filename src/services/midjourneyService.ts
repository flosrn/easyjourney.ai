export class MidjourneyMessage {
  constructor(
    public ChannelId: string,
    protected SalaiToken: string,
    public debug = false,
    public Limit = 50,
    public maxWait = 200
  ) {
    this.log("MidjourneyMessage constructor");
  }

  protected log(...args: any[]) {
    this.debug && console.log(...args, new Date().toISOString());
  }

  async FilterMessages(
    prompt: string,
    loading?: (uri: string) => void,
    options?: string
  ) {
    console.log("options :", options);
    const data = await this.RetrieveMessages(this.Limit);
    for (const item of data) {
      if (
        item.author.id === "936929561302675456" &&
        item.content.includes(`**${prompt}`)
      ) {
        if (options && item.content.includes(options) && item.type === 19) {
          this.log("upscaled image found");
          return {
            id: item.id,
            uri: item.attachments[0].url,
            hash: this.UriToHash(item.attachments[0].url),
            content: item.content.split("**")[1],
          };
        }
        if (item.attachments.length === 0) {
          this.log("no attachment");
          break;
        }

        const imageUrl = item.attachments[0].url;
        if (!imageUrl.endsWith(".png")) {
          this.log("image iteration found");
          loading?.(imageUrl);
          break;
        }
        if (!options) {
          this.log("finalized image found");
          const content = item.content.split("**")[1];
          const msg: Message = {
            id: item.id,
            uri: imageUrl,
            hash: this.UriToHash(imageUrl),
            content,
          };
          return msg;
        }
      }
    }
    loading?.("message-not-found");
    return null;
  }

  UriToHash(uri: string) {
    return uri.split("_").pop()?.split(".")[0] ?? "";
  }

  async WaitMessage(prompt: string, loading?: (uri: string) => void) {
    for (let i = 0; i < this.maxWait; i++) {
      const msg = await this.FilterMessages(prompt, loading);
      if (msg !== null) {
        return msg;
      }
      this.log(i, "wait no message found");
      await this.Wait(1000 * 3);
    }
  }

  async WaitOptionMessage(
    content: string,
    options: string,
    loading?: (uri: string) => void
  ) {
    console.log("content :", content);
    for (let i = 0; i < this.maxWait; i++) {
      const msg = await this.FilterMessages(content, loading, options);
      if (msg !== null) {
        return msg;
      }
      this.log(i, "wait no message found");
      await this.Wait(1000 * 2);
    }
  }

  async Wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async RetrieveMessages(limit = 50) {
    const headers = { Authorization: this.SalaiToken };
    const response = await fetch(
      `https://discord.com/api/v10/channels/${this.ChannelId}/messages?limit=${limit}`,
      { headers }
    );
    return await response.json();
  }

  async GetMessgeById(id: string) {
    console.log("GetMessgeById", id);
    // GET/channels/{channel.id}/messages/{message.id}
    const url = `https://discord.com/api/v12/channels/${this.ChannelId}/messages/${id}`;
    const headers = { authorization: this.SalaiToken };
    const response = await fetch(url, { headers });
    return await response.json();
  }
}

export class Midjourney extends MidjourneyMessage {
  constructor(
    public ServerId: string,
    public ChannelId: string,
    protected SalaiToken: string,
    public debug = false
  ) {
    super(ChannelId, SalaiToken, debug);
    this.log("Midjourney constructor");
  }

  async Imagine(prompt: string, loading?: (uri: string) => void) {
    const httpStatus = await this.ImagineApi(prompt);
    if (httpStatus !== 204) {
      throw new Error(`ImagineApi failed with status ${httpStatus}`);
    }
    this.log(`await generate image`);
    return this.WaitMessage(prompt, loading);
  }

  async ImagineApi(prompt: string) {
    const payload = {
      type: 2,
      application_id: "936929561302675456",
      guild_id: this.ServerId,
      channel_id: this.ChannelId,
      session_id: "2fb980f65e5c9a77c96ca01f2c242cf6",
      data: {
        version: "1077969938624553050",
        id: "938956540159881230",
        name: "imagine",
        type: 1,
        options: [
          {
            type: 3,
            name: "prompt",
            value: prompt,
          },
        ],
        application_command: {
          id: "938956540159881230",
          application_id: "936929561302675456",
          version: "1077969938624553050",
          default_permission: true,
          default_member_permissions: null,
          type: 1,
          nsfw: false,
          name: "imagine",
          description: "Create images with Midjourney",
          dm_permission: true,
          options: [
            {
              type: 3,
              name: "prompt",
              description: "The prompt to imagine",
              required: true,
            },
          ],
        },
        attachments: [],
      },
    };

    const headers = { Authorization: this.SalaiToken };
    const response = await fetch("https://discord.com/api/v9/interactions", {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return response.status;
  }

  async Variation(
    content: string,
    index: number,
    msgId: string,
    msgHash: string,
    loading?: (uri: string) => void
  ) {
    // index is 1-4
    if (index < 1 || index > 4) {
      throw new Error(`Variation index must be between 1 and 4, got ${index}`);
    }
    const httpStatus = await this.VariationApi(index, msgId, msgHash);
    if (httpStatus !== 204) {
      throw new Error(`VariationApi failed with status ${httpStatus}`);
    }
    this.log(`await generate image`);
    return await this.WaitOptionMessage(content, `Variations`, loading);
  }

  async VariationApi(index: number, messageId: string, messageHash: string) {
    const payload = {
      type: 3,
      guild_id: this.ServerId,
      channel_id: this.ChannelId,
      message_flags: 0,
      message_id: messageId,
      application_id: "936929561302675456",
      session_id: "1f3dbdf09efdf93d81a3a6420882c92c",
      data: {
        component_type: 2,
        custom_id: `MJ::JOB::variation::${index}::${messageHash}`,
      },
    };
    const headers = { Authorization: this.SalaiToken };
    const response = await fetch("https://discord.com/api/v9/interactions", {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.status;
  }

  //FIXME this is not working
  async RemixModelApi(
    content: string,
    index: number,
    messageId: string,
    messageHash: string
  ) {
    const payload = {
      type: 5,
      application_id: "936929561302675456",
      channel_id: this.ChannelId,
      guild_id: this.ServerId,
      data: {
        id: "1100105238322618488",
        custom_id: `MJ::RemixModal::${messageHash}::${index}`,
        components: [
          {
            type: 1,
            components: [
              {
                type: 4,
                custom_id: "MJ::RemixModal::new_prompt",
                value: content,
              },
            ],
          },
        ],
      },
      session_id: "ec6524c8d2926e285a8232f7ed1ced98",
    };
    const headers = { Authorization: this.SalaiToken };
    const response = await fetch("https://discord.com/api/v9/interactions", {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.status;
  }

  async Upscale(
    content: string,
    index: number,
    msgId: string,
    msgHash: string,
    loading?: (uri: string) => void
  ) {
    // index is 1-4
    if (index < 1 || index > 4) {
      throw new Error(`Variation index must be between 1 and 4, got ${index}`);
    }
    const httpStatus = await this.UpscaleApi(index, msgId, msgHash);
    if (httpStatus !== 204) {
      throw new Error(`VariationApi failed with status ${httpStatus}`);
    }
    this.log(`await generate image`);
    return await this.WaitOptionMessage(content, `Image #${index}`, loading);
  }

  async UpscaleApi(index: number, messageId: string, messageHash: string) {
    const payload = {
      type: 3,
      guild_id: this.ServerId,
      channel_id: this.ChannelId,
      message_flags: 0,
      message_id: messageId,
      application_id: "936929561302675456",
      session_id: "ec6524c8d2926e285a8232f7ed1ced98",
      data: {
        component_type: 2,
        custom_id: `MJ::JOB::upsample::${index}::${messageHash}`,
      },
    };

    const headers = { Authorization: this.SalaiToken };
    const response = await fetch("https://discord.com/api/v9/interactions", {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.status;
  }
}

type Message = {
  id: string;
  uri: string;
  hash: string;
  content: string;
};

export async function imagine(
  channelId: string,
  salaiToken: string,
  serverId: string,
  prompt: string,
  debug = false,
  limit = 50,
  maxWait = 100,
  loading?: (uri: string) => void
): Promise<Message | undefined> {
  const mj = new Midjourney(serverId, channelId, salaiToken, debug);
  return await mj.Imagine(prompt, loading);
}

export async function upscale(
  channelId: string,
  salaiToken: string,
  serverId: string,
  content: string,
  index: number,
  msgId: string,
  msgHash: string,
  debug = false,
  limit = 50,
  maxWait = 100,
  loading?: (uri: string) => void,
  maxRetries = 5,
  retryDelay = 1000
): Promise<Message | undefined> {
  const mj = new Midjourney(serverId, channelId, salaiToken, debug);
  return await mj.Upscale(content, index, msgId, msgHash, loading);
}
