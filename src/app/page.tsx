import Charts from '@/components/Charts';
import Kudus from '@/components/Kudus';

async function getKudus(): Promise<Kudu[]> {
  const res = await fetch('https://work-sample-mk-fs.s3-us-west-2.amazonaws.com/species.json');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const kudus = await getKudus();

  return (
    <main className="flex flex-col items-center justify-start md:p-24 p-5 w-full min-h-screen">
      <Charts data={kudus} />
      <Kudus data={kudus} />
    </main>
  );
}
