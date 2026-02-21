import { Check } from 'lucide-react';

const STEPS = [
    { number: 1, label: 'Pilih Menu' },
    { number: 2, label: 'Detail Acara' },
    { number: 3, label: 'Konfirmasi' },
];

interface BookingStepperProps {
    currentStep: number;
}

export default function BookingStepper({ currentStep }: BookingStepperProps) {
    return (
        <div className="flex items-center justify-center w-full max-w-2xl mx-auto py-8 px-4">
            {STEPS.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1 last:flex-none">
                    {/* Step Circle + Label */}
                    <div className="flex flex-col items-center gap-2">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${currentStep > step.number
                                    ? 'bg-green-500 text-white shadow-md shadow-green-200'
                                    : currentStep === step.number
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110'
                                        : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                                }`}
                        >
                            {currentStep > step.number ? (
                                <Check className="w-5 h-5" />
                            ) : (
                                step.number
                            )}
                        </div>
                        <span
                            className={`text-xs font-medium whitespace-nowrap transition-colors ${currentStep >= step.number ? 'text-text-main' : 'text-gray-400'
                                }`}
                        >
                            {step.label}
                        </span>
                    </div>

                    {/* Connector Line */}
                    {index < STEPS.length - 1 && (
                        <div className="flex-1 mx-3 mb-6">
                            <div className="h-[2px] w-full rounded-full overflow-hidden bg-gray-200">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${currentStep > step.number
                                            ? 'w-full bg-green-500'
                                            : currentStep === step.number
                                                ? 'w-1/2 bg-primary'
                                                : 'w-0 bg-gray-200'
                                        }`}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
