import type {
  LinkType,
  SystemEntityType,
} from './enums';

export interface TableLink {
  id: string;
  target_table_id: string;
  source_table_id?: string;
  source_system_entity?: SystemEntityType;
  link_type: LinkType;
  link_metadata: LinkMetadata;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LinkMetadata {
  filter?: Record<string, unknown>;
  mappings: FieldMapping[];
  sync_config?: SyncConfig;
}

export interface FieldMapping {
  sourceField: string;
  targetColIndex: number;
  transform?: string;
}

export interface SyncConfig {
  auto: boolean;
  interval?: number;
  onUpdate?: boolean;
}
