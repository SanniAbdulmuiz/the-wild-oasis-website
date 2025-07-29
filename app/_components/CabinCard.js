import Image from "next/image";
import { UsersIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex flex-col sm:flex-row border border-primary-800 rounded-lg overflow-hidden">
      {/* Image container */}
      <div className="relative w-full sm:w-64 h-52 sm:h-auto">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col justify-between">
        <div className="pt-5 pb-4 px-4 sm:px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
            Cabin {name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-primary-800 text-right">
          <Link
            href={`/cabins/${id}`}
            className="block py-4 px-6 hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
