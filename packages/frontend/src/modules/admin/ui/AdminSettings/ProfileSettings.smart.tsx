import { useEffect, useState } from "react";

import {
  Key,
  Lock,
  Mail,
  Plus,
  Save,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  User,
  Users,
} from "lucide-react";

import { cn } from "@frontend/lib";
import { Button, Input } from "@frontend/ui/primitives";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@frontend/ui/primitives";
import { useAdminAuth } from "@frontend/modules/admin/auth";
import { useAdminSettingsStore } from "@frontend/stores/useAdminSettings.store";
import { AdminRole } from "@frontend/types/enums";
import { CreateAdminData, CreateAdminModal } from "./CreateAdminModal.dump";

type TabType = "profile" | "security" | "admins" | "roles";

export function ProfileSettings() {
  const { user: profile } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const tabs = [
    { id: "profile", label: "Профиль", icon: User },
    { id: "security", label: "Безопасность", icon: Key },
    ...(profile?.role === AdminRole.SUPER_ADMIN
      ? [
          { id: "admins" as const, label: "Администраторы", icon: Users },
          { id: "roles" as const, label: "Роли", icon: Shield },
        ]
      : []),
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
                onClick={() => setActiveTab(tab.id)}
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
        {activeTab === "admins" && <AdminsTab />}
        {activeTab === "roles" && <RolesTab />}
      </div>
    </div>
  );
}

function ProfileTab() {
  const { user: profile, updateProfile } = useAdminAuth();
  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await updateProfile({ name, email });
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

function AdminsTab() {
  const { user: profile } = useAdminAuth();
  const { users, deleteUser, isLoading, fetchUsers, createUser } = useAdminSettingsStore();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этого администратора?")) {
      return;
    }

    try {
      await deleteUser(id);
      setMessage({ type: "success", text: "Администратор успешно удален" });
      await fetchUsers();
    } catch (error) {
      console.error("Delete admin error:", error);
      setMessage({ type: "error", text: "Ошибка при удалении администратора" });
    }
  };

  const handleCreateAdmin = async (data: CreateAdminData) => {
    try {
      await createUser(data);
      setMessage({ type: "success", text: "Администратор успешно создан" });
      await fetchUsers();
    } catch (error: unknown) {
      console.error("Create admin error:", error);
      throw error;
    }
  };

  const getRoleIcon = (role: AdminRole) => {
    switch (role) {
      case AdminRole.SUPER_ADMIN:
        return <ShieldCheck className="h-4 w-4 text-purple-600" />;
      case AdminRole.ADMIN:
        return <ShieldAlert className="h-4 w-4 text-blue-600" />;
      case AdminRole.MODERATOR:
        return <Shield className="h-4 w-4 text-green-600" />;
      default:
        return <Shield className="h-4 w-4 text-zinc-400" />;
    }
  };

  const getRoleBadgeColor = (role: AdminRole) => {
    switch (role) {
      case AdminRole.SUPER_ADMIN:
        return "bg-purple-100 text-purple-700 border-purple-200";
      case AdminRole.ADMIN:
        return "bg-blue-100 text-blue-700 border-blue-200";
      case AdminRole.MODERATOR:
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-zinc-100 text-zinc-700 border-zinc-200";
    }
  };

  return (
    <>
      <div className="rounded-lg border border-zinc-100 bg-white p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-zinc-900">Администраторы системы</h2>
          <Button variant="solid" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Добавить администратора
          </Button>
        </div>

        {message && (
          <div
            className={`p-3 rounded-md text-sm mb-4 ${
              message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12 text-zinc-500">
            <div className="animate-spin h-8 w-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full mx-auto mb-3" />
            <p className="text-sm">Загрузка...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            <Users className="h-12 w-12 mx-auto mb-3 text-zinc-300" />
            <p className="text-sm">Нет администраторов</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableColumn>Администратор</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Роль</TableColumn>
              <TableColumn className="text-right">Действия</TableColumn>
            </TableHeader>
            <TableBody>
              {users.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100">
                        <User className="h-5 w-5 text-zinc-600" />
                      </div>
                      <span className="font-medium text-zinc-900">{admin.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-zinc-600">
                      <Mail className="h-4 w-4 text-zinc-400" />
                      {admin.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
                        getRoleBadgeColor(admin.role),
                      )}
                    >
                      {getRoleIcon(admin.role)}
                      <span className="uppercase tracking-wide">
                        {admin.role === AdminRole.SUPER_ADMIN
                          ? "Super Admin"
                          : admin.role === AdminRole.ADMIN
                            ? "Admin"
                            : "Moderator"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(admin.id)}
                      disabled={admin.id === profile?.id}
                    >
                      <Trash2 className="h-4 w-4" />
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <CreateAdminModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateAdmin}
      />
    </>
  );
}

function RolesTab() {
  const roles = [
    {
      name: "Super Admin",
      role: AdminRole.SUPER_ADMIN,
      icon: <ShieldCheck className="h-6 w-6 text-purple-600" />,
      color: "bg-purple-100 text-purple-700 border-purple-200",
      description: "Полный доступ ко всем функциям системы",
      permissions: [
        "Управление всеми администраторами",
        "Создание и удаление администраторов",
        "Изменение ролей пользователей",
        "Доступ ко всем настройкам системы",
        "Управление шаблонами рабочих пространств",
        "Полный доступ к аудиту и логам",
      ],
    },
    {
      name: "Admin",
      role: AdminRole.ADMIN,
      icon: <ShieldAlert className="h-6 w-6 text-blue-600" />,
      color: "bg-blue-100 text-blue-700 border-blue-200",
      description: "Расширенный доступ к управлению системой",
      permissions: [
        "Управление пользователями",
        "Создание и редактирование контента",
        "Доступ к аналитике и отчетам",
        "Управление рабочими пространствами",
        "Модерация контента",
        "Просмотр логов системы",
      ],
    },
    {
      name: "Moderator",
      role: AdminRole.MODERATOR,
      icon: <Shield className="h-6 w-6 text-green-600" />,
      color: "bg-green-100 text-green-700 border-green-200",
      description: "Базовый доступ к модерации контента",
      permissions: [
        "Модерация пользовательского контента",
        "Просмотр пользователей",
        "Базовая аналитика",
        "Управление своим профилем",
        "Просмотр рабочих пространств",
      ],
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 mb-2">Роли администраторов</h2>
        <p className="text-sm text-zinc-600">
          В системе существует три уровня доступа для администраторов. Каждая роль имеет свой набор
          разрешений и возможностей.
        </p>
      </div>

      <div className="space-y-4">
        {roles.map((roleInfo) => (
          <div
            key={roleInfo.role}
            className="rounded-lg border border-zinc-100 bg-white p-6 hover:border-zinc-200 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center">
                {roleInfo.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-zinc-900">{roleInfo.name}</h3>
                  <div
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
                      roleInfo.color,
                    )}
                  >
                    <span className="uppercase tracking-wide">{roleInfo.role}</span>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 mb-4">{roleInfo.description}</p>

                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">
                    Разрешения
                  </h4>
                  <ul className="space-y-2">
                    {roleInfo.permissions.map((permission, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-zinc-700">
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5" />
                        <span>{permission}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Важная информация</h4>
            <p className="text-sm text-blue-700">
              Только пользователи с ролью <strong>Super Admin</strong> могут управлять другими
              администраторами и изменять роли. Будьте внимательны при назначении этой роли.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
