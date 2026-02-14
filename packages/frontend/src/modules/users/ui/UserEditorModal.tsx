"use client";

import { Button } from "@frontend/ui/primitives/Button";
import { Input } from "@frontend/ui/primitives/Input";
import { Modal } from "@frontend/ui/primitives/Modal";
import { Select } from "@frontend/ui/primitives/Select";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { useUsersPageStore } from "../stores/useUsersPageStore";
import { CreateUserData, UpdateUserData } from "../types/users.types";

interface UserFormData {
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  organization_id: string;
  role: string;
  workspaces: { id: string; role: string; name?: string }[];
}

export function UserEditorModal() {
  const isOpen = useUsersPageStore((state) => state.isEditorOpen);
  const setOpen = useUsersPageStore((state) => state.setEditorOpen);
  const selectedUser = useUsersPageStore((state) => state.selectedUser);
  const organizations = useUsersPageStore((state) => state.organizations);
  const roles = useUsersPageStore((state) => state.roles);
  const allWorkspaces = useUsersPageStore((state) => state.allWorkspaces);
  const createUser = useUsersPageStore((state) => state.createUser);
  const updateUser = useUsersPageStore((state) => state.updateUser);
  const fetchOrganizations = useUsersPageStore((state) => state.fetchOrganizations);
  const fetchRoles = useUsersPageStore((state) => state.fetchRoles);
  const fetchWorkspaces = useUsersPageStore((state) => state.fetchWorkspaces);
  const loading = useUsersPageStore((state) => state.loading);
  const storeError = useUsersPageStore((state) => state.error);

  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    organization_id: "",
    role: "",
    workspaces: [],
  });

  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchOrganizations();
      fetchRoles();
      fetchWorkspaces();

      if (selectedUser) {
        setFormData({
          email: selectedUser.email,
          password: "", // Don't show password on edit
          first_name: selectedUser.first_name || "",
          last_name: selectedUser.last_name || "",
          middle_name: selectedUser.middle_name || "",
          organization_id: String(selectedUser.organization_id || ""),
          role: selectedUser.role,
          workspaces: selectedUser.workspaces || [],
        });
      } else {
        setFormData({
          email: "",
          password: "",
          first_name: "",
          last_name: "",
          middle_name: "",
          organization_id: "",
          role: "VIEWER",
          workspaces: [],
        });
      }
      setLocalError(null);
    }
  }, [isOpen, selectedUser, fetchOrganizations, fetchRoles, fetchWorkspaces]);

  const handleSave = async () => {
    setLocalError(null);
    try {
      if (selectedUser) {
        const updateData: UpdateUserData = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          middle_name: formData.middle_name,
          organization_id: formData.organization_id,
          role: formData.role,
          workspaces: formData.workspaces.map((ws: any) => ({
            id: ws.id,
            role: ws.role,
          })),
        };
        await updateUser(selectedUser.id, updateData);
      } else {
        const createData: CreateUserData = {
          email: formData.email,
          password: formData.password || "",
          first_name: formData.first_name,
          last_name: formData.last_name,
          middle_name: formData.middle_name,
          organization_id: formData.organization_id,
          role: formData.role,
          workspaces: formData.workspaces.map((ws) => ({
            id: ws.id,
            role: ws.role,
          })),
        };
        await createUser(createData);
      }
      setOpen(false);
    } catch (err: any) {
      setLocalError(err.message || "Failed to save user");
    }
  };

  const handleAddWorkspace = () => {
    const unassigned = allWorkspaces.filter(
      (ws) => !formData.workspaces.some((uws: any) => uws.id === ws.id)
    );
    if (unassigned.length > 0) {
      setFormData({
        ...formData,
        workspaces: [...formData.workspaces, { id: unassigned[0].id, role: "VIEWER" }],
      });
    }
  };

  const handleRemoveWorkspace = (id: string) => {
    setFormData({
      ...formData,
      workspaces: formData.workspaces.filter((ws) => ws.id !== id),
    });
  };

  const handleWorkspaceChange = (index: number, field: keyof { id: string; role: string }, value: string) => {
    const newWorkspaces = [...formData.workspaces];
    newWorkspaces[index] = { ...newWorkspaces[index], [field]: value };
    setFormData({ ...formData, workspaces: newWorkspaces });
  };

  const error = localError || storeError;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      title={selectedUser ? "Редактировать пользователя" : "Создать пользователя"}
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Отмена
          </Button>
          <Button onClick={handleSave} loading={loading}>
            {selectedUser ? "Сохранить" : "Создать"}
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!!selectedUser || loading}
            placeholder="example@email.com"
          />
          {!selectedUser && (
            <Input
              label="Пароль"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={loading}
              placeholder="Минимум 6 символов"
            />
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Фамилия"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            disabled={loading}
          />
          <Input
            label="Имя"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            disabled={loading}
          />
          <Input
            label="Отчество"
            value={formData.middle_name}
            onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Организация"
            value={formData.organization_id}
            onChange={(e) => setFormData({ ...formData, organization_id: e.target.value })}
            disabled={loading}
          >
            <option value="">Без организации</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name_ru}
              </option>
            ))}
          </Select>

          <Select
            label="Системная роль"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            disabled={loading}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.code.toUpperCase()}>
                {role.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
              Доступ к воркспейсам
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddWorkspace}
              disabled={loading || formData.workspaces.length >= allWorkspaces.length}
              className="h-8 py-0 gap-1"
            >
              <Plus className="h-3 w-3" /> Добавить
            </Button>
          </div>

          {formData.workspaces.length === 0 ? (
            <div className="py-8 border-2 border-dashed border-zinc-100 rounded-lg text-center">
              <p className="text-xs text-zinc-400">Нет назначенных воркспейсов</p>
            </div>
          ) : (
            <div className="space-y-2">
              {formData.workspaces.map((ws, index) => (
                <div key={index} className="flex items-end gap-2 bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                  <div className="flex-1">
                    <Select
                      label="Воркспейс"
                      value={ws.id}
                      onChange={(e) => handleWorkspaceChange(index, "id", e.target.value)}
                      disabled={loading}
                      className="bg-white"
                    >
                      {allWorkspaces.map((w: { id: string; name: string }) => (
                        <option
                          key={w.id}
                          value={w.id}
                          disabled={
                            formData.workspaces.some((uws, i) => uws.id === w.id && i !== index)
                          }
                        >
                          {w.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="w-32">
                    <Select
                      label="Роль"
                      value={ws.role}
                      onChange={(e) => handleWorkspaceChange(index, "role", e.target.value)}
                      disabled={loading}
                      className="bg-white"
                    >
                      <option value="OWNER">Владелец</option>
                      <option value="EDITOR">Редактор</option>
                      <option value="VIEWER">Зритель</option>
                    </Select>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveWorkspace(ws.id)}
                    disabled={loading}
                    className="mb-1 text-zinc-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
