export default function Header() {
  return (
    <header>
      <button className="dd-toggle">
      <img src="logo.png" alt="" className="dd-toggle__logo" />
      </button>
      <button className="dd-toggle">
      <img src="DefaultIMG.jpg" alt="" className="dd-toggle__img" />
      <span className="dd-toggle__username">Tawfique</span>
      </button>
    </header>
  );
}
