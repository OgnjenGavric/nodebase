'use client';

import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { memo } from 'react';

export const AddNodeButton = memo(() => {
  return (
    <Button
      className='bg-background'
      variant='outline'
      size='icon'
      onClick={() => {}}
    >
      <PlusIcon className='size-4' />
    </Button>
  );
});

AddNodeButton.displayName = 'AddNodeButton';
