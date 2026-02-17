import {
  Award,
  BookOpen,
  Building,
  Building2,
  Calendar,
  ClipboardList,
  Coins,
  Database,
  Dumbbell,
  Flag,
  Globe,
  Layers,
  LayoutDashboard,
  Map,
  MapPin,
  Medal,
  Ruler,
  Settings,
  Shield,
  Tag,
  TrendingUp,
  Trophy,
  UserCircle,
  Users,
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
  { href: "/indicators", icon: TrendingUp, label: "Индикаторы" },
  {
    href: "#reference",
    icon: BookOpen,
    label: "Справочники",
    children: [
      {
        href: "/reference/management",
        icon: Settings,
        label: "Управление справочниками",
      },
      {
        href: "#sub-geo",
        icon: Globe,
        label: "ГЕО",
        children: [
          { href: "/reference/data/countries", icon: Globe, label: "Страны" },
          { href: "/reference/data/regions", icon: Map, label: "Регионы" },
          { href: "/reference/data/federal_districts", icon: Flag, label: "Федеральные округа" },
          { href: "/reference/data/region_types", icon: MapPin, label: "Типы регионов" },
          { href: "/reference/data/languages", icon: Globe, label: "Языки" },
        ],
      },
      {
        href: "#sub-sport",
        icon: Dumbbell,
        label: "Спорт",
        children: [
          { href: "/reference/data/sports", icon: Dumbbell, label: "Виды спорта" },
          { href: "/reference/data/disciplines", icon: Trophy, label: "Дисциплины" },
          { href: "/reference/data/seasons", icon: Calendar, label: "Сезоны" },
          { href: "/reference/data/sport_types", icon: Layers, label: "Типы спорта" },
          {
            href: "/reference/data/olympic_categories",
            icon: Award,
            label: "Олимпийские категории",
          },
          { href: "/reference/data/sports_ranks", icon: Medal, label: "Разряды и звания" },
          {
            href: "/reference/license-categories",
            icon: Shield,
            label: "Категории спец. лицензий",
          },
          {
            href: "/reference/data/referee_license_categories",
            icon: Shield,
            label: "Категории лицензий",
          },
        ],
      },
      {
        href: "#sub-orgs",
        icon: Building2,
        label: "Организации",
        children: [
          { href: "/reference/data/organizations", icon: Building2, label: "Организации" },
          {
            href: "/reference/data/organization_levels",
            icon: Layers,
            label: "Уровни организаций",
          },
          {
            href: "/reference/data/organization_types",
            icon: Building2,
            label: "Типы организаций",
          },
        ],
      },
      {
        href: "#sub-events",
        icon: Calendar,
        label: "Мероприятия",
        children: [
          { href: "/reference/data/events", icon: Calendar, label: "События" },
          { href: "/reference/data/event_types", icon: Tag, label: "Типы событий" },
          { href: "/reference/data/event_levels", icon: Layers, label: "Уровни событий" },
          { href: "/reference/data/event_stages", icon: Layers, label: "Этапы событий" },
          {
            href: "/reference/data/competition_categories",
            icon: Award,
            label: "Категории соревнований",
          },
        ],
      },
      {
        href: "#sub-indicators",
        icon: TrendingUp,
        label: "Индикаторы",
        children: [
          {
            href: "/reference/data/indicator_categories",
            icon: Tag,
            label: "Категории индикаторов",
          },
          { href: "/reference/data/measurement_units", icon: Ruler, label: "Единицы измерения" },
        ],
      },
      {
        href: "#sub-stats",
        icon: Database,
        label: "Статистика и данные",
        children: [
          { href: "/reference/data/region_population", icon: Users, label: "Население регионов" },
          { href: "/reference/data/region_economics", icon: Coins, label: "Экономика регионов" },
          {
            href: "/reference/data/data_source_categories",
            icon: Database,
            label: "Категории источников",
          },
          { href: "/reference/data/data_sources", icon: Database, label: "Источники данных" },
        ],
      },
      {
        href: "#sub-general",
        icon: Settings,
        label: "Основные",
        children: [
          { href: "/reference/data/genders", icon: UserCircle, label: "Пол" },
          { href: "/reference/data/age_groups", icon: Users, label: "Возрастные группы" },
          {
            href: "/reference/data/training_program_types",
            icon: ClipboardList,
            label: "Программы подготовки",
          },
          { href: "/reference/data/sports_venues", icon: Building2, label: "Спортивные объекты" },
          { href: "/reference/data/venue_types", icon: Layers, label: "Типы объектов" },
        ],
      },
    ],
  },
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
