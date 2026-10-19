
import Link from 'next/link';
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';
import { createPost } from '@/app/actions';

export default async function AddPostPage() {
  const session = await auth();

  
  if (!session?.user?.id) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen bg-[#FAF8F4] px-5 py-10 text-[#26251F] sm:py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
        >
          The Blog<span className="text-[#B96F52]">.</span>
        </Link>

        <div className="mt-10 mb-8">
          <Link
            href="/"
            className="text-sm text-[#77736A] transition hover:text-[#B96F52]"
          >
            ← Back to Home
          </Link>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#B96F52]">
            Share your story
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Create Your Blog
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#77736A]">
            Turn your ideas into a story. Write something meaningful and
            share it with our community.
          </p>
        </div>

        <form
          action={createPost}
          className="space-y-6 rounded-2xl border border-[#E8E3DA] bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold"
            >
              Blog Title
            </label>

            <input
              id="title"
              type="text"
              name="title"
              placeholder="Give your story a title"
              required
              maxLength={150}
              className="w-full rounded-lg border border-[#D8D0C5] bg-[#FAF8F4] px-4 py-3 text-sm outline-none transition placeholder:text-[#AAA398] focus:border-[#B96F52] focus:ring-1 focus:ring-[#B96F52]"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold"
            >
              Short Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="What is your blog about?"
              rows={3}
              required
              maxLength={300}
              className="w-full resize-y rounded-lg border border-[#D8D0C5] bg-[#FAF8F4] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#AAA398] focus:border-[#B96F52] focus:ring-1 focus:ring-[#B96F52]"
            />
            <p className="mt-2 text-xs text-[#8B857A]">
              Write a short introduction to your article.
            </p>
          </div>

          <div>
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-semibold"
            >
              Blog Content
            </label>

            <textarea
              id="content"
              name="content"
              placeholder="Start writing your story here..."
              rows={10}
              required
              maxLength={50000}
              className="w-full resize-y rounded-lg border border-[#D8D0C5] bg-[#FAF8F4] px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-[#AAA398] focus:border-[#B96F52] focus:ring-1 focus:ring-[#B96F52]"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-[#E8E3DA] pt-5 sm:flex-row sm:justify-end">
            <Link
              href="/"
              className="rounded-full border border-[#D8D0C5] px-6 py-3 text-center text-sm font-semibold transition hover:border-[#B96F52] hover:text-[#B96F52]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-full bg-[#26251F] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#B96F52]"
            >
              Publish Blog →
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-[#8B857A]">
          Your story will be shared with the community after publishing.
        </p>
      </div>
    </main>
  );
}
