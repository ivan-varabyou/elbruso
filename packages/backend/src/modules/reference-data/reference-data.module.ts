import { Module } from '@nestjs/common';

import { RbacModule } from "../rbac/rbac.module";
import { ReferenceDataController } from './controllers/reference-data.controller';
import { ReferenceManagementController } from "./controllers/reference-management.controller";
import { ReferenceDataService } from './services/reference-data.service';
import { ReferenceManagementService } from "./services/reference-management.service";

@Module({
  imports: [RbacModule],
  controllers: [ReferenceDataController, ReferenceManagementController],
  providers: [ReferenceDataService, ReferenceManagementService],
  exports: [ReferenceDataService, ReferenceManagementService],
})
export class ReferenceDataModule {}
