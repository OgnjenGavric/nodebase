import { NodeProps } from '@xyflow/react';
import { memo } from 'react';
import { BaseTriggerNode } from '../components/bace-trigger-node';
import { MousePointerIcon } from 'lucide-react';

export const ManualTriggerNode = memo((props: NodeProps) => {
  return (
    <>
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name='When clicking "Execute workflow"'
        // status={nodeStatus} TODO
        // onSettings={handleOpenSettings} TODO
        // onDoubleClick={handleDoubleClick} TODO
      />
    </>
  );
});
