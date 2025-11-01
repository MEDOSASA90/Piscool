import React from 'react';
import { TicketData } from '../../types';

const TicketBlock: React.FC<{ data: TicketData }> = ({ data }) => {
    const { fieldVisibility: vis } = data;

    const formatDatePart = (dateString: string) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-GB', {
                year: 'numeric', month: '2-digit', day: '2-digit'
            }).format(date);
        } catch (e) {
            console.error("Date formatting failed", e);
            return dateString.split('T')[0] || '';
        }
    };

    const formatTimePart = (dateString: string) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('ar-EG', {
                hour: 'numeric', minute: '2-digit', hour12: true
            }).format(date);
        } catch (e) {
            console.error("Time formatting failed", e);
            return dateString.split('T')[1]?.substring(0, 5) || '';
        }
    };


    const formatNumber = (num: number) => num.toLocaleString('ar-EG');

    return (
        <div className="text-black" style={{ direction: 'rtl', fontSize: '10.5px', lineHeight: '1.5' }}>
            <div className="flex justify-between items-start mb-1">
                <div className="text-right">
                    <p className="font-bold text-xs">{vis?.weighbridgeName ? data.weighbridgeName : '\u00A0'}</p>
                    <p>{vis?.companyName ? data.companyName : '\u00A0'}</p>
                </div>
                <div className="text-left">
                    <p>المسلسل : {vis?.ticketNo ? data.ticketNo : ''}</p>
                </div>
            </div>
            
            <hr className="border-t-2 border-black my-1" />

            <div className="border border-black">
                <div className="grid grid-cols-[55%_45%]">
                    {/* Right column in grid, which is left on screen */}
                    <div className="border-l border-black">
                        <div className="flex justify-between p-1 border-b border-black"><span>تاريخ الدخول:</span><span>{vis?.entryDate ? formatDatePart(data.entryDate) : ''}</span></div>
                        <div className="flex justify-between p-1 border-b border-black"><span>وقت الدخول:</span><span>{vis?.entryDate ? formatTimePart(data.entryDate) : ''}</span></div>
                        <div className="flex justify-between p-1 border-b border-black"><span>تاريخ الخروج:</span><span>{vis?.exitDate ? formatDatePart(data.exitDate) : ''}</span></div>
                        <div className="flex justify-between p-1 border-b border-black"><span>وقت الخروج:</span><span>{vis?.exitDate ? formatTimePart(data.exitDate) : ''}</span></div>
                        <div className="flex justify-between p-1 border-b border-black"><span>المشغل:</span><span>{vis?.operatorName ? data.operatorName : ''}</span></div>
                        <div className="flex justify-between p-1 border-b border-black"><span>السائق:</span><span>{vis?.driverName ? data.driverName : ''}</span></div>
                        <div className="flex justify-between p-1"><span>سعر الوزنة:</span><span>{vis?.price ? `${data.price} جنيهاً` : ''}</span></div>
                    </div>
                    {/* Left column in grid, which is right on screen */}
                    <div>
                        <div className="flex justify-between p-1 border-b border-black">
                           <span>رقم السيارة: {vis?.vehicleNo ? data.vehicleNo : ''}</span>
                           <span>المقطورة: {vis?.trailerNo ? data.trailerNo : ''}</span>
                        </div>
                        <div className="flex justify-between p-1 border-b border-black"><span>الوزنة الأولى: {vis?.tareWeight ? formatNumber(data.tareWeight) : ''}</span><span>كجم</span></div>
                        <div className="flex justify-between p-1 border-b border-black"><span>الوزنة الثانية: {vis?.grossWeight ? formatNumber(data.grossWeight) : ''}</span><span>كجم</span></div>
                        <div className={`flex justify-between p-1 border-b border-black ${vis?.netWeight ? 'bg-slate-100' : ''}`}><span>صافي الحمولة: {vis?.netWeight ? formatNumber(data.netWeight) : ''}</span><span>كجم</span></div>
                        <div className="flex justify-between p-1 border-b border-black"><span>الحمولة:</span><span>{vis?.item ? data.item : ''}</span></div>
                        <div className="flex justify-between p-1"><span>عميل / مورد:</span><span>{vis?.customerName ? data.customerName : ''}</span></div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center pt-1 mt-1">
                <p>خارجي</p>
                <p>/</p>
            </div>
        </div>
    );
};

const OfficialTemplate2: React.FC<{ data: TicketData }> = ({ data }) => {
    return (
        <div className="bg-white p-3 max-w-3xl mx-auto">
            <TicketBlock data={data} />
            <hr className="border-t border-dashed border-black my-2" />
            <TicketBlock data={data} />
        </div>
    );
};

export default OfficialTemplate2;