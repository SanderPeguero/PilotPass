import { cn } from '../lib/utils';

export function AppCard({ icon: Icon, title, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex w-full flex-col items-center gap-4',
        'transition-all duration-200',
        'hover:-translate-y-1 active:translate-y-0 active:scale-95',
        className
      )}
    >
      <div
        className={cn(
          'aspect-square w-[8rem] max-w-[8rem]',
          'flex items-center justify-center rounded-2xl',
          'bg-gradient-to-br from-slate-800/90 to-slate-900/90',
          'shadow-lg shadow-slate-950/10',
          'transition-all duration-300',
          'group-hover:from-slate-800 group-hover:to-slate-900',
          'group-hover:shadow-xl group-hover:shadow-slate-950/20'
        )}
      >
        <Icon 
          className={cn(
            'h-12 w-12 text-slate-200',
            'transition-all duration-300',
            'group-hover:scale-110 group-hover:text-white'
          )} 
        />
      </div>
      <span className="text-center text-md font-medium text-slate-300 transition-colors group-hover:text-slate-200">
        {title}
      </span>
    </button>
  );
}