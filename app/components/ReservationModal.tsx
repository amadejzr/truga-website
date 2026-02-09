'use client';

import { useReducer, useRef, useEffect } from 'react';
import type { ReservationData, RoofTypeChoice } from '../data/products';
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
}

type WizardAction =
  | { type: 'SELECT_BOX'; boxId: number | null }
  | { type: 'SET_ROOF_TYPE'; roofType: RoofTypeChoice }
  | { type: 'SET_DATES'; start: Date; end: Date }
  | { type: 'SET_DETAIL'; field: 'name' | 'email' | 'phone' | 'vehicleDescription' | 'notes'; value: string }
  | { type: 'GO_TO_STEP'; step: WizardStep }
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
    },
  };
}

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SELECT_BOX':
      return { ...state, data: { ...state.data, selectedBoxId: action.boxId } };

    case 'SET_ROOF_TYPE':
      return { ...state, data: { ...state.data, roofType: action.roofType } };

    case 'SET_DATES':
      return { ...state, data: { ...state.data, startDate: action.start, endDate: action.end } };

    case 'SET_DETAIL':
      return { ...state, data: { ...state.data, [action.field]: action.value } };

    case 'GO_TO_STEP':
      return { ...state, currentStep: action.step };

    case 'NEXT_STEP': {
      const next = Math.min(state.currentStep + 1, 5) as WizardStep;
      return { ...state, currentStep: next };
    }

    case 'PREV_STEP': {
      const prev = Math.max(state.currentStep - 1, 1) as WizardStep;
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
      return true; // Box selection is optional
    case 2:
      return data.roofType !== null;
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
    }
  }, [isOpen, preSelection]);

  if (!isOpen) return null;

  const completedSteps = new Set<number>();
  for (let s = 1; s < currentStep; s++) completedSteps.add(s);

  const canProceed = isStepValid(currentStep, data);

  const handleNext = () => {
    if (currentStep === 5) {
      console.log('Inquiry submitted:', data);
      alert('Povpraševanje oddano! V kratkem vas bomo kontaktirali.');
      onClose();
      return;
    }
    dispatch({ type: 'NEXT_STEP' });
  };

  const handleBack = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-stone-50 dark:bg-zinc-900 rounded-[2rem] max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl">
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
            />
          )}
          {currentStep === 3 && (
            <StepDatePicker
              startDate={data.startDate}
              endDate={data.endDate}
              onDateSelect={(start, end) => {
                if (start && end) dispatch({ type: 'SET_DATES', start, end });
              }}
            />
          )}
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
              onGoToStep={(step) => dispatch({ type: 'GO_TO_STEP', step: step as WizardStep })}
            />
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between shrink-0 bg-stone-50 dark:bg-zinc-900 rounded-b-[2rem]">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2.5 rounded-xl bg-stone-200 dark:bg-zinc-700 text-zinc-700 dark:text-stone-300 font-medium hover:bg-stone-300 dark:hover:bg-zinc-600 transition-colors"
            >
              Nazaj
            </button>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed}
            className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 disabled:from-stone-300 disabled:to-stone-400 disabled:cursor-not-allowed text-stone-50 font-bold transition-all shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            {currentStep === 5 ? 'Pošlji Povpraševanje' : 'Naprej'}
          </button>
        </div>
      </div>
    </div>
  );
}
