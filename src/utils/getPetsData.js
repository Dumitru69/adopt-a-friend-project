const getPetsData = async () => {
  try {
    const response = await fetch("/database.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.pets; // Assuming your data has a `pets` array
  } catch (error) {
    console.error("Error fetching JSON:", error);
    return []; // Return an empty array in case of an error
  }
};

export default getPetsData;
