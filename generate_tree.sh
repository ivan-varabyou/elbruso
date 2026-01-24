#!/bin/bash
echo "# Структура проекта" > /home/ivan/git/elbruso/project_tree.md
echo "" >> /home/ivan/git/elbruso/project_tree.md
echo "Генерировано: $(date)" >> /home/ivan/git/elbruso/project_tree.md
echo "" >> /home/ivan/git/elbruso/project_tree.md
tree -L 5 --dirsfirst -I 'node_modules|.git' /home/ivan/git/elbruso >> /home/ivan/git/elbruso/project_tree.md
echo "Готово! Файл: /home/ivan/git/elbruso/project_tree.md"
