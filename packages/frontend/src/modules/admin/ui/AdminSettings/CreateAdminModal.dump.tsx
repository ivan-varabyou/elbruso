"use client";

import { cn } from "@frontend/lib";
import { Button, Input, Select } from "@frontend/ui/primitives";
import { X, User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { AdminRole } from "../../../../types/enums";

interface CreateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAdminData) => Promise<void>;
}

export interface CreateAdminData {
  email: string;
  password: string;
  name: string;
  role: AdminRole;
}

export function CreateAdminModal({ isOpen, onClose, onSubmit }: CreateAdminModalProps) {
  const [formData, setFormData] = useState<CreateAdminData>({
    email: "",
    password: "",
    name: "",
    role: AdminRole.MODERATOR,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(formData);
      // Reset form
      setFormData({
        email: "",
        password: "",
        name: "",
        role: AdminRole.MODERATOR,
      });
      onClose();
    } catch (err: any) {
      console.error("Create admin error:", err);
      
      // Better error handling
      let errorMessage = "Ошибка при создании администратора";
      
      if (err.response?.status === 401) {
        errorMessage = "Необходима авторизация. Пожалуйста, войдите в систему снова.";
      } else if (err.response?.status === 403) {
        errorMessage = "У вас нет прав для создания администраторов";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        email: "",
        password: "",
        name: "",
        role: AdminRole.MODERATOR,
      });
      setError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <h2 className="text-xl font-semibold text-zinc-900">Добавить администратора</h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Имя</label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              leftIcon={<User className="h-4 w-4" />}
              placeholder="Иван Иванов"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              leftIcon={<Mail className="h-4 w-4" />}
              placeholder="admin@example.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Пароль</label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              leftIcon={<Lock className="h-4 w-4" />}
              placeholder="Минимум 6 символов"
              required
              minLength={6}
              disabled={loading}
            />
            <p className="text-xs text-zinc-500 mt-1">Минимум 6 символов</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Роль</label>
            <Select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as AdminRole })}
              disabled={loading}
            >
              <option value={AdminRole.MODERATOR}>Moderator</option>
              <option value={AdminRole.ADMIN}>Admin</option>
              <option value={AdminRole.SUPER_ADMIN}>Super Admin</option>
            </Select>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={loading}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button type="submit" variant="primary" loading={loading} className="flex-1">
              Создать
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
