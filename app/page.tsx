import { Dashboard } from "@/components/Dashboard";
import { getBiljke } from "@/model/biljkeModel";

export default async function Index() {
  const biljke = await getBiljke();
  const includedKeys = ["naziv", "vrijemebranja", "vrijemesadnje"];

  const columns = Object.keys(biljke[0]).filter((heading) =>
    includedKeys.includes(heading)
  );

  return (
    <div>
      <Dashboard data={biljke} columns={columns} />
    </div>
  );
}
