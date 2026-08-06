'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function createPost(formData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const content = formData.get('content');

  await prisma.post.create({
    data: { title, description, content },
  });

  revalidatePath('/');
  redirect('/');
}


export async function updatePost(id, formData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const content = formData.get('content');

  await prisma.post.update({
    where: { id },
    data: { title, description, content },
  });

  revalidatePath('/');
  revalidatePath(`/posts/${id}`);
  redirect('/');
}


export async function deletePost(id) {
  await prisma.post.delete({
    where: { id },
  });

  revalidatePath('/');
}