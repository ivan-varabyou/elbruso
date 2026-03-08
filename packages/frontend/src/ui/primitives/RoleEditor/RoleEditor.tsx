"use client";

import { adminOrganizationsApi, OrganizationLevel } from "@frontend/api/admin/admin-organizations.api";
import type { CreateRoleDto, RbacRole } from "@frontend/types/rbac";
import { Button, Input, Modal, Textarea } from "@frontend/ui/primitives";
import React, { useEffect, useState } from "react";

interface RoleEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateRoleDto) => Promise<void>;
  role?: RbacRole | null;
  appType?: "admin" | "user";
}

export const RoleEditor: React.FC<RoleEditorProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  role,
}) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState(0);
  const [accessLevelId, setAccessLevelId] = useState<number | null>(null);
  const [levels, setLevels] = useState<OrganizationLevel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (role) {
        setName(role.name);
        setCode(role.code);
        setDescription(role.description || "");
        setWeight(role.weight || 0);
        setAccessLevelId(role.accessLevelId || null);
      } else {
        setName("");
        setCode("");
        setDescription("");
        setWeight(0);
        setAccessLevelId(null);
      }

      adminOrganizationsApi.getLevels().then((res) => {
        setLevels(res.data || []);
      });
    }
  }, [isOpen, role]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({
        name,
        code,
        description,
        weight,
        accessLevelId,
        permissions: role?.permissions || {},
      });
      onClose();
    } catch (error) {
      console.error("Failed to save role:", error);
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <div className="flex justify-end gap-2">
      <Button variant="light" onPress={onClose} isDisabled={loading}>
        Отмена
      </Button>
      <Button variant="solid" color="primary" onPress={handleSave} isLoading={loading}>
        Сохранить
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={role ? "Редактировать роль" : "Создать роль"}
      footer={footer}
      size="md"
    >
      <div className="space-y-4">
        <Input
          label="Название"
          placeholder="Например: Менеджер"
          value={name}
          onValueChange={setName}
          isRequired
          className="bg-transparent"
        />
        <Input
          label="Код"
          placeholder="Например: manager"
          value={code}
          onValueChange={(val) => setCode(val.toUpperCase())}
          isRequired
          isDisabled={!!role}
          className="bg-transparent"
        />
        <Textarea
          label="Описание"
          placeholder="Краткое описание роли"
          value={description}
          onValueChange={setDescription}
          className="bg-transparent"
        />
        <div className="flex gap-4">
          <Input
            type="number"
            label="Приоритет (Вес)"
            placeholder="0"
            value={String(weight)}
            onValueChange={(val) => setWeight(Number(val))}
            className="w-1/2 bg-transparent"
          />
          <div className="w-1/2">
            <label className="text-xs font-medium text-zinc-500 mb-1 block">
              Уровень доступа
            </label>
            <select
              value={accessLevelId || ""}
              onChange={(e) => setAccessLevelId(e.target.value ? Number(e.target.value) : null)}
              className="w-full bg-zinc-100 border border-zinc-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="">Не выбран</option>
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name_ru}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
};
