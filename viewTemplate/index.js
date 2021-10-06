import { makeHtmlAttributes } from './utils'

const template = async ({
    attributes,
    files,
    meta,
    publicPath,
    title
}) => {
    const appRoot = '<div id="root"></div>'
    const defaultMeta = `
        <meta name="viewport" content="width=device-width, initial-scale=1">
    `
    const scripts = (files.js || [])
        .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.script);
            return `<script src="${publicPath}${fileName}"${attrs}></script>`;
        })
        .join('\n');

    const links = (files.css || [])
        .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.link);
            return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
        })
        .join('\n');

    const metas = meta
        .map((input) => {
            const attrs = makeHtmlAttributes(input);
            return `<meta${attrs}>`;
        })
        .join('\n');

    return `
  <!doctype html>
  <html${makeHtmlAttributes(attributes.html)}>
    <head>
      ${defaultMeta}
      ${metas}
      <title>${title}</title>
      ${links}
    </head>
    <body>
      ${appRoot}
      ${scripts}
    </body>
  </html>`;
};

export default template