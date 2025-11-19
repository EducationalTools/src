import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { DataTable } from "./data-table";
import { createColumns, type User } from "./columns";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Session = {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date | number;
  createdAt: Date | number;
  ipAddress?: string | null;
  userAgent?: string | null;
  impersonatedBy?: string | null;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showSessionDialog, setShowSessionDialog] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await authClient.admin.listUsers({
        query: {
          limit: 1000,
        },
      });

      if (response.data) {
        setUsers(response.data.users as User[]);
      } else if (response.error) {
        toast.error("Failed to load users: " + response.error.message);
      }
    } catch (error) {
      toast.error("Failed to load users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSetRole = async (userId: string, role: string) => {
    try {
      const response = await authClient.admin.setRole({
        userId,
        role: role as "admin" | "user",
      });

      if (response.error) {
        toast.error("Failed to set role: " + response.error.message);
      } else {
        toast.success(`Role updated to ${role}`);
        loadUsers();
      }
    } catch (error) {
      toast.error("Failed to set role");
      console.error(error);
    }
  };

  const handleSetPassword = async (userId: string, newPassword: string) => {
    try {
      const response = await authClient.admin.setUserPassword({
        userId,
        newPassword,
      });

      if (response.error) {
        toast.error("Failed to set password: " + response.error.message);
      } else {
        toast.success("Password updated successfully");
      }
    } catch (error) {
      toast.error("Failed to set password");
      console.error(error);
    }
  };

  const handleBanUser = async (
    userId: string,
    reason?: string,
    expiresIn?: number
  ) => {
    try {
      const response = await authClient.admin.banUser({
        userId,
        banReason: reason,
        banExpiresIn: expiresIn,
      });

      if (response.error) {
        toast.error("Failed to ban user: " + response.error.message);
      } else {
        toast.success("User banned successfully");
        loadUsers();
      }
    } catch (error) {
      toast.error("Failed to ban user");
      console.error(error);
    }
  };

  const handleUnbanUser = async (userId: string) => {
    try {
      const response = await authClient.admin.unbanUser({
        userId,
      });

      if (response.error) {
        toast.error("Failed to unban user: " + response.error.message);
      } else {
        toast.success("User unbanned successfully");
        loadUsers();
      }
    } catch (error) {
      toast.error("Failed to unban user");
      console.error(error);
    }
  };

  const handleViewSessions = async (userId: string) => {
    try {
      const response = await authClient.admin.listUserSessions({
        userId,
      });

      if (response.data) {
        setSessions(response.data.sessions as Session[]);
        setSelectedUserId(userId);
        setShowSessionDialog(true);
      } else if (response.error) {
        toast.error("Failed to load sessions: " + response.error.message);
      }
    } catch (error) {
      toast.error("Failed to load sessions");
      console.error(error);
    }
  };

  const handleRevokeSession = async (sessionToken: string) => {
    try {
      const response = await authClient.admin.revokeUserSession({
        sessionToken,
      });

      if (response.error) {
        toast.error("Failed to revoke session: " + response.error.message);
      } else {
        toast.success("Session revoked successfully");
        if (selectedUserId) {
          handleViewSessions(selectedUserId);
        }
      }
    } catch (error) {
      toast.error("Failed to revoke session");
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await authClient.admin.removeUser({
        userId,
      });

      if (response.error) {
        toast.error("Failed to delete user: " + response.error.message);
      } else {
        toast.success("User deleted successfully");
        loadUsers();
      }
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    }
  };

  const columns = createColumns(
    handleSetRole,
    handleSetPassword,
    handleBanUser,
    handleUnbanUser,
    handleViewSessions,
    handleDeleteUser
  );

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div>Loading users...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <DataTable columns={columns} data={users} />

      <Dialog open={showSessionDialog} onOpenChange={setShowSessionDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Sessions</DialogTitle>
            <DialogDescription>
              View and manage all sessions for this user
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Created</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>User Agent</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.length > 0 ? (
                  sessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        {new Date(session.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(session.expiresAt).toLocaleString()}
                      </TableCell>
                      <TableCell>{session.ipAddress || "N/A"}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {session.userAgent || "N/A"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRevokeSession(session.token)}
                        >
                          Revoke
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No active sessions
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
