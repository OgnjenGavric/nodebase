import { NodeProps } from '@xyflow/react';
import { memo, useState } from 'react';
import { BaseTriggerNode } from '../components/bace-trigger-node';
import { GoogleFormTriggerDialog } from './dialog';
import { useNodeStatus } from '@/features/executions/hooks/use-node-status';
import { fetchGoogleFormTriggerRealtimeToken } from './action';
import { GOOGLE_FORM_TRIGGER_CHANNEL_NAME } from '@/inngest/channels/google-form-trigger';

export const StripeTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: GOOGLE_FORM_TRIGGER_CHANNEL_NAME,
    topic: 'status',
    refreshToken: fetchGoogleFormTriggerRealtimeToken,
  });

  const handleOpenSettings = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <GoogleFormTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        {...props}
        icon='/logos/stripe.svg'
        name='Stripe'
        description='When stripe event is captured'
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});
