class NotPublishedError extends Error {
  constructor(articleId: string) {
    super(`The article with id: ${articleId} is not publised.`)
    this.name = 'NotPublishedError'
  }
}

export { NotPublishedError }
