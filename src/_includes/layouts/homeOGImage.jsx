export default function HomeOGImage() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row ',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(30 30 46)',
        gap: '20px',
        padding: 20,
        fontFamilly: 'ui-sans-serif, system-ui, sans-serif',
      }}
    >
      <img
        style={{
          border: 'solid 1px rgb(49 50 68)',
          borderRadius: '0.25rem',
        }}
        width={220}
        src="https://fveracoechea.com/images/me.jpg"
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1px',
        }}
      >
        <div
          style={{ fontSize: 40, lineHeight: 1, color: 'rgb(137, 180, 250)' }}
        >
          Francisco
        </div>
        <div
          style={{ fontSize: 40, lineHeight: 1, color: 'rgb(137, 180, 250)' }}
        >
          Veracoechea
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1,
            color: 'rgb(186 194 222)',
          }}
        >
          Frontend Engineer
        </div>

        <img width={240} src="https://fveracoechea.com/images/cat-waves.png" />
      </div>
    </div>
  );
}
