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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

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
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [pendingRole, setPendingRole] = useState<"admin" | "user" | null>(null);
  const [banReason, setBanReason] = useState("");

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

  const handleSetRole = async () => {
    if (!selectedUser || !pendingRole) return;
    try {
      const response = await authClient.admin.setRole({
        userId: selectedUser.id,
        role: pendingRole,
      });

      if (response.error) {
        toast.error("Failed to set role: " + response.error.message);
      } else {
        toast.success(`Role updated to ${pendingRole}`);
        setShowRoleDialog(false);
        setPendingRole(null);
        // Update the selected user's role in state
        if (selectedUser) {
          setSelectedUser({ ...selectedUser, role: pendingRole });
        }
        loadUsers();
      }
    } catch (error) {
      toast.error("Failed to set role");
      console.error(error);
    }
  };

  const handleBanUser = async () => {
    if (!selectedUser) return;
    try {
      const response = await authClient.admin.banUser({
        userId: selectedUser.id,
        banReason: banReason || undefined,
      });

      if (response.error) {
        toast.error("Failed to ban user: " + response.error.message);
      } else {
        toast.success("User banned successfully");
        setShowBanDialog(false);
        setBanReason("");
        if (selectedUser) {
          setSelectedUser({ ...selectedUser, banned: true, banReason });
        }
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

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      const response = await authClient.admin.removeUser({
        userId: selectedUser.id,
      });

      if (response.error) {
        toast.error("Failed to delete user: " + response.error.message);
      } else {
        toast.success("User deleted successfully");
        setShowDeleteDialog(false);
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
    setBanReason("");
  };

  const columns = createColumns();

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner className="size-6" />
        </div>
      ) : (
        <DataTable columns={columns} data={users} onRowClick={handleRowClick} />
      )}

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
                        onClick={() => {
                          setPendingRole("user");
                          setShowRoleDialog(true);
                        }}
                      >
                        Set as User
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setPendingRole("admin");
                          setShowRoleDialog(true);
                        }}
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
                        onClick={() => setShowBanDialog(true)}
                      >
                        Ban User
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setShowDeleteDialog(true)}
                    >
                      Delete User
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Sessions */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Active Sessions</h3>
                  {loadingSessions ? (
                    <div className="flex justify-center py-8">
                      <Spinner />
                    </div>
                  ) : sessions.length > 0 ? (
                    <div className="space-y-3">
                      {sessions.map((session) => (
                        <Card key={session.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1 flex-1 overflow-hidden">
                                <div className="flex items-center gap-4 text-sm flex-wrap">
                                  <div>
                                    <span className="text-muted-foreground">
                                      Created:
                                    </span>
                                    <span className="ml-2">
                                      {new Date(
                                        session.createdAt
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">
                                      Expires:
                                    </span>
                                    <span className="ml-2">
                                      {new Date(
                                        session.expiresAt
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-sm">
                                  <span className="text-muted-foreground">
                                    IP:
                                  </span>
                                  <span className="ml-2">
                                    {session.ipAddress || "N/A"}
                                  </span>
                                </div>
                                <div className="text-sm break-all">
                                  <span className="text-muted-foreground">
                                    User Agent:
                                  </span>
                                  <span className="ml-2">
                                    {session.userAgent || "N/A"}
                                  </span>
                                </div>
                              </div>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="shrink-0"
                                onClick={() =>
                                  handleRevokeSession(session.token)
                                }
                              >
                                Revoke
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No active sessions
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Ban User Alert Dialog */}
      <AlertDialog open={showBanDialog} onOpenChange={setShowBanDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ban User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to ban {selectedUser?.email}? You can
              provide an optional reason below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              placeholder="Ban reason (optional)"
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setBanReason("")}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleBanUser}>
              Ban User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete User Alert Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete {selectedUser?.email}?
              This action cannot be undone and will remove all user data from
              the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Change Role Alert Dialog */}
      <AlertDialog open={showRoleDialog} onOpenChange={(open) => {
        setShowRoleDialog(open);
        if (!open) setPendingRole(null);
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change User Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change {selectedUser?.email}'s role to{" "}
              <span className="font-semibold">{pendingRole}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingRole(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSetRole}>
              Change Role
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
