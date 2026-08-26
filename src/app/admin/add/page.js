import { createPost } from '@/app/actions';

export default function AddPostPage() {
  return (
    
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Your Blog</h1>
      
      <form action={createPost} className="space-y-4 bg-white p-6 rounded-lg border">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input type="text" name="title" required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <input type="text" name="description" required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Content</label>
          <textarea name="content" rows="6" required className="w-full border p-2 rounded" />
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded font-bold ">
          SUBMIT
        </button>
      </form>
    </main>
  );
}