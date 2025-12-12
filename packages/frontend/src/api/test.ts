export const testApiConnection = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/health`);
    const data = await response.json();
    console.log('API Health Check:', data);
    return data;
  } catch (error) {
    console.error('API Connection Error:', error);
    throw error;
  }
};
