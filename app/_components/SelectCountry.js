"use client";

function SelectCountry({
  countries,
  selectedValue,
  onChange,
  name,
  id,
  className,
}) {
  return (
    <select
      name={name}
      id={id}
      value={selectedValue}
      onChange={onChange}
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

//Jonas's Version

// import { getCountries } from "@/app/_library/data-service";

// async function SelectCountry({ defaultCountry, name, id, className }) {
//   const countries = await getCountries();
//   const flag =
//     countries.find((country) => country.name === defaultCountry)?.flag ?? "";

//   return (
//     <select
//       name={name}
//       id={id}
//       // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
//       defaultValue={`${defaultCountry}%${flag}`}
//       className={className}
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

// export default SelectCountry;
