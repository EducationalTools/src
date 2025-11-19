import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import createBackup from "@/lib/backups/create-backup";
import restoreBackup from "@/lib/backups/restore-backup";
import { Clipboard } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BackupsPage() {
  const [backupData, setBackupData] = useState("");
  const [inputtedBackupData, setInputtedBackupData] = useState("");
  const [loading, setLoading] = useState(false);

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
    </div>
  );
}
