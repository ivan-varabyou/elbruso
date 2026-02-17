import { LicenseCategoriesSmart } from "@frontend/modules/admin";

export default function LicenseCategoriesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Категории лицензий</h1>
        <p className="text-zinc-500">Управление категориями лицензий судей и персонала</p>
      </div>
      <LicenseCategoriesSmart />
    </div>
  );
}
