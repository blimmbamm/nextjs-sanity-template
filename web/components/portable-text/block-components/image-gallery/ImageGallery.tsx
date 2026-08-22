"use client";

import { useEffect, useState } from "react";
import styles from "./ImageGallery.module.css";
import { X } from "lucide-react";
import { urlFor } from "../../../../src/sanity/sanityImageUrl";
import ImageCarousel from "../../../image-carousel/ImageCarousel";
import { ImageGalleryImageType } from "../../../../src/types";

type Props = {
  images?: ImageGalleryImageType[];
};

export default function ImageGallery({ images }: Props) {
  const [fullscreenStartImg, setFullscreenStartImg] =
    useState<ImageGalleryImageType | null>(null);

  const startIndex = images?.findIndex(
    (image) => image._key === fullscreenStartImg?._key,
  );

  useEffect(() => {
    if (fullscreenStartImg) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }

    return unlockBodyScroll;
  }, [fullscreenStartImg]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setFullscreenStartImg(null);
    }

    if (fullscreenStartImg) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fullscreenStartImg]);

  return (
    <>
      <ImageCarousel
        images={images}
        src={(img) => urlFor(img).height(300).url()}
        onClickImage={(img) => setFullscreenStartImg(img)}
        dragFree
      />

      {fullscreenStartImg && (
        <div className={styles.modal}>
          <div className={styles.close}>
            <X size={32} onClick={() => setFullscreenStartImg(null)} />
          </div>
          <div className={styles["fullscreen-carousel-container"]}>
            <ImageCarousel
              images={images}
              src={(img) => urlFor(img).height(800).fit("max").url()}
              startIndex={startIndex}
              showCaption
            />
          </div>
        </div>
      )}
    </>
  );
}

export function lockBodyScroll() {
  document.body.style.overflow = "hidden";
}

export function unlockBodyScroll() {
  document.body.style.overflow = "auto";
}
