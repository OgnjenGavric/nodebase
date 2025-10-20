import { NodeProps } from '@xyflow/react';
import { memo, useState } from 'react';
import { BaseTriggerNode } from '../components/bace-trigger-node';
import { MousePointerIcon } from 'lucide-react';
import { ManualTriggerDialog } from './dialog';

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenSettings = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name='When clicking "Execute workflow"'
        // status={nodeStatus} TODO
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});
