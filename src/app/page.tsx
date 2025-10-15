'use client';

import { Button } from '@/components/ui/button';
import { requireAuth } from '@/lib/auth-utils';
import { useTRPC } from '@/trpc/client';
import { caller } from '@/trpc/server';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const testAi = useMutation(trpc.testAi.mutationOptions());

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    })
  );

  return (
    <div
      className='min-h-screen min-w-screen
      flex flex-col items-center justify-center gap-y-6'
    >
      Protected Server component <br />
      <div>{JSON.stringify(data, null, 2)}</div>
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Test AI
      </Button>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create workflow
      </Button>
    </div>
  );
};

export default Page;
