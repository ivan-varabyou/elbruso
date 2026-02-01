"use client";

import { apiClient } from "@elbruso/api";
import { useAuth } from "@elbruso/modules/auth/lib";
import { Button, Input } from "@elbruso/ui";
import { Mail } from "lucide-react";
import { useState } from "react";

export function ProfileForm() {
  const { user, setUser } = useAuth();
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [middleName, setMiddleName] = useState(user?.middle_name || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const response = await apiClient.patch("/users/profile", {
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
      });
      setUser(response.data);
      setMessage({ type: "success", text: "Профиль успешно обновлен" });
    } catch (error) {
      console.error("Update profile error:", error);
      setMessage({ type: "error", text: "Ошибка при обновлении профиля" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-zinc-100 bg-white p-6">
        <h2 className="text-xl font-semibold text-zinc-900 mb-6">Личные данные</h2>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Имя"
              value={firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
              required
            />
            <Input
              label="Фамилия"
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
              required
            />
          </div>

          <Input
            label="Отчество"
            value={middleName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMiddleName(e.target.value)}
          />

          <div className="relative">
            <Input
              label="Электронная почта"
              value={user?.email || ""}
              readOnly
              leftIcon={<Mail className="h-4 w-4 text-zinc-400" />}
            />
            <p className="text-xs text-zinc-500 mt-1">Email не подлежит изменению</p>
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
            <Button type="submit" variant="primary" loading={loading}>
              Сохранить изменения
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
