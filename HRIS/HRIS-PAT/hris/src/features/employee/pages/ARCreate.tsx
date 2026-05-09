import { useState, useMemo, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useNotify, useDataProvider, useGetIdentity } from 'ra-core';
import { format } from 'date-fns';
import { Send } from 'lucide-react';
import {
  AccomplishmentTable,
  AccomplishmentRow,
  calcDurationMinutes,
  ARFormHeader,
  ARFormToolbar,
  ARConfirmDialogs
} from '../components/ARForm/index';
import { validateARForm, resolveFallbackReviewer, getRecipientLabel } from './utils/ARUTILS';
import { buildARPayload, formatReportSubtitle } from './utils/ARFormUTILS';

export const ARCreate = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const { data: identity } = useGetIdentity();

  const [reportDate, setReportDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [reportTitle, setReportTitle] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [rows, setRows] = useState<AccomplishmentRow[]>([
    { id: 1, account: '', task: '', start: '', end: '', hours: 0 }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [submissionKey] = useState(() => uuidv4());
  const isSubmittingRef = useRef(false);

  // Phase 9: Break Tracking State
  const [breakStart, setBreakStart] = useState('');
  const [breakEnd, setBreakEnd] = useState('');
  const [breakDuration, setBreakDuration] = useState<number>(0);
  const [rolesMap, setRolesMap] = useState<any>(null);

  useEffect(() => {
    setBreakDuration(calcDurationMinutes(breakStart, breakEnd));
  }, [breakStart, breakEnd]);

  useEffect(() => {
    dataProvider.getOne('employees', { id: 'roles-map' })
      .then(({ data }) => setRolesMap(data))
      .catch(() => { });
  }, [dataProvider]);

  const fallbackReviewer = useMemo(() => 
    resolveFallbackReviewer(rolesMap, identity), 
  [rolesMap, identity]);

  useEffect(() => {
    if (fallbackReviewer) {
      setSelectedRecipient(fallbackReviewer.id);
    } else if (identity?.supervisorId) {
      setSelectedRecipient(identity.supervisorId);
    }
  }, [identity, fallbackReviewer]);

  const recipientLabel = useMemo(() => 
    getRecipientLabel('', identity, null), 
  [identity]);

  const validationResult = useMemo(() => 
    validateARForm(reportDate, reportTitle, rows, breakStart, breakEnd), 
  [reportDate, reportTitle, rows, breakStart, breakEnd]);

  const isFormValid = validationResult.isValid;
  const hasOverlaps = validationResult.error?.includes('overlap') ?? false;

  const handleCreate = async (status: 'Draft' | 'Pending') => {
    if (isSubmitting || isSubmittingRef.current) return;

    if (status === 'Pending' && !validationResult.isValid) {
      setShowValidation(true);
      notify(validationResult.error || 'Please fill in all required fields.', { type: 'warning' });
      return;
    }

    setIsSubmitting(true);
    isSubmittingRef.current = true;
    try {
      const payload = buildARPayload(
        reportDate, 
        reportTitle, 
        selectedRecipient, 
        status, 
        rows, 
        breakStart, 
        breakEnd, 
        breakDuration, 
        submissionKey
      );

      await dataProvider.create('AccomplishmentReports', { data: payload });
      setShowConfirm(false); 
      notify(status === 'Draft' ? 'Draft saved' : 'Report submitted successfully', { type: 'success' });
      navigate('/my-ar');
    } catch (error: any) {
      notify(error.message || 'Failed to create report', { type: 'error' });
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  return (
    <div className="animate-in fade-in duration-500 flex flex-col gap-6 pb-8">
      <ARFormHeader 
        title="New Report" 
        dateSubtitle={formatReportSubtitle(reportDate)} 
      />

      <ARFormToolbar 
        reportDate={reportDate}
        setReportDate={setReportDate}
        recipientLabel={recipientLabel}
        showValidation={showValidation}
      >
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
          onClick={() => handleCreate('Draft')}
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
          className={`h-8 px-5 text-[10px] font-bold uppercase tracking-wider shadow-lg gap-2 transition-all ${(!isFormValid && showValidation) || hasOverlaps
            ? 'bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20'
            : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20'
            }`}
        >
          <Send className="size-3.5" />
          Submit
        </Button>
      </ARFormToolbar>

      <AccomplishmentTable
        rows={rows}
        setRows={setRows}
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
        recipientLabel={recipientLabel}
        reportTitle={reportTitle}
        onConfirmSubmit={() => handleCreate('Pending')}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
