export default function loadArticles(cb: (articles: any[]) => void) {
  fetch(
    'https://newsapi.org/v2/everything?q=business&from=2026-04-10&sortBy=popularity&language=ru&pageSize=10&page=1&apiKey=100fa1dec0c3431d9c077a51cd9e49a7',
  )
    .then((res) => res.json())
    .then((data) => {
      return data.articles.map((article: Record<string, any>, index: number) => ({
        id: `article-${String(index + 1)}`,
        label: article.title,
        icon: 'card-text',
        path: { name: 'article', params: { article: `article-${String(index + 1)}` } },
        ...article,
      }))
    })
    .then((newArticles: any[]) => {
      cb(newArticles)
    })
}
