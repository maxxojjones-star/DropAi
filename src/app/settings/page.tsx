"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabPanel } from "@/components/ui/Tabs";
import { Switch } from "@/components/ui/Select";
import { useState } from "react";
import { User, Shield, Bell, Key, Eye, EyeOff, Save, Copy, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@dropai.com",
    bio: "Full-time dropshipper since 2023",
  });

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailMarketing: false,
    emailAlerts: true,
    pushOrders: true,
    pushUpdates: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout title="Settings" breadcrumbs={[{ label: "Settings" }]}>
      <div className="space-y-6">
        <Tabs
          tabs={[
            { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
            { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
            { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
            { id: "api", label: "API Keys", icon: <Key className="w-4 h-4" /> },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="pills"
        />

        {/* Profile Settings */}
        <TabPanel tabId="profile" activeTab={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center text-2xl font-bold text-white">
                  JD
                </div>
                <div>
                  <Button variant="glass" size="sm">Change Avatar</Button>
                  <p className="text-xs text-text-muted mt-1">PNG, JPG or GIF. Max 2MB.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Full Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                <Input label="Email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
              </div>
              <Input label="Bio" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
              <div className="flex justify-end">
                <Button onClick={handleSave} leftIcon={saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}>
                  {saved ? "Saved!" : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Security Settings */}
        <TabPanel tabId="security" activeTab={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Password & Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Current Password" type={showPassword ? "text" : "password"} placeholder="Enter current password"
                  rightIcon={<button onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>}
                />
                <Input label="New Password" type="password" placeholder="At least 8 characters" />
              </div>
              <div className="p-4 glass rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-brand-400" />
                  <div>
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-text-muted">Add an extra layer of security</p>
                  </div>
                </div>
                <Button variant="glass" size="sm" onClick={() => window.location.href = "/2fa"}>
                  Enable 2FA
                </Button>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave} leftIcon={saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}>
                  {saved ? "Saved!" : "Update Password"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Notification Settings */}
        <TabPanel tabId="notifications" activeTab={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-4">
                <p className="text-sm font-semibold text-text-secondary">Email Notifications</p>
                <div className="space-y-3">
                  {Object.entries(notifications).filter(([k]) => k.startsWith("email")).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 glass rounded-xl">
                      <div>
                        <p className="text-sm font-medium capitalize">{key.replace("email", "").replace(/([A-Z])/g, " $1")} Updates</p>
                        <p className="text-xs text-text-muted">Receive emails about {key.replace("email", "").toLowerCase()}</p>
                      </div>
                      <Switch checked={value} onChange={(v) => setNotifications({ ...notifications, [key]: v })} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-semibold text-text-secondary">Push Notifications</p>
                <div className="space-y-3">
                  {Object.entries(notifications).filter(([k]) => k.startsWith("push")).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 glass rounded-xl">
                      <div>
                        <p className="text-sm font-medium capitalize">{key.replace("push", "").replace(/([A-Z])/g, " $1")}</p>
                        <p className="text-xs text-text-muted">Push notifications in browser</p>
                      </div>
                      <Switch checked={value} onChange={(v) => setNotifications({ ...notifications, [key]: v })} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave} leftIcon={saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}>
                  {saved ? "Saved!" : "Save Preferences"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabPanel>

        {/* API Keys */}
        <TabPanel tabId="api" activeTab={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="p-4 glass rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Live API Key</p>
                  <code className="text-xs text-text-muted font-mono">dropai_live_xxxxxxxxxxxxxxxx</code>
                </div>
                <Button variant="glass" size="sm" leftIcon={<Copy className="w-3 h-3" />}>Copy</Button>
              </div>
              <div className="p-4 glass rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Test API Key</p>
                  <code className="text-xs text-text-muted font-mono">dropai_test_xxxxxxxxxxxxxxxx</code>
                </div>
                <Button variant="glass" size="sm" leftIcon={<Copy className="w-3 h-3" />}>Copy</Button>
              </div>
              <Button variant="glass">Generate New Key</Button>
            </CardContent>
          </Card>
        </TabPanel>
      </div>
    </DashboardLayout>
  );
}