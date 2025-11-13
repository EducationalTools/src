import type { Route } from "./+types/play";

export default function Play({ params }: Route.ComponentProps) {
  return <div>{params.id}</div>;
}
