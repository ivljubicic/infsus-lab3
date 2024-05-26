import { Dashboard } from "@/components/Dashboard";
import { getBiljke } from "@/model/biljkeModel";
import { getGredice } from "@/model/gredicaModel";
import { getLokacije } from "@/model/lokacijaModel";

export default async function Index() {
  const gredice = await getGredice();
  const lokacije = await getLokacije();
  const includedKeys = ["naziv", "lokacijaid", "duljina", "sirina"];
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
