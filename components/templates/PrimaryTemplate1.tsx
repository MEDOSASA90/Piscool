import React from 'react';
import { TicketData } from '../../types';

const LogoPlaceholder: React.FC = () => (
    <div className="w-20 h-16 border-2 border-slate-700 flex items-center justify-center text-slate-500 text-sm font-bold">
        LAN
    </div>
);

const PrimaryTemplate1: React.FC<{ data: TicketData }> = ({ data }) => {
    const { fieldVisibility: vis } = data;

    const formatTime = (dateString: string) => {
        if (!dateString) return '';
        return new Intl.DateTimeFormat('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).format(new Date(dateString));
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('ar-EG', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };
    
    return (
        <div className="bg-white p-3 text-black max-w-3xl mx-auto font-bold" style={{ direction: 'rtl', fontSize: '10.5px', lineHeight: '1.4' }}>
            <div className="flex justify-between items-start mb-1">
                <div className="text-right">
                    <p>{vis?.companyName ? data.companyName : '\u00A0'}</p>
                    <p>أن احمد الزمر م نصر القاهرة</p>
                    <p>01010619315</p>
                </div>
                <LogoPlaceholder />
            </div>

            <div className="text-center my-1">
                <span className="border-2 border-black px-8 py-1 text-sm">تذكرة الوزن</span>
            </div>

            <div className="flex justify-between items-center border-b border-black pb-1">
                <p>رقم التذكرة : {vis?.ticketNo ? data.ticketNo : ''}</p>
                <p>تاريخ الطباعة : {formatDate(new Date().toISOString())}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-2 mt-1 border-b border-black pb-1">
                <div className="space-y-0.5">
                    <p>اسم العميل : {vis?.customerName ? data.customerName : ''}</p>
                    <p>نوع السيارة : {vis?.vehicleType ? data.vehicleType : ''}</p>
                    <p>رقم السيارة : {vis?.vehicleNo ? data.vehicleNo : ''}</p>
                    <p>المقطورة : {vis?.trailerNo ? data.trailerNo : ''}</p>
                    <p>تاريخ الدخول : {vis?.entryDate ? formatDate(data.entryDate) : ''}</p>
                </div>
                <div className="space-y-0.5">
                    <p>اسم السائق : {vis?.driverName ? data.driverName : ''}</p>
                    <p>نوع الحمولة : {vis?.item ? data.item : ''}</p>
                    <p>وقت الدخول : {vis?.entryDate ? formatTime(data.entryDate) : ''}</p>
                    <p>وقت الخروج : {vis?.exitDate ? formatTime(data.exitDate) : ''}</p>
                    <p>تاريخ الخروج : {vis?.exitDate ? formatDate(data.exitDate) : ''}</p>
                </div>
            </div>

            <div className="border-b border-black py-1">
                <p>الملاحظات : {vis?.notes ? data.notes : ''}</p>
            </div>
            
            <div className="mt-1 text-center">
                <table className="w-full border-collapse border border-black">
                    <thead>
                        <tr className="border border-black bg-gray-200">
                            <th className="border border-black p-0.5 font-bold">السيارة</th>
                            <th className="border border-black p-0.5 font-bold">الوزنة الأولى</th>
                            <th className="border border-black p-0.5 font-bold">الوزنة الثانية</th>
                            <th className="border border-black p-0.5 font-bold">صافى الوزن</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border border-black">
                           <td className="border border-black p-0.5">{vis?.vehicleNo ? data.vehicleNo : '\u00A0'}</td>
                           <td className="border border-black p-0.5">{vis?.tareWeight ? data.tareWeight.toLocaleString() : '\u00A0'}</td>
                           <td className="border border-black p-0.5">{vis?.grossWeight ? data.grossWeight.toLocaleString() : '\u00A0'}</td>
                           <td className="border border-black p-0.5">{vis?.netWeight ? data.netWeight.toLocaleString() : '\u00A0'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-2">
                <p>{vis?.operatorName ? data.operatorName : 'موظف الميزان'} : ............................</p>
            </div>
        </div>
    );
};

export default PrimaryTemplate1;