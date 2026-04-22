const now = new Date();

const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
const time = now.toTimeString().split(' ')[0];
export const log = (msg: string, level: 'info' | 'error' | 'warn' | 'debug' = 'info') => {
  console.log(`[Naukri Profile Update] [${level.toUpperCase()}] [${date} ${time}] ${msg}`);
};