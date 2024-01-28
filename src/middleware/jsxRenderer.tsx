import { jsxRenderer } from "https://deno.land/x/hono@v3.12.8/middleware.ts";

import { Document } from "../templates/Document.tsx";
import { Layout } from "../templates/Layout.tsx";

export const jsxMiddleware = jsxRenderer((props) => (
  <Document>
    <Layout>{props.children}</Layout>
  </Document>
));
