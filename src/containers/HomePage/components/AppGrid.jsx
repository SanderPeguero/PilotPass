import { apps } from '../config/apps'
import { AppCard } from './AppCard';

export function AppGrid({ onNavigate }) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:gap-8 lg:grid-cols-5">
        {apps.map((app) => (
          <AppCard
            key={app.path}
            icon={app.icon}
            title={app.title}
            onClick={() => onNavigate(app.path)}
          />
        ))}
      </div>
    </div>
  );
}