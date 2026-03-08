import { 
  Button, 
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table, 
  TableBody, 
  TableCell, 
  TableColumn, 
  TableHeader, 
  TableRow, 
  Textarea,
  Tooltip,
  useDisclosure} from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { spreadsheetApi } from '../api/spreadsheet.api';
import { Spreadsheet, SpreadsheetStatus } from '../types/spreadsheet.types';

export const SpreadsheetsPage: React.FC = () => {
  const [spreadsheets, setSpreadsheets] = useState<Spreadsheet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get('workspace_id') || undefined;
  const groupId = searchParams.get('group_id') || undefined;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const fetchSpreadsheets = async () => {
    setIsLoading(true);
    try {
      const { items } = await spreadsheetApi.getSpreadsheets({
        workspace_id: workspaceId,
        group_id: groupId,
      });
      setSpreadsheets(items);
    } catch (err) {
      console.error('Failed to fetch spreadsheets', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSpreadsheets();
  }, [workspaceId, groupId]);

  const handleCreate = async () => {
    try {
      const created = await spreadsheetApi.createSpreadsheet({
        name: newTitle,
        description: newDescription,
      });
      router.push(`/spreadsheets/${created.id}`);
    } catch (err) {
      console.error('Failed to create spreadsheet', err);
    }
  };

  const deleteSpreadsheet = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот шаблон?')) {
      try {
        await spreadsheetApi.deleteSpreadsheet(id);
        fetchSpreadsheets();
      } catch (err) {
        console.error('Failed to delete spreadsheet', err);
      }
    }
  };

  const renderCell = (item: Spreadsheet, columnKey: React.Key) => {
    switch (columnKey) {
      case 'name':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{item.name}</p>
            <p className="text-bold text-tiny text-default-400">{item.description}</p>
          </div>
        );
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={
              item.status === SpreadsheetStatus.PUBLISHED ? 'success' : 
              item.status === SpreadsheetStatus.DRAFT ? 'warning' : 'default'
            }
            size="sm"
            variant="flat"
          >
            {item.status}
          </Chip>
        );
      case 'updated_at':
        return new Date(item.updated_at).toLocaleDateString();
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Редактировать">
              <span 
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => router.push(`/spreadsheets/${item.id}`)}
              >
                ✏️
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Удалить">
              <span 
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteSpreadsheet(item.id)}
              >
                🗑️
              </span>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {workspaceId ? 'Таблицы рабочей области' : 'Шаблоны отчетов'}
          </h1>
          <p className="text-default-500 text-sm">
            {workspaceId ? 'Управление таблицами и показателями в рамках проекта' : 'Управление шаблонами таблиц и дашбордов'}
          </p>
        </div>
        <Button color="primary" onPress={onOpen}>+ Создать шаблон</Button>
      </div>

      <Table aria-label="Список шаблонов">
        <TableHeader>
          <TableColumn key="name">НАЗВАНИЕ</TableColumn>
          <TableColumn key="status">СТАТУС</TableColumn>
          <TableColumn key="updated_at">ОБНОВЛЕНО</TableColumn>
          <TableColumn key="actions">ДЕЙСТВИЯ</TableColumn>
        </TableHeader>
        <TableBody 
          items={spreadsheets} 
          loadingContent={<Spinner />} 
          isLoading={isLoading}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Создание нового шаблона</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <Input 
                    label="Название" 
                    placeholder="Введите название шаблона" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <Textarea 
                    label="Описание" 
                    placeholder="Введите описание (опционально)" 
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>Отмена</Button>
                <Button color="primary" onPress={handleCreate}>Создать</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
