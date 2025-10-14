import prisma from '@/lib/db';
const Page = async () => {
  const user = await prisma.user.findMany();

  return (
    <div
      className='
      flex flex-col items-center justify-center h-screen'
    >
      <h1>IsolaOlja</h1>
      {JSON.stringify(user)}
    </div>
  );
};

export default Page;
