'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CopyIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { generateGoogleFormScript } from './utils';

interface ManualTriggerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GoogleFormTriggerDialog = ({
  open,
  onOpenChange,
}: ManualTriggerDialogProps) => {
  const params = useParams();
  const workflowId = params.workflowId as string;

  // Construct the webhook URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const webhookUrl = `${baseUrl}/api/webhooks/google-form?workflowId=${workflowId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl);
      toast.success('Webhook URL copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy webhook URL');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>Google Form Trigger Configuration</DialogTitle>
          <DialogDescription>
            Use this webhook URL in your Google Form's Apps Script to trigger
            this workflow when a form is submitted.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='webhook-url'>Webhook URL</Label>
            <div className='flex gap-2'>
              <Input
                id='webhook-url'
                value={webhookUrl}
                readOnly
                className='font-mono text-sm'
              />
              <Button
                type='button'
                size='icon'
                variant='outline'
                onClick={copyToClipboard}
              >
                <CopyIcon className='size-4' />
              </Button>
            </div>
          </div>
          <div className='rounded-lg bg-muted p-4 space-y-2'>
            <h4 className='font-medium text-sm'>Setup instructions:</h4>
            <ol className='text-sm text-muted-foreground list-decimal list-inside space-y-1'>
              <li>Open your Google Form</li>
              <li>Click the three dots menu &rarr; Script editor</li>
              <li>Copy and paste the script below</li>
              <li>Replace WEBHOOK_URL with your webhook URL above</li>
              <li>Save and click "Triggers" &rarr; Add Trigger</li>
              <li>Chose: From form &rarr; On form submit &rarr; Save</li>
            </ol>
          </div>
          <div className='rounded-lg bg-muted p-4 space-y-2'>
            <h4 className='font-medium text-sm'>Google Apps Script:</h4>
            <Button
              type='button'
              variant='outline'
              onClick={async () => {
                const script = generateGoogleFormScript(webhookUrl);
                try {
                  await navigator.clipboard.writeText(script);
                  toast.success('Script copied to clipboard!');
                } catch (error) {
                  toast.error('Failed to copy script to clipboard.');
                }
              }}
            >
              <CopyIcon className='size-4 mr-2' />
              Copy Google Apps Script
            </Button>
            <p className='text-xs text-muted-foreground'>
              This script includes your webhook URL and the handles form
              submissions.
            </p>
          </div>
          <div className='rounded-lg bg-muted p-4 space-y-2'>
            <h4 className='font-medium text-sm'>Avaiable Variables</h4>
            <ul className='text-sm text-muted-foreground space-y-1'>
              <li>
                <code className='bg-background px-1 py-0.5 rounded'>
                  {'{{googleForm.respondentEmail}}'} - Respondent&apos;s email
                  address
                </code>
              </li>
              <li>
                <code className='bg-background px-1 py-0.5 rounded'>
                  {"{{googleForm.responses['Question Name']}}"} - Specific
                  answer
                </code>
              </li>
              <li>
                <code className='bg-background px-1 py-0.5 rounded'>
                  {'{{json googleForm.responses}}'} - All responses a JSON
                </code>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
