import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function Header(props) {
  return (
    <header>
      <button className="dd-toggle">
        <img src="https://i.ibb.co/tMp0073/logo.png" alt="" className="dd-toggle__logo" />
      </button>

      {props.isLogged ? (
        <>
          <button className="dd-toggle" onClick={props.GoogleLogout}>
            <img src={props.picture} referrerPolicy="no-referrer" alt="" className="dd-toggle__img" />
            <span className="dd-toggle__username">{props.name}</span>{" "}
              <ExitToAppIcon fontSize="large" />
          </button>
        </>
      ) : (
        <button className="dd-toggle" onClick={props.GoogleLogin}>
          <span className="login-with-google-btn dd-toggle__username">
            Login
          </span>
        </button>
      )}
    </header>
  );
}
