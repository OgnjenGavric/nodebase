'use client';

import type { NodeProps } from '@xyflow/react';
import { PlusIcon } from 'lucide-react';
import { memo, useState } from 'react';
import { PlaceholderNode } from './react-flow/placeholder-node';

export const InitialNode = memo((props: NodeProps) => {
  return (
    <PlaceholderNode {...props}>
      <div className='cursor-pointer flex items-center justify-center'>
        <PlusIcon className='size-4' />
      </div>
    </PlaceholderNode>
  );
});

InitialNode.displayName = 'InitialNode';
