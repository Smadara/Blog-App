
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { auth } from '../../../../auth';

export const dynamic = 'force-dynamic';

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function readingTime(text = '') {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogDetailsPage({ params }) {
  const { id } = await params;
  const session = await auth();

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FAF8F4] px-5 py-10 text-[#26251F] sm:py-16">
      <article className="mx-auto max-w-3xl">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            The Blog<span className="text-[#B96F52]">.</span>
          </Link>

          <Link
            href="/"
            className="text-sm text-[#77736A] transition hover:text-[#B96F52]"
          >
            Home
          </Link>
        </nav>

        <header className="mt-12 border-b border-[#E8E3DA] pb-8 sm:mt-16">
          <Link
            href="/"
            className="text-sm font-medium text-[#B96F52] hover:underline"
          >
            ← Back to Articles
          </Link>

          <p className="mt-8 text-sm text-[#8B857A]">
            {formatDate(post.createdAt)} · {readingTime(post.content)} min read
          </p>

          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-[#77736A]">
            {post.description}
          </p>

          <p className="mt-6 text-sm font-medium text-[#B96F52]">
            By {post.author?.name || 'Community Member'}
          </p>
        </header>

        <div className="whitespace-pre-wrap py-10 text-base leading-8 text-[#514D45] sm:py-12 sm:text-lg sm:leading-9">
          {post.content}
        </div>

        {session?.user?.id === post.authorId && (
          <div className="flex flex-wrap gap-3 border-t border-[#E8E3DA] pt-6">
            <Link
              href={`/my-blogs/${post.id}/edit`}
              className="rounded-full bg-[#26251F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B96F52]"
            >
              Edit Blog
            </Link>

            <Link
              href="/my-blogs"
              className="rounded-full border border-[#D8D0C5] px-5 py-3 text-sm font-semibold transition hover:border-[#B96F52] hover:text-[#B96F52]"
            >
              My Blogs
            </Link>
          </div>
        )}

        <footer className="mt-12 border-t border-[#E8E3DA] pt-6">
          <Link
            href="/"
            className="text-sm font-semibold text-[#B96F52] hover:underline"
          >
            ← Discover more articles
          </Link>
        </footer>
      </article>
    </main>
  );
}