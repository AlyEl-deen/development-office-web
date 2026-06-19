import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Resolve a static asset path against the app's base URL so it works both in
// local dev ("/") and when deployed under a subpath (e.g. GitHub Pages).
// Absolute http(s) URLs are returned unchanged.
export function asset(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  category: 'Website' | 'Mobile App' | 'System';
  features: string[];
  techStack: string[];
  galleryImages: string[];
  priceRange: string;
  liveUrl?: string;
}

export interface Partner {
  id: string;
  companyName: string;
  logoUrl?: string;
  websiteUrl?: string;
  status: 'reserved' | 'active';
}

export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: any;
  sessionId: string;
}
