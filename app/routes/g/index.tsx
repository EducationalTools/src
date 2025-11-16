import { gmaes } from "@/lib/gmaes";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function GmaeIndex() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Gmaes</h1>
      <DataTable columns={columns} data={gmaes} />
    </div>
  );
}
