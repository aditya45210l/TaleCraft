export const fetchAllStories = async () => {
  try {
    console.log("Fetching stories from API...");
    const response = await fetch('http://localhost:3000/api/stories/get-all',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    console.log("Response Data:", data);
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [];
  }
};
export const fetchStoryById = async (tokenId:string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/stories/${tokenId}`);
    const data = await response.json();
    return data ? data : {};
  } catch (error) {
    console.error('Error fetching story:', error);
    return null;
  }
};