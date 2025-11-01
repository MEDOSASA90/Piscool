// FIX: Removed circular dependency. This file defines TemplateId, it should not import it.
import type { jsPDF } from 'jspdf';

// Extend the global Window interface for type safety with external libraries
declare global {
  interface Window {
    html2canvas: (element: HTMLElement, options?: Partial<any>) => Promise<HTMLCanvasElement>;
    jspdf: {
      jsPDF: typeof jsPDF;
    };
  }
}

export enum TemplateId {
  Classic = 'classic',
  Modern = 'modern',
  Grid = 'grid',
  Official = 'official',
  Official2 = 'official2',
  Official3 = 'official3',
  Primary1 = 'primary1',
  Primary2 = 'primary2',
}

export interface FieldVisibility {
  weighbridgeName: boolean;
  companyName: boolean;
  ticketNo: boolean;
  vehicleNo: boolean;
  trailerNo: boolean;
  customerName: boolean;
  item: boolean;
  grossWeight: boolean;
  tareWeight: boolean;
  netWeight: boolean;
  entryDate: boolean;
  exitDate: boolean;
  driverName: boolean;
  vehicleType: boolean;
  notes: boolean;
  operatorName: boolean;
  price: boolean;
}

export interface TicketData {
  id: string;
  entityName: string; // Added to associate ticket with an entity
  ticketNo: string;
  weighbridgeName: string;
  companyName: string;
  vehicleNo: string;
  trailerNo: string;
  customerName: string;
  item: string;
  grossWeight: number;
  tareWeight: number;
  netWeight: number;
  entryDate: string;
  exitDate: string;
  template: TemplateId;
  fieldVisibility?: FieldVisibility;
  driverName: string;
  vehicleType: string;
  notes: string;
  operatorName: string;
  price: number;
}