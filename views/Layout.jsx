const React = require('react');

module.exports = function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="/js/newTrack.js" defer />
        <script src="/js/deleteTrack.js" defer />
        <script src="/js/editTrack.js" defer />
        <script src="/js/searchTrack.js" defer />
        <title>Codex test</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};
