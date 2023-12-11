export default async function fetchData(apiEndpoint) {
    try {
      // Make a GET request to the provided API endpoint
      const response = await fetch(apiEndpoint);
  
      // Check if the request was successful (status code 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the response as JSON and return the data
      return response.json();
    } catch (error) {
      // Handle errors by throwing an error
      throw new Error('Fetch error: ' + error.message);
    }
  }