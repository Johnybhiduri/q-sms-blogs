import Image from "next/image";

type CoverImageProps = {
  src: string | null;
  alt: string;
  fit?: "cover" | "contain";
  aspectClassName: string;
  priority?: boolean;
  rounded?: boolean;
};

export default function CoverImage({
  src,
  alt,
  fit = "contain",
  aspectClassName,
  priority = false,
  rounded = true,
}: CoverImageProps) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-[var(--color-line)] ${
        rounded ? "rounded-sm border border-[var(--color-line)]" : ""
      } ${aspectClassName}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, 50vw"
          className={
            fit === "contain"
              ? "object-contain p-2 sm:p-3"
              : "object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          }
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-moss)] to-[var(--color-ink)]" />
      )}
    </div>
  );
}