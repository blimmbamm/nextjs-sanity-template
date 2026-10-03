import useEmblaCarousel from "embla-carousel-react";
import type { GalleryImage } from "../../src/types";
import usePrevNextImage from "./usePrevNextImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./ImageCarousel.module.css";
import { useEffect, useState } from "react";

type Props = {
  images?: GalleryImage[];
  src: (img: GalleryImage) => string;
  onClickImage?: (img: GalleryImage) => void;
  dragFree?: boolean;
  startIndex?: number;
  showCaption?: boolean;
};

export default function ImageCarousel({
  images,
  src,
  onClickImage,
  dragFree = false,
  startIndex = 0,
  showCaption = false,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree, startIndex });

  const { prevDisabled, nextDisabled, onPrev, onNext } =
    usePrevNextImage(emblaApi);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.reInit();
    emblaApi.scrollTo(startIndex, true);

    function handleSelct() {
      emblaApi && setActiveIndex(emblaApi.selectedScrollSnap());
    }

    handleSelct(); // initial
    emblaApi.on("select", handleSelct);
    emblaApi.on("reInit", handleSelct);

    return () => {
      emblaApi.off("select", handleSelct);
    };
  }, [emblaApi]);

  return (
    <div className={styles.root}>
      <div>
        <ChevronLeft
          className={`${styles.control} ${prevDisabled ? styles["control-disabled"] : ""}`}
          onClick={onPrev}
        />
      </div>
      <div className={styles["overflow-hidden-container"]} ref={emblaRef}>
        <div className={styles["images-container"]}>
          {images?.map((img) => (
            <img
              key={img._key}
              className={styles.image}
              src={src(img)}
              alt={img.alt ?? undefined}
              onClick={() => onClickImage?.(img)}
            />
          ))}
        </div>
      </div>
      <div>
        <ChevronRight
          className={`${styles.control} ${nextDisabled ? styles["control-disabled"] : ""}`}
          onClick={onNext}
        />
      </div>
      {showCaption && (
        <div className={styles["image-caption"]}>
          {images?.at(activeIndex)?.caption}
        </div>
      )}
    </div>
  );
}
