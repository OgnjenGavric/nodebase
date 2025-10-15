import React, { ReactNode } from 'react';

import { Link } from 'lucide-react';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-muted min-h-svh flex flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className=' w-full max-w-sm flex flex-col gap-6'>
        <Link
          href='/'
          className='flex items-center gap-2 self-center font-medium'
        >
          <Image src='/logos/logo.svg' alt='Nodebase' width={30} height={30} />
          Nodebase
        </Link>
        {children}
      </div>
    </div>
  );
};
