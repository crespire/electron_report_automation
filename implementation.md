Factory: Output
|- PDF
|- XLSX

Singleton API object

Looks like @react-pdf/renderer is not maintained and does not support React 18.
The next step up the chain is to do a template in HTML and render as PDF via
EJS and puppeteer (headless Chrome).

Not an ideal solution, but it is actually much closer to my Ruby solution, so
maybe I can reuse that report template.