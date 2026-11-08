export default function PhoneFrame({ children, label = 'Phone preview' }) {
  return <div className="phone-frame" aria-label={label}><div className="phone-frame-speaker" aria-hidden />{children}</div>;
}
