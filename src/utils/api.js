export async function testApiConnection() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/up`); 
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('API connection successful:', data);
  } catch (error) {
    console.error('Error connecting to API:', error);
  }
}
