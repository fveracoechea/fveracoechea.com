export default function () {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row ",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(30 30 46)",
        gap: "20px",
        padding: 20,
        fontFamilly: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1px",
        }}
      >
        <div
          style={{
            fontSize: 80,
            textAlign: "center",
            lineHeight: 1,
            color: "rgb(137, 180, 250)",
          }}
        >
          Francisco Veracoechea
        </div>
        <img
          width={1000}
          height={300}
          style={{ objectFit: "cover" }}
          src="https://fveracoechea.com/images/cat-waves.png"
        />
      </div>
    </div>
  );
}
