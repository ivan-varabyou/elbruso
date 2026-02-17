"use client";

import { CreateLicenseCategoryDto, LicenseCategoryResponseDto, UpdateLicenseCategoryDto } from "@frontend/api/data-contracts";
import { Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@heroui/react";
import { useEffect, useState } from "react";

interface LicenseCategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateLicenseCategoryDto | UpdateLicenseCategoryDto) => void;
  initialData: LicenseCategoryResponseDto | null;
}

export function LicenseCategoryFormModal({ isOpen, onClose, onSave, initialData }: LicenseCategoryFormModalProps) {
  const [formData, setFormData] = useState<Partial<LicenseCategoryResponseDto>>({
    name_ru: "",
    code: "",
    short_name_ru: "",
    sport_id: undefined,
    level: 1,
    personnel_type: "referee",
    is_active: true,
    description: "",
    requirements: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name_ru: initialData.name_ru,
        code: initialData.code,
        short_name_ru: initialData.short_name_ru || "",
        sport_id: initialData.sport_id,
        level: initialData.level,
        personnel_type: initialData.personnel_type,
        is_active: initialData.is_active,
        description: initialData.description || "",
        requirements: initialData.requirements || "",
      });
    } else {
      setFormData({
        name_ru: "",
        code: "",
        short_name_ru: "",
        sport_id: undefined,
        level: 1,
        personnel_type: "referee",
        is_active: true,
        description: "",
        requirements: "",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>{initialData ? "Редактировать категорию" : "Добавить категорию"}</ModalHeader>
        <ModalBody className="gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Название (RU)"
              value={formData.name_ru}
              onChange={(e) => setFormData({ ...formData, name_ru: e.target.value })}
              placeholder="Напр. Всероссийская категория"
              variant="bordered"
            />
            <Input
              label="Технический код"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="Напр. ALL_RUS"
              variant="bordered"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Краткое название"
              value={formData.short_name_ru}
              onChange={(e) => setFormData({ ...formData, short_name_ru: e.target.value })}
              placeholder="Напр. ВК"
              variant="bordered"
            />
             <Select
              label="Тип персонала"
              selectedKeys={[formData.personnel_type]}
              onSelectionChange={(keys) => setFormData({ ...formData, personnel_type: Array.from(keys)[0] })}
              variant="bordered"
            >
              <SelectItem key="referee" textValue="Судья">Судья</SelectItem>
              <SelectItem key="personnel" textValue="Персонал">Персонал</SelectItem>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <Input
                label="Sport ID"
                type="number"
                value={formData.sport_id || ""}
                onChange={(e) => setFormData({ ...formData, sport_id: e.target.value ? Number(e.target.value) : undefined })}
                variant="bordered"
             />
             <Input
                label="Уровень (цифра)"
                type="number"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                variant="bordered"
             />
          </div>

          <Textarea
            label="Требования"
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            placeholder="Опишите требования для получения данной категории..."
            variant="bordered"
          />

          <div className="flex items-center">
            <Checkbox
              isSelected={formData.is_active}
              onValueChange={(val) => setFormData({ ...formData, is_active: val })}
            >
              Активна
            </Checkbox>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose}>Отмена</Button>
          <Button color="primary" onPress={handleSubmit}>Сохранить</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
