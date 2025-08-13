export async function uploadToIPFS(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  console.log("starting uploading..");

  const response = await fetch("/api/files", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response.statusText}`);
  }

  const result = await response.json();
  console.log("response: ", result);
  return `https://gateway.pinata.cloud/ipfs/${result.cid}`;
}
