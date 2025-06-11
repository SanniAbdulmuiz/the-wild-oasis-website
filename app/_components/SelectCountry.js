import { getCountries } from "@/app/_library/data-service";

async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();
  const flag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;

// "use client";

// import { useState, useEffect } from "react";

// export default function SelectCountry({
//   countries,
//   name,
//   id,
//   className,
//   onCountryChange,
// }) {
//   const [selected, setSelected] = useState("");

//   useEffect(() => {
//     if (selected) {
//       const [, flag] = selected.split("%");
//       onCountryChange?.(flag);
//     }
//   }, [selected, onCountryChange]);

//   return (
//     <select
//       name={name}
//       id={id}
//       className={className}
//       onChange={(e) => setSelected(e.target.value)}
//       defaultValue=""
//     >
//       <option value="">Select country...</option>
//       {countries.map((c) => (
//         <option key={c.name} value={`${c.name}%${c.flag}`}>
//           {c.name}
//         </option>
//       ))}
//     </select>
//   );
// }
