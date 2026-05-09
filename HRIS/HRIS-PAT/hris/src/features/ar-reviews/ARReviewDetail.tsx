import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useNotify, useDataProvider, useUpdate, usePermissions, useGetIdentity } from 'ra-core';
import { 
    resolveReviewPermissions, 
    calculateReviewTotalHours, 
    buildCorrectionPayload, 
    getReviewerInitials,
    canReviewerAct
} from './utils/ARReviewDetailUTILS';
import { 
    ReviewHeader, 
    ReviewTable, 
    ReviewSidebar, 
    ReviewDialogs 
} from './components/ARReviewComponents';

export const ARReviewDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const notify = useNotify();
    const dataProvider = useDataProvider();
    const [update] = useUpdate();

    const [loading, setLoading] = useState(true);
    const [record, setRecord] = useState<any>(null);
    const [feedback, setFeedback] = useState('');
    const [showApproveConfirm, setShowApproveConfirm] = useState(false);
    const [showReturnConfirm, setShowReturnConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Admin Modify Mode State
    const [isModifyMode, setIsModifyMode] = useState(false);
    const [editedTasks, setEditedTasks] = useState<any[]>([]);
    const [editedBreak, setEditedBreak] = useState<any>({ start: '', end: '', duration: 0 });

    const { permissions } = usePermissions();
    const { data: identity } = useGetIdentity();

    const perms = useMemo(() => resolveReviewPermissions(identity, permissions), [identity, permissions]);
    
    const canAction = useMemo(() => perms.hasPermission && record && canReviewerAct(record), [perms.hasPermission, record]);

    useEffect(() => {
        if (!id) return;
        dataProvider.getOne('ar-reviews', { id })
            .then(({ data }) => {
                setRecord(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                notify('Error loading review details', { type: 'error' });
                setLoading(false);
            });
    }, [id, dataProvider, notify]);

    useEffect(() => {
        if (record && isModifyMode) {
            setEditedTasks(JSON.parse(JSON.stringify(record.accomplishments || [])));
            setEditedBreak({
                start: record.breakStartTime || '',
                end: record.breakEndTime || '',
                duration: record.breakDurationMinutes || 0
            });
        }
    }, [record, isModifyMode]);

    const handleSaveCorrection = async () => {
        if (!record) return;
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5107';
            
            const payload = buildCorrectionPayload(record, editedTasks, editedBreak);

            const res = await fetch(`${API_BASE}/api/AccomplishmentReports/${id}/correct`, {
                method: 'PUT',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to save correction");
            }

            notify('Report corrected successfully', { type: 'success' });
            setIsModifyMode(false);
            
            const { data } = await dataProvider.getOne('ar-reviews', { id });
            setRecord(data);
        } catch (error: any) {
            console.error(error);
            notify(error.message, { type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const accomplishments = isModifyMode ? editedTasks : (record?.accomplishments || []);


    const totalHours = useMemo(() => calculateReviewTotalHours(accomplishments, record), [accomplishments, record]);

    const handleApprove = async () => {
        if (!record) return;
        try {
            setIsSubmitting(true);
            await update('AccomplishmentReports', {
                id: record.reportId || record.id,
                data: { status: 'Approved' },
                previousData: record,
            }, { returnPromise: true });
            notify('Activity report approved successfully', { type: 'success' });
            setShowApproveConfirm(false);
            navigate(-1);
        } catch (error: any) {
            console.error(error);
            notify(`Error approving report: ${error?.message || String(error)}`, { type: 'error' });
            setIsSubmitting(false);
        }
    };

    const handleReturn = async () => {
        if (!record) return;
        const comment = feedback.trim();
        if (!comment) {
            notify('Please add feedback before returning', { type: 'warning' });
            return;
        }
        try {
            setIsSubmitting(true);
            await update('AccomplishmentReports', {
                id: record.reportId || record.id,
                data: { status: 'Returned', returnFeedback: comment },
                previousData: record,
            }, { returnPromise: true });
            notify('Report returned for revision', { type: 'info' });
            setShowReturnConfirm(false);
            navigate(-1);
        } catch (error: any) {
            console.error(error);
            notify(`Error returning report: ${error?.message || String(error)}`, { type: 'error' });
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="p-12 text-center text-muted-foreground animate-pulse font-medium">Loading Review Details...</div>;
    if (!record) return <div className="p-12 text-center text-destructive font-bold">Report not found.</div>;

    const initials = getReviewerInitials(record.employee);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6 h-[calc(100vh-100px)] flex flex-col font-sans">
            <ReviewHeader 
                isModifyMode={isModifyMode} 
                setIsModifyMode={setIsModifyMode} 
                isAdmin={perms.isAdmin} 
                onBack={() => navigate(-1)} 
            />

            <div className="flex flex-col lg:flex-row gap-5 flex-1 min-h-0 overflow-hidden">
                <div className="flex-1 flex flex-col min-w-0">
                    <ReviewTable 
                        record={record}
                        accomplishments={accomplishments}
                        isModifyMode={isModifyMode}
                        editedTasks={editedTasks}
                        setEditedTasks={setEditedTasks}
                        editedBreak={editedBreak}
                        setEditedBreak={setEditedBreak}
                        totalHours={totalHours}
                        isSubmitting={isSubmitting}
                        handleSaveCorrection={handleSaveCorrection}
                    />
                </div>

                <ReviewSidebar 
                    record={record}
                    initials={initials}
                    totalHours={totalHours}
                    canAction={!!canAction}
                    isPureManagement={perms.isPureManagement}
                    feedback={feedback}
                    setFeedback={setFeedback}
                    hasPermission={perms.hasPermission}
                    isSubmitting={isSubmitting}
                    setShowApproveConfirm={setShowApproveConfirm}
                    setShowReturnConfirm={setShowReturnConfirm}
                    notify={notify}
                />
            </div>

            <ReviewDialogs 
                record={record}
                showApproveConfirm={showApproveConfirm}
                setShowApproveConfirm={setShowApproveConfirm}
                showReturnConfirm={showReturnConfirm}
                setShowReturnConfirm={setShowReturnConfirm}
                isSubmitting={isSubmitting}
                handleApprove={handleApprove}
                handleReturn={handleReturn}
            />
        </div>
    );
};
