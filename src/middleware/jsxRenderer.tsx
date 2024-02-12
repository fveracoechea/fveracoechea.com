import { jsxRenderer } from "hono/middleware";

import { Document } from "../components/Document.tsx";
import { Layout } from "../components/Layout.tsx";

export const jsxMiddleware = jsxRenderer(
  (props) => (
    <Document>
      <Layout>{props.children}</Layout>
    </Document>
  ),
  { stream: true },
);
