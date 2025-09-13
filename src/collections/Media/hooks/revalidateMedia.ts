import { revalidatePath } from 'next/cache'

import type { CollectionAfterChangeHook } from 'payload'

export const revalidateMedia: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  // Revalidate regardless of status since media can be used anywhere
  const paths = [
    '/',           // Home page
    '/posts',      // Posts listing
    '/[slug]',     // Dynamic pages
    '/(pages)/[slug]',  // Frontend pages
  ]

  paths.forEach(path => {
    payload.logger.info(`Revalidating media-related path: ${path}`)
    revalidatePath(path)
  })

  // Also revalidate tag-based cache
  revalidatePath('/', 'layout')

  return doc
}