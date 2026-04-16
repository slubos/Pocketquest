import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface QuestContextType {
  profile: UserProfile | null;
  setProfile: (profile: Omit<UserProfile, 'preferences'>) => void;
  archivedQuests: string[];
  archiveQuest: (questId: string) => void;
  dismissedQuests: string[];
  dismissQuest: (questId: string, reason: string) => void;
  userPreferences: {
    preferredCategories: string[];
    dislikedCategories: string[];
  };
  updatePreferences: (category: string, like: boolean) => void;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

export function QuestProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('pocketquest-profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [archivedQuests, setArchivedQuests] = useState<string[]>(() => {
    const saved = localStorage.getItem('pocketquest-archived');
    return saved ? JSON.parse(saved) : [];
  });

  const [dismissedQuests, setDismissedQuests] = useState<string[]>(() => {
    const saved = localStorage.getItem('pocketquest-dismissed');
    return saved ? JSON.parse(saved) : [];
  });

  const [userPreferences, setUserPreferences] = useState<{
    preferredCategories: string[];
    dislikedCategories: string[];
  }>(() => {
    const saved = localStorage.getItem('pocketquest-preferences');
    return saved ? JSON.parse(saved) : { preferredCategories: [], dislikedCategories: [] };
  });

  useEffect(() => {
    if (profile) {
      localStorage.setItem('pocketquest-profile', JSON.stringify(profile));
    }
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('pocketquest-archived', JSON.stringify(archivedQuests));
  }, [archivedQuests]);

  useEffect(() => {
    localStorage.setItem('pocketquest-dismissed', JSON.stringify(dismissedQuests));
  }, [dismissedQuests]);

  useEffect(() => {
    localStorage.setItem('pocketquest-preferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  const setProfile = (newProfile: Omit<UserProfile, 'preferences'>) => {
    setProfileState({
      ...newProfile,
      preferences: [],
    });
  };

  const archiveQuest = (questId: string) => {
    setArchivedQuests(prev => [...prev, questId]);
  };

  const dismissQuest = (questId: string, reason: string) => {
    setDismissedQuests(prev => [...prev, questId]);
    console.log(`Quest ${questId} dismissed for reason: ${reason}`);
  };

  const updatePreferences = (category: string, like: boolean) => {
    setUserPreferences(prev => {
      const newPrefs = { ...prev };
      if (like) {
        newPrefs.preferredCategories = [...prev.preferredCategories.filter(c => c !== category), category];
        newPrefs.dislikedCategories = prev.dislikedCategories.filter(c => c !== category);
      } else {
        newPrefs.dislikedCategories = [...prev.dislikedCategories.filter(c => c !== category), category];
        newPrefs.preferredCategories = prev.preferredCategories.filter(c => c !== category);
      }
      return newPrefs;
    });
  };

  return (
    <QuestContext.Provider
      value={{
        profile,
        setProfile,
        archivedQuests,
        archiveQuest,
        dismissedQuests,
        dismissQuest,
        userPreferences,
        updatePreferences,
      }}
    >
      {children}
    </QuestContext.Provider>
  );
}

export function useQuest() {
  const context = useContext(QuestContext);
  if (!context) {
    throw new Error('useQuest must be used within a QuestProvider');
  }
  return context;
}
