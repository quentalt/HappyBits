import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';

interface SearchBarProps {
  genres?: { id: number; name: string }[];
}

export interface SearchParams {
  query: string;
  date?: string;
  genre?: number;
}

export function SearchBar({ genres = [] }: SearchBarProps) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: '',
    date: '',
    genre: undefined,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (params: SearchParams) => {
    setIsSearching(true);

    try {
      let query = supabase
        .from('articles')
        .select(`
          *,
          authors (name),
          genres (name)
        `);

      if (params.query) {
        query = query.ilike('title', `%${params.query}%`);
      }

      if (params.date) {
        query = query.eq('date', params.date);
      }

      if (params.genre) {
        query = query.eq('genre_id', params.genre);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setSearchResults(data || []);
      
      if (data?.length === 0 && params.query) {
        toast.error('No results found');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to perform search');
    } finally {
      setIsSearching(false);
    }
  };

  const debouncedSearch = debounce(performSearch, 300);

  useEffect(() => {
    debouncedSearch(searchParams);
    return () => debouncedSearch.cancel();
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          name="query"
          placeholder="Search articles..."
          className="flex-1 px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={searchParams.query}
          onChange={handleInputChange}
        />
        
        <input
          type="date"
          name="date"
          className="px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={searchParams.date}
          onChange={handleInputChange}
        />
        
        {genres.length > 0 && (
          <select
            name="genre"
            className="px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={searchParams.genre}
            onChange={handleInputChange}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((article: any) => (
            <article key={article.id} className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
              <a href={`/article/${article.id}`}>
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <span className="bg-purple-600 text-xs font-semibold px-2.5 py-0.5 rounded-full text-white">
                    {article.genres.name}
                  </span>
                  <time className="text-purple-400 text-sm block mt-2">
                    {format(new Date(article.date), 'MMMM dd, yyyy')}
                  </time>
                  <h3 className="text-xl font-bold text-black dark:text-white mt-2">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">{article.excerpt}</p>
                  <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    By {article.authors.name}
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}