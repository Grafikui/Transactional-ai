import fs from 'fs';
import path from 'path';

const LOG_DIR = path.join(__dirname, '../../logs');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

export function logEvent(transactionId: string, event: any) {
  const file = path.join(LOG_DIR, `${transactionId}.log.jsonl`);
  fs.appendFileSync(file, JSON.stringify(event) + '\n');
}

export function getEvents(transactionId: string): any[] {
  const file = path.join(LOG_DIR, `${transactionId}.log.jsonl`);
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(line => JSON.parse(line));
}
