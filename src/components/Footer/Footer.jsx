import React, { Component } from "react";
import { Grid } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <nav className="pull-left">
            <ul>
              <li>
                <a href="#">Inicio</a>
              </li>
              <li>
                <a href="https://github.com/alcalawil" target="_blank">
                  Portfolio
                </a>
              </li>
            </ul>
          </nav>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://www.linkedin.com/in/wilfredo-alcala/"
              target="_blank"
            >
              by Wilfredo Alcala
            </a>
            , en casa
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
