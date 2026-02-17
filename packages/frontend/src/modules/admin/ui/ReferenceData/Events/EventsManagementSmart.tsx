"use client";

import { Reference } from "@frontend/api";
import { CreateEventDto, EventResponseDto, UpdateEventDto } from "@frontend/api/data-contracts";
import { Spinner } from "@heroui/react";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { EventFormModal } from "./EventFormModal";
import { EventsFilters } from "./EventsFilters";
import { EventsList } from "./EventsList";

const referenceApi = new Reference();

export function EventsManagementSmart() {
  const [events, setEvents] = useState<EventResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventResponseDto | null>(null);
  const [filters, setFilters] = useState({
    sportId: undefined as number | undefined,
    search: "",
  });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await referenceApi.eventsControllerFindAll({
        sportId: filters.sportId,
      });
      setEvents(response.data.events);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filters.sportId]);

  const handleCreate = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (event: EventResponseDto) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить это событие?")) return;
    try {
      await referenceApi.eventsControllerDelete(id);
      fetchEvents();
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const handleSave = async (data: CreateEventDto | UpdateEventDto) => {
    try {
      if (editingEvent) {
        await referenceApi.eventsControllerUpdate(editingEvent.id, data);
      } else {
        await referenceApi.eventsControllerCreate(data);
      }
      setIsModalOpen(false);
      fetchEvents();
    } catch (error) {
      console.error("Failed to save event:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <EventsFilters 
          onFilterChange={(newFilters: { sportId?: number; search?: string }) => setFilters({ ...filters, ...newFilters })} 
          sportId={filters.sportId}
        />
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Добавить событие
        </button>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <EventsList 
          events={events} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      <EventFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingEvent}
      />
    </div>
  );
}
