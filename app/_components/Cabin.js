import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import TextExpander from "@/app/_components/TextExpander";
import Image from "next/image";

function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[3fr_4fr] gap-6 sm:gap-20 border border-primary-800 py-6 px-4 sm:py-3 sm:px-10 mb-24">
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:h-auto sm:scale-[1.15] sm:-translate-x-3">
        <Image
          src={image}
          fill
          className="object-cover rounded-sm"
          alt={`Cabin ${name}`}
        />
      </div>

      {/* Text Content */}
      <div>
        <h3 className="text-accent-100 font-black text-4xl sm:text-7xl mb-5 sm:translate-x-[-254px] bg-primary-950 p-4 sm:p-6 sm:pb-1 w-full sm:w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-base sm:text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
