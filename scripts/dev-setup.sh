#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Elbruso Development Environment${NC}"

# Kill existing dev processes
echo -e "${YELLOW}🧹 Cleaning up existing processes...${NC}"
pkill -f "turbo run dev" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true
pkill -f "nest start" 2>/dev/null || true
sleep 1
echo -e "${GREEN}✅ Processes cleaned${NC}"

# Clear build caches
echo -e "${YELLOW}🧹 Clearing build caches...${NC}"
rm -rf apps/app-web/.next 2>/dev/null || true
rm -rf apps/app-admin/.next 2>/dev/null || true
rm -rf .turbo 2>/dev/null || true
rm -rf apps/api-gateway/dist 2>/dev/null || true
echo -e "${GREEN}✅ Caches cleared${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

# Check if database containers are running
echo -e "${YELLOW}📦 Checking database containers...${NC}"

POSTGRES_CONTAINER=$(docker ps --filter "name=elbruso-postgres" --format "{{.Names}}")
REDIS_CONTAINER=$(docker ps --filter "name=elbruso-redis" --format "{{.Names}}")

if [ -z "$POSTGRES_CONTAINER" ]; then
    echo -e "${YELLOW}🔄 Starting PostgreSQL container...${NC}"
    docker start elbruso-postgres 2>/dev/null || {
        echo -e "${YELLOW}📦 Creating PostgreSQL container...${NC}"
        docker run -d \
            --name elbruso-postgres \
            -e POSTGRES_USER=elbruso \
            -e POSTGRES_PASSWORD=elbruso \
            -e POSTGRES_DB=elbruso \
            -p 7900:5432 \
            -v elbruso-postgres-data:/var/lib/postgresql/data \
            postgres:16-alpine
    }
    echo -e "${GREEN}✅ PostgreSQL started on port 7900${NC}"
else
    echo -e "${GREEN}✅ PostgreSQL already running${NC}"
fi

if [ -z "$REDIS_CONTAINER" ]; then
    echo -e "${YELLOW}🔄 Starting Redis container...${NC}"
    docker start elbruso-redis 2>/dev/null || {
        echo -e "${YELLOW}📦 Creating Redis container...${NC}"
        docker run -d \
            --name elbruso-redis \
            -p 7800:6379 \
            -v elbruso-redis-data:/data \
            redis:7-alpine
    }
    echo -e "${GREEN}✅ Redis started on port 7800${NC}"
else
    echo -e "${GREEN}✅ Redis already running${NC}"
fi

QDRANT_CONTAINER=$(docker ps --filter "name=elbruso-qdrant" --format "{{.Names}}")
if [ -z "$QDRANT_CONTAINER" ]; then
    echo -e "${YELLOW}🔄 Starting Qdrant container...${NC}"
    docker start elbruso-qdrant 2>/dev/null || {
        echo -e "${YELLOW}📦 Creating Qdrant container...${NC}"
        docker run -d \
            --name elbruso-qdrant \
            -p 7999:6333 \
            -p 7998:6334 \
            -v elbruso-qdrant-data:/qdrant/storage \
            qdrant/qdrant:latest
    }
    echo -e "${GREEN}✅ Qdrant started on ports 7999-7998${NC}"
else
    echo -e "${GREEN}✅ Qdrant already running${NC}"
fi

# Wait for databases to be ready
echo -e "${YELLOW}⏳ Waiting for databases to be ready...${NC}"
sleep 2

# Check database package
echo -e "${YELLOW}🔨 Building database package...${NC}"
(cd packages/database && npm run build) || {
    echo -e "${RED}❌ Failed to build database package. Trying to continue anyway...${NC}"
}
echo -e "${GREEN}✅ Database package build step finished${NC}"

# Check environment files
echo -e "${YELLOW}📝 Checking environment files...${NC}"

# Ensure directories exist
mkdir -p apps/api-gateway apps/app-web apps/app-admin

