import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function BackupsPage() {
  const [backupData, setBackupData] = useState("");
  const [inputtedBackupData, setInputtedBackupData] = useState("");
  const [inputtedBackupName, setInputtedBackupName] = useState("");
  const [loading, setLoading] = useState(false);

  const cloudBackups = useQuery(api.backups.getBackups);
  const createCloudBackup = useMutation(api.backups.createBackup);
  const session = authClient.useSession();
  const convexAuth = useConvexAuth();

  const deleteCloudBackup = useMutation(api.backups.deleteBackup);

  useEffect(() => {
    setBackupData(createBackup());
  }, []);

  const handleCreateBackup = async () => {
    if (!inputtedBackupName.trim()) {
      toast.error("Please enter a backup name");
      return;
    }
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
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-4 flex flex-col gap-4">
      <h1 className="text-4xl">Backups</h1>
      <Card>
        <CardHeader>
          <CardTitle>Local Backup</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">Export</h2>
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
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">Import</h2>
            <p className="text-sm text-muted-foreground">
              This will overwrite your current data.
            </p>
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
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          !loading &&
                          inputtedBackupName.trim()
                        ) {
                          handleCreateBackup();
                        }
                      }}
                      placeholder="Backup Name"
                      disabled={loading}
                    />
                    <Button
                      size="icon"
                      onClick={handleCreateBackup}
                      disabled={loading || !inputtedBackupName.trim()}
                    >
                      {loading ? <Spinner /> : <ArrowRight />}
                    </Button>
                  </div>
                </div>
                <AnimatePresence mode="popLayout" initial={false}>
                  {cloudBackups?.success &&
                    cloudBackups?.backups?.map((backup) => (
                      <motion.div
                        key={backup._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ ease: NICE_EASE }}
                        layout
                        className="flex flex-col gap-2 bg-card rounded-xl p-4 border"
                      >
                        <h3 className="text-lg">{backup.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Created at{" "}
                          {new Date(backup._creationTime).toLocaleString()}
                        </p>
                        <div className="grow"></div>
                        <div className="flex flex-row gap-2 justify-end">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Backup
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this backup?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    toast.promise(
                                      new Promise(async (resolve, reject) => {
                                        const result = await deleteCloudBackup({
                                          id: backup._id,
                                        });
                                        if (result?.success) {
                                          resolve(true);
                                        } else {
                                          reject(result?.error);
                                        }
                                      }),
                                      {
                                        loading: "Deleting backup...",
                                        success: "Backup deleted",
                                        error: "Failed to delete backup",
                                      }
                                    );
                                  }}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              navigator.clipboard
                                .writeText(backup.data)
                                .then(() => {
                                  toast.success("Backup copied to clipboard");
                                })
                                .catch((error) => {
                                  toast.error(
                                    "Failed to copy backup to clipboard"
                                  );
                                });
                            }}
                          >
                            <Copy />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button>
                                <ArchiveRestore />
                                Restore
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Restore Backup
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to restore this backup?
                                  This will overwrite your current data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    restoreBackup(backup.data);
                                  }}
                                >
                                  Restore
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
