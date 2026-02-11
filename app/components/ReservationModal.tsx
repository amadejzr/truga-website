'use client';

import { useReducer, useRef, useEffect, useState } from 'react';
import type { ReservationData, RoofTypeChoice } from '../data/products';
import { getRoofBoxById } from '../data/products';
import { sendInquiry } from '../actions/sendInquiry';
import { calculatePricing } from '../utils/pricing';
import { StepIndicator } from './reservation/StepIndicator';
import { StepProductSelection } from './reservation/StepProductSelection';
import { StepHolderSelection } from './reservation/StepHolderSelection';
import { StepDatePicker } from './reservation/StepDatePicker';
import { StepCustomerDetails } from './reservation/StepCustomerDetails';
import { StepSummary } from './reservation/StepSummary';

type WizardStep = 1 | 2 | 3 | 4 | 5;

interface PreSelection {
  boxId?: number;
}

interface WizardState {
  currentStep: WizardStep;
  data: ReservationData;
  editingFromSummary: boolean;
}

type WizardAction =
  | { type: 'SELECT_BOX'; boxId: number | null }
  | { type: 'SET_ROOF_TYPE'; roofType: RoofTypeChoice }
  | { type: 'SET_ROOF_TYPE_OTHER'; text: string }
  | { type: 'SET_DATES'; start: Date; end: Date }
  | { type: 'SET_DETAIL'; field: 'name' | 'email' | 'phone' | 'vehicleDescription' | 'notes'; value: string }
  | { type: 'GO_TO_STEP'; step: WizardStep }
  | { type: 'EDIT_FROM_SUMMARY'; step: WizardStep }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'RESET'; preSelection?: PreSelection };

const stepTitles: Record<WizardStep, string> = {
  1: 'Izberite Strešni Kovček',
  2: 'Tip Strehe',
  3: 'Izberite Datum',
  4: 'Vaši Podatki',
  5: 'Pregled Povpraševanja',
};

function createInitialState(preSelection?: PreSelection): WizardState {
  return {
    currentStep: 1,
    editingFromSummary: false,
    data: {
      selectedBoxId: preSelection?.boxId ?? null,
      roofType: null,
      startDate: null,
      endDate: null,
      name: '',
      email: '',
      phone: '',
      vehicleDescription: '',
      notes: '',
      roofTypeOther: '',
    },
  };
}

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SELECT_BOX':
      return { ...state, data: { ...state.data, selectedBoxId: action.boxId } };

    case 'SET_ROOF_TYPE':
      return {
        ...state,
        data: {
          ...state.data,
          roofType: action.roofType,
          roofTypeOther: action.roofType !== 'other' ? '' : state.data.roofTypeOther,
        },
      };

    case 'SET_ROOF_TYPE_OTHER':
      return { ...state, data: { ...state.data, roofTypeOther: action.text } };

    case 'SET_DATES':
      return { ...state, data: { ...state.data, startDate: action.start, endDate: action.end } };

    case 'SET_DETAIL':
      return { ...state, data: { ...state.data, [action.field]: action.value } };

    case 'GO_TO_STEP':
      return { ...state, currentStep: action.step };

    case 'EDIT_FROM_SUMMARY':
      return { ...state, currentStep: action.step, editingFromSummary: true };

    case 'NEXT_STEP': {
      if (state.editingFromSummary) {
        return { ...state, currentStep: 5, editingFromSummary: false };
      }
      const next = Math.min(state.currentStep + 1, 5) as WizardStep;
      return { ...state, currentStep: next };
    }

    case 'PREV_STEP': {
      // When editing from summary, "Nazaj" returns to summary
      if (state.editingFromSummary) {
        return { ...state, currentStep: 5, editingFromSummary: false };
      }
      const prev = Math.max(state.currentStep - 1, 1) as WizardStep;
      // Clear dates when leaving the date step during normal flow
      if (state.currentStep === 3) {
        return { ...state, currentStep: prev, data: { ...state.data, startDate: null, endDate: null } };
      }
      return { ...state, currentStep: prev };
    }

    case 'RESET':
      return createInitialState(action.preSelection);

    default:
      return state;
  }
}

function isStepValid(step: WizardStep, data: ReservationData): boolean {
  switch (step) {
    case 1:
      return data.selectedBoxId !== null;
    case 2:
      if (data.roofType === null) return false;
      if (data.roofType === 'other') return data.roofTypeOther.trim().length > 0;
      return true;
    case 3:
      return data.startDate !== null && data.endDate !== null;
    case 4:
      return (
        data.name.trim().length > 0 &&
        data.email.trim().length > 0 &&
        data.phone.trim().length > 0 &&
        data.vehicleDescription.trim().length > 0
      );
    case 5:
      return true;
    default:
      return false;
  }
}

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelection?: PreSelection;
}

