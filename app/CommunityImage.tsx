const images = {
  office: {
    file: "office-conversation",
    alt: "Illustration of two adults talking through a document together in a welcoming office.",
  },
  gathering: {
    file: "community-conversation",
    alt: "Illustration of three adults of different generations sharing a conversation outdoors.",
  },
  landscape: {
    file: "painted-landscape",
    alt: "An abstract painted landscape in warm ochre, sage and cream.",
  },
};

export default function CommunityImage({
  kind = "office",
  priority = false,
}: {
  kind?: keyof typeof images;
  priority?: boolean;
}) {
  const image = images[kind];
  return (
    <figure className={`community-image community-image-${kind}`}>
      <img
        src={`/images/community/${image.file}-1280.webp`}
        srcSet={`/images/community/${image.file}-640.webp 640w, /images/community/${image.file}-1280.webp 1280w`}
        sizes="(max-width: 800px) 100vw, 50vw"
        width={1280}
        height={kind === "landscape" ? 427 : 853}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        alt={image.alt}
      />
      <figcaption>
        {kind === "landscape"
          ? "AI-generated landscape illustration."
          : "AI-generated illustration · not actual IRAAC staff or participants."}
      </figcaption>
    </figure>
  );
}

export function PaintedDivider() {
  return <div className="painted-divider" aria-hidden="true" />;
}
