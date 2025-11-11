import { init } from '@paralleldrive/cuid2';
import { type NextRequest, NextResponse } from 'next/server';
import { googleFormTriggerChannel } from '@/inngest/channels/google-form-trigger';
import { inngest } from '@/inngest/client';
import { success } from 'zod';
import { sendWorkflowExecution } from '@/inngest/utils';
import { google } from 'better-auth/social-providers';

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const workflowId = url.searchParams.get('workflowId');

    if (!workflowId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Workflow ID is missing. Please provide a valid workflow ID.',
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const formData = {
      formId: body.formId,
      formTitle: body.formTitle,
      responseId: body.responseId,
      timestamp: body.timestamp,
      respondentEmail: body.respondentEmail,
      responses: body.responses,
      row: body,
    };

    // Trigger and Inngest job
    await sendWorkflowExecution({
      workflowId,
      initialData: {
        googleForm: formData,
      },
    });
  } catch (error) {
    console.error('Google Form webhook error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process Google Form submission.',
      },
      { status: 500 }
    );
  }
}
