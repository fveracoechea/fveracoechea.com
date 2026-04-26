import { createBuilder } from "@content-collections/core"
import { configureLogging } from "@content-collections/integrations"

const builder = await createBuilder("./content-collections.ts")
configureLogging(builder)
await builder.build()
