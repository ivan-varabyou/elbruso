'use client';

import { SpreadsheetEditor } from '@frontend/modules/spreadsheet';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  
  return <SpreadsheetEditor spreadsheetId={id} />;
}
