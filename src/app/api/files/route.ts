"server only"
import { NEXT_PUBLIC_PINATA_GATEWAY, NEXT_PUBLIC_PINATA_JWT } from "@/lib/config/env";
import { NextResponse, type NextRequest } from "next/server";
import { PinataSDK } from "pinata"

const pinata = new PinataSDK({
  pinataJwt: NEXT_PUBLIC_PINATA_JWT,
  pinataGateway:NEXT_PUBLIC_PINATA_GATEWAY
})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0ZjIzODQ5Zi00Y2FlLTQyZDEtYWFjNy1iYzhmMTgyYzJkNjUiLCJlbWFpbCI6ImFrMDI5NTY3NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDY5YTM2ZGQ1YmFiNzg0M2E1OTMiLCJzY29wZWRLZXlTZWNyZXQiOiIzMWRjOGNmN2U3Yzk2N2VhYWJiNGFkYWI0ZDMzNzk2YzU2MTExYWZlMWNhNzk3MTZmNGNmYzYzN2JhNTkwYjk2IiwiZXhwIjoxNzg2NDY2MDI3fQ.78cAo7doZ9_YZ5ihgMEc2ZCK8jTuY7GlztGItOPKveQ
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const { cid } = await pinata.upload.public.file(file);
    // const url = await pinata.gateways.public.convert(cid);

    console.log("cid: ",cid);
    return NextResponse.json({ status: 200, cid: cid });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
