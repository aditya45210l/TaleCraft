// A unified upload function that handles both File and object inputs
export async function uploadToIPFS(data: File | object): Promise<string> {
    console.log("starting uploading..");

    let response;
    
    // Case 1: The input is a File (e.g., an image)
    if (data instanceof File) {
        const formData = new FormData();
        formData.append("file", data);

        response = await fetch("/api/files", {
            method: "POST",
            body: formData,
        });
    } 
    // Case 2: The input is a JavaScript object (e.g., your HTML-in-JSON)
    else if (typeof data === 'object' && data !== null) {
        response = await fetch("/api/files", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    } 
    // Case 3: Invalid input
    else {
        throw new Error("Invalid data provided for upload.");
    }

    if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`Failed to upload: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("response: ", result);
    
    // A better approach is to have the API return the full URL
    // For now, we'll assume the CID returned from the API is sufficient
    // and you can construct the URL on the client-side.
    return `https://gateway.pinata.cloud/ipfs/${result.cid}`;
}