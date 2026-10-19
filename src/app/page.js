
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { auth } from '../../auth';
import { logout } from '@/app/actions';

export const dynamic = 'force-dynamic';

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function readingTime(text = '') {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function Home({ searchParams }) {
  const session = await auth();

  const params = await searchParams;

  const search = (params?.q || '').trim();

  const currentPage = Math.max(
    1,
    Number.parseInt(params?.page || '1', 10) || 1
  );

  const postsPerPage = 6;

  const where = search
    ? {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }
    : {};

  const [posts, totalPosts] = await Promise.all([
    prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (currentPage - 1) * postsPerPage,
      take: postsPerPage,
    }),

    prisma.post.count({ where }),
  ]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#26251F]">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-10 border-b border-[#E8E3DA] bg-[#FAF8F4]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            The Blog<span className="text-[#B96F52]">.</span>
          </Link>

          <div className="flex items-center gap-4 text-sm font-medium sm:gap-6">
            <Link
              href="/"
              className="transition hover:text-[#B96F52]"
            >
              Home
            </Link>

            <a
              href="#articles"
              className="hidden transition hover:text-[#B96F52] sm:block"
            >
              Articles
            </a>

            {session?.user ? (
              <>

                <Link
                  href="/my-blogs"
                  className="transition hover:text-[#B96F52]"
                >
                  My Blogs
                </Link>

                <Link
                  href="/profile"
                  className="transition hover:text-[#B96F52]"
                >
                  Profile
                </Link>

                <form action={logout}>
                  <button
                    type="submit"
                    className="transition hover:text-[#B96F52]"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="transition hover:text-[#B96F52]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-full bg-[#26251F] px-4 py-2 text-white transition hover:bg-[#B96F52]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-28">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#B96F52]">
          Share Your Story
        </p>

        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Every storys
          <br />
          <span className="font-serif italic text-[#B96F52]">
            deserves to be told.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#77736A] sm:text-lg">
          Discover new ideas, share your experiences, and connect
          with people through the power of writing.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          

          {session?.user ? (
            <Link
              href="/admin/add"
              className="rounded-full bg-[#B96F52] px-4 py-3 text-white font-bold transition hover:bg-[#B96F52]"
            >
              CREATE YOUR BLOG 
            </Link>
          ) : (
            <Link
              href="/register"
              className="rounded-full bg-[#B96F52] px-4 py-3 text-white transition hover:bg-[#B96F52]"
            >
            CREATE YOUR BLOG
            </Link>
          )}
        </div>
      </header>

      
      <section
        id="articles"
        className="scroll-mt-20 border-t border-[#E8E3DA] bg-[#F3F0E9]"
      >
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">

        <form
            action="/"
            method="GET"
            className="mb-8 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="search"
              name="q"
              defaultValue={search}
              placeholder="Search articles, topics, or stories..."
              className="w-full rounded-full border border-[#D8D0C5] bg-[#FAF8F4] px-5 py-3 text-sm outline-none focus:border-[#B96F52] focus:ring-1 focus:ring-[#B96F52]"
            />

            <button
              type="submit"
              className="rounded-full bg-[#26251F] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#B96F52]"
            >
              Search
            </button>
          </form>
          

          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B96F52]">
                Discover
              </p>


              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Latest Articles
              </h2>

              <p className="mt-2 text-sm text-[#77736A]">
                Fresh ideas and stories from our community.
              </p>
            </div>

            <span className="shrink-0 text-sm text-[#77736A]">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#D8D0C5] bg-[#FAF8F4] px-6 py-14 text-center">
              <h3 className="text-xl font-semibold">
                Be the first to share a story.
              </h3>

              <p className="mt-3 text-sm text-[#77736A]">
                Join the community and publish your first blog post.
              </p>

              <Link
                href={session?.user ? '/admin/add' : '/register'}
                className="mt-6 inline-flex rounded-full bg-[#26251F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B96F52]"
              >
                {session?.user ? 'Create Blog +' : 'Start Writing +'}
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-2xl border border-[#E8E3DA] bg-[#FAF8F4] p-6 transition hover:border-[#D3B19B] hover:shadow-sm sm:p-7"
                >
                 <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-[#8B857A]">
                    <span>{formatDate(post.createdAt)}</span>
                    <span>·</span>
                    <span>{readingTime(post.content)} min read</span>
                    <span>·</span>
                    <span className="font-medium text-[#B96F52]">
                      By {post.author?.name || 'Community Member'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#77736A]">
                    {post.description}
                  </p>

                  <div className="mt-5 border-t border-[#E8E3DA] pt-4">
                    <Link
                      href={`/posts/${post.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#B96F52] transition hover:text-[#8E4D37]"
                    >
                      Read Full Article <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      
      <footer className="border-t border-[#E8E3DA] bg-[#FAF8F4]">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-7 text-center text-sm text-[#8B857A] sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="font-semibold text-[#26251F]">
            The Blog<span className="text-[#B96F52]">.</span>
          </Link>

          <p>
            © {new Date().getFullYear()} The Blog. Share your story.
          </p>

          
        </div>
      </footer>
    </main>
  );
}
