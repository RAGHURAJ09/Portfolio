type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/85">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-zinc-300">{description}</p> : null}
    </div>
  );
}
