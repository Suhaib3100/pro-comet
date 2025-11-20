import { useEffect, useState } from 'react';

interface Article {
  title: string;
  content: string;
  url: string;
  thumbnail: string;
}

const NewsArticleWidget = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/discover?mode=preview')
      .then((res) => res.json())
      .then((data) => {
        const articles = (data.blogs || []).filter((a: Article) => a.thumbnail);
        setArticle(articles[Math.floor(Math.random() * articles.length)]);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="glass-strong rounded-2xl sm:rounded-3xl liquid-border shadow-xl shadow-black/50 flex flex-row items-stretch w-full h-20 sm:h-24 min-h-[80px] sm:min-h-[96px] max-h-[80px] sm:max-h-[96px] p-0 overflow-hidden hover:border-white/20 smooth-transition active:scale-[0.98]">
      {loading ? (
        <div className="animate-pulse flex flex-row items-stretch w-full h-full">
          <div className="w-20 min-w-20 max-w-20 sm:w-24 sm:min-w-24 sm:max-w-24 h-full glass" />
          <div className="flex flex-col justify-center flex-1 px-2.5 sm:px-3 py-2 gap-1.5 sm:gap-2">
            <div className="h-3 sm:h-4 w-3/4 rounded glass" />
            <div className="h-2.5 sm:h-3 w-1/2 rounded glass" />
          </div>
        </div>
      ) : error ? (
        <div className="w-full text-xs text-red-400 flex items-center justify-center">Could not load news.</div>
      ) : article ? (
        <a
          href={`/?q=Summary: ${article.url}`}
          className="flex flex-row items-stretch w-full h-full relative overflow-hidden group"
        >
          <div className="relative w-20 min-w-20 max-w-20 sm:w-24 sm:min-w-24 sm:max-w-24 h-full overflow-hidden">
            <img
              className="object-cover w-full h-full glass group-hover:scale-110 smooth-transition duration-300"
              src={
                new URL(article.thumbnail).origin +
                new URL(article.thumbnail).pathname +
                `?id=${new URL(article.thumbnail).searchParams.get('id')}`
              }
              alt={article.title}
            />
          </div>
          <div className="flex flex-col justify-center flex-1 px-2.5 sm:px-3 py-2">
            <div className="font-semibold text-[11px] sm:text-xs text-white leading-tight line-clamp-2 mb-0.5 sm:mb-1">
              {article.title}
            </div>
            <p className="text-white/60 text-[9px] sm:text-[10px] leading-relaxed line-clamp-2">
              {article.content}
            </p>
          </div>
        </a>
      ) : null}
    </div>
  );
};

export default NewsArticleWidget;
