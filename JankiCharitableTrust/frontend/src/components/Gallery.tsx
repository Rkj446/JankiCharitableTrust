import { useState } from 'react';
import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';

const images = [
  '/gallery/image1.jpg',
  '/gallery/image2.jpg',
  '/gallery/image3.jpg',
  '/gallery/image4.jpg',
  '/gallery/image5.jpg',
  '/gallery/image6.jpg',
  '/gallery/image7.jpg',
  '/gallery/image8.jpg',
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<boolean[]>(() => images.map(() => false));

  const handleLoaded = (idx: number) => {
    setLoaded((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-green-900 text-center">Gallery</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <Card 
            key={index}
            className="overflow-hidden cursor-pointer group"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative aspect-square">
              {!loaded[index] && (
                <Skeleton className="absolute inset-0" rounded="rounded-none" />
              )}
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                onLoad={() => handleLoaded(index)}
                className={`object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110 transition-opacity ${loaded[index] ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Selected gallery image"
              className="max-w-full max-h-full object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-xl"
              onClick={() => setSelectedImage(null)}
              aria-label="Close gallery"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}