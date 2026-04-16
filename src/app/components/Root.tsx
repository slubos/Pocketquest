import { Outlet } from 'react-router';
import { QuestProvider } from '../contexts/QuestContext';
import { RealTimeProvider } from '../contexts/RealTimeContext';

export function Root() {
  return (
    <RealTimeProvider>
      <QuestProvider>
        <div className="size-full bg-[#1a2f2a] overflow-auto">
          <Outlet />
        </div>
      </QuestProvider>
    </RealTimeProvider>
  );
}