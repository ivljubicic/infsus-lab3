// app/biljka/[biljkaId]/page.tsx
import { Dashboard } from "@/components/BiljkeDashboard";
import GredicaCard from "@/components/GredicaCard";
import { getBiljke, getBiljkeByIds } from "@/model/biljkeModel";
import { getGredicaById, getPosadeneForGredica } from "@/model/gredicaModel";
import { getLokacije } from "@/model/lokacijaModel";
import { Posadena } from "@/types/database";

interface GredicaPageProps {
  params: {
    id: string;
  };
}

export default async function GredicaPage({ params }: GredicaPageProps) {
  const gredica = await getGredicaById(parseInt(params.id));
  const lokacije = await getLokacije();
  const posadena: Posadena[] = await getPosadeneForGredica(parseInt(params.id));
  const biljke = await getBiljke();
  // const biljke = await getBiljkeByIds(posadena.map((p) => p.biljkaid));
  const posadeneBiljke = biljke.filter((biljka) =>
    posadena.some((p) => p.biljkaid === biljka.biljkaid)
  );

  return (
    <div className="flex min-h-screen w-full flex-col items-center p-4">
      <GredicaCard gredica={gredica} lokacije={lokacije} />
      <Dashboard
        biljke={biljke}
        posadeneBiljke={posadeneBiljke}
        posadene={posadena}
        gredicaid={parseInt(params.id)}
      />
    </div>
  );
}
