import { type NextRequest, NextResponse } from 'next/server';
import { sendWorkflowExecution } from '@/inngest/utils';

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
    const stripeData = {
      // Event metadata
      eventId: body.id,
      eventType: body.type,
      timestamp: body.created,
      livemode: body.livemode,
      raw: body.data?.object,
    };

    // Trigger and Inngest job
    await sendWorkflowExecution({
      workflowId,
      initialData: {
        stripe: stripeData,
      },
    });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process Stripe event.',
      },
      { status: 500 }
    );
  }
}
