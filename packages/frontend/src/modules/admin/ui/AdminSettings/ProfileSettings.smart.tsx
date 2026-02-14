import { useEffect, useState } from "react";

import { Key, Lock, Save, User } from "lucide-react";

import { cn } from "@frontend/lib";
import { Button, Input } from "@frontend/ui/primitives";
import { useAdminAuth } from "@frontend/modules/admin/auth";

type TabType = "profile" | "security";

export function ProfileSettings() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const tabs = [
    { id: "profile", label: "Профиль", icon: User },
    { id: "security", label: "Безопасность", icon: Key },
  ] as const;

  return (
    <div className="bg-white rounded-lg border border-zinc-100 overflow-hidden">
      {/* Tabs */}
      <div className="border-b border-zinc-100 bg-zinc-50/30">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                  activeTab === tab.id
                    ? "text-zinc-900 border-zinc-900"
                    : "text-zinc-500 border-transparent hover:text-zinc-700 hover:border-zinc-300",
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "security" && <SecurityTab />}
      </div>
    </div>
  );
}

function ProfileTab() {
  const { user: profile, updateProfile } = useAdminAuth();
  const [name, setName] = useState(profile?.name || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await updateProfile({ name });
      setMessage({ type: "success", text: "Профиль успешно обновлен" });
    } catch (error) {
      console.error("Update profile error:", error);
      setMessage({ type: "error", text: "Ошибка при обновлении профиля" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">Имя</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email</label>
          <Input
            type="email"
            value={profile?.email || ""}
            readOnly
            disabled
            placeholder="your@email.com"
          />
          <p className="text-xs text-zinc-500 mt-1">Email изменяется только через базу</p>
        </div>

        {message && (
          <div
            className={`p-3 rounded-md text-sm ${
              message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="pt-2">
          <Button type="submit" variant="solid" isLoading={loading}>
            <Save className="h-4 w-4" />
            Сохранить изменения
          </Button>
        </div>
      </form>
    </div>
  );
}

function SecurityTab() {
  const { updateProfile } = useAdminAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Пароли не совпадают" });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ type: "error", text: "Пароль должен содержать минимум 8 символов" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await updateProfile({ currentPassword, newPassword });
      setMessage({ type: "success", text: "Пароль успешно изменен" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Change password error:", error);
      setMessage({ type: "error", text: "Ошибка при изменении пароля" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">Текущий пароль</label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Текущий пароль"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">Новый пароль</label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Новый пароль"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">
            Подтвердите новый пароль
          </label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Подтвердите пароль"
            required
          />
        </div>

        {message && (
          <div
            className={`p-3 rounded-md text-sm ${
              message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="pt-2">
          <Button type="submit" variant="solid" isLoading={loading}>
            <Lock className="h-4 w-4" />
            Изменить пароль
          </Button>
        </div>
      </form>
    </div>
  );
}

