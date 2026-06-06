export default function NACLogo({ size = 32 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #F59E0B 100%)',
        fontSize: size * 0.38,
        boxShadow: '0 0 15px rgba(59,130,246,0.4)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 900,
        color: '#0A0E1A',
        flexShrink: 0,
      }}
    >
      N
    </div>
  );
}