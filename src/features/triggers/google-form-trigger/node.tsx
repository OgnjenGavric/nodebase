import { NodeProps } from '@xyflow/react';
import { memo, useState } from 'react';
import { BaseTriggerNode } from '../components/bace-trigger-node';
import { MousePointerIcon } from 'lucide-react';
import { GoogleFormTriggerDialog } from './dialog';
import { useNodeStatus } from '@/features/executions/hooks/use-node-status';
import { MANUAL_TRIGGER_CHANNEL_NAME } from '@/inngest/channels/manual-trigger';
import { fetchManualTriggerRealtimeToken } from './action';

export const GoogleFormTrigger = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus = 'initial';

  const handleOpenSettings = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <GoogleFormTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        {...props}
        icon='/logos/googleform.svg'
        name='Google Form'
        description='When form is submitted'
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});
