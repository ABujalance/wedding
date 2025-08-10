export interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  score?: number;
  action?: string;
  'error-codes'?: string[];
}

export async function verifyRecaptcha(
  token: string,
): Promise<RecaptchaResponse> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    throw new Error('reCAPTCHA secret key not configured');
  }

  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    },
  );

  if (!response.ok) {
    throw new Error('Failed to verify reCAPTCHA');
  }

  return response.json();
}

export function isValidRecaptcha(response: RecaptchaResponse): boolean {
  // Para reCAPTCHA v3, consideramos válido si:
  // 1. success es true
  // 2. score es mayor a 0.5 (umbral recomendado)
  return response.success && (response.score || 0) > 0.5;
}
