import React, { useState } from 'react';

interface AddEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEntity: (newEntity: string) => void;
}

const AddEntityModal: React.FC<AddEntityModalProps> = ({ isOpen, onClose, onAddEntity }) => {
  const [newEntity, setNewEntity] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEntity.trim()) {
      onAddEntity(newEntity.trim());
      setNewEntity('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">إضافة جهة جديدة</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newEntity}
            onChange={(e) => setNewEntity(e.target.value)}
            className="w-full p-2 border bg-white text-slate-900 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400"
            placeholder="اسم الجهة (مثال: الشركة المتحدة)"
            autoFocus
          />
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors"
              disabled={!newEntity.trim()}
            >
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEntityModal;
