import { getPostData } from '@/lib/posts';
import Link from 'next/link';

export default async function Post({ params }) {
  const { id } = await params;
  const postData = await getPostData(id);

  return (
    <main className="max-w-2xl mx-auto p-6 min-h-screen">
      <Link href="/" className="text-blue-500 hover:underline text-sm mb-6 inline-block">
        ← Back to home
      </Link>
      <article className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{postData.title}</h1>
        <p className="text-sm text-gray-400 mb-6">{postData.date}</p>
        <div
          className="prose max-w-none border-t pt-6"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </main>
  );
}
