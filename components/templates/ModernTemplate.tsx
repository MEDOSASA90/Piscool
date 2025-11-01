import React from 'react';
import { TicketData } from '../../types';

interface TemplateProps {
  data: TicketData;
}

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { fieldVisibility: vis } = data;
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ar-EG', options);
    };
    const formatTime = (dateString: string) => {
        if (!dateString) return '';
        const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        return new Date(dateString).toLocaleTimeString('ar-EG', options);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto border-t-8 border-blue-600 text-slate-800">
            <header className="flex justify-between items-center pb-4 border-b-2 border-slate-200">
                <div>
                    <h1 className="text-2xl font-bold text-blue-700">{vis?.weighbridgeName ? data.weighbridgeName : '\u00A0'}</h1>
                    <p className="text-slate-500">{vis?.companyName ? data.companyName : '\u00A0'}</p>
                </div>
                <div className="text-right">
                    <p className="text-slate-500">رقم: <span className="font-mono">{vis?.ticketNo ? data.ticketNo : ''}</span></p>
                </div>
            </header>

            <section className="grid grid-cols-2 gap-x-8 gap-y-4 my-6">
                <div><strong className="text-slate-500 w-28 inline-block">العميل:</strong> {vis?.customerName ? data.customerName : ''}</div>
                <div><strong className="text-slate-500 w-28 inline-block">الصنف:</strong> {vis?.item ? data.item : ''}</div>
                <div><strong className="text-slate-500 w-28 inline-block">رقم السيارة:</strong> {vis?.vehicleNo ? data.vehicleNo : ''}</div>
                <div><strong className="text-slate-500 w-28 inline-block">رقم المقطورة:</strong> {vis?.trailerNo ? data.trailerNo : ''}</div>
            </section>

            <section className="bg-slate-50 p-6 rounded-lg my-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-xs text-slate-500">الوزن الفارغ</p>
                        <p className="text-xl font-bold text-slate-700">{vis?.tareWeight ? data.tareWeight.toLocaleString() : '\u00A0'}</p>
                        <p className="text-[10px] text-slate-400">كجم</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">الوزن الإجمالي</p>
                        <p className="text-xl font-bold text-slate-700">{vis?.grossWeight ? data.grossWeight.toLocaleString() : '\u00A0'}</p>
                        <p className="text-[10px] text-slate-400">كجم</p>
                    </div>
                    <div className={vis?.netWeight ? "bg-blue-100 p-3 rounded-md" : "p-3"}>
                        <p className={`text-xs ${vis?.netWeight ? 'text-blue-800' : 'text-slate-500'}`}>الوزن الصافي</p>
                        <p className={`text-xl font-bold ${vis?.netWeight ? 'text-blue-800' : 'text-slate-700'}`}>{vis?.netWeight ? data.netWeight.toLocaleString() : '\u00A0'}</p>
                        <p className={`text-[10px] ${vis?.netWeight ? 'text-blue-500' : 'text-slate-400'}`}>كجم</p>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-2 gap-8 text-xs text-slate-600 mt-8 pt-4 border-t">
                <div className="text-center">
                    <p className="font-semibold">توقيت الدخول</p>
                    <p>{vis?.entryDate ? formatDate(data.entryDate) : '\u00A0'}</p>
                    <p>{vis?.entryDate ? formatTime(data.entryDate) : '\u00A0'}</p>
                </div>
                <div className="text-center">
                    <p className="font-semibold">توقيت الخروج</p>
                    <p>{vis?.exitDate ? formatDate(data.exitDate) : '\u00A0'}</p>
                    <p>{vis?.exitDate ? formatTime(data.exitDate) : '\u00A0'}</p>
                </div>
            </section>
        </div>
    );
};

export default ModernTemplate;