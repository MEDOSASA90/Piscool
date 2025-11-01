import React from 'react';
import { TicketData } from '../../types';

interface TemplateProps {
  data: TicketData;
}

const DetailRow: React.FC<{ label: string; value: string | number; }> = ({ label, value }) => (
    <div className="flex justify-between items-baseline py-2.5 border-b border-dotted border-gray-400">
        <span className="font-bold text-slate-800 text-base">{label}</span>
        <span className="text-left text-base">{String(value)}</span>
    </div>
);

const OfficialTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { fieldVisibility: vis } = data;
    const formatDateTime = (dateString: string) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            const time = new Intl.DateTimeFormat('ar-EG-u-nu-arab', {
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
            }).format(date);
            const day = new Intl.DateTimeFormat('ar-EG-u-nu-arab', { day: '2-digit' }).format(date);
            const month = new Intl.DateTimeFormat('ar-EG-u-nu-arab', { month: '2-digit' }).format(date);
            const year = new Intl.DateTimeFormat('ar-EG-u-nu-arab', { year: 'numeric' }).format(date);
            return `${year}/${month}/${day} ${time}`;
        } catch (e) {
            console.error("Date formatting failed", e);
            return dateString;
        }
    };
    
    const formatNumber = (num: number) => {
        try {
            return new Intl.NumberFormat('ar-EG-u-nu-arab', {useGrouping: true}).format(num);
        } catch(e) {
            return String(num);
        }
    }

    return (
        <div className="bg-white p-8 shadow-lg max-w-3xl mx-auto" style={{ color: '#0f172a' }}>
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold">{vis?.weighbridgeName ? data.weighbridgeName : '\u00A0'}</h1>
                <p className="text-sm text-slate-600 mt-1">{vis?.companyName ? data.companyName : '\u00A0'}</p>
            </header>

            <section className="space-y-2 mb-8">
                <DetailRow label="رقم التذكرة" value={vis?.ticketNo ? data.ticketNo : ''} />
                <DetailRow label="العميل" value={vis?.customerName ? data.customerName : ''} />
                <DetailRow label="رقم السيارة" value={vis?.vehicleNo ? data.vehicleNo : ''} />
                <DetailRow label="رقم المقطورة" value={vis?.trailerNo ? data.trailerNo : ''} />
                <DetailRow label="الصنف" value={vis?.item ? data.item : ''} />
                <DetailRow label="وقت الدخول" value={vis?.entryDate ? formatDateTime(data.entryDate) : ''} />
                <DetailRow label="وقت الخروج" value={vis?.exitDate ? formatDateTime(data.exitDate) : ''} />
            </section>
            
            <section className="border-2 border-slate-700 p-1">
                <div className="grid grid-cols-3 text-center">
                    <div className="p-2">
                        <h3 className="text-sm font-bold">الوزن الفارغ</h3>
                        <p className="font-mono text-2xl font-bold mt-2">{vis?.tareWeight ? formatNumber(data.tareWeight) : '\u00A0'}</p>
                    </div>
                    <div className="p-2 border-x-2 border-slate-700">
                        <h3 className="text-sm font-bold">الوزن الإجمالي</h3>
                        <p className="font-mono text-2xl font-bold mt-2">{vis?.grossWeight ? formatNumber(data.grossWeight) : '\u00A0'}</p>
                    </div>
                    <div className={vis?.netWeight ? "p-2 bg-slate-100" : "p-2"}>
                        <h3 className="text-sm font-bold">الوزن الصافي</h3>
                        <p className="font-mono text-2xl font-bold mt-2">{vis?.netWeight ? formatNumber(data.netWeight) : '\u00A0'}</p>
                    </div>
                </div>
            </section>
            
            <section className="text-center my-6">
                <p className="text-xl font-bold">
                    {vis?.netWeight ? `${formatNumber(data.netWeight)} كجم` : '\u00A0'}
                </p>
            </section>

            <footer className="mt-12 text-sm text-slate-700 space-y-6">
                <div>
                    <span className="font-semibold">توقيع السائق:</span>
                    <div className="inline-block flex-grow border-b border-dotted border-slate-400 w-4/5 ml-2"></div>
                </div>
                <div>
                    <span className="font-semibold">توقيع مسؤول الميزان:</span>
                    <div className="inline-block flex-grow border-b border-dotted border-slate-400 w-3/5 ml-2"></div>
                </div>
            </footer>
        </div>
    );
};

export default OfficialTemplate;