
import Link from "next/link";

export default function PostList({ posts = [] }) {
  if (posts.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500">
        No blog posts available yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article
          key={post.id}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            {post.title}
          </h2>

          <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {post.content}
          </p>

          <Link
            href={`/posts/${post.id}`}
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            Read More →
          </Link>
        </article>
      ))}
    </div>
  );
}
