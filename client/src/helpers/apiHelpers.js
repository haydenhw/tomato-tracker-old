import axios from 'axios';

export async function fetchLogs() {
  const { data } = await axios.get('log');
  return data;
}

export const postLog = (data) => (
  axios.post('log', data)
);
