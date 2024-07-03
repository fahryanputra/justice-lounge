import styles from "styles/footer.module.css";

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <p>
          Made with{" "}
          <span role="img" aria-label="love">
            ❤
          </span>{" "}
          by Ciplun
        </p>
      </footer>
    </>
  );
}

export default Footer;
