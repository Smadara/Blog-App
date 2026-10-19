import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '../../../auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });

  if (!user) {
    redirect('/login');
  }

  const initials = (user.name || user.email || 'U')
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-[#FAF8F4] px-5 py-12 text-[#26251F]">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/"
          className="text-sm font-medium text-[#B96F52] hover:underline"
        >
          ← Back to Home
        </Link>

        <div className="mt-8 rounded-3xl border border-[#E8E3DA] bg-white p-6 shadow-sm sm:p-10">

          <div className="flex flex-col items-center text-center">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#EEE8DE] text-4xl font-bold text-[#B96F52]">
              {initials}
            </div>

            <h1 className="mt-5 text-3xl font-bold">
              My Profile
            </h1>

            <p className="mt-2 text-sm text-[#77736A]">
              Manage your account information.
            </p>

          </div>

          <div className="mt-10 space-y-5">

            <div className="rounded-2xl bg-[#FAF8F4] p-5">
              <p className="text-sm text-[#77736A]">
                Full Name
              </p>

              <p className="mt-2 break-words font-semibold">
                {user.name || 'Name not provided'}
              </p>
            </div>

            <div className="rounded-2xl bg-[#FAF8F4] p-5">
              <p className="text-sm text-[#77736A]">
                Email Address
              </p>

              <p className="mt-2 break-words font-semibold">
                {user.email}
              </p>
            </div>

            <div className="rounded-2xl bg-[#FAF8F4] p-5">
              <p className="text-sm text-[#77736A]">
                Published Blogs
              </p>

              <p className="mt-2 text-3xl font-bold text-[#B96F52]">
                {user._count.posts}
              </p>
            </div>

            <div className="rounded-2xl bg-[#FAF8F4] p-5">
              <p className="text-sm text-[#77736A]">
                Member Since
              </p>

              <p className="mt-2 font-semibold">
                {new Date(user.createdAt).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
              </p>
            </div>

          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <Link
              href="/my-blogs"
              className="flex-1 rounded-full bg-[#26251F] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#B96F52]"
            >
              View My Blogs
            </Link>

            <Link
              href="/admin/add"
              className="flex-1 rounded-full border border-[#D8D0C5] px-6 py-3 text-center text-sm font-semibold transition hover:bg-[#EEE8DE]"
            >
              Create New Blog
            </Link>

          </div>

        </div>
      </div>
    </main>
  );
}