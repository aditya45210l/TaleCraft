// pages/api/upload.ts
"server only"
import { NextResponse, type NextRequest } from "next/server";
import { PinataSDK } from "pinata";
import { NEXT_PUBLIC_PINATA_JWT } from "@/lib/config/env";

const pinata = new PinataSDK({
    pinataJwt: NEXT_PUBLIC_PINATA_JWT,
});

export async function POST(request: NextRequest) {
    try {
        const contentType = request.headers.get("Content-Type");

        // Case 1: The request body is pure JSON
        if (contentType?.includes("application/json")) {
            const jsonPayload = await request.json();
            if (!jsonPayload) {
                return NextResponse.json({ error: "Empty JSON payload." }, { status: 400 });
            }
            // Use the dedicated Pinata method for JSON uploads
            const { cid } = await pinata.upload.public.json(jsonPayload);
            return NextResponse.json({ status: 200, cid });
        }

        // Case 2: The request is a file upload via FormData
        if (contentType?.includes("multipart/form-data")) {
            const formData = await request.formData();
            const file: File | null = formData.get("file") as unknown as File;
            
            if (!file) {
                return NextResponse.json({ error: "No file found in request." }, { status: 400 });
            }

            // Check the file's MIME type to be sure
            if (file.type.startsWith("image/")) {
                // Use the standard Pinata method for file uploads
                const { cid } = await pinata.upload.public.file(file);
                return NextResponse.json({ status: 200, cid });
            } else if (file.type === "application/json") {
                // If a JSON file is uploaded via FormData, handle it here
                const fileText = await file.text();
                const jsonPayload = JSON.parse(fileText);
                const { cid } = await pinata.upload.public.json(jsonPayload);
                return NextResponse.json({ status: 200, cid });
            } else {
                return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 400 });
            }
        }
        
        // Handle other unsupported content types
        return NextResponse.json({ error: "Unsupported Content-Type" }, { status: 400 });

    } catch (e) {
        console.error("Upload error:", e);
        return NextResponse.json(
            { error: "An unexpected error occurred during the upload." },
            { status: 500 }
        );
    }
}