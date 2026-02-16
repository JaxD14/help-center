/**
 * Search utility functions for the help center
 */

/**
 * Highlights search terms in a text string
 * @param {string} text - The text to search in
 * @param {string} searchTerm - The term to highlight
 * @returns {string} Text with highlighted search terms
 */
export function highlightSearchTerm(text, searchTerm) {
  if (!searchTerm || !text) {
    return text;
  }
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

/**
 * Filters articles based on search query
 * @param {Array} articles - Array of article objects
 * @param {string} query - Search query string
 * @returns {Array} Filtered articles
 */
export function filterArticles(articles, query) {
  if (!query || !articles) {
    return articles || [];
  }
  
  const lowerQuery = query.toLowerCase();
  return articles.filter(article => {
    const title = (article.title || '').toLowerCase();
    const content = (article.content || '').toLowerCase();
    return title.includes(lowerQuery) || content.includes(lowerQuery);
  });
}

/**
 * Calculates search relevance score for an article
 * @param {Object} article - Article object
 * @param {string} query - Search query
 * @returns {number} Relevance score (0-100)
 */
export function calculateRelevanceScore(article, query) {
  if (!query || !article) {
    return 0;
  }
  
  const lowerQuery = query.toLowerCase();
  const title = (article.title || '').toLowerCase();
  const content = (article.content || '').toLowerCase();
  
  let score = 0;
  
  // Title matches are worth more
  if (title.includes(lowerQuery)) {
    score += 50;
  }
  
  // Content 
  const contentMatches = (content.match(new RegExp(lowerQuery, 'gi')) || []).length;
  score += Math.min(contentMatches * 10, 50);
  
  return score;
}
