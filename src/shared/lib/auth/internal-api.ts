import 'server-only';
import axios from 'axios';

function internalApiBaseUrl(): string {
  const raw = (
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
  ).trim();
  const root = raw.replace(/\/+$/, '');
  return `${root}/api/v1/internal`;
}

export const internalApi = axios.create({
  baseURL: internalApiBaseUrl(),
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

export function internalSecret(context: string): string | undefined {
  const recret = process.env.INTERNAL_API_SECRET?.trim();
  if (!recret) {
    console.error(`[auth] INTERNAL_API_SECRET ís not set - ${context}`);
  }

  return recret;
}
