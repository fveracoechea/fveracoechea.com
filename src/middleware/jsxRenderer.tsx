import { jsxRenderer } from "hono/middleware";

import { Document } from "../components//templates/Document.tsx";
import { Layout } from "../components//templates/Layout.tsx";

export const jsxMiddleware = jsxRenderer(
  (props) => (
    <Document>
      <Layout>{props.children}</Layout>
    </Document>
  ),
  { stream: true },
);
