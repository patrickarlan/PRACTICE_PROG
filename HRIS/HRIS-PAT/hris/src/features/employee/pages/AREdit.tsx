import { useState, useMemo, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { useParams, useNavigate } from 'react-router';
import { Trash2, Undo2 } from 'lucide-react';
import { useNotify, useDataProvider, useGetIdentity } from 'ra-core';
import {
    AccomplishmentTable,
    AccomplishmentRow,
    calcDurationMinutes,
    ARFormHeader,
    ARFeedbackBanner,
    ARFormToolbar,
    ARConfirmDialogs
} from '../components/ARForm/index';
import { validateARForm, resolveFallbackReviewer, getRecipientLabel } from './utils/ARUTILS';
import { buildARPayload, mapAccomplishmentsToRows } from './utils/ARFormUTILS';

export const AREdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const notify = useNotify();
    const dataProvider = useDataProvider();
    const { data: identity } = useGetIdentity();

    const [reportDate, setReportDate] = useState('');
    const [reportTitle, setReportTitle] = useState('');
    const [selectedRecipient, setSelectedRecipient] = useState('');
    const [status, setStatus] = useState('');
    const [returnFeedback, setReturnFeedback] = useState('');
    const [returnerName, setReturnerName] = useState('');
    const [approvedByName, setApprovedByName] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteKey] = useState(() => uuidv4());
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState<AccomplishmentRow[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isSubmittingRef = useRef(false);
    const [receiverNameDisplay, setReceiverNameDisplay] = useState('');
    const [rolesMap, setRolesMap] = useState<any>(null);
    const [showValidation, setShowValidation] = useState(false);
    const [breakStart, setBreakStart] = useState('');
    const [breakEnd, setBreakEnd] = useState('');
    const [breakDuration, setBreakDuration] = useState<number>(0);
    const [isModifiedByAdmin, setIsModifiedByAdmin] = useState(false);
    const [record, setRecord] = useState<any>(null);

    useEffect(() => {
        setBreakDuration(calcDurationMinutes(breakStart, breakEnd));
    }, [breakStart, breakEnd]);

    const statusKey = (status || '').toLowerCase();
    const isReadOnly = statusKey !== 'draft' && statusKey !== 'returned' && statusKey !== 'returned_draft';

    useEffect(() => {
        dataProvider.getOne('employees', { id: 'roles-map' })
            .then(({ data }) => setRolesMap(data))
            .catch(() => { });
    }, [dataProvider]);

    const fallbackReviewer = useMemo(() => 
        resolveFallbackReviewer(rolesMap, identity), 
    [rolesMap, identity]);

    const recipientLabel = useMemo(() => 
        getRecipientLabel(receiverNameDisplay, identity, record), 
    [receiverNameDisplay, identity, record]);

    useEffect(() => {
        if (!loading && !selectedRecipient) {
            if (fallbackReviewer) {
                setSelectedRecipient(fallbackReviewer.id);
            } else if (identity?.supervisorId) {
                setSelectedRecipient(identity.supervisorId);
            }
        }
    }, [loading, selectedRecipient, identity?.supervisorId, fallbackReviewer]);

    useEffect(() => {
        if (!id) return;
        dataProvider.getOne('AccomplishmentReports', { id })
            .then(({ data }) => {
                setRecord(data);
                const reportStatus = (data.status || 'Pending').toString();
                setReportDate(data.reportDate || '');
                setReportTitle(data.title || '');
                setSelectedRecipient(data.receiverId || '');
                setStatus(reportStatus);
                setReturnFeedback(data.returnFeedback || '');
                setReturnerName(data.returnedByName || '');
                setApprovedByName(data.approvedByName || '');
                setReceiverNameDisplay(data.receiverName || '');
                setBreakStart(data.breakStartTime || '');
                setBreakEnd(data.breakEndTime || '');
                setBreakDuration(data.breakDurationMinutes || 0);
                setIsModifiedByAdmin(data.isModifiedByAdmin || false);
                setRows(mapAccomplishmentsToRows(data.accomplishments));
                setLoading(false);
            })
            .catch(() => {
                notify('Failed to load report', { type: 'error' });
                navigate('/my-ar');
            });
    }, [id, dataProvider, navigate, notify]);

    const validationResult = useMemo(() => 
        validateARForm(reportDate, reportTitle, rows, breakStart, breakEnd), 
    [reportDate, reportTitle, rows, breakStart, breakEnd]);

    const isFormValid = validationResult.isValid;
    const hasOverlaps = validationResult.error?.includes('overlap') ?? false;

    const handleUpdate = async (newStatus?: string) => {
        if (isSubmitting || isSubmittingRef.current) return;

        const targetStatus = newStatus || status;
        if (targetStatus !== 'Draft' && targetStatus !== 'Returned_Draft' && targetStatus !== 'Returned' && !validationResult.isValid) {
            setShowValidation(true);
            notify(validationResult.error || 'Please check your inputs', { type: 'warning' });
            return;
        }

        setIsSubmitting(true);
        isSubmittingRef.current = true;
        try {
            const payload = buildARPayload(
                reportDate, 
                reportTitle, 
                selectedRecipient, 
                newStatus || status, 
                rows, 
                breakStart, 
                breakEnd, 
                breakDuration, 
                deleteKey
            );

            await dataProvider.update('AccomplishmentReports', {
                id,
                data: payload,
                previousData: {},
                meta: { skipStatusRoute: true }
            });

            setShowConfirm(false);
            notify('Report updated successfully', { type: 'success' });
            navigate('/my-ar');
        } catch (error: any) {
            notify(error.message || 'Failed to update report', { type: 'error' });
            setIsSubmitting(false);
            isSubmittingRef.current = false;
        }
    };

    const handleDelete = async () => {
        if (isSubmitting || isSubmittingRef.current) return;
        setIsSubmitting(true);
        isSubmittingRef.current = true;
        try {
            await dataProvider.delete('AccomplishmentReports', {
                id,
                meta: { idempotencyKey: deleteKey }
            });
            setShowDeleteConfirm(false);
            notify('Report deleted successfully', { type: 'success' });
            navigate('/my-ar');
        } catch (error: any) {
            notify(error.message || 'Failed to delete report', { type: 'error' });
            setIsSubmitting(false);
            isSubmittingRef.current = false;
            setShowDeleteConfirm(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading report...</div>;

    return (
        <div className="animate-in fade-in duration-500 flex flex-col gap-6 pb-8">
            <ARFormHeader 
                title="Edit Report" 
                dateSubtitle={`Last updated ${new Date().toLocaleDateString()}`}
                status={status}
                isModifiedByAdmin={isModifiedByAdmin}
                approvedByName={approvedByName}
                returnerName={returnerName}
            />

            {(statusKey === 'returned' || statusKey === 'returned_draft') && returnFeedback && (
                <ARFeedbackBanner feedback={returnFeedback} returnerName={returnerName} />
            )}

            <ARFormToolbar 
                reportDate={reportDate}
                setReportDate={setReportDate}
                recipientLabel={recipientLabel}
                isReadOnly={isReadOnly}
                showValidation={showValidation}
            >
                {!isReadOnly ? (
                    <>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-3 text-[10px] font-bold uppercase tracking-wider"
                            onClick={() => setShowDeleteConfirm(true)}
                            disabled={isSubmitting}
                        >
                            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                            Delete
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/my-ar')}
                            className="h-8 px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdate('Draft')}
                            disabled={isSubmitting}
                            className="h-8 px-4 text-[10px] font-bold uppercase tracking-wider bg-background border-border shadow-sm hover:bg-muted/50"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Draft'}
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => {
                                if (!isFormValid || hasOverlaps) {
                                    setShowValidation(true);
                                    notify(validationResult.error || 'Please check your inputs.', { type: 'warning' });
                                    return;
                                }
                                setShowConfirm(true);
                            }}
                            disabled={isSubmitting}
                            className={`h-8 px-5 text-[10px] font-bold uppercase tracking-wider shadow-lg transition-all ${(!isFormValid && showValidation) || hasOverlaps
                                    ? 'bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20'
                                    : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20'
                                }`}
                        >
                            Submit
                        </Button>
                    </>
                ) : statusKey === 'pending' ? (
                    <>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpdate('Draft')}
                            disabled={isSubmitting}
                            className="h-8 px-4 text-[10px] font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                        >
                            <Undo2 className="h-3.5 w-3.5 mr-1.5" />
                            Cancel Submission
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/my-ar')}
                            className="h-8 px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                        >
                            Back to List
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/my-ar')}
                        className="h-8 px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                        Back to List
                    </Button>
                )}
            </ARFormToolbar>

            <AccomplishmentTable
                rows={rows}
                setRows={setRows}
                isReadOnly={isReadOnly}
                title={reportTitle}
                setTitle={setReportTitle}
                breakStart={breakStart}
                setBreakStart={setBreakStart}
                breakEnd={breakEnd}
                setBreakEnd={setBreakEnd}
                breakDuration={breakDuration}
                setBreakDuration={setBreakDuration}
                showValidation={showValidation}
            />

            <ARConfirmDialogs 
                showConfirm={showConfirm}
                setShowConfirm={setShowConfirm}
                showDeleteConfirm={showDeleteConfirm}
                setShowDeleteConfirm={setShowDeleteConfirm}
                recipientLabel={recipientLabel}
                reportTitle={reportTitle}
                onConfirmSubmit={() => handleUpdate('Pending')}
                onConfirmDelete={handleDelete}
                isSubmitting={isSubmitting}
            />
        </div>
    );
};
