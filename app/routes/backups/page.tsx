import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import createBackup from "@/lib/backups/create-backup";
import restoreBackup from "@/lib/backups/restore-backup";
import { useMutation, useQuery } from "convex/react";
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

export default function BackupsPage() {
  const [backupData, setBackupData] = useState("");
  const [inputtedBackupData, setInputtedBackupData] = useState("");
  const [inputtedBackupName, setInputtedBackupName] = useState("");
  const [loading, setLoading] = useState(false);

  const cloudBackups = useQuery(api.backups.getBackups);
  const createCloudBackup = useMutation(api.backups.createBackup);

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
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Cloud Backup</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row gap-2">
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
          </CardContent>
        </Card>
        {cloudBackups?.success &&
          cloudBackups?.backups?.map((backup) => (
            <Card key={backup._id}>
              <CardHeader>
                <CardTitle>{backup.name}</CardTitle>
              </CardHeader>
              <div className="grow"></div>
              <CardContent className="flex flex-row gap-2 justify-end">
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
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
