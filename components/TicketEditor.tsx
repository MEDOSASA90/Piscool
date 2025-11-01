import React, { useState, useEffect } from 'react';
import { TicketData, TemplateId, FieldVisibility } from '../types';
import { DEFAULT_TICKET_DATA, TEMPLATES, DEFAULT_VISIBILITY } from '../constants';
import TemplateWrapper from './templates/TemplateWrapper';
import GridOverlay from './GridOverlay';
import { EyeIcon, EyeSlashIcon } from './icons';

const Section: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold border-b pb-3 mb-4 text-slate-800">{title}</h3>
        {children}
    </div>
);

const InputField: React.FC<{ label: string; name: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; readOnly?: boolean }> = ({ label, name, value, onChange, type = 'text', readOnly = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className={`w-full p-2 border bg-white text-slate-900 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400 ${readOnly ? 'bg-slate-100 cursor-not-allowed' : ''}`}
        />
    </div>
);


const VisibilityField: React.FC<{
    label: string;
    name: keyof FieldVisibility;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isVisible: boolean;
    onToggleVisibility: (name: keyof FieldVisibility) => void;
    type?: string;
    readOnly?: boolean;
    as?: 'input' | 'textarea' | 'datetime-local';
    step?: string | number;
}> = ({ label, name, value, onChange, isVisible, onToggleVisibility, type = 'text', readOnly = false, as = 'input', step }) => (
    <div className="flex flex-col">
        <label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
        <div className="flex items-center gap-2">
            {as === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    value={value as string}
                    onChange={onChange}
                    rows={3}
                    className="flex-grow p-2 border bg-white text-slate-900 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400"
                />
            ) : (
                <input
                    type={as === 'datetime-local' ? 'datetime-local' : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    readOnly={readOnly}
                    step={step}
                    className={`flex-grow p-2 border bg-white text-slate-900 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400 ${readOnly ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                />
            )}
            <button
                type="button"
                onClick={() => onToggleVisibility(name)}
                className="p-1 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                title={isVisible ? 'إخفاء الحقل' : 'إظهار الحقل'}
            >
                {isVisible ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
            </button>
        </div>
    </div>
);


interface TicketEditorProps {
  initialData: TicketData | null;
  onSave: (data: TicketData) => void;
  onCancel: () => void;
}

const TicketEditor: React.FC<TicketEditorProps> = ({ initialData, onSave, onCancel }) => {
    const [ticketData, setTicketData] = useState<TicketData>(
        initialData 
        ? { ...initialData, fieldVisibility: { ...DEFAULT_VISIBILITY, ...initialData.fieldVisibility } } 
        : { ...DEFAULT_TICKET_DATA, id: crypto.randomUUID(), fieldVisibility: { ...DEFAULT_VISIBILITY } }
    );
    const [showGrid, setShowGrid] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        // Handle weight fields with special calculation logic
        if (['grossWeight', 'tareWeight', 'netWeight'].includes(name)) {
            const numValue = parseFloat(value) || 0;
            setTicketData(prevData => {
                const updatedData = { ...prevData, [name]: numValue };

                if (name === 'grossWeight') {
                    // If gross is changed, net = gross - tare
                    updatedData.netWeight = Math.abs(numValue - updatedData.tareWeight);
                } else if (name === 'tareWeight') {
                    // If tare is changed, net = gross - tare
                    updatedData.netWeight = Math.abs(updatedData.grossWeight - numValue);
                } else if (name === 'netWeight') {
                    // If net is changed, gross = tare + net
                    updatedData.grossWeight = updatedData.tareWeight + numValue;
                }

                return updatedData;
            });
        } else {
            // Handle all other fields normally
            setTicketData(prev => ({
                ...prev,
                [name]: type === 'number' ? parseFloat(value) || 0 : value,
            }));
        }
    };

    const handleTemplateChange = (templateId: TemplateId) => {
        setTicketData(prev => ({ ...prev, template: templateId }));
    };

    const handleVisibilityChange = (field: keyof FieldVisibility) => {
        setTicketData(prev => ({
            ...prev,
            fieldVisibility: {
                ...prev.fieldVisibility,
                [field]: !prev.fieldVisibility?.[field],
            },
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(ticketData);
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Section title="بيانات السند">
                        <div className="grid grid-cols-1 gap-4">
                            <InputField label="اسم الجهة" name="entityName" value={ticketData.entityName} onChange={handleChange} />
                            <VisibilityField label="اسم الميزان" name="weighbridgeName" value={ticketData.weighbridgeName} onChange={handleChange} isVisible={ticketData.fieldVisibility?.weighbridgeName ?? true} onToggleVisibility={handleVisibilityChange} />
                            <VisibilityField label="اسم الشركة" name="companyName" value={ticketData.companyName} onChange={handleChange} isVisible={ticketData.fieldVisibility?.companyName ?? true} onToggleVisibility={handleVisibilityChange} />
                            <VisibilityField label="رقم السند" name="ticketNo" value={ticketData.ticketNo} onChange={handleChange} isVisible={ticketData.fieldVisibility?.ticketNo ?? true} onToggleVisibility={handleVisibilityChange} />
                        </div>
                    </Section>

                    <Section title="بيانات السيارة والعميل">
                        <div className="space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <VisibilityField label="رقم السيارة" name="vehicleNo" value={ticketData.vehicleNo} onChange={handleChange} isVisible={ticketData.fieldVisibility?.vehicleNo ?? true} onToggleVisibility={handleVisibilityChange} />
                             <VisibilityField label="رقم المقطورة" name="trailerNo" value={ticketData.trailerNo} onChange={handleChange} isVisible={ticketData.fieldVisibility?.trailerNo ?? true} onToggleVisibility={handleVisibilityChange} />
                             <VisibilityField label="نوع السيارة" name="vehicleType" value={ticketData.vehicleType} onChange={handleChange} isVisible={ticketData.fieldVisibility?.vehicleType ?? true} onToggleVisibility={handleVisibilityChange} />
                             <VisibilityField label="اسم السائق" name="driverName" value={ticketData.driverName} onChange={handleChange} isVisible={ticketData.fieldVisibility?.driverName ?? true} onToggleVisibility={handleVisibilityChange} />
                           </div>
                           <VisibilityField label="اسم العميل / المورد" name="customerName" value={ticketData.customerName} onChange={handleChange} isVisible={ticketData.fieldVisibility?.customerName ?? true} onToggleVisibility={handleVisibilityChange} />
                           <VisibilityField label="الصنف / الحمولة" name="item" value={ticketData.item} onChange={handleChange} isVisible={ticketData.fieldVisibility?.item ?? true} onToggleVisibility={handleVisibilityChange} />
                        </div>
                    </Section>
                    
                    <Section title="الوزن والتوقيتات">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <VisibilityField
                                label="الوزن الاول فارغ (كجم)"
                                name="tareWeight"
                                value={ticketData.tareWeight}
                                onChange={handleChange}
                                type="number"
                                isVisible={ticketData.fieldVisibility?.tareWeight ?? true}
                                onToggleVisibility={handleVisibilityChange}
                            />
                            <VisibilityField
                                label="الوزن الثاني اجمالي (كجم)"
                                name="grossWeight"
                                value={ticketData.grossWeight}
                                onChange={handleChange}
                                type="number"
                                isVisible={ticketData.fieldVisibility?.grossWeight ?? true}
                                onToggleVisibility={handleVisibilityChange}
                            />
                            <div className="md:col-span-2">
                                <VisibilityField
                                    label="الوزن الصافي (كجم)"
                                    name="netWeight"
                                    value={ticketData.netWeight}
                                    onChange={handleChange}
                                    type="number"
                                    isVisible={ticketData.fieldVisibility?.netWeight ?? true}
                                    onToggleVisibility={handleVisibilityChange}
                                />
                            </div>
                            <VisibilityField label="تاريخ ووقت الدخول" name="entryDate" value={ticketData.entryDate} onChange={handleChange} as="datetime-local" step="1" isVisible={ticketData.fieldVisibility?.entryDate ?? true} onToggleVisibility={handleVisibilityChange} />
                            <VisibilityField label="تاريخ ووقت الخروج" name="exitDate" value={ticketData.exitDate} onChange={handleChange} as="datetime-local" step="1" isVisible={ticketData.fieldVisibility?.exitDate ?? true} onToggleVisibility={handleVisibilityChange} />
                        </div>
                    </Section>
                    
                    <Section title="بيانات إضافية">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <VisibilityField label="اسم المشغل" name="operatorName" value={ticketData.operatorName} onChange={handleChange} isVisible={ticketData.fieldVisibility?.operatorName ?? true} onToggleVisibility={handleVisibilityChange} />
                         <VisibilityField label="السعر" name="price" value={ticketData.price} onChange={handleChange} type="number" isVisible={ticketData.fieldVisibility?.price ?? true} onToggleVisibility={handleVisibilityChange} />
                       </div>
                       <div className="mt-4">
                           <VisibilityField label="ملاحظات" name="notes" value={ticketData.notes} onChange={handleChange} as="textarea" isVisible={ticketData.fieldVisibility?.notes ?? true} onToggleVisibility={handleVisibilityChange} />
                       </div>
                    </Section>
                </div>

                <div className="lg:col-span-2">
                    <div className="sticky top-8">
                        <Section title="معاينة القالب">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="template" className="block text-sm font-medium text-slate-600 mb-1">اختر القالب</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {TEMPLATES.map(template => (
                                            <button
                                                key={template.id}
                                                type="button"
                                                onClick={() => handleTemplateChange(template.id)}
                                                className={`p-2 text-sm rounded-md border-2 transition-all ${ticketData.template === template.id ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-slate-200 hover:border-blue-300'}`}
                                            >
                                                {template.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="showGrid"
                                        checked={showGrid}
                                        onChange={(e) => setShowGrid(e.target.checked)}
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="showGrid" className="mr-2 block text-sm text-slate-700">إظهار الشبكة</label>
                                </div>
                            </div>
                        </Section>
                        <div className="relative bg-white p-4 rounded-lg shadow-inner mt-4 border border-slate-200">
                            <GridOverlay isVisible={showGrid} />
                            <div className="overflow-auto">
                                <TemplateWrapper data={ticketData} templateId={ticketData.template} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 transition-colors">
                    إلغاء
                </button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors">
                    حفظ السند
                </button>
            </div>
        </form>
    );
};

export default TicketEditor;
