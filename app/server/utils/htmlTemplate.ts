import { HelmetData } from "react-helmet";

export default function htmlTemplate(
  reactDom: string,
  styleTags: string,
  scriptTags: string,
  initialState: string,
  helmetData?: HelmetData
): String {
  const title =
    helmetData && helmetData.title ? helmetData.title.toString() : "";
  const meta = helmetData && helmetData.meta ? helmetData.meta.toString() : "";

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <link href="./favicon.ico" rel="icon" type="image/x-icon" />
  <link rel="apple-touch-icon" href="/static/icons/icon-192x192.png">
  <meta name="theme-color" content="#008080"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="keywords" content="ReactJS, Typescript, GraphQL, Node, ExpressJS, SSR ">
  <meta name="robots" content="index, follow">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="language" content="English">
  <meta name="revisit-after" content="30 days">
  <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
  <script>
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(function(registration) {
          console.log("Registration successful, scope is:", registration.scope);
        })
        .catch(function(error) {
          console.log("Service worker registration failed, error:", error);
        });
    }
  </script>
  <link rel="manifest" href="manifest.json">
    ${title}
    ${meta}
    ${styleTags}
  </head>
  <body>
  <div id="root">${reactDom}</div>
  <script>window.__APOLLO_STATE__ = ${initialState};</script>
  ${scriptTags}
  </body>
  </html>
  `;
}

