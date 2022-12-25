function Footer() {
  return (
    <footer className="page-footer teal darken-3">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
          <h6 className="white-text">
            The simple project for portfolio
          </h6>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
        © {new Date().getFullYear()} GPL
        </div>
      </div>
    </footer>
  );
}

export { Footer };