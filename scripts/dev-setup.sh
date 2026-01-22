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
rm -rf apps/web/.next 2>/dev/null || true
rm -rf .turbo 2>/dev/null || true
rm -rf apps/api/dist 2>/dev/null || true
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

# Wait for databases to be ready
echo -e "${YELLOW}⏳ Waiting for databases to be ready...${NC}"
sleep 2

# Check database package
echo -e "${YELLOW}🔨 Building database package...${NC}"
cd packages/database && npm run build && cd ../..
echo -e "${GREEN}✅ Database package built${NC}"

# Check environment files
echo -e "${YELLOW}📝 Checking environment files...${NC}"

if [ ! -f "apps/api/.env" ]; then
    echo -e "${YELLOW}📝 Creating API .env file...${NC}"
    cat > apps/api/.env << 'EOF'
# Database
DATABASE_URL=postgresql://elbruso:elbruso@localhost:7900/elbruso

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Server
PORT=3001
NODE_ENV=development
EOF
    echo -e "${GREEN}✅ API .env created${NC}"
else
    echo -e "${GREEN}✅ API .env exists${NC}"
fi

if [ ! -f "apps/web/.env.local" ]; then
    echo -e "${YELLOW}📝 Creating Web .env.local file...${NC}"
    cat > apps/web/.env.local << 'EOF'
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
EOF
    echo -e "${GREEN}✅ Web .env.local created${NC}"
else
    echo -e "${GREEN}✅ Web .env.local exists${NC}"
fi

echo -e "${GREEN}✨ Development environment ready!${NC}"
echo -e "${GREEN}🚀 Starting development servers...${NC}"
echo ""

# Start development servers
pnpm run dev:only
