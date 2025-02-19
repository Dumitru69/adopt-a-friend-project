const getPetsData = async () => {
  try {
    const response = await fetch("/database.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.pets;
  } catch (error) {
    console.error("Error fetching JSON:", error);
    return [];
  }
};

export default getPetsData;
