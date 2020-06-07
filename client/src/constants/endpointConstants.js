const localServer = 'http://localhost:3006';
const cloudServer = localServer;
const baseUrl = process.env.NODE_ENV === 'production' ? cloudServer : localServer;
export const projectsUrl = `projects`;
