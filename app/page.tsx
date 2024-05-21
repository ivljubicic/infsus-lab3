import { Dashboard } from "@/components/Dashboard";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();

  const { data: biljke } = await supabase.from("biljka").select();

  // select headings from biljke
  const headings = Object.keys(biljke[0]);

  return (
    <div>
      <Dashboard data={biljke} columns={headings} />
    </div>
  );
}
