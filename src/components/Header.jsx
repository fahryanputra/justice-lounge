import styles from "styles/header.module.css";
import logo from "assets/images/logo.webp";

function Header() {
  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="Logo" />
        <div className={styles.title}>
          <p className={styles.top}>-Justice-</p>
          <p className={styles.bottom}>Lounge</p>
        </div>
      </header>
    </>
  );
}

export default Header;
