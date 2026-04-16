import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface RealTimeContextType {
  currentTime: Date;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  dayOfWeek: string;
  isWeekend: boolean;
  contextLabel: string;
  timeLabel: string;
  weather: 'sunny' | 'cloudy' | 'rainy' | 'clear-night';
  weatherLabel: string;
}

const RealTimeContext = createContext<RealTimeContextType | undefined>(undefined);

function getTimeOfDay(hour: number): 'morning' | 'afternoon' | 'evening' | 'night' {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

function getWeather(hour: number): 'sunny' | 'cloudy' | 'rainy' | 'clear-night' {
  // Mock weather based on time of day
  if (hour >= 21 || hour < 5) return 'clear-night';
  // Simple pattern - could be more sophisticated
  const pattern = hour % 4;
  if (pattern === 0) return 'sunny';
  if (pattern === 1) return 'cloudy';
  if (pattern === 2) return 'sunny';
  return 'cloudy';
}

function getWeatherLabel(weather: string): string {
  const labels = {
    'sunny': 'Sunny & Clear',
    'cloudy': 'Partly Cloudy',
    'rainy': 'Light Rain',
    'clear-night': 'Clear Night'
  };
  return labels[weather as keyof typeof labels] || 'Clear';
}

function getContextLabel(date: Date, timeOfDay: string, isWeekend: boolean, weather: string): string {
  const hour = date.getHours();
  
  // Weather-influenced contexts
  if (weather === 'rainy') {
    return 'Perfect for Indoor Adventures';
  }
  
  // Weekend contexts
  if (isWeekend) {
    if (timeOfDay === 'morning') return 'Weekend Brunch Vibes';
    if (timeOfDay === 'afternoon') return 'Weekend Explorer Mode';
    if (timeOfDay === 'evening') return 'Saturday Night Energy';
    return 'Late Night Weekend Wanderer';
  }
  
  // Weekday contexts
  if (timeOfDay === 'morning' && hour < 9) return 'Early Bird Special';
  if (timeOfDay === 'morning') return 'Mid-Morning Break';
  if (timeOfDay === 'afternoon' && hour >= 12 && hour < 14) return 'Prime Lunch Time';
  if (timeOfDay === 'afternoon') return 'Afternoon Refresh';
  if (timeOfDay === 'evening' && hour >= 17 && hour < 19) return 'Prime Dinner Time';
  if (timeOfDay === 'evening') return 'Evening Wind-Down';
  return 'Night Owl Territory';
}

export function RealTimeProvider({ children }: { children: ReactNode }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const hour = currentTime.getHours();
  const timeOfDay = getTimeOfDay(hour);
  const dayOfWeek = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
  const isWeekend = currentTime.getDay() === 0 || currentTime.getDay() === 6;
  const weather = getWeather(hour);
  const weatherLabel = getWeatherLabel(weather);
  const contextLabel = getContextLabel(currentTime, timeOfDay, isWeekend, weather);
  
  const timeLabel = currentTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <RealTimeContext.Provider
      value={{
        currentTime,
        timeOfDay,
        dayOfWeek,
        isWeekend,
        contextLabel,
        timeLabel,
        weather,
        weatherLabel,
      }}
    >
      {children}
    </RealTimeContext.Provider>
  );
}

export function useRealTime() {
  const context = useContext(RealTimeContext);
  if (!context) {
    throw new Error('useRealTime must be used within RealTimeProvider');
  }
  return context;
}