# Create API Gateway .env
if [ ! -f "apps/api-gateway/.env" ]; then
    echo -e "${YELLOW}📝 Creating API Gateway .env file...${NC}"
    cat > apps/api-gateway/.env << 'EOF'
# Database
DATABASE_URL=postgresql://elbruso:elbruso@localhost:7900/elbruso

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Admin JWT Configuration
ADMIN_JWT_SECRET=your-super-secret-admin-jwt-key
ADMIN_JWT_EXPIRES_IN=1h

# Server
PORT=7100
NODE_ENV=development
EOF
    echo -e "${GREEN}✅ API Gateway .env created${NC}"
else
    echo -e "${GREEN}✅ API Gateway .env exists${NC}"
fi

# Create App Web .env.local
if [ ! -f "apps/app-web/.env.local" ]; then
    echo -e "${YELLOW}📝 Creating App Web .env.local file...${NC}"
    cat > apps/app-web/.env.local << 'EOF'
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:7100
EOF
    echo -e "${GREEN}✅ App Web .env.local created${NC}"
else
    echo -e "${GREEN}✅ App Web .env.local exists${NC}"
fi

# Create App Admin .env.local
if [ ! -f "apps/app-admin/.env.local" ]; then
    echo -e "${YELLOW}📝 Creating App Admin .env.local file...${NC}"
    cat > apps/app-admin/.env.local << 'EOF'
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:7100
EOF
    echo -e "${GREEN}✅ App Admin .env.local created${NC}"
else
    echo -e "${GREEN}✅ App Admin .env.local exists${NC}"
fi

# Function to generate project tree documentation
generate_tree() {
    local target_dir=$1
    local output_file=$2
    local title=$3
    local depth=10
    local excludes='node_modules|.git|dist|.turbo'

    echo -e "${YELLOW}📂 Generating tree for $title...${NC}"
    mkdir -p "$(dirname "$output_file")"
    echo "# $title" > "$output_file"
    echo "" >> "$output_file"
    echo "Генерировано: $(date)" >> "$output_file"
    echo "" >> "$output_file"
    tree -L $depth --dirsfirst -I "$excludes" "$target_dir" >> "$output_file"
    echo -e "${GREEN}✅ Done! File: $output_file${NC}"
}

# Generate project trees
PROJECT_ROOT="/home/ivan/git/elbruso"
generate_tree "$PROJECT_ROOT" "$PROJECT_ROOT/docs/PROJECT_TREE.md" "Структура проекта"
generate_tree "$PROJECT_ROOT/apps/app-web" "$PROJECT_ROOT/apps/app-web/docs/PROJECT_TREE.md" "Структура проекта app-web"
generate_tree "$PROJECT_ROOT/apps/api-gateway" "$PROJECT_ROOT/apps/api-gateway/docs/PROJECT_TREE.md" "Структура проекта api-gateway"
generate_tree "$PROJECT_ROOT/apps/app-admin" "$PROJECT_ROOT/apps/app-admin/docs/PROJECT_TREE.md" "Структура проекта app-admin"
generate_tree "$PROJECT_ROOT/packages/shared" "$PROJECT_ROOT/packages/shared/docs/PROJECT_TREE.md" "Структура проекта shared"

# Print URLs
echo -e "${GREEN}📱 App Web: http://localhost:7200${NC}"
echo -e "${BLUE}📱 App Admin: http://localhost:7201${NC}"
echo -e "${YELLOW}🔌 API Gateway: http://localhost:7100${NC}"
echo -e "${CYAN}🗄️ PostgreSQL: postgresql://elbruso:elbruso@localhost:7900/elbruso${NC}"
echo -e "${MAGENTA}🔍 Qdrant: http://localhost:7999${NC}"
echo -e "${MAGENTA}⚡ Redis: http://localhost:7800${NC}"
echo -e "${GREEN}✨ Development environment ready!${NC}"
echo -e "${GREEN}🚀 Starting development servers...${NC}"
echo ""

# Start development servers
pnpm -w run dev:only
