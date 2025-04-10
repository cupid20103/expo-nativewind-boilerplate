import cludianry from "@/config/cloudinary";

export async function POST(req: Request) {
  try {
    const { imageUri } = await req.json();

    const response = await cludianry.uploader.upload(imageUri);

    const result = response.secure_url;

    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to upload image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
