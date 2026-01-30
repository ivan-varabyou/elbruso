export interface TableLinkCreatedEvent {
  linkId: string;
  userId: string;
}

export interface TableDataChangedEvent {
  tableId: string;
  versionId: string;
  userId: string;
  changes: {
    type: 'cell' | 'row' | 'column' | 'formula';
    rowIndex?: number;
    colIndex?: number;
  }[];
}

export const TABLE_EVENTS = {
  LINK_CREATED: 'table.link.created',
  DATA_CHANGED: 'table.data.changed',
} as const;
