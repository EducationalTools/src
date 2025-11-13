import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

export default function Ott() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const redirect = searchParams.get("redirect");
  const auth = useConvexAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>("Loading");

  async function handleAuth() {
    setMessage("Logging in");
    try {
      const result = await authClient.signIn.ott({
        token: token || "",
      });

      if (result.error) {
        setMessage(result.error.message || "");
        setLoading(false);
      } else {
        toast.success("Logged in");
        navigate(new URL(redirect || "").pathname);
      }
    } catch (error) {
      setMessage("Something went wrong");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!auth.isLoading) handleAuth();
  }, [auth.isLoading]);

  return (
    <div className="w-full h-full flex flex-row gap-2 justify-center items-center p-4">
      {loading && <Spinner />}
      {message}
    </div>
  );
}
