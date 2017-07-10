import React from 'react';
import './Footer.component.css';

export default function Footer() {
  return (
    <footer className="footer">
      <a href="https://www.yandex.ru" className="footer__yandex-link">
        Яндекс
      </a>
      <div className="footer__copyright-wrapper">
        <a
          href="https://academy.yandex.ru"
          className="footer__yandex-academy-link"
        >
          Яндекс.Академия
        </a>
        <div className="footer__copyright">
          <span>© 2017 ООО</span>
          <a href="https://www.yandex.ru" className="footer__copyright-yandex">
            «Яндекс»
          </a>
        </div>
      </div>
    </footer>
  );
}
