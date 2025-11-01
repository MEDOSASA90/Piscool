import React from 'react';
import { TicketData } from '../../types';

interface TemplateProps {
  data: TicketData;
}

const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { fieldVisibility: vis } = data;
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('ar-EG', {
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    }).replace('،', ' ');
  };

  const formatNumber = (num: number) => {
    try {
        return new Intl.NumberFormat('ar-EG-u-nu-arab', {useGrouping: true}).format(num);
    } catch(e) {
        return String(num);
    }
  }

  const Row: React.FC<{ label: string; value: string | number; }> = ({ label, value }) => (
    <div className="flex justify-between items-end border-b border-dotted border-slate-400 py-2">
      <span className="font-semibold text-slate-700">{label}</span>
      <span className="text-slate-900">{String(value)}</span>
    </div>
  );

  return (
    <div className="bg-white p-6 shadow-xl max-w-3xl mx-auto border-2 border-slate-800 text-slate-900">
      <header className="text-center mb-4">
        <h1 className="text-xl font-bold">{vis?.weighbridgeName ? data.weighbridgeName : '\u00A0'}</h1>
        <p className="text-xs">{vis?.companyName ? data.companyName : '\u00A0'}</p>
      </header>
      
      <div className="space-y-1 text-xs pt-4">
        <Row label="رقم التذكرة" value={vis?.ticketNo ? data.ticketNo : ''} />
        <Row label="العميل" value={vis?.customerName ? data.customerName : ''} />
        <Row label="رقم السيارة" value={vis?.vehicleNo ? data.vehicleNo : ''} />
        <Row label="رقم المقطورة" value={vis?.trailerNo ? data.trailerNo : ''} />
        <Row label="الصنف" value={vis?.item ? data.item : ''} />
        <Row label="وقت الدخول" value={vis?.entryDate ? formatDateTime(data.entryDate) : ''} />
        <Row label="وقت الخروج" value={vis?.exitDate ? formatDateTime(data.exitDate) : ''} />
      </div>

      <div className="mt-6 border-2 border-slate-800 p-2">
        <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-1">
                <p className="text-[10px] uppercase">الوزن الفارغ</p>
                <p className="font-bold text-base">{vis?.tareWeight ? formatNumber(data.tareWeight) : '\u00A0'}</p>
            </div>
            <div className="p-1 border-x border-slate-400">
                <p className="text-[10px] uppercase">الوزن الإجمالي</p>
                <p className="font-bold text-base">{vis?.grossWeight ? formatNumber(data.grossWeight) : '\u00A0'}</p>
            </div>
            <div className="p-1 bg-slate-200">
                <p className="text-[10px] uppercase">الوزن الصافي</p>
                <p className="font-bold text-base">{vis?.netWeight ? formatNumber(data.netWeight) : '\u00A0'}</p>
            </div>
        </div>
      </div>
        <div className="text-center mt-2">
            <span className="font-semibold text-lg">{vis?.netWeight ? formatNumber(data.netWeight) : '\u00A0'}</span> كجم
        </div>

      <footer className="mt-8 text-center text-[10px] text-slate-500">
        <p>توقيع السائق: ____________________</p>
        <p className="mt-4">توقيع مسؤول الميزان: ____________________</p>
      </footer>
    </div>
  );
};

export default ClassicTemplate;