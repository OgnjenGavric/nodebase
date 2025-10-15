import { SidebarTrigger } from './ui/sidebar';

export const AppHeader = () => {
  return (
    <div className='flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-background'>
      <SidebarTrigger />
    </div>
  );
};
