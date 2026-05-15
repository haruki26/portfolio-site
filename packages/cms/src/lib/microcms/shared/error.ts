class NotPublishedError extends Error {
  constructor(articleId: string) {
    super(`The article with id: ${articleId} is not published.`)
    this.name = 'NotPublishedError'
  }
}

export { NotPublishedError }
