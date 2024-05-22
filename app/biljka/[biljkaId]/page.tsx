// app/biljka/[biljkaId]/page.tsx
import { getVrtlarById } from "@/model/vrtlarModel";
import BiljkaCard from "@/components/BiljkaCard";
import { getBiljkaById } from "@/model/biljkeModel";

interface BiljkaPageProps {
  params: {
    biljkaId: string;
  };
}

export default async function BiljkaPage({ params }: BiljkaPageProps) {
  console.log(params);
  const biljka = await getBiljkaById(parseInt(params.biljkaId));
  const vrtlar = await getVrtlarById(parseInt(biljka.vrtlarid));

  return (
    <div className="flex min-h-screen w-full flex-col items-center p-4">
      <BiljkaCard biljka={biljka} vrtlar={vrtlar} />
    </div>
  );
}
