export default function loadArticles(cb: (articles: any[]) => void) {
  fetch('https://beinweb.ru/api/load_news.php')
    .then((res) => res.json())
    .then((data) => {
      return (
        data.articles?.map((article: Record<string, any>, index: number) => ({
          id: `article-${String(index + 1)}`,
          label: article.title,
          icon: 'card-text',
          path: { name: 'article', params: { article: `article-${String(index + 1)}` } },
          ...article,
        })) ?? []
      )
    })
    .then((newArticles: Record<string, any>[]) => {
      cb(newArticles)
    })
}
