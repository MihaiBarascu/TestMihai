import { revalidatePath, revalidateTag } from 'next/cache'

import type { CollectionAfterChangeHook } from 'payload'

export const revalidateMedia: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  payload.logger.info(`Revalidating all paths due to media change: ${doc.id}`)

  // Nuclear option - revalidate everything
  try {
    // Revalidate all possible paths
    revalidatePath('/', 'layout')
    revalidatePath('/', 'page')
    revalidatePath('/posts', 'page')
    revalidatePath('/posts', 'layout')

    // Revalidate common tags
    revalidateTag('posts')
    revalidateTag('pages')
    revalidateTag('media')

    // Specific paths
    const paths = [
      '/',
      '/posts',
      '/[slug]',
      '/(frontend)',
      '/(frontend)/[slug]',
      '/(pages)/[slug]'
    ]

    paths.forEach(path => {
      revalidatePath(path, 'page')
      revalidatePath(path, 'layout')
    })

    payload.logger.info('Successfully revalidated all paths for media change')
  } catch (error) {
    payload.logger.error('Error revalidating paths:', error)
  }

  return doc
}