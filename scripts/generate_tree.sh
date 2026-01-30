#!/bin/bash
echo "# Структура проекта" > /home/ivan/git/elbruso/docs/PROJECT_TREE.md
echo "" >> /home/ivan/git/elbruso/docs/PROJECT_TREE.md
echo "Генерировано: $(date)" >> /home/ivan/git/elbruso/docs/PROJECT_TREE.md
echo "" >> /home/ivan/git/elbruso/docs/PROJECT_TREE.md
tree -L 5 --dirsfirst -I 'node_modules|.git' /home/ivan/git/elbruso >> /home/ivan/git/elbruso/docs/PROJECT_TREE.md
echo "Готово! Файл: /home/ivan/git/elbruso/docs/PROJECT_TREE.md"

echo "# Структура проекта web" > /home/ivan/git/elbruso/apps/web/docs/PROJECT_TREE.md
echo "" >> /home/ivan/git/elbruso/apps/web/docs/PROJECT_TREE.md
echo "Генерировано: $(date)" >> /home/ivan/git/elbruso/apps/web/docs/PROJECT_TREE.md
echo "" >> /home/ivan/git/elbruso/apps/web/docs/PROJECT_TREE.md
tree -L 5 --dirsfirst -I 'node_modules|.git' /home/ivan/git/elbruso/apps/web >> /home/ivan/git/elbruso/apps/web/docs/PROJECT_TREE.md
echo "Готово! Файл: /home/ivan/git/elbruso/apps/web/docs/PROJECT_TREE.md"

echo "# Структура проекта api" > /home/ivan/git/elbruso/apps/api/docs/PROJECT_TREE.md
echo "" >> /home/ivan/git/elbruso/apps/api/docs/PROJECT_TREE.md
echo "Генерировано: $(date)" >> /home/ivan/git/elbruso/apps/api/docs/PROJECT_TREE.md
echo "" >> /home/ivan/git/elbruso/apps/api/docs/PROJECT_TREE.md
tree -L 5 --dirsfirst -I 'node_modules|.git' /home/ivan/git/elbruso/apps/api >> /home/ivan/git/elbruso/apps/api/docs/PROJECT_TREE.md
echo "Готово! Файл: /home/ivan/git/elbruso/apps/api/docs/PROJECT_TREE.md"

echo "# Структура проекта shared" > /home/ivan/git/elbruso/packages/shared/docs/PROJECT_TREE.md
echo "" >> /home/ivan/git/elbruso/packages/shared/docs/PROJECT_TREE.md
echo "Генерировано: $(date)" >> /home/ivan/git/elbruso/packages/shared/docs/PROJECT_TREE.md
echo "" >> /home/ivan/git/elbruso/packages/shared/docs/PROJECT_TREE.md
tree -L 5 --dirsfirst -I 'node_modules|.git' /home/ivan/git/elbruso/packages/shared >> /home/ivan/git/elbruso/packages/shared/docs/PROJECT_TREE.md
echo "Готово! Файл: /home/ivan/git/elbruso/packages/shared/docs/PROJECT_TREE.md"
