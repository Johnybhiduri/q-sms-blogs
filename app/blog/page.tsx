import Link from "next/link";
import { getAllPosts } from "../../lib/post";
import CoverImage from "@/components/CoverImage";

export const metadata = {
  title: "Journal",
  description: "Field notes and long-form writing.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  if (!featured) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-[var(--color-muted)]">
          No posts yet. Add a markdown file to content/posts to get started.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <header className="mb-12 sm:mb-16 border-b border-[var(--color-line)] pb-8 sm:pb-10">
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--color-brass)] mb-3">
          Journal
        </p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight">
          Field Notes
        </h1>
        <p className="mt-4 text-[var(--color-muted)] max-w-md">
          Long-form writing, updates, and ideas worth sitting with.
        </p>
      </header>

      <Link
        href={`/blog/${featured.slug}`}
        className="group grid sm:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20 items-center"
      >
        <CoverImage
          src={featured.coverImage}
          alt={featured.title}
          fit={featured.coverImageFit}
          aspectClassName="aspect-[16/10]"
          priority
        />
        <div>
          <p className="text-xs tracking-[0.15em] uppercase text-[var(--color-muted)] mb-3">
            {featured.date} · {featured.readingTime}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4 ink-underline inline">
            {featured.title}
          </h2>
          <p className="text-[var(--color-muted)] leading-relaxed">{featured.description}</p>
        </div>
      </Link>

      {rest.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10 sm:gap-y-12 pt-10 sm:pt-12 border-t border-[var(--color-line)]">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="mb-5">
                <CoverImage
                  src={post.coverImage}
                  alt={post.title}
                  fit={post.coverImageFit}
                  aspectClassName="aspect-[16/10]"
                />
              </div>
              <p className="text-xs tracking-[0.15em] uppercase text-[var(--color-muted)] mb-2">
                {post.date} · {post.readingTime}
              </p>
              <h3 className="font-display text-lg sm:text-xl leading-snug mb-2 ink-underline inline">
                {post.title}
              </h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}