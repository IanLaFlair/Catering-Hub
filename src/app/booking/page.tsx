'use client';

import { useState } from 'react';
import BookingStepper from '@/components/booking/BookingStepper';
import MenuStep from '@/components/booking/MenuStep';
import DetailStep from '@/components/booking/DetailStep';
import ConfirmStep from '@/components/booking/ConfirmStep';
import SuccessStep from '@/components/booking/SuccessStep';

export default function BookingPage() {
    const [step, setStep] = useState(1);

    return (
        <main className="min-h-screen bg-background-light">
            <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-10 pb-20">
                {/* Stepper — hide on success */}
                {step <= 3 && <BookingStepper currentStep={step} />}

                {/* Steps */}
                {step === 1 && <MenuStep onNext={() => setStep(2)} />}
                {step === 2 && <DetailStep onNext={() => setStep(3)} onBack={() => setStep(1)} />}
                {step === 3 && <ConfirmStep onNext={() => setStep(4)} onBack={() => setStep(2)} />}
                {step === 4 && <SuccessStep />}
            </div>
        </main>
    );
}
