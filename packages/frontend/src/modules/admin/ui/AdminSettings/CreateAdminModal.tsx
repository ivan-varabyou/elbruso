"use client";

import { AdminRole } from "@frontend/types";
import { Button, Input, Select } from "@frontend/ui/primitives";
import { useState } from "react";

interface CreateAdminData {
  email: string;
  name: string;
  password: string;
  role: AdminRole;
}

interface CreateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAdminData) => Promise<void>;
}

export function CreateAdminModal({ isOpen, onClose, onSubmit }: CreateAdminModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateAdminData>({
    email: "",
    name: "",
    password: "",
    role: AdminRole.ADMIN,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold">Создание администратора</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Имя</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Имя"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Пароль</label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Пароль"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Роль</label>
            <Select
              value={formData.role}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, role: e.target.value as AdminRole })}
              required
            >
              <option value={AdminRole.ADMIN}>Администратор</option>
              <option value={AdminRole.MODERATOR}>Модератор</option>
              <option value={AdminRole.SUPER_ADMIN}>Супер-администратор</option>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" variant="solid" isLoading={loading}>
              Создать
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export type { CreateAdminData };
