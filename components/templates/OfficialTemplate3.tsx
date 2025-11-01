import React from 'react';
import { TicketData } from '../../types';

interface TemplateProps {
  data: TicketData;
}

const TicketBlock: React.FC<TemplateProps> = ({ data }) => {
    const { fieldVisibility: vis } = data;

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        // Using sv-SE gives YYYY-MM-DD which is easy to replace
        return new Intl.DateTimeFormat('sv-SE').format(new Date(dateString)).replace(/-/g, '/');
    };

    const formatTimePart = (dateString: string, part: 'time' | 'period') => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            const time = new Intl.DateTimeFormat('ar-EG', {
                hour: 'numeric', minute: '2-digit', hour12: false
            }).format(date);
            
            const periodCheck = new Intl.DateTimeFormat('ar-EG', { hour: 'numeric', hour12: true }).format(date);
            const period = periodCheck.includes('ص') ? 'ص' : 'م';

            return part === 'time' ? time : period;
        } catch {
            return '';
        }
    };
    
    const formatNumber = (num: number) => num.toLocaleString('ar-EG', { useGrouping: false });
    
    const rows = [
        {
            rightLabel: "رقم السيارة", rightValue: data.vehicleNo,
            leftLabel: "المقطورة", leftValue: data.trailerNo || 'لا يوجد',
            isDate: false,
            keys: ['vehicleNo', 'trailerNo']
        },
        {
            rightLabel: "الوزنة الأولى", rightValue: data.tareWeight,
            leftLabel: "تاريخ الوزن الأول", leftValue: data.entryDate,
            isDate: true,
            keys: ['tareWeight', 'entryDate']
        },
        {
            rightLabel: "الوزنة الثانية", rightValue: data.grossWeight,
            leftLabel: "تاريخ الوزن الثاني", leftValue: data.exitDate,
            isDate: true,
            keys: ['grossWeight', 'exitDate']
        },
        {
            rightLabel: "صافي الحمولة", rightValue: data.netWeight,
            leftLabel: "المشغل", leftValue: data.operatorName,
            isDate: false,
            keys: ['netWeight', 'operatorName']
        },
        {
            rightLabel: "عميل / مورد", rightValue: data.customerName || '',
            leftLabel: "سعر الوزنة", leftValue: `${data.price} جنيهاً`,
            isDate: false,
            keys: ['customerName', 'price']
        }
    ];

    return (
        <div className="text-black" style={{ direction: 'rtl', fontSize: '10.5px', lineHeight: '1.7' }}>
            <div className="flex justify-between items-start border-b-2 border-dashed border-black pb-1 mb-1">
                <div className="text-right">
                    <p className="font-bold text-xs">{vis?.weighbridgeName ? data.weighbridgeName : '\u00A0'}</p>
                    <p>{vis?.companyName ? data.companyName : '\u00A0'}</p>
                </div>
                <div className="text-left">
                    <p>المسلسل : {vis?.ticketNo ? data.ticketNo : ''}</p>
                </div>
            </div>

            <div className="grid grid-cols-[auto_1fr_0.5fr_auto_auto_auto_auto] gap-x-2 items-baseline text-[11px]">
                {rows.map((row, index) => {
                    const showRight = vis?.[row.keys[0] as keyof typeof vis] !== false;
                    const showLeft = vis?.[row.keys[1] as keyof typeof vis] !== false;
                    
                    return (
                        <React.Fragment key={index}>
                            {/* Right Side */}
                            <div className="whitespace-nowrap">{row.rightLabel}:</div>
                            <div className="font-semibold text-right">
                                {showRight ? (
                                    typeof row.rightValue === 'number'
                                        ? <>{formatNumber(row.rightValue)} <span className="text-gray-600">كجم</span></>
                                        : row.rightValue
                                ) : '\u00A0'}
                            </div>
                            
                            {/* Spacer */}
                            <div />

                            {/* Left Side */}
                            <div className="whitespace-nowrap">{row.leftLabel}:</div>
                            {row.isDate ? (
                                <>
                                    <div className="font-semibold text-center">{showLeft ? formatTimePart(row.leftValue as string, 'time') : '\u00A0'}</div>
                                    <div className="font-semibold text-center">{showLeft ? formatTimePart(row.leftValue as string, 'period') : '\u00A0'}</div>
                                    <div className="font-semibold text-left">{showLeft ? `- ${formatDate(row.leftValue as string)}` : '\u00A0'}</div>
                                </>
                            ) : (
                                <div className="font-semibold col-span-3 text-right">{showLeft ? row.leftValue : '\u00A0'}</div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            <div className="flex justify-between items-center border-t-2 border-dashed border-black pt-1 mt-1">
                <p>خارجي</p>
                <p>/</p>
            </div>
        </div>
    );
};


const OfficialTemplate3: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div className="bg-white p-3 max-w-3xl mx-auto space-y-2">
            <TicketBlock data={data} />
            <hr className="border-t-2 border-dashed border-black my-2" />
            <TicketBlock data={data} />
        </div>
    );
};

export default OfficialTemplate3;