import React from 'react';
import { TicketData } from '../types';
import { PlusIcon, PencilIcon, TrashIcon, DownloadIcon, FileTextIcon } from './icons';

interface TicketListProps {
  tickets: TicketData[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  onExportJPG: (id: string) => void;
  onExportPDF: (id: string) => void;
  isEntitySelected: boolean;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, onEdit, onDelete, onAddNew, onExportJPG, onExportPDF, isEntitySelected }) => {
    
    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('ar-EG', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    const EmptyState: React.FC<{ isEntitySelected: boolean }> = ({ isEntitySelected }) => (
         <div className="text-center py-12 text-black">
            {isEntitySelected ? (
                <>
                    <p className="mb-4">لا توجد سندات لهذه الجهة بعد.</p>
                    <p>انقر على "إضافة سند جديد" للبدء.</p>
                </>
            ) : (
                <p className="mb-4">يرجى إضافة أو تحديد جهة لعرض السندات.</p>
            )}
        </div>
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-black">قائمة السندات</h2>
                <button
                    onClick={onAddNew}
                    disabled={!isEntitySelected}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>إضافة سند جديد</span>
                </button>
            </div>
            {tickets.length > 0 && isEntitySelected ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-black">
                        <thead className="border-b-2 border-slate-200 text-sm">
                            <tr>
                                <th className="p-3 font-semibold">رقم السند</th>
                                <th className="p-3 font-semibold">رقم السيارة</th>
                                <th className="p-3 font-semibold">العميل</th>
                                <th className="p-3 font-semibold">الوزن الصافي (كجم)</th>
                                <th className="p-3 font-semibold">تاريخ الدخول</th>
                                <th className="p-3 font-semibold">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map(ticket => (
                                <tr key={ticket.id} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="p-3 font-mono">{ticket.ticketNo}</td>
                                    <td className="p-3">{ticket.vehicleNo}</td>
                                    <td className="p-3">{ticket.customerName || '-'}</td>
                                    <td className="p-3 font-semibold">{ticket.netWeight.toLocaleString()}</td>
                                    <td className="p-3">{formatDate(ticket.entryDate)}</td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => onEdit(ticket.id)} className="text-blue-500 hover:text-blue-700" title="تعديل">
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => onDelete(ticket.id)} className="text-red-500 hover:text-red-700" title="حذف">
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => onExportJPG(ticket.id)} className="text-green-600 hover:text-green-800" title="تصدير JPG">
                                                <DownloadIcon className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => onExportPDF(ticket.id)} className="text-purple-600 hover:text-purple-800" title="تصدير PDF">
                                                <FileTextIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <EmptyState isEntitySelected={isEntitySelected} />
            )}
        </div>
    );
};

export default TicketList;