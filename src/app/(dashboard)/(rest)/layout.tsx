import { AppHeader } from '@/components/app-header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppHeader />
      <main className='flex flex-1 flex-col'>{children}</main>
    </>
  );
};

export default Layout;
