import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <title>NHL Dashboard</title>
          <link
            rel="shortcut icon"
            href="//www-league.nhlstatic.com/nhl.com/builds/site-core/110a9c0469acd8a9fe4461c328c4d3263d2dcd2d_1523369315/images/favicon.ico"
          />
          <link rel="stylesheet" href="/static/reset.css" />
          <link rel="stylesheet" href="/static/global.css" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto"
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
