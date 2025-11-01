import { TicketData, TemplateId, FieldVisibility } from './types';

export const DEFAULT_VISIBILITY: FieldVisibility = {
  weighbridgeName: true,
  companyName: true,
  ticketNo: true,
  vehicleNo: true,
  trailerNo: true,
  customerName: true,
  item: true,
  grossWeight: true,
  tareWeight: true,
  netWeight: true,
  entryDate: true,
  exitDate: true,
  driverName: true,
  vehicleType: true,
  notes: true,
  operatorName: true,
  price: true,
};


export const DEFAULT_TICKET_DATA: Omit<TicketData, 'id'> = {
  entityName: '',
  ticketNo: '14075',
  weighbridgeName: 'ميزان بسكول الاسلامية',
  companyName: 'الشرايبه ترعه الجلاد 01023122530',
  vehicleNo: '2435',
  trailerNo: '',
  customerName: '',
  item: '',
  grossWeight: 4860,
  tareWeight: 3860,
  netWeight: 1000,
  entryDate: '2025-10-05T10:29:00',
  exitDate: '2025-10-31T21:14:00',
  template: TemplateId.Official3,
  fieldVisibility: DEFAULT_VISIBILITY,
  driverName: '',
  vehicleType: '١/٢ نقل',
  notes: 'ملاحظات',
  operatorName: 'موظف الميزان',
  price: 35,
};

export const TEMPLATES = [
  { id: TemplateId.Official, name: 'صورة رسمية' },
  { id: TemplateId.Official2, name: 'صورة رسمية 2' },
  { id: TemplateId.Official3, name: 'صورة رسمية 3' },
  { id: TemplateId.Primary1, name: 'أساسي ١' },
  { id: TemplateId.Primary2, name: 'أساسي ٢' },
  { id: TemplateId.Modern, name: 'تصميم حديث' },
  { id: TemplateId.Classic, name: 'تصميم كلاسيكي' },
  { id: TemplateId.Grid, name: 'تصميم شبكي' },
];