export default function BrowserFrame({ children, label = 'Browser preview' }) {
  return <div className="browser-frame" aria-label={label}><div className="browser-frame-bar" aria-hidden><i /><i /><i /></div>{children}</div>;
}
