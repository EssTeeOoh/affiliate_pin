import Image from "next/image";

const photos = [
  {
    src: "/images/gaming-pc-or-console.png",
    alt: "Blue gaming desk setup with monitors and a PC tower",
    title: "Gaming desk"
  },
  {
    src: "/images/desk-laptop-workspace.png",
    alt: "Laptop workspace on a wooden desk with accessories",
    title: "Work setup"
  },
  {
    src: "/images/bright-desk-setup.jpg",
    alt: "Bright minimalist desk setup with a curved monitor and accessories",
    title: "Minimal desk"
  }
] as const;

export function HomePhotoGallery() {
  return (
    <section className="photo-gallery card">
      <div className="photo-gallery-header">
        <div>
          <p className="eyebrow">Gallery</p>
          <h2>Featured setups</h2>
        </div>
      </div>

      <div className="photo-gallery-grid">
        <article className="photo-tile photo-tile-large">
          <Image
            src={photos[0].src}
            alt={photos[0].alt}
            fill
            sizes="(max-width: 860px) 100vw, 58vw"
            className="photo-tile-image"
            priority
          />
          <div className="photo-tile-caption">
            <span>{photos[0].title}</span>
            <strong>Gaming setup</strong>
          </div>
        </article>

        <div className="photo-tile-stack">
          <article className="photo-tile photo-tile-medium">
            <Image
              src={photos[1].src}
              alt={photos[1].alt}
              fill
              sizes="(max-width: 860px) 100vw, 40vw"
              className="photo-tile-image"
            />
            <div className="photo-tile-caption">
              <span>{photos[1].title}</span>
              <strong>Workspace</strong>
            </div>
          </article>

          <article className="photo-tile photo-tile-medium">
            <Image
              src={photos[2].src}
              alt={photos[2].alt}
              fill
              sizes="(max-width: 860px) 100vw, 40vw"
              className="photo-tile-image"
            />
            <div className="photo-tile-caption">
              <span>{photos[2].title}</span>
              <strong>Desk setup</strong>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
