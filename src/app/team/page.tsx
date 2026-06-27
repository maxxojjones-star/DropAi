"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { Users, Plus, UserPlus, Shield, Crown, Mail, X, Check, MoreHorizontal } from "lucide-react";

interface TeamMember {
  id: string; name: string; email: string; role: string;
  status: string; lastActive: string; avatar?: string;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(mockMembers);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");

  const handleInvite = () => {
    if (!inviteEmail) return;
    const newMember: TeamMember = {
      id: `m${Date.now()}`,
      name: inviteEmail.split("@")[0],
      email: inviteEmail,
      role: inviteRole,
      status: "pending",
      lastActive: "-",
    };
    setMembers([...members, newMember]);
    setInviteEmail("");
    setShowInvite(false);
  };

  return (
    <DashboardLayout title="Team" breadcrumbs={[{ label: "Settings" }, { label: "Team" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Team Members ({members.length})</h2>
            <p className="text-sm text-text-muted">Manage who has access to your DropAI account</p>
          </div>
          <Button onClick={() => setShowInvite(true)} leftIcon={<UserPlus className="w-4 h-4" />}>
            Invite Member
          </Button>
        </div>

        {/* Team List */}
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar name={member.name} size="md" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{member.name}</p>
                        {member.role === "owner" && <Crown className="w-4 h-4 text-amber-400" />}
                      </div>
                      <p className="text-xs text-text-muted">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant={
                        member.role === "owner" ? "premium" :
                        member.role === "admin" ? "info" : "default"
                      } size="sm">
                        {member.role}
                      </Badge>
                      {member.status === "pending" && <Badge variant="warning" size="sm" className="ml-2">Pending</Badge>}
                    </div>
                    <p className="text-xs text-text-muted w-16 text-right">{member.lastActive}</p>
                    {member.role !== "owner" && (
                      <button className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-4 h-4 text-text-muted" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="w-4 h-4" /> Roles & Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { role: "Owner", desc: "Full access to all features and settings", icon: Crown, color: "text-amber-400" },
                { role: "Admin", desc: "Can manage stores, products, and team", icon: Shield, color: "text-brand-400" },
                { role: "Member", desc: "Can view and edit assigned stores", icon: Users, color: "text-text-muted" },
              ].map((r) => (
                <div key={r.role} className="glass rounded-2xl p-4">
                  <r.icon className={`w-8 h-8 ${r.color} mb-2`} />
                  <h3 className="font-semibold text-sm">{r.role}</h3>
                  <p className="text-xs text-text-muted mt-1">{r.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invite Modal */}
      <Modal isOpen={showInvite} onClose={() => setShowInvite(false)} title="Invite Team Member" size="md">
        <div className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="colleague@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Role</label>
            <div className="flex gap-2">
              {["member", "admin"].map((role) => (
                <button
                  key={role}
                  onClick={() => setInviteRole(role)}
                  className={`flex-1 p-3 rounded-xl text-sm font-medium transition-all border ${
                    inviteRole === role
                      ? "bg-gradient-brand-subtle border-brand-500/30 text-brand-500"
                      : "glass border-border"
                  }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <Button isFullWidth onClick={handleInvite} leftIcon={<Mail className="w-4 h-4" />}>
            Send Invitation
          </Button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

const mockMembers: TeamMember[] = [
  { id: "m1", name: "John Doe", email: "john@dropai.com", role: "owner", status: "active", lastActive: "Now" },
  { id: "m2", name: "Jane Smith", email: "jane@dropai.com", role: "admin", status: "active", lastActive: "2h ago" },
  { id: "m3", name: "Bob Wilson", email: "bob@dropai.com", role: "member", status: "active", lastActive: "1d ago" },
  { id: "m4", name: "Alice Brown", email: "alice@example.com", role: "member", status: "pending", lastActive: "-" },
];