"use client";

import { Reference } from "@frontend/api";
import { CreateEventDto, EventResponseDto, UpdateEventDto } from "@frontend/api/data-contracts";
import { Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@heroui/react";
import { useEffect, useState } from "react";

const referenceApi = new Reference();

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateEventDto | UpdateEventDto) => void;
  initialData: EventResponseDto | null;
}

export function EventFormModal({ isOpen, onClose, onSave, initialData }: EventFormModalProps) {
  const [formData, setFormData] = useState<Partial<CreateEventDto & UpdateEventDto>>({
    name_ru: "",
    code: "",
    short_name_ru: "",
    sport_id: undefined,
    event_type_id: undefined,
    level_id: undefined,
    is_active: true,
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name_ru: initialData.name_ru,
        code: initialData.code,
        short_name_ru: initialData.short_name_ru || "",
        event_type_id: initialData.event_type_id ?? undefined,
        level_id: initialData.level_id ?? undefined,
        is_active: initialData.is_active,
        description: initialData.description || "",
      });
    } else {
      setFormData({
        name_ru: "",
        code: "",
        short_name_ru: "",
        sport_id: undefined,
        event_type_id: undefined,
        level_id: undefined,
        is_active: true,
        description: "",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    onSave(formData as any);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>{initialData ? "Редактировать событие" : "Добавить событие"}</ModalHeader>
        <ModalBody className="gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Название (RU)"
              value={formData.name_ru}
              onChange={(e) => setFormData({ ...formData, name_ru: e.target.value })}
              placeholder="Напр. Чемпионат России"
              variant="bordered"
            />
            <Input
              label="Технический код"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="Напр. BBL_CHAMP"
              variant="bordered"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Краткое название"
              value={formData.short_name_ru}
              onChange={(e) => setFormData({ ...formData, short_name_ru: e.target.value })}
              placeholder="Напр. ЧР"
              variant="bordered"
            />
            <div className="flex items-end pb-2">
              <Checkbox
                isSelected={formData.is_active}
                onValueChange={(val) => setFormData({ ...formData, is_active: val })}
              >
                Активно
              </Checkbox>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
             {/* Simple inputs for now, could be dynamic selects later */}
            <Input
              label="Sport ID"
              type="number"
              value={formData.sport_id?.toString() || ""}
              onChange={(e) => setFormData({ ...formData, sport_id: e.target.value ? Number(e.target.value) : undefined })}
              variant="bordered"
            />
            <Input
              label="Type ID"
              type="number"
              value={formData.event_type_id?.toString() || ""}
              onChange={(e) => setFormData({ ...formData, event_type_id: e.target.value ? Number(e.target.value) : undefined })}
              variant="bordered"
            />
            <Input
              label="Level ID"
              type="number"
              value={formData.level_id?.toString() || ""}
              onChange={(e) => setFormData({ ...formData, level_id: e.target.value ? Number(e.target.value) : undefined })}
              variant="bordered"
            />
          </div>

          <Textarea
            label="Описание"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Дополнительная информация о событии..."
            variant="bordered"
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose}>Отмена</Button>
          <Button color="primary" onPress={handleSubmit}>Сохранить</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
