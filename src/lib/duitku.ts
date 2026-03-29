import crypto from 'crypto';

const MERCHANT_CODE = process.env.DUITKU_MERCHANT_CODE!;
const API_KEY = process.env.DUITKU_API_KEY!;
const BASE_URL = process.env.DUITKU_BASE_URL ?? 'https://sandbox.duitku.com/webapi/api/merchant';

export interface DuitkuTransactionResult {
    reference: string;
    paymentUrl: string;
}

export async function createDuitkuTransaction(params: {
    merchantOrderId: string;
    paymentAmount: number;
    paymentMethod: string;
    productDetails: string;
    customerName: string;
    customerEmail: string;
    callbackUrl: string;
    returnUrl: string;
    expiryPeriod?: number; // menit, default 1440 (24 jam)
}): Promise<DuitkuTransactionResult> {
    const signature = crypto
        .createHash('md5')
        .update(`${MERCHANT_CODE}${params.merchantOrderId}${params.paymentAmount}${API_KEY}`)
        .digest('hex');

    const body = {
        merchantCode: MERCHANT_CODE,
        paymentAmount: params.paymentAmount,
        paymentMethod: params.paymentMethod,
        merchantOrderId: params.merchantOrderId,
        productDetails: params.productDetails,
        customerVaName: params.customerName,
        email: params.customerEmail,
        callbackUrl: params.callbackUrl,
        returnUrl: params.returnUrl,
        signature,
        expiryPeriod: params.expiryPeriod ?? 1440,
    };

    const res = await fetch(`${BASE_URL}/v2/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    const text = await res.text();
    console.log('[Duitku] status:', res.status, 'body:', text);

    let data: Record<string, unknown>;
    try {
        data = JSON.parse(text);
    } catch {
        throw new Error(`Duitku error: HTTP ${res.status} - ${text.slice(0, 200)}`);
    }

    if (data.statusCode !== '00') {
        throw new Error(`Duitku error: ${data.statusMessage ?? JSON.stringify(data)}`);
    }

    return {
        reference: data.reference as string,
        paymentUrl: data.paymentUrl as string,
    };
}

export async function getDuitkuPaymentMethods(amount: number): Promise<Array<{ code: string; name: string; image: string; fee: string }>> {
    const datetime = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const signature = crypto
        .createHash('md5')
        .update(`${MERCHANT_CODE}${amount}${datetime}${API_KEY}`)
        .digest('hex');

    const res = await fetch(`${BASE_URL}/paymentmethod/getpaymentmethod`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantcode: MERCHANT_CODE, amount, datetime, signature }),
    });

    const text = await res.text();
    console.log('[Duitku] payment methods:', text);

    let data: Record<string, unknown>;
    try { data = JSON.parse(text); } catch { return []; }

    if (!Array.isArray(data.paymentFee)) return [];
    return (data.paymentFee as Array<{ paymentMethod: string; paymentName: string; paymentImage: string; totalFee: string }>).map(m => ({
        code: m.paymentMethod,
        name: m.paymentName,
        image: m.paymentImage,
        fee: m.totalFee,
    }));
}

export function verifyDuitkuCallback(params: {
    merchantCode: string;
    amount: string;
    merchantOrderId: string;
    signature: string;
}): boolean {
    const expected = crypto
        .createHash('md5')
        .update(`${params.merchantCode}${params.amount}${params.merchantOrderId}${API_KEY}`)
        .digest('hex');
    return expected === params.signature;
}
