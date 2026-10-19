import Link from 'next/link';
import { login } from '@/app/actions';

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;

  const hasError = params?.error === 'invalid';
  const registered = params?.registered === '1';

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F4] px-5 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#E8E3DA] bg-white p-8 shadow-sm sm:p-10">
        <Link href="/" className="text-xl font-bold tracking-tight">
          The Blog<span className="text-[#B96F52]">.</span>
        </Link>

        <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-[#B96F52]">
          Welcome back
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Log in to your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Sign in to write, publish, and manage your blog posts.
        </p>

        {registered && (
          <div className="mt-5 rounded-lg bg-green-50 p-3 text-sm text-green-700">
            Account created successfully! You can now log in.
          </div>
        )}

        {hasError && (
          <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            Incorrect email or password. Please try again.
          </div>
        )}

        <form action={login} className="mt-7 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#B96F52] focus:ring-1 focus:ring-[#B96F52]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#B96F52] focus:ring-1 focus:ring-[#B96F52]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#26251F] py-3.5 text-sm font-semibold text-white transition hover:bg-[#B96F52]"
          >
            Log In →
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="font-semibold text-[#B96F52] hover:underline"
          >
            Create an account
          </Link>
        </p>

        <Link
          href="/"
          className="mt-5 block text-center text-sm text-gray-400 hover:text-gray-700"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}