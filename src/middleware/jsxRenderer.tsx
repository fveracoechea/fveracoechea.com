import { jsxRenderer } from "hono/middleware";

import { Document } from "../templates/Document.tsx";
import { Layout } from "../templates/Layout.tsx";

export const jsxMiddleware = jsxRenderer(
  (props) => (
    <Document>
      <Layout>{props.children}</Layout>
    </Document>
  ),
  { stream: true },
);
