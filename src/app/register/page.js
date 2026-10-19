import Link from 'next/link';
import { createAccount } from './actions';

export default async function RegisterPage({ searchParams }) {
  const params = await searchParams;
  const error = params?.error;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F4] px-5 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#E8E3DA] bg-white p-8 shadow-sm sm:p-10">

        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
        >
          The Blog<span className="text-[#B96F52]">.</span>
        </Link>

        <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-[#B96F52]">
          Join our community
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Create your account
        </h1>

        

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error === 'email-exists'
              ? 'This email is already registered. Please log in.'
              : error === 'invalid'
                ? 'Please fill in all fields correctly.'
                : 'Unable to create your account. Please try again.'}
          </div>
        )}

        <form action={createAccount} className="mt-7 space-y-5">

          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
              maxLength={80}
              autoComplete="name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#B96F52] focus:ring-1 focus:ring-[#B96F52]"
            />
          </div>

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
              required
              autoComplete="email"
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
              placeholder="At least 8 characters"
              minLength={4}
              maxLength={72}
              required
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#B96F52] focus:ring-1 focus:ring-[#B96F52]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#26251F] py-3.5 text-sm font-semibold text-white transition hover:bg-[#B96F52]"
          >
            Create Account →
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-[#B96F52] hover:underline"
          >
            Log in
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