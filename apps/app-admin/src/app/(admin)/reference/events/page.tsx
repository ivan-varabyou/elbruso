import { EventsManagementSmart } from "@frontend/modules/admin";

export default function EventsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Справочник событий</h1>
        <p className="text-zinc-500">Управление спортивными событиями и турнирами</p>
      </div>
      <EventsManagementSmart />
    </div>
  );
}
