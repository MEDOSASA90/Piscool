import React from 'react';
import { TicketData } from '../../types';

interface TemplateProps {
  data: TicketData;
}

const GridTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { fieldVisibility: vis } = data;
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('ar-EG', {
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    }).replace(/,|،/g, ' ');
  };

  const InfoBlock: React.FC<{ label: string; value: string | number; className?: string }> = ({ label, value, className }) => (
    <div className={`border border-slate-300 p-2 bg-white ${className}`}>
      <p className="text-[10px] text-slate-500">{label}</p>
      <p className="font-semibold text-slate-800 break-words text-xs">{String(value)}</p>
    </div>
  );

  const WeightBlock: React.FC<{ label: string; value: number; isVisible: boolean; className?: string }> = ({ label, value, isVisible, className }) => (
    <div className={`border border-slate-300 p-3 text-center bg-white ${className}`}>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-xl font-bold text-slate-800">{isVisible ? value.toLocaleString() : '\u00A0'}</p>
      <p className="text-[10px] text-slate-400">كجم</p>
    </div>
  );

  return (
    <div className="bg-white p-4 shadow-xl max-w-3xl mx-auto border border-slate-300">
      <div className="grid grid-cols-3 gap-px bg-slate-300">
        <div className="col-span-2 bg-white p-3">
          <h1 className="text-xl font-bold text-slate-800">{vis?.weighbridgeName ? data.weighbridgeName : '\u00A0'}</h1>
          <p className="text-xs text-slate-500">{vis?.companyName ? data.companyName : '\u00A0'}</p>
        </div>
        <InfoBlock label="رقم السند" value={vis?.ticketNo ? data.ticketNo : ''} className="text-center" />
      </div>

      <div className="grid grid-cols-2 gap-px bg-slate-300 mt-px">
        <InfoBlock label="العميل / المورد" value={vis?.customerName ? data.customerName : ''} />
        <InfoBlock label="الصنف / نوع البضاعة" value={vis?.item ? data.item : ''} />
        <InfoBlock label="رقم السيارة" value={vis?.vehicleNo ? data.vehicleNo : ''} />
        <InfoBlock label="رقم المقطورة" value={vis?.trailerNo ? data.trailerNo : ''} />
        <InfoBlock label="تاريخ / وقت الدخول" value={vis?.entryDate ? formatDateTime(data.entryDate) : ''} />
        <InfoBlock label="تاريخ / وقت الخروج" value={vis?.exitDate ? formatDateTime(data.exitDate) : ''} />
      </div>

      <div className="grid grid-cols-3 gap-px bg-slate-300 mt-px">
        <WeightBlock label="الوزن الفارغ" value={data.tareWeight} isVisible={vis?.tareWeight ?? true} />
        <WeightBlock label="الوزن الإجمالي" value={data.grossWeight} isVisible={vis?.grossWeight ?? true} />
        <WeightBlock label="الوزن الصافي" value={data.netWeight} isVisible={vis?.netWeight ?? true} className={vis?.netWeight ? 'bg-yellow-50 font-black' : 'bg-white'} />
      </div>
    </div>
  );
};

export default GridTemplate;