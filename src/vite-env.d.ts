/// <reference types="vite/client" />

declare global {
  interface Window {
    fbq?: (action: string, eventName: string, params?: object) => void;
  }
}
export {};
