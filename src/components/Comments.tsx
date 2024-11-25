import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';

interface Comment {
  id: number;
  content: string;
  created_at: string;
  user_name: string;
}

export function Comments({ articleId }: { articleId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    loadComments();
  }, [articleId]);

  async function loadComments() {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('article_id', articleId)
      .order('created_at', { ascending: false });

    if (data) setComments(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const { error } = await supabase
      .from('comments')
      .insert([{
        article_id: articleId,
        content: newComment,
        user_name: userName
      }]);

    if (!error) {
      setNewComment('');
      loadComments();
    }
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-8">Comments</h3>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-2 bg-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full px-4 py-2 bg-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[100px]"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition-colors"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-zinc-900 p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{comment.user_name}</span>
              <span className="text-sm text-gray-400">
                {format(new Date(comment.created_at), 'MMM d, yyyy')}
              </span>
            </div>
            <p className="text-gray-300">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}