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
          workspaces: formData.workspaces.map((ws: { id: string; role: string }) => ({
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save user";
      setLocalError(message);
    }
  };

  const handleAddWorkspace = () => {
    const unassigned = allWorkspaces.filter(
      (ws: { id: string }) => !formData.workspaces.some((uws: { id: string }) => uws.id === ws.id),
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
          <Button onClick={handleSave} loading={loading} variant="primary">
            {selectedUser ? "Сохранить изменения" : "Создать пользователя"}
          </Button>
        </div>
      }
    >
      <div className="space-y-8 py-2">
        {error && (
          <div className="p-4 bg-red-50 text-red-700 border border-red-100 rounded-xl text-sm flex items-start gap-3">
            <div className="h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
              !
            </div>
            <p>{error}</p>
          </div>
        )}

        <section className="space-y-4">
          <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-1">
            Основная информация
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 bg-zinc-50/50 rounded-2xl border border-zinc-100">
            <Input
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!!selectedUser || loading}
              placeholder="example@email.com"
              className="bg-white"
            />
            {!selectedUser && (
              <Input
                label="Пароль"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={loading}
                placeholder="Минимум 6 символов"
                className="bg-white"
              />
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-1">
            Личные данные
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4 bg-zinc-50/50 rounded-2xl border border-zinc-100">
            <Input
              label="Фамилия"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              disabled={loading}
              className="bg-white"
            />
            <Input
              label="Имя"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              disabled={loading}
              className="bg-white"
            />
            <Input
              label="Отчество"
              value={formData.middle_name}
              onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
              disabled={loading}
              className="bg-white"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-1">
            Роли и полномочия
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 bg-zinc-50/50 rounded-2xl border border-zinc-100">
            <Select
              label="Организация"
              value={formData.organization_id}
              onChange={(e) => setFormData({ ...formData, organization_id: e.target.value })}
              disabled={loading}
              className="bg-white"
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
              className="bg-white"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.code.toUpperCase()}>
                  {role.name}
                </option>
              ))}
            </Select>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Доступ к воркспейсам
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddWorkspace}
              disabled={loading || formData.workspaces.length >= allWorkspaces.length}
              className="h-7 py-0 gap-1.5 text-xs font-semibold"
            >
              <Plus className="h-3.5 w-3.5" /> Добавить воркспейс
            </Button>
          </div>

          {formData.workspaces.length === 0 ? (
            <div className="py-10 bg-zinc-50/50 border-2 border-dashed border-zinc-100 rounded-2xl text-center flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                <Plus className="h-5 w-5" />
              </div>
              <p className="text-xs text-zinc-400 font-medium tracking-tight">
                Нет назначенных воркспейсов
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {formData.workspaces.map((ws, index) => (
                <div
                  key={index}
                  className="flex items-end gap-3 bg-zinc-50/80 p-4 rounded-2xl border border-zinc-100 shadow-sm transition-all hover:shadow-md group"
                >
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
                          disabled={formData.workspaces.some(
                            (uws, i) => uws.id === w.id && i !== index,
                          )}
                        >
                          {w.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="w-36">
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
                    className="mb-0.5 h-10 w-10 p-0 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Modal>
  );
}
