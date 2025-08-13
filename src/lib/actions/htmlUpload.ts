// A new version of your HTML upload function
import { uploadToIPFS } from "./UploadFile";

export const HtmlUpload = async (htmlContent: string) => {
  try {
    // 1. Create a JSON object to hold your HTML string
    const contentObject = {
      contentType: "text/html",
      data: htmlContent
    };

    // // 2. Convert the JavaScript object to a JSON string
    // const contentJSON = JSON.stringify(contentObject);
    
    // // 3. Create a Blob and File object with a .json extension
    // const contentBlob = new Blob([contentJSON], { type: 'application/json' });
    // const contentFile = new File([contentBlob], 'story-content.json', { type: 'application/json' });

    // 4. Upload the new .json file to IPFS
    const url = await uploadToIPFS(contentObject);
    
    return url;
  } catch (error) {
    console.error("Error uploading content to IPFS:", error);
    throw new Error("Failed to save content to IPFS.");
  }
};