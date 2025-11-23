import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import createBackup from "@/lib/backups/create-backup";
import restoreBackup from "@/lib/backups/restore-backup";
import {
  Authenticated,
  AuthLoading,
  useConvexAuth,
  useMutation,
  useQuery,
} from "convex/react";
import {
  ArchiveRestore,
  ArrowRight,
  Clipboard,
  Copy,
  Delete,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { auth } from "@/convex/betterAuth/auth";
import { NICE_EASE } from "@/lib/constants";

export default function BackupsPage() {
  const [backupData, setBackupData] = useState("");
  const [inputtedBackupData, setInputtedBackupData] = useState("");
  const [inputtedBackupName, setInputtedBackupName] = useState("");
  const [loading, setLoading] = useState(false);

  const cloudBackups = useQuery(api.backups.getBackups);
  const createCloudBackup = useMutation(api.backups.createBackup);
  const session = authClient.useSession();
  const convexAuth = useConvexAuth();

  useEffect(() => {
    setBackupData(createBackup());
  }, []);

  return (
    <div className="max-w-4xl mx-auto w-full p-4 flex flex-col gap-4">
      <h1 className="text-4xl">Backups</h1>
      <Card>
        <CardHeader>
          <CardTitle>Local Backup</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          Export
          <div className="flex flex-row gap-3">
            <Input disabled={true} value={backupData} />
            <Button
              size="icon"
              onClick={() => {
                navigator.clipboard
                  .writeText(backupData)
                  .then(() => {
                    toast.success("Backup copied to clipboard");
                  })
                  .catch((error) => {
                    toast.error("Failed to copy backup to clipboard");
                  });
              }}
            >
              <Clipboard />
            </Button>
          </div>
          Import
          <div className="flex flex-row gap-3">
            <Input
              value={inputtedBackupData}
              onChange={(e) => setInputtedBackupData(e.target.value)}
            />
            <Button
              disabled={inputtedBackupData.length === 0}
              onClick={() => {
                setLoading(true);
                restoreBackup(inputtedBackupData);
              }}
            >
              Import
            </Button>
          </div>
        </CardContent>
      </Card>

      {session.data?.user && (
        <AnimatePresence mode="popLayout" initial={false}>
          {convexAuth.isLoading || !cloudBackups?.success ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ ease: NICE_EASE }}
              key="loading"
              className="flex flex-col gap-2"
            >
              <Skeleton className="h-10 w-[150px]" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ ease: NICE_EASE }}
              key="loaded"
              className="flex flex-col gap-2"
            >
              <h2 className="text-2xl">Cloud Backups</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="border bg-card rounded-xl p-4 flex flex-col gap-2">
                  <h3 className="text-lg">Create Backup</h3>
                  <div className="flex flex-row gap-2">
                    <Input
                      value={inputtedBackupName}
                      onChange={(e) => setInputtedBackupName(e.target.value)}
                      placeholder="Backup Name"
                    />
                    <Button
                      size="icon"
                      onClick={async () => {
                        setLoading(true);
                        const result = await createCloudBackup({
                          data: createBackup(),
                          name: inputtedBackupName,
                        });
                        if (result?.success) {
                          toast.success("Backup created");
                          setInputtedBackupName("");
                        } else {
                          toast.error("Failed to create backup");
                        }
                        setLoading(false);
                      }}
                    >
                      <ArrowRight />
                    </Button>
                  </div>
                </div>
                {cloudBackups?.success &&
                  cloudBackups?.backups?.map((backup) => (
                    <div
                      key={backup._id}
                      className="flex flex-col gap-2 bg-card rounded-xl p-4 border"
                    >
                      <h3 className="text-lg">{backup.name}</h3>
                      <div className="grow"></div>
                      <div className="flex flex-row gap-2 justify-end">
                        <Button variant="destructive" size="icon">
                          <Trash />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Copy />
                        </Button>
                        <Button
                          onClick={() => {
                            restoreBackup(backup.data);
                          }}
                        >
                          <ArchiveRestore />
                          Restore
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
