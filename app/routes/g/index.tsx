import { gmaes } from "@/lib/gmaes";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import type { Route } from "./+types/index";
import { data } from "react-router";
import { isExperimentalFeaturesEnabled } from "@/lib/experimental-check";

export async function clientLoader() {
  if (!isExperimentalFeaturesEnabled()) {
    throw data(null, { status: 404 });
  }
}

export default function GmaeIndex() {
  return (
    <div>
      <DataTable columns={columns} data={gmaes} />
    </div>
  );
}
