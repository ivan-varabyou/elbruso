"use client";

import { useState } from "react";
import { Button, Input } from "@/shared/ui";
import { apiClient } from "@/shared";
import { Lock } from "lucide-react";

export function SecurityForm() {
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

    setLoading(true);
    setMessage(null);
    try {
      await apiClient.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      setMessage({ type: "success", text: "Пароль успешно изменен" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Change password error:", error);
      setMessage({
        type: "error",
        text: "Ошибка при смене пароля. Проверьте правильность текущего пароля",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-zinc-100 bg-white p-6">
        <h2 className="text-xl font-semibold text-zinc-900 mb-6">Безопасность</h2>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <Input
            label="Текущий пароль"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            leftIcon={<Lock className="h-4 w-4 text-zinc-400" />}
            required
          />

          <Input
            label="Новый пароль"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            leftIcon={<Lock className="h-4 w-4 text-zinc-400" />}
            required
            minLength={6}
          />

          <Input
            label="Подтвердите новый пароль"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={<Lock className="h-4 w-4 text-zinc-400" />}
            required
          />

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
              Сменить пароль
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
