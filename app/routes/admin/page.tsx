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
import { Separator } from "@/components/ui/separator";

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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(false);

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
        // Update the selected user's role in state
        if (selectedUser) {
          setSelectedUser({ ...selectedUser, role });
        }
        loadUsers();
      }
    } catch (error) {
      toast.error("Failed to set role");
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

  const loadUserSessions = async (userId: string) => {
    try {
      setLoadingSessions(true);
      const response = await authClient.admin.listUserSessions({
        userId,
      });

      if (response.data) {
        setSessions(response.data.sessions as Session[]);
      } else if (response.error) {
        toast.error("Failed to load sessions: " + response.error.message);
      }
    } catch (error) {
      toast.error("Failed to load sessions");
      console.error(error);
    } finally {
      setLoadingSessions(false);
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
        if (selectedUser) {
          loadUserSessions(selectedUser.id);
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
        setShowUserDialog(false);
        setSelectedUser(null);
        loadUsers();
      }
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    }
  };

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setSessions([]);
    setShowUserDialog(true);
    // Load sessions after dialog is open
    loadUserSessions(user.id);
  };

  const handleDialogClose = () => {
    setShowUserDialog(false);
    setSelectedUser(null);
    setSessions([]);
    setLoadingSessions(false);
  };

  const columns = createColumns();

  if (loading) {
    return (
      <div className="p-6">
        <div>Loading users...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <DataTable columns={columns} data={users} onRowClick={handleRowClick} />

      <Dialog open={showUserDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedUser.name}</DialogTitle>
                <DialogDescription>{selectedUser.email}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* User Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">User Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Role:</span>
                      <span className="ml-2 font-medium capitalize">
                        {selectedUser.role || "user"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <span
                        className={`ml-2 font-medium ${
                          selectedUser.banned
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {selectedUser.banned ? "Banned" : "Active"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Verified:</span>
                      <span
                        className={`ml-2 font-medium ${
                          selectedUser.emailVerified
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {selectedUser.emailVerified ? "Yes" : "No"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <span className="ml-2">
                        {new Date(selectedUser.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {selectedUser.banned && selectedUser.banReason && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">
                          Ban Reason:
                        </span>
                        <span className="ml-2">{selectedUser.banReason}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.role === "admin" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetRole(selectedUser.id, "user")}
                      >
                        Set as User
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetRole(selectedUser.id, "admin")}
                      >
                        Set as Admin
                      </Button>
                    )}
                    {selectedUser.banned ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnbanUser(selectedUser.id)}
                      >
                        Unban User
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const reason = prompt("Ban reason:");
                          handleBanUser(selectedUser.id, reason || undefined);
                        }}
                      >
                        Ban User
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to delete user ${selectedUser.email}? This cannot be undone.`
                          )
                        ) {
                          handleDeleteUser(selectedUser.id);
                        }
                      }}
                    >
                      Delete User
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Sessions */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Active Sessions</h3>
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
                        {loadingSessions ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8">
                              Loading sessions...
                            </TableCell>
                          </TableRow>
                        ) : sessions.length > 0 ? (
                          sessions.map((session) => (
                            <TableRow key={session.id}>
                              <TableCell>
                                {new Date(
                                  session.createdAt
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                {new Date(
                                  session.expiresAt
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                {session.ipAddress || "N/A"}
                              </TableCell>
                              <TableCell className="max-w-xs truncate">
                                {session.userAgent || "N/A"}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() =>
                                    handleRevokeSession(session.token)
                                  }
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
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
