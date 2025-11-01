import React from 'react';
import { TicketData, FieldVisibility } from '../../types';

interface TemplateProps {
  data: TicketData;
}

const TicketBlock: React.FC<TemplateProps> = ({ data }) => {
    const { fieldVisibility: vis } = data;
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        
        const datePart = new Intl.DateTimeFormat('sv-SE', {
            year: 'numeric', month: '2-digit', day: '2-digit'
        }).format(date).replace(/-/g, '/');
        
        const timePart = new Intl.DateTimeFormat('ar-EG', {
            hour: 'numeric', minute: '2-digit', hour12: true
        }).format(date);

        return `${timePart}-${datePart}`;
    };

    const rows: {
        right: { key: keyof FieldVisibility, label: string, value: any },
        left: { key: keyof FieldVisibility, label: string, value: any }
    }[] = [
        {
            right: { key: 'vehicleNo', label: 'رقم السيارة', value: data.vehicleNo },
            left: { key: 'trailerNo', label: 'المقطورة', value: data.trailerNo }
        },
        {
            right: { key: 'tareWeight', label: 'الوزنة الأولى', value: `${data.tareWeight.toLocaleString()} كجم` },
            left: { key: 'entryDate', label: 'تاريخ الوزن الأول', value: formatDate(data.entryDate) }
        },
        {
            right: { key: 'grossWeight', label: 'الوزنة الثانية', value: `${data.grossWeight.toLocaleString()} كجم` },
            left: { key: 'exitDate', label: 'تاريخ الوزن الثاني', value: formatDate(data.exitDate) }
        },
        {
            right: { key: 'netWeight', label: 'صافي الحمولة', value: `${data.netWeight.toLocaleString()} كجم` },
            left: { key: 'operatorName', label: 'المشغل', value: data.operatorName }
        },
        {
            right: { key: 'customerName', label: 'عميل / مورد', value: data.customerName },
            left: { key: 'price', label: 'سعر الوزنة', value: `${data.price.toLocaleString()} جنيهاً` }
        }
    ];

    return (
        <div className="text-black text-[11px]" style={{ direction: 'rtl', lineHeight: '1.6' }}>
            <div className="grid grid-cols-2 gap-x-4 border-b-2 border-dashed border-black pb-1 mb-1">
                <div className="text-right">
                    <p className="font-bold text-xs">{vis?.weighbridgeName ? data.weighbridgeName : '\u00A0'}</p>
                    <p>{vis?.companyName ? data.companyName : '\u00A0'}</p>
                </div>
                <div className="text-left">
                    <p>المسلسل : {vis?.ticketNo ? data.ticketNo : ''}</p>
                </div>
            </div>

            <div className="grid grid-cols-[auto_auto_1fr_auto_auto] gap-x-2 items-baseline">
                {rows.map((row, index) => {
                    const showRight = vis?.[row.right.key] !== false;
                    const showLeft = vis?.[row.left.key] !== false;

                    return (
                        <React.Fragment key={index}>
                            {/* Right side block */}
                            <div className="whitespace-nowrap">{row.right.label}:</div>
                            <div className="font-semibold">{showRight ? row.right.value : ''}</div>
                            
                            {/* Spacer */}
                            <div />

                            {/* Left side block */}
                            <div className="whitespace-nowrap">{row.left.label}:</div>
                            <div className="font-semibold">{showLeft ? row.left.value : ''}</div>
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

const PrimaryTemplate2: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div className="bg-white p-3 max-w-3xl mx-auto space-y-2">
            <TicketBlock data={data} />
            <hr className="border-t-2 border-dashed border-black my-2" />
            <TicketBlock data={data} />
        </div>
    );
};

export default PrimaryTemplate2;