import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deletePost } from '@/app/actions';

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen   font-sans">
      
      
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center ">
        <div className="flex items-center gap-2">
          
          <span className="text-2xl font-bold tracking-tight">Madara's Blog</span>
        </div>
        
      </nav>

      
      <header className="max-w-4xl mx-auto text-center px-6 py-20">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
        Share Your Story
        </h1>
        <p className="text-black-400 text-lg sm:text-xl mt-4 max-w-2xl mx-auto font-light">
          Create a Beautiful Blog.
        </p>
        
        <div className="mt-8">
          <Link
            href="/admin/add"
            className="inline-block bg-green-500 hover:bg-green-600 text-slate-950 font-bold px-8 py-3.5 rounded-md text-base tracking-wider uppercase shadow-lg transition transform hover:-translate-y-0.5"
          >
            CREATE YOUR BLOG
          </Link>
        </div>
      </header>

     
      <main className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-semibold text-black-400 mb-6 border-b border-slate-800 pb-2">
          Latest Posts
        </h2>

        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/50 rounded-lg border border-slate-800 text-slate-400">
              No Blogs yet
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="bg-white-800/80 rounded-lg p-6 border border-black-700 shadow-md hover:border-black-600 transition"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    
                    <div className="flex items-center gap-2 text-xs font-semibold mb-2">
                      <span className="text-orange-400 uppercase tracking-wider">
                        
                      </span>
                      <span className="text-black-500">•</span>
                      <span className="text-black-400">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    
                    <h3 className="text-2xl font-bold text-black-100">
                      {post.title}
                    </h3>

                 
                    <p className="text-xs text-black-400 mt-1">
                      By <span className="text-black-200 font-medium">{post.author || 'Madara'}</span>
                    </p>
                  </div>

                  
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    
                    <form action={deletePost.bind(null, post.id)}>
                      <button
                        type="submit"
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>

                
                <p className="text-black-300 mt-4 text-sm font-medium italic border-l-2 border-orange-500 pl-3">
                  {post.description}
                </p>
                <div className="text-black-300 mt-3 whitespace-pre-line text-sm leading-relaxed">
                  {post.content}
                </div>
              </article>
            ))
          )}
        </div>
      </main>

    </div>
  );
}