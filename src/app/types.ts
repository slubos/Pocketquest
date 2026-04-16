export interface UserProfile {
  mood: number; // 0-100: Low-Key to High-Energy
  timeWindow: number; // in minutes: 15-180
  budget: 'free' | 'moderate' | 'treat';
  preferences: string[]; // Learned from feedback
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  category: string;
  vibe: string[];
  distance: number; // in km
  estimatedTime: number; // in minutes
  cost: 'free' | 'moderate' | 'treat';
  vibeMatch: number; // 0-100
  matchReason: string;
  imageUrl: string;
  rating: number;
  isHidden: boolean; // local secrets
  energyLevel: number; // 0-100
}

export interface FeedbackReason {
  tooFar?: boolean;
  tooExpensive?: boolean;
  notTheVibe?: boolean;
  other?: string;
}
