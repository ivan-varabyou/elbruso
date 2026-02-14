import {
  LayoutDashboard,
  Building,
  Building2,
  Calendar,
  TrendingUp,
  Users,
  Shield,
  Settings,
} from "lucide-react";

export interface MenuItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children?: MenuItem[];
}

export const adminMenu: MenuItem[] = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/workspaces", icon: Building, label: "Рабочие области" },
  { href: "/organizations", icon: Building2, label: "Организации" },
  { href: "/seasons", icon: Calendar, label: "Сезоны" },
  { href: "/indicators", icon: TrendingUp, label: "Индикаторы" },
  { href: "/users", icon: Users, label: "Пользователи" },
  { href: "/users/roles", icon: Shield, label: "Роли пользователей" },
  { href: "/admins", icon: Users, label: "Администраторы" },
  { href: "/admins/roles", icon: Shield, label: "Роли админов" },
  { href: "/settings", icon: Settings, label: "Настройки" },
];

export function getUserMenu(): MenuItem[] {
  return [
    { href: "/users", icon: Users, label: "Пользователи" },
    { href: "/users/roles", icon: Shield, label: "Роли пользователей" },
  ];
}

export function getAdminMenu(): MenuItem[] {
  return [
    { href: "/admins", icon: Users, label: "Администраторы" },
    { href: "/admins/roles", icon: Shield, label: "Роли админов" },
  ];
}
