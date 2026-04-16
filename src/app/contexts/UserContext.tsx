import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, Quest, FeedbackReason } from '../types';

interface UserContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  dismissedQuests: Set<string>;
  archivedQuests: Set<string>;
  dismissQuest: (questId: string, reason: FeedbackReason) => void;
  archiveQuest: (questId: string) => void;
  onboardingComplete: boolean;
  completeOnboarding: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'pocket-quest-user';

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return data.profile;
    }
    return {
      mood: 50,
      timeWindow: 60,
      budget: 'moderate' as const,
      preferences: [],
    };
  });

  const [dismissedQuests, setDismissedQuests] = useState<Set<string>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return new Set(data.dismissed || []);
    }
    return new Set();
  });

  const [archivedQuests, setArchivedQuests] = useState<Set<string>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return new Set(data.archived || []);
    }
    return new Set();
  });

  const [onboardingComplete, setOnboardingComplete] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return data.onboardingComplete || false;
    }
    return false;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    const data = {
      profile,
      dismissed: Array.from(dismissedQuests),
      archived: Array.from(archivedQuests),
      onboardingComplete,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [profile, dismissedQuests, archivedQuests, onboardingComplete]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const dismissQuest = (questId: string, reason: FeedbackReason) => {
    setDismissedQuests((prev) => new Set([...prev, questId]));
    
    // Learn from feedback
    const newPreferences = [...profile.preferences];
    if (reason.tooFar && !newPreferences.includes('nearby')) {
      newPreferences.push('nearby');
    }
    if (reason.tooExpensive && !newPreferences.includes('budget-friendly')) {
      newPreferences.push('budget-friendly');
    }
    setProfile((prev) => ({ ...prev, preferences: newPreferences }));
  };

  const archiveQuest = (questId: string) => {
    setArchivedQuests((prev) => new Set([...prev, questId]));
  };

  const completeOnboarding = () => {
    setOnboardingComplete(true);
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
        dismissedQuests,
        archivedQuests,
        dismissQuest,
        archiveQuest,
        onboardingComplete,
        completeOnboarding,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
