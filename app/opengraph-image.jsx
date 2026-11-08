import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OpenGraphImage() { return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 72, background: '#111a23', color: '#f6fbf4' }}><div style={{ fontSize: 88, fontWeight: 700, color: '#91df2e' }}>Axivy</div><div style={{ marginTop: 24, fontSize: 42 }}>Make sure every customer enquiry gets answered.</div></div>, size); }
