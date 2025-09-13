import { revalidatePath, revalidateTag } from 'next/cache'

import type { CollectionAfterChangeHook } from 'payload'

export const revalidateMedia: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  payload.logger.info(`Revalidating media and related content: ${doc.id}`)

  try {
    // Critical: Revalidate both page AND layout to clear image cache
    revalidatePath('/', 'layout')
    revalidatePath('/', 'page')
    revalidatePath('/posts', 'layout')
    revalidatePath('/posts', 'page')

    // Revalidate all dynamic routes where images might appear
    revalidatePath('/[slug]', 'layout')
    revalidatePath('/[slug]', 'page')
    revalidatePath('/posts/[slug]', 'layout')
    revalidatePath('/posts/[slug]', 'page')

    // Tag-based revalidation for broader coverage
    revalidateTag('posts')
    revalidateTag('pages')
    revalidateTag('media')

    // Force revalidation of all posts that might use this media
    payload.logger.info('Media change detected - triggering comprehensive cache clear')

    payload.logger.info('Successfully revalidated all media-related caches')
  } catch (error) {
    payload.logger.error('Error in media revalidation:', error)
  }

  return doc
}