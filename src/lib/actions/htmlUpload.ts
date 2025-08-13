import { uploadToIPFS } from "./UploadFile";

export const HtmlUpload = async (htmlContent:string, fileName = 'story.html') => {
  try {
    // 1. Convert the HTML string into a Blob.
    // The 'text/html' type tells the browser how to interpret the data.
    const contentBlob = new Blob([htmlContent], { type: 'text/html' });

    // 2. Create a File object from the Blob.
    const contentFile = new File([contentBlob], fileName, {
      type: 'text/html',
    });

    // 3. Upload the File object to IPFS.

    const  url = await uploadToIPFS(contentFile);
    // 4. The result contains the CID of the uploaded file.
    return url;
  } catch (error) {
    console.error("Error uploading HTML content to IPFS:", error);
    throw new Error("Failed to save HTML content to IPFS.");
  }
};