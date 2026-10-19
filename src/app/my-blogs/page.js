import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import { deletePost } from '@/app/actions';

export const dynamic = 'force-dynamic';

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function MyBlogsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main className="min-h-screen bg-[#FAF8F4] px-6 py-10 text-[#26251F] sm:py-16">
      <div className="mx-auto max-w-4xl">

        <Link href="/" className="text-xl font-bold">
          The Blog<span className="text-[#B96F52]">.</span>
        </Link>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B96F52]">
              Your writing space
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              My Blogs
            </h1>

            <p className="mt-3 text-sm text-[#77736A]">
              Manage the stories you have shared with the community.
            </p>
          </div>

          <Link
            href="/admin/add"
            className="rounded-full bg-[#26251F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B96F52]"
          >
            + Create Blog
          </Link>
        </div>

        <div className="mt-10">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#D8D0C5] bg-white px-6 py-14 text-center">
              <h2 className="text-xl font-semibold">
                You haven't published any blogs yet.
              </h2>

              <p className="mt-3 text-sm text-[#77736A]">
                Start writing and share your first story.
              </p>

              <Link
                href="/admin/add"
                className="mt-6 inline-flex rounded-full bg-[#26251F] px-6 py-3 text-sm font-semibold text-white hover:bg-[#B96F52]"
              >
                Write Your First Blog →
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-2xl border border-[#E8E3DA] bg-white p-6 sm:p-7"
                >
                  <p className="text-xs text-[#8B857A]">
                    Published on {formatDate(post.createdAt)}
                  </p>

                  <h2 className="mt-3 text-xl font-bold">
                    {post.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-[#77736A]">
                    {post.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3 border-t border-[#E8E3DA] pt-5">
                    <Link
                      href={`/my-blogs/${post.id}/edit`}
                      className="rounded-full border border-[#D8D0C5] px-5 py-2 text-sm font-semibold transition hover:border-[#B96F52] hover:text-[#B96F52]"
                    >
                      Edit Blog
                    </Link>

                    <form action={deletePost.bind(null, post.id)}>
                      <button
                        type="submit"
                        className="rounded-full border border-red-200 px-5 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Delete Blog
                      </button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="text-sm text-[#77736A] hover:text-[#B96F52]"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}