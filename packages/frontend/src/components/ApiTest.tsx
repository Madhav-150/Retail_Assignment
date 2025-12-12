import { useEffect, useState } from 'react';
import { testApiConnection } from '../api/test';

const ApiTest = () => {
  const [status, setStatus] = useState<string>('Checking API connection...');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkApi = async () => {
      try {
        const result = await testApiConnection();
        setData(result);
        setStatus('API is working!');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setStatus('Failed to connect to API');
      }
    };

    checkApi();
  }, []);

  return (
    <div style={{
      padding: '1rem',
      margin: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontFamily: 'sans-serif'
    }}>
      <h3>API Connection Test</h3>
      <p><strong>Status:</strong> {status}</p>
      
      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {data && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Response Data:</strong>
          <pre style={{
            background: '#f5f5f5',
            padding: '1rem',
            borderRadius: '4px',
            overflowX: 'auto'
          }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
