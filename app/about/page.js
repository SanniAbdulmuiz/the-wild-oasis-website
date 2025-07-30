import Image from "next/image";
import image1 from "@/public/about-1.jpg";
import { getCabinCount } from "../_library/data-service";

export const revalidate = 86400;

export const metadata = {
  title: "About",
};

export default async function Page() {
  const numCabins = await getCabinCount();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-x-0 sm:gap-x-24 gap-y-12 sm:gap-y-16 text-lg items-center px-4 sm:px-8 py-8 max-w-7xl mx-auto">
      {/* Section 1 Text */}
      <div className="sm:col-span-3 space-y-4">
        <h1 className="text-2xl sm:text-4xl text-accent-400 font-medium mb-6">
          Welcome to The Wild Oasis
        </h1>
        <p>
          Where nature&apos;s beauty and comfortable living blend seamlessly.
          Hidden away in the heart of the Italian Dolomites, this is your
          paradise away from home. But it&apos;s not just about the luxury
          cabins. It&apos;s about the experience of reconnecting with nature and
          enjoying simple pleasures with family.
        </p>
        <p>
          Our {numCabins} luxury cabins provide a cozy base, but the real
          freedom and peace you&apos;ll find in the surrounding mountains.
          Wander through lush forests, breathe in the fresh air, and watch the
          stars twinkle above from the warmth of a campfire or your hot tub.
        </p>
        <p>
          This is where memorable moments are made, surrounded by nature&apos;s
          splendor. It&apos;s a place to slow down, relax, and feel the joy of
          being together in a beautiful setting.
        </p>
      </div>

      {/* Section 1 Image */}
      <div className="sm:col-span-2">
        <Image
          src={image1}
          alt="Family sitting around a fire pit in front of cabin"
          placeholder="blur"
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>
      {/* Section 2 Image */}
      <div className="sm:col-span-2 relative aspect-square w-full order-4 sm:order-none">
        <Image
          fill
          className="object-cover rounded-lg"
          src="/about-2.jpg"
          alt="Family that manages The Wild Oasis"
        />
      </div>

      {/* Section 2 Text */}
      <div className="sm:col-span-3 space-y-4 order-3 sm:order-none">
        <h2 className="text-4xl text-accent-400 font-medium mb-6">
          Managed by our family since 1962
        </h2>
        <p>
          Since 1962, The Wild Oasis has been a cherished family-run retreat.
          Started by our grandparents, this haven has been nurtured with love
          and care, passing down through our family as a testament to our
          dedication to creating a warm, welcoming environment.
        </p>
        <p>
          Over the years, we&apos;ve maintained the essence of The Wild Oasis,
          blending the timeless beauty of the mountains with the personal touch
          only a family business can offer. Here, you&apos;re not just a guest;
          you&apos;re part of our extended family. So join us at The Wild Oasis
          soon, where tradition meets tranquility, and every visit is like
          coming home.
        </p>
        <a
          href="/cabins"
          className="inline-block bg-accent-500 px-4 py-4 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore our luxury cabins
        </a>
      </div>
    </div>
  );
}
