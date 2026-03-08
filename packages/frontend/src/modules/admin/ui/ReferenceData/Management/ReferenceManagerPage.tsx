"use client";

import { apiClient } from "@frontend/api/admin/client";
import { ApiResponse } from "@frontend/types/api-response";
import { ProfilePageLayout } from "@frontend/ui/layout/ProfilePageLayout/ProfilePageLayout";
import {
  Button,
  Card,
  CardBody,
  Chip,
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
  useDisclosure,
} from "@heroui/react";
import { BookOpen, Database, Settings2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DynamicTable {
  id: number;
  table_key: string;
  label: string;
  icon: string;
  category: string;
  type: string;
  columns: string | Record<string, unknown>[];
  created_at: string;
}

export function ReferenceManagerPage() {
  const router = useRouter();
  const [tables, setTables] = useState<DynamicTable[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);
  const [tableToDelete, setTableToDelete] = useState<string | null>(null);

  const fetchTables = async () => {
    setLoading(true);
    try {
      const resp = await apiClient.get<ApiResponse<DynamicTable[]>>("reference/management");
      setTables(resp.data.data || []);
    } catch (error) {
      console.error("Failed to fetch tables:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleDelete = async () => {
    if (!tableToDelete) return;
    setIsDeleting(true);
    try {
      await apiClient.delete(`reference/management/${tableToDelete}`);
      alert("Справочник удален");
      fetchTables();
      setTableToDelete(null);
    } catch (error) {
      alert("Ошибка при удалении");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ProfilePageLayout
      title="Управление справочниками"
      icon={Database}
      description="Создание и управление динамическими справочными данными"
      onAddClick={() => router.push("/reference/management/new")}
    >
      <div className="mt-4">
        <Card className="border-none shadow-sm bg-white/60 backdrop-blur-md">
          <CardBody className="p-0">
            <Table aria-label="Table of dynamic reference tables" removeWrapper shadow="none">
              <TableHeader>
                <TableColumn>НАЗВАНИЕ</TableColumn>
                <TableColumn>КЛЮЧ</TableColumn>
                <TableColumn>КАТЕГОРИЯ</TableColumn>
                <TableColumn>КОЛОНКИ</TableColumn>
                <TableColumn>ДАТА СОЗДАНИЯ</TableColumn>
                <TableColumn align="end">ДЕЙСТВИЯ</TableColumn>
              </TableHeader>
              <TableBody
                emptyContent={loading ? <Spinner size="lg" /> : "Нет динамических справочников"}
                loadingContent={<Spinner />}
                isLoading={loading}
              >
                {tables.map((table) => (
                  <TableRow key={table.table_key}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-zinc-100 text-zinc-600">
                          <Database className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-zinc-900">{table.label}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-zinc-50 px-1.5 py-0.5 rounded border border-zinc-100">
                        {table.table_key}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Chip
                          size="sm"
                          variant="flat"
                          color={table.type === "system" ? "warning" : "primary"}
                        >
                          {table.type === "system" ? "Системный" : "Пользовательский"}
                        </Chip>
                        <Chip size="sm" variant="flat" color="default">
                          {table.category}
                        </Chip>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-zinc-500 text-sm">
                        {
                          JSON.parse(
                            typeof table.columns === "string"
                              ? table.columns
                              : JSON.stringify(table.columns),
                          ).length
                        }{" "}
                        колонок
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-zinc-500 text-xs">
                        {(() => {
                          if (!table.created_at) return "—";
                          const d = new Date(table.created_at);
                          return d.getTime() < 1000000 ? "—" : d.toLocaleDateString("ru-RU");
                        })()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onPress={() =>
                            router.push(`/reference/management/edit/${table.table_key}`)
                          }
                        >
                          <Settings2 className="h-4 w-4 text-zinc-400" />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onPress={() => router.push(`/reference/data/${table.table_key}`)}
                        >
                          <BookOpen className="h-4 w-4 text-zinc-400" />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => {
                            setTableToDelete(table.table_key);
                            onOpen();
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Удаление справочника</ModalHeader>
                <ModalBody>
                  <p>
                    Вы уверены, что хотите удалить справочник{" "}
                    <span className="font-bold">{tableToDelete}</span>? Все данные в этой таблице
                    будут безвозвратно удалены.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Отмена
                  </Button>
                  <Button color="danger" isLoading={isDeleting} onPress={handleDelete}>
                    Удалить
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </ProfilePageLayout>
  );
}
