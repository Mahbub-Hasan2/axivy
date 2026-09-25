export const AXIVY_WHATSAPP = 'https://wa.me/97471083700';
export const AXIVY_PHONE = '+974 7108 3700';
export const AXIVY_LOCATION = 'Doha, Qatar';

export function whatsappUrl(message) {
  return `${AXIVY_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
