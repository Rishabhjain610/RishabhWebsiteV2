import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const isLinkedIn = userAgent.toLowerCase().includes("linkedin");
  const isWhatsApp = userAgent.toLowerCase().includes("whatsapp");

  let imageName = "resized_og.png";
  if (isLinkedIn) {
    imageName = "og-image.png";
  } else if (isWhatsApp) {
    imageName = "web-app-manifest-192x192.png";
  }
  const filePath = path.join(process.cwd(), "public", imageName);

  try {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    return new NextResponse("Image not found", { status: 404 });
  }
}
