"use client";

import { AdminRole } from "@frontend/types";
import { Button, Input, Select, Switch } from "@frontend/ui/primitives";
import { Modal } from "@frontend/ui/primitives/Modal";
import { useState } from "react";
import { AdminUser } from "@frontend/types";

interface EditAdminData {
  name: string;
  role: AdminRole;
  is_active: boolean;
  password?: string;
}

interface EditAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EditAdminData) => Promise<void>;
  admin: AdminUser | null;
}

export function EditAdminModal({ isOpen, onClose, onSubmit, admin }: EditAdminModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EditAdminData>({
    name: "",
    role: AdminRole.ADMIN,
    is_active: true,
    password: "",
  });

  if (!isOpen || !admin) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submitData: EditAdminData = {
        name: formData.name,
        role: formData.role,
        is_active: formData.is_active,
      };
      if (formData.password && formData.password.length > 0) {
        submitData.password = formData.password;
      }
      await onSubmit(submitData);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    } else {
      setFormData({
        name: admin.name,
        role: admin.role,
        is_active: admin.is_active ?? true,
        password: "",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Редактирование администратора"
      size="md"
      footer={
        <div className="flex justify-end gap-2">
          <Button type="button" variant="flat" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit" form="edit-admin-form" variant="solid" isLoading={loading}>
            Сохранить
          </Button>
        </div>
      }
    >
      <form id="edit-admin-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-zinc-700">Имя</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Имя"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-zinc-700">Email</label>
          <Input value={admin.email} placeholder="email@example.com" isDisabled />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-zinc-700">Роль</label>
          <Select
            value={formData.role}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFormData({ ...formData, role: e.target.value as AdminRole })
            }
            required
          >
            <option value={AdminRole.ADMIN}>Администратор</option>
            <option value={AdminRole.MODERATOR}>Модератор</option>
            <option value={AdminRole.SUPER_ADMIN}>Супер-администратор</option>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-zinc-700">Пароль</label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Оставьте пустым, чтобы не менять"
          />
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-medium text-zinc-700">Статус</span>
          <div className="flex items-center gap-3">
            <span
              className={`text-sm font-medium transition-colors ${
                formData.is_active ? "text-green-600" : "text-zinc-400"
              }`}
            >
              {formData.is_active ? "Активен" : "Заблокирован"}
            </span>
            <Switch
              classNames={{
                base: "inline-flex flex-row-reverse items-center justify-end cursor-pointer tap-highlight-transparent",
                wrapper: `h-7 w-12 rounded-full transition-colors ${
                  formData.is_active
                    ? "bg-green-500 data-[selected=true]:bg-green-500"
                    : "bg-zinc-300 data-[selected=false]:bg-zinc-300"
                }`,
                thumb:
                  "h-6 w-6 rounded-full bg-white shadow-sm transition-transform data-[selected=true]:translate-x-5",
              }}
              isSelected={formData.is_active}
              onValueChange={(checked) =>
                setFormData((prev) => ({ ...prev, is_active: checked ?? false }))
              }
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export type { EditAdminData };
