import axios from 'axios';

import { 
  CellData, 
  Sheet, 
  Spreadsheet, 
  SpreadsheetStatus,
  SpreadsheetType 
} from '../types/spreadsheet.types';

// Assuming there's a base API config somewhere, but defining it here for now
const API_BASE = '/api/spreadsheets';

export const spreadsheetApi = {
  async getSpreadsheets(filters?: { 
    status?: SpreadsheetStatus; 
    organization_id?: number; 
    sport_id?: number;
    type?: SpreadsheetType;
    workspace_id?: string;
    group_id?: string;
    is_template?: boolean;
  }) {
    const response = await axios.get<{ items: Spreadsheet[]; total: number }>(API_BASE, { params: filters });
    return response.data;
  },

  async getSpreadsheet(id: string) {
    const response = await axios.get<Spreadsheet>(`${API_BASE}/${id}`);
    return response.data;
  },

  async createSpreadsheet(data: Partial<Spreadsheet>) {
    const response = await axios.post<Spreadsheet>(API_BASE, data);
    return response.data;
  },

  async updateSpreadsheet(id: string, data: Partial<Spreadsheet>) {
    const response = await axios.put<Spreadsheet>(`${API_BASE}/${id}`, data);
    return response.data;
  },

  async deleteSpreadsheet(id: string) {
    await axios.delete(`${API_BASE}/${id}`);
  },

  async addSheet(spreadsheetId: string, data: { name: string; sort_order?: number }) {
    const response = await axios.post<Sheet>(`${API_BASE}/${spreadsheetId}/sheets`, data);
    return response.data;
  },

  async updateSheet(spreadsheetId: string, sheetId: string, data: Partial<Sheet>) {
    const response = await axios.put<Sheet>(`${API_BASE}/${spreadsheetId}/sheets/${sheetId}`, data);
    return response.data;
  },

  async getCells(spreadsheetId: string, sheetId: string) {
    const response = await axios.get<CellData[]>(`${API_BASE}/${spreadsheetId}/sheets/${sheetId}/cells`);
    return response.data;
  },

  async batchUpdateCells(spreadsheetId: string, sheetId: string, updates: Array<{ row_index: number; col_index: number; data: Partial<CellData> }>) {
    const response = await axios.put(`${API_BASE}/${spreadsheetId}/sheets/${sheetId}/cells/batch`, updates);
    return response.data;
  },
};
