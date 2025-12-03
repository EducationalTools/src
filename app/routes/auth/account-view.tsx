import { AccountView } from "@daveyplate/better-auth-ui";
import type { Route } from "./+types/account-view";

export default function AuthPage({ params }: Route.ComponentProps) {
  return (
    <main className="container mx-auto flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
      <AccountView pathname={params.pathname} />
    </main>
  );
}
