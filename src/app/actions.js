
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signIn, signOut } from '../../auth';

export async function createPost(formData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const title = String(formData.get('title') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const content = String(formData.get('content') || '').trim();

  if (!title || !description || !content) {
    throw new Error('Please fill in all fields.');
  }

  await prisma.post.create({
    data: {
      title,
      description,
      content,
      authorId: session.user.id,
    },
  });

  revalidatePath('/');
  redirect('/');
}

export async function updatePost(id, formData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const post = await prisma.post.findUnique({
    where: { id },
    select: { authorId: true },
  });

  if (!post) {
    throw new Error('Blog post not found.');
  }

  if (post.authorId !== session.user.id) {
    throw new Error('You are not allowed to edit this blog post.');
  }

  const title = String(formData.get('title') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const content = String(formData.get('content') || '').trim();

  if (!title || !description || !content) {
    throw new Error('Please fill in all fields.');
  }

  await prisma.post.update({
    where: { id },
    data: { title, description, content },
  });

  revalidatePath('/');
  revalidatePath(`/posts/${id}`);

  redirect('/');
}

export async function deletePost(id) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const post = await prisma.post.findUnique({
    where: { id },
    select: { authorId: true },
  });

  if (!post) {
    throw new Error('Blog post not found.');
  }

  
  if (post.authorId !== session.user.id) {
    throw new Error('You are not allowed to delete this blog post.');
  }

  await prisma.post.delete({
    where: { id },
  });

  revalidatePath('/');
}

// Logout
export async function logout() {
  await signOut({ redirectTo: '/' });
}

// Login
export async function login(formData) {
  const email = String(formData.get('email') || '')
    .trim()
    .toLowerCase();

  const password = String(formData.get('password') || '');

  if (!email || !password) {
    redirect('/login?error=invalid');
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
  } catch (error) {
    if (error?.type === 'CredentialsSignin') {
      redirect('/login?error=invalid');
    }

    throw error;
  }
}
