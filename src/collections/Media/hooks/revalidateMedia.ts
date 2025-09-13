import type { CollectionAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidateMedia: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  // Follow official Payload pattern - minimal and targeted
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating for media change: ${doc.id}`)

    // Only use tags - let pages handle their own revalidation
    revalidateTag('posts-sitemap')
  }

  return doc
}