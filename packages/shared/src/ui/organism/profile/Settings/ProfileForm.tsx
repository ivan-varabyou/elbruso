"use client";

import { useState } from "react";
import { Button } from "@/shared/ui";
import { apiClient } from "@/shared/api/client";
import { useAuth } from "@/shared/lib/auth";

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
    <div className="max-w-xl mx-auto space-y-8 py-4">
      <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-lg font-bold text-zinc-900 mb-6">Личные данные</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">
                  Имя
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">
                  Фамилия
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">
                Отчество
              </label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">
                Электронная почта
              </label>
              <input
                type="email"
                value={user?.email || ""}
                className="w-full px-4 py-2.5 bg-zinc-100 border border-zinc-200 rounded-xl text-zinc-400 cursor-not-allowed outline-none"
                readOnly
              />
              <p className="text-[10px] text-zinc-400 pl-1">
                Email не подлежит изменению пользователем
              </p>
            </div>
          </div>

          {message && (
            <div
              className={`p-4 rounded-xl text-sm font-medium ${
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="pt-4">
            <Button type="submit" loading={loading} className="w-full sm:w-auto px-8">
              Сохранить изменения
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
