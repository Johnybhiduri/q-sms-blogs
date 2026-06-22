import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "../../lib/post";
import { notFound } from "next/navigation";

import CoverImage from "@/components/CoverImage";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="pb-20 sm:pb-24">
      {post.coverImage && (
        <div className="mb-10 sm:mb-12">
          <CoverImage
            src={post.coverImage}
            alt={post.title}
            fit={post.coverImageFit}
            aspectClassName="aspect-[16/9] sm:aspect-[21/9]"
            priority
            rounded={false}
          />
        </div>
      )}

      <article className="max-w-2xl mx-auto px-4 sm:px-6">
        <Link
          href="/"
          className="text-xs tracking-[0.15em] uppercase text-[var(--color-brass)] ink-underline inline-block mb-6 sm:mb-8"
        >
          ← Back to Journal
        </Link>

        <p className="text-xs tracking-[0.15em] uppercase text-[var(--color-muted)] mb-4">
          {post.date} · {post.readingTime}
        </p>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight mb-8 sm:mb-10">
          {post.title}
        </h1>

        <div
          className="prose prose-base sm:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </main>
  );
}