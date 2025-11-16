import { gmaes } from "@/lib/gmaes";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function GmaeIndex() {
  return (
    <div>
      <DataTable columns={columns} data={gmaes} />
    </div>
  );
}
