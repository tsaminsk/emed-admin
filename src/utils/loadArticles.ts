export default function loadArticles(cb: (articles: any[]) => void) {
  fetch('http://api.beinweb.ru/load_news.php')
    .then((res) => res.json())
    .then((articles) => {
      console.log('articles', articles)

      return articles.map((article: Record<string, any>, index: number) => ({
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
