import { Counter } from '@/components/counter';
import { title } from '@/components/primitives';

async function getInitialCount() {
  console.log('getInitialCount called');
  await new Promise((f) => setTimeout(f, 3000));
  return 10;
}

export default async function CounterPage() {
  const fetcheInitialCount = await getInitialCount();
  return (
    <div className='flex flex-col space-y-16'>
      <h1 className={title()}>Counter</h1>
      <Counter initialCount={fetcheInitialCount}>
        <h1>서버 컴포넌트에서 들어옴</h1>
      </Counter>
    </div>
  );
}