export function ReservationModal({ isOpen, onClose, preSelection }: ReservationModalProps) {
  const [state, dispatch] = useReducer(wizardReducer, preSelection, createInitialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null);
  const [submitError, setSubmitError] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const { currentStep, data } = state;

  // Scroll to top on step change
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      dispatch({ type: 'RESET', preSelection });
      setSubmitResult(null);
      setSubmitError('');
    }
  }, [isOpen, preSelection]);

  if (!isOpen) return null;

  const completedSteps = new Set<number>();
  if (state.editingFromSummary) {
    // When editing from summary, all steps have been visited
    for (let s = 1; s <= 5; s++) if (s !== currentStep) completedSteps.add(s);
  } else {
    for (let s = 1; s < currentStep; s++) completedSteps.add(s);
  }

  const canProceed = isStepValid(currentStep, data);

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitResult(null);

    const box = data.selectedBoxId ? getRoofBoxById(data.selectedBoxId) : null;
    const days =
      data.startDate && data.endDate
        ? Math.ceil((data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    const pricing = box && days > 0
      ? calculatePricing(box.pricePerDay, null, days, box.deposit)
      : null;

    const formatDate = (d: Date) =>
      d.toLocaleDateString('sl-SI', { day: 'numeric', month: 'long', year: 'numeric' });

    const result = await sendInquiry({
      boxTitle: box?.title ?? null,
      boxSize: box?.size ?? null,
      boxPricePerDay: box?.pricePerDay ?? null,
      roofType: data.roofType,
      roofTypeOther: data.roofType === 'other' ? data.roofTypeOther : null,
      startDate: data.startDate ? formatDate(data.startDate) : '',
      endDate: data.endDate ? formatDate(data.endDate) : '',
      days,
      name: data.name,
      email: data.email,
      phone: data.phone,
      vehicleDescription: data.vehicleDescription,
      notes: data.notes,
      estimatedTotal: pricing?.total ?? null,
      discountPercent: pricing?.discountPercent ?? 0,
      deposit: box?.deposit ?? null,
    });

    setSubmitting(false);

    if (result.success) {
      setSubmitResult('success');
    } else {
      setSubmitResult('error');
      setSubmitError(result.error ?? 'Napaka pri pošiljanju.');
    }
  };

  const handleNext = () => {
    if (currentStep === 5) {
      handleSubmit();
      return;
    }
    dispatch({ type: 'NEXT_STEP' });
  };

  const handleBack = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-stone-50 dark:bg-zinc-900 rounded-[2rem] max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-zinc-800 to-green-800 dark:from-zinc-900 dark:to-green-900 text-stone-50 px-6 py-5 rounded-t-[2rem] flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold">{stepTitles[currentStep]}</h2>
            <p className="text-sm text-stone-300">Korak {currentStep} od 5</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            aria-label="Zapri"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Step Indicator */}
        <div className="border-b border-stone-200 dark:border-zinc-800 shrink-0">
          <StepIndicator currentStep={currentStep} completedSteps={completedSteps} />
        </div>

        {/* Step Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          {submitResult === 'success' ? (
            <div className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-700 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-stone-50 mb-2">Povpraševanje oddano!</h3>
              <p className="text-zinc-600 dark:text-stone-400 max-w-sm">
                Hvala za vaše povpraševanje. V kratkem vas bomo kontaktirali na <span className="font-medium text-zinc-900 dark:text-stone-200">{data.email}</span>.
              </p>
            </div>
          ) : (
            <>
              {currentStep === 1 && (
                <StepProductSelection
                  selectedBoxId={data.selectedBoxId}
                  onSelectBox={(boxId) => dispatch({ type: 'SELECT_BOX', boxId })}
                />
              )}
              {currentStep === 2 && (
                <StepHolderSelection
                  roofType={data.roofType}
                  onSelect={(roofType) => dispatch({ type: 'SET_ROOF_TYPE', roofType })}
                  roofTypeOther={data.roofTypeOther}
                  onOtherTextChange={(text) => dispatch({ type: 'SET_ROOF_TYPE_OTHER', text })}
                />
              )}
              {currentStep === 3 && (() => {
                const selectedBox = data.selectedBoxId ? getRoofBoxById(data.selectedBoxId) : null;
                const needsHolder = data.roofType !== null;
                return (
                  <StepDatePicker
                    startDate={data.startDate}
                    endDate={data.endDate}
                    onDateSelect={(start, end) => {
                      if (start && end) dispatch({ type: 'SET_DATES', start, end });
                    }}
                    boxPricePerDay={selectedBox?.pricePerDay ?? null}
                    boxTitle={selectedBox?.title ?? null}
                    deposit={selectedBox?.deposit ?? null}
                    needsHolder={needsHolder}
                    holderEstimatePricePerDay={5}
                  />
                );
              })()}
              {currentStep === 4 && (
                <StepCustomerDetails
                  name={data.name}
                  email={data.email}
                  phone={data.phone}
                  vehicleDescription={data.vehicleDescription}
                  notes={data.notes}
                  onChange={(field, value) => dispatch({ type: 'SET_DETAIL', field, value })}
                />
              )}
              {currentStep === 5 && (
                <StepSummary
                  data={data}
                  onGoToStep={(step) => dispatch({ type: 'EDIT_FROM_SUMMARY', step: step as WizardStep })}
                />
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between shrink-0 bg-stone-50 dark:bg-zinc-900 rounded-b-[2rem]">
          {submitResult === 'success' ? (
            <>
              <div />
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-stone-50 font-bold transition-all shadow-lg hover:shadow-xl"
              >
                Zapri
              </button>
            </>
          ) : (
            <>
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-stone-200 dark:bg-zinc-700 text-zinc-700 dark:text-stone-300 font-medium hover:bg-stone-300 dark:hover:bg-zinc-600 disabled:opacity-50 transition-colors"
                >
                  {state.editingFromSummary ? 'Nazaj na pregled' : 'Nazaj'}
                </button>
              ) : (
                <div />
              )}
              <div className="flex items-center gap-3">
                {submitResult === 'error' && (
                  <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed || submitting}
                  className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 disabled:from-stone-300 disabled:to-stone-400 disabled:cursor-not-allowed text-stone-50 font-bold transition-all shadow-lg hover:shadow-xl disabled:shadow-none"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Pošiljam...
                    </span>
                  ) : currentStep === 5 ? 'Pošlji Povpraševanje' : state.editingFromSummary ? 'Shrani & Pregled' : 'Naprej'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
