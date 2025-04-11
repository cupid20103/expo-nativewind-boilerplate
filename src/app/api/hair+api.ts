import { EXPO_PUBLIC_LIGHTX_API_KEY } from "@/config/env";

export async function POST(req: Request) {
  try {
    const { imageUrl, textPrompt } = await req.json();

    const generate = await fetch(
      "https://api.lightxeditor.com/external/api/v1/hairstyle",
      {
        method: "POST",
        headers: {
          "x-api-key": EXPO_PUBLIC_LIGHTX_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          textPrompt,
        }),
      }
    );

    const order = await generate.json();
    const orderId = order.body.orderId;

    const MAX_ATTEMPTS = 5;
    let attempts = 0;
    let result;

    while (attempts < MAX_ATTEMPTS) {
      const statusResponse = await fetch(
        `https://api.lightxeditor.com/external/api/v1/order-status`,
        {
          method: "POST",
          headers: {
            "x-api-key": EXPO_PUBLIC_LIGHTX_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        }
      );

      result = await statusResponse.json();

      if (result.body.status === "active" || result.status === "failed") {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));

      attempts++;
    }

    if (result.body.output) {
      return new Response(JSON.stringify({ result: result.body.output }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({ error: "Failed to process image" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch {
    return new Response(JSON.stringify({ error: "Failed to process image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
