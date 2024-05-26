import { Dashboard } from "@/components/Dashboard";
import { getBiljke } from "@/model/biljkeModel";
import { getGredice } from "@/model/gredicaModel";
import { getLokacije } from "@/model/lokacijaModel";

async function fetchBiljke() {
  const biljke = await getBiljke();
  return biljke;
}

export default async function Index() {
  const gredice = await getGredice();
  const lokacije = await getLokacije();
  const includedKeys = ["naziv", "lokacijaid", "duljina", "sirina"];

  console.log(lokacije);

  var columns: string[] = [];
  if (gredice.length > 0) {
    columns = Object.keys(gredice[0]).filter((heading) =>
      includedKeys.includes(heading)
    );
  }

  return (
    <div>
      <Dashboard gredice={gredice} lokacije={lokacije} columns={columns} />
    </div>
  );
}
