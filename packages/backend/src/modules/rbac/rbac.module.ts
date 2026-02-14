import { Module } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import { RbacService } from "./services/rbac.service";
import { RbacDiscoveryService } from "./services/rbac-discovery.service";
import { RbacController } from "./controllers/rbac.controller";
import { RbacGuard } from "./guards/rbac.guard";

@Module({
  imports: [DiscoveryModule],
  controllers: [RbacController],
  providers: [RbacService, RbacDiscoveryService, RbacGuard],
  exports: [RbacService, RbacGuard],
})
export class RbacModule {}

// Re-export DTOs
export * from "./dto/rbac.dto";
