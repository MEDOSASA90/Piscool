import React, { useState, useEffect } from 'react';
import { TicketData } from './types';
import TicketEditor from './components/TicketEditor';
import TicketList from './components/TicketList';
import SplashScreen from './components/SplashScreen';
import AddEntityModal from './components/AddEntityModal';
import { DEFAULT_TICKET_DATA } from './constants';
import TemplateWrapper from './components/templates/TemplateWrapper';
import LoginScreen from './components/LoginScreen';
import { auth, db } from './firebase/config';
import { LogoutIcon } from './components/icons';


const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<any | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    const [tickets, setTickets] = useState<TicketData[]>([]);
    const [entities, setEntities] = useState<string[]>([]);
    const [selectedEntity, setSelectedEntity] = useState<string>('');

    const [editingTicket, setEditingTicket] = useState<TicketData | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [exportingTicket, setExportingTicket] = useState<TicketData | null>(null);
    
    // Auth state listener
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Fetch entities from Firestore
    useEffect(() => {
        if (!currentUser) {
            setEntities([]);
            return;
        }
        const unsubscribe = db.collection('users').doc(currentUser.uid).collection('entities')
            .onSnapshot(snapshot => {
                const fetchedEntities = snapshot.docs.map(doc => doc.id);
                setEntities(fetchedEntities);
            });
        return () => unsubscribe();
    }, [currentUser]);

    // Fetch tickets for the selected entity from Firestore
    useEffect(() => {
        if (!currentUser || !selectedEntity) {
            setTickets([]);
            return;
        }
        const unsubscribe = db.collection('users').doc(currentUser.uid).collection('tickets')
            .where('entityName', '==', selectedEntity)
            .onSnapshot(snapshot => {
                const fetchedTickets = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as TicketData));
                setTickets(fetchedTickets);
            });
        return () => unsubscribe();
    }, [currentUser, selectedEntity]);
    
    // Handle selected entity logic
    useEffect(() => {
        if (entities.length > 0 && !entities.includes(selectedEntity)) {
            setSelectedEntity(entities[0]);
        } else if (entities.length === 0) {
            setSelectedEntity('');
        }
    }, [entities, selectedEntity]);

    const handleLogin = async (email: string, password: string) => {
        await auth.signInWithEmailAndPassword(email, password);
    };

    const handleLogout = async () => {
        await auth.signOut();
    };

    const handleSaveTicket = async (ticket: TicketData) => {
        if (!currentUser) return;
        const ticketRef = db.collection('users').doc(currentUser.uid).collection('tickets').doc(ticket.id);
        await ticketRef.set(ticket, { merge: true });
        
        setIsCreating(false);
        setEditingTicket(null);
    };

    const handleEditTicket = (ticketId: string) => {
        const ticketToEdit = tickets.find(t => t.id === ticketId);
        if (ticketToEdit) {
            setEditingTicket(ticketToEdit);
            setIsCreating(true);
        }
    };

    const handleDeleteTicket = async (ticketId: string) => {
        if (!currentUser) return;
        if (window.confirm('هل أنت متأكد من حذف هذا السند؟')) {
            await db.collection('users').doc(currentUser.uid).collection('tickets').doc(ticketId).delete();
        }
    };
    
    const handleCreateNew = () => {
        const newTicket: TicketData = {
            ...DEFAULT_TICKET_DATA,
            id: crypto.randomUUID(),
            entityName: selectedEntity,
        };
        setEditingTicket(newTicket);
        setIsCreating(true);
    };

    const handleCancel = () => {
        setIsCreating(false);
        setEditingTicket(null);
    };

    const handleAddEntity = async (newEntity: string) => {
        if (!currentUser || entities.includes(newEntity.trim()) || !newEntity.trim()) return;

        await db.collection('users').doc(currentUser.uid).collection('entities').doc(newEntity.trim()).set({
            createdAt: new Date(),
        });
        
        setSelectedEntity(newEntity.trim());
        setIsModalOpen(false);
    };

    const handleExport = async (ticketId: string, format: 'jpg' | 'pdf') => {
        const ticketToExport = tickets.find(t => t.id === ticketId);
        if (!ticketToExport) return;

        setExportingTicket(ticketToExport);
        await new Promise(resolve => setTimeout(resolve, 50));

        const element = document.getElementById('export-container');
        if (!element) {
            setExportingTicket(null);
            return;
        }

        const { html2canvas, jspdf } = window;

        if (!html2canvas || (format === 'pdf' && !jspdf)) {
            alert('مكتبات التصدير غير متاحة. يرجى إعادة تحميل الصفحة.');
            setExportingTicket(null);
            return;
        }

        const canvas = await html2canvas(element, { scale: 3 });
        const dataUrl = canvas.toDataURL('image/jpeg', 1.0);

        if (format === 'jpg') {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `سند-${ticketToExport.ticketNo}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            const { jsPDF } = jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const maxWidth = pageWidth - 20;
            const maxHeight = pageHeight / 2 - 10;
            const canvasRatio = canvas.width / canvas.height;
            let imageWidth = maxWidth;
            let imageHeight = imageWidth / canvasRatio;
            if (imageHeight > maxHeight) {
                imageHeight = maxHeight;
                imageWidth = imageHeight * canvasRatio;
            }
            const x = (pageWidth - imageWidth) / 2;
            const y = 10;
            pdf.addImage(dataUrl, 'JPEG', x, y, imageWidth, imageHeight);
            pdf.save(`سند-${ticketToExport.ticketNo}.pdf`);
        }
        setExportingTicket(null);
    };
    
    if (authLoading) {
        return <SplashScreen isVisible={true} />;
    }

    if (!currentUser) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    return (
        <>
            <div className="bg-slate-100 min-h-screen font-sans text-slate-800" dir="rtl">
                <header className="bg-white shadow-sm sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                        <div className="text-slate-700">
                            مرحباً, <span className="font-bold text-slate-900">{currentUser.email}</span>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 bg-slate-600 text-white text-sm rounded-md hover:bg-slate-700 transition-colors"
                        >
                            <LogoutIcon className="w-4 h-4" />
                            <span>تسجيل الخروج</span>
                        </button>
                    </div>
                </header>
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {isCreating || editingTicket ? (
                        <TicketEditor
                            initialData={editingTicket}
                            onSave={handleSaveTicket}
                            onCancel={handleCancel}
                        />
                    ) : (
                        <>
                             <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                                <h1 className="text-3xl font-bold text-slate-900">سندات الميزان</h1>
                                <div className="flex items-center gap-2">
                                    <select 
                                        value={selectedEntity} 
                                        onChange={(e) => setSelectedEntity(e.target.value)}
                                        className="p-2 border bg-white text-slate-900 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        disabled={entities.length === 0}
                                    >
                                        {entities.length > 0 ? (
                                           entities.map(entity => <option key={entity} value={entity}>{entity}</option>)
                                        ) : (
                                            <option>أضف جهة أولاً</option>
                                        )}
                                    </select>
                                    <button onClick={() => setIsModalOpen(true)} className="px-3 py-2 bg-slate-700 text-white text-sm rounded-md hover:bg-slate-800 transition-colors">
                                        إضافة جهة
                                    </button>
                                </div>
                            </div>
                            <TicketList
                                tickets={tickets}
                                onEdit={handleEditTicket}
                                onDelete={handleDeleteTicket}
                                onAddNew={handleCreateNew}
                                onExportJPG={(id) => handleExport(id, 'jpg')}
                                onExportPDF={(id) => handleExport(id, 'pdf')}
                                isEntitySelected={!!selectedEntity}
                            />
                        </>
                    )}
                </main>
            </div>
            <AddEntityModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddEntity={handleAddEntity}
            />
             {exportingTicket && (
                <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '800px', padding: '1rem' }}>
                    <div id="export-container" className="bg-white">
                        <TemplateWrapper data={exportingTicket} templateId={exportingTicket.template} />
                    </div>
                </div>
            )}
        </>
    );
};

export default App;