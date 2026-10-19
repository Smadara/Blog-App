
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { auth } from '../../../../../auth';
import { redirect, notFound } from 'next/navigation';
import { updatePost } from '@/app/actions';

export const dynamic = 'force-dynamic';

export default async function EditBlogPage({ params }) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  
  if (post.authorId !== session.user.id) {
    redirect('/my-blogs');
  }

  return (
    <main className="min-h-screen bg-[#FAF8F4] px-5 py-10 text-[#26251F] sm:py-16">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-xl font-bold">
          The Blog<span className="text-[#B96F52]">.</span>
        </Link>

        <div className="mt-10">
          <Link
            href="/my-blogs"
            className="text-sm text-[#77736A] hover:text-[#B96F52]"
          >
            ← Back to My Blogs
          </Link>

          <h1 className="mt-8 text-3xl font-bold sm:text-4xl">
            Edit Your Blog
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#77736A]">
            Update your story and save your changes.
          </p>
        </div>

        <form
          action={updatePost.bind(null, post.id)}
          className="mt-8 space-y-6 rounded-2xl border border-[#E8E3DA] bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-semibold">
              Blog Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={post.title}
              maxLength={150}
              required
              className="w-full rounded-lg border border-[#D8D0C5] bg-[#FAF8F4] px-4 py-3 text-sm outline-none focus:border-[#B96F52] focus:ring-1 focus:ring-[#B96F52]"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-semibold">
              Short Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={post.description}
              rows={3}
              maxLength={300}
              required
              className="w-full rounded-lg border border-[#D8D0C5] bg-[#FAF8F4] px-4 py-3 text-sm leading-6 outline-none focus:border-[#B96F52] focus:ring-1 focus:ring-[#B96F52]"
            />
          </div>

          <div>
            <label htmlFor="content" className="mb-2 block text-sm font-semibold">
              Blog Content
            </label>
            <textarea
              id="content"
              name="content"
              defaultValue={post.content}
              rows={10}
              maxLength={50000}
              required
              className="w-full rounded-lg border border-[#D8D0C5] bg-[#FAF8F4] px-4 py-3 text-sm leading-7 outline-none focus:border-[#B96F52] focus:ring-1 focus:ring-[#B96F52]"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-[#E8E3DA] pt-5 sm:flex-row sm:justify-end">
            <Link
              href="/my-blogs"
              className="rounded-full border border-[#D8D0C5] px-6 py-3 text-center text-sm font-semibold hover:border-[#B96F52] hover:text-[#B96F52]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-full bg-[#26251F] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#B96F52]"
            >
              Save Changes →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}