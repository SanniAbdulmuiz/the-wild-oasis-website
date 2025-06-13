"use client";
import { useState } from "react";
import { updateGuest } from "../_library/action";
import SelectCountry from "./SelectCountry";
import SubmitButton from "./SubmitButton";

function UpdateProfileForm({ guest, countries }) {
  const {
    fullName,
    email,
    nationality: initialNationality,
    nationalID,
    countryFlag: initialFlag,
  } = guest;

  const [selectValue, setSelectValue] = useState(
    `${initialNationality}%${initialFlag}`
  );
  const [flag, setFlag] = useState(initialFlag);
  const [nationality, setNationality] = useState(initialNationality);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    const [name, selectedFlag] = value.split("%");
    setSelectValue(value);
    setFlag(selectedFlag);
    setNationality(name);
  };

  const handleAction = async (formData) => {
    await updateGuest(formData);

    // 🟡 Get the selected country and flag from the form data
    const selected = formData.get("nationality");
    if (selected) {
      const [newName, newFlag] = selected.split("%");
      setNationality(newName);
      setFlag(newFlag);
      setSelectValue(`${newName}%${newFlag}`);
    }
  };

  return (
    <form
      action={handleAction}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName}
          name="fullName"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={email}
          name="email"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <div className="flex items-center gap-2">
            <img
              src={flag}
              alt={`${nationality} flag`}
              className="h-5 rounded-sm"
            />
          </div>
        </div>
        <SelectCountry
          countries={countries}
          selectedValue={selectValue}
          onChange={handleSelectChange}
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;

//Jonas's Version
// "use client";

// import { useFormStatus } from "react-dom";
// import { updateGuest } from "../_library/action";
// import { useState } from "react";

// function UpdateProfileForm({ guest, children }) {
//   const {
//     fullName,
//     email,
//     nationality: initialNationality,
//     nationalID,
//     countryFlag: initialFlag,
//   } = guest;

//   const [nationality, setNationality] = useState(initialNationality);
//   const [flag, setFlag] = useState(initialFlag);

//   // Handle form submission
//   const handleAction = async (formData) => {
//     const nationalityValue = formData.get("nationality");
//     const [name, newFlag] = nationalityValue.split("%");

//     // Update in Supabase
//     await updateGuest(formData);

//     // Reflect updates in UI
//     setNationality(name);
//     setFlag(newFlag);
//   };

//   return (
//     <form
//       action={handleAction}
//       className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
//     >
//       <div className="space-y-2">
//         <label>Full name</label>
//         <input
//           disabled
//           defaultValue={fullName}
//           name="fullName"
//           className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
//         />
//       </div>

//       <div className="space-y-2">
//         <label>Email address</label>
//         <input
//           disabled
//           defaultValue={email}
//           name="email"
//           className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
//         />
//       </div>

//       <div className="space-y-2">
//         <div className="flex items-center justify-between">
//           <label htmlFor="nationality">Where are you from?</label>
//           <div className="flex items-center gap-2">
//             <span>{nationality}</span>
//             <img
//               src={flag}
//               alt={`${nationality} flag`}
//               className="h-5 rounded-sm"
//             />
//           </div>
//         </div>
//         {children}
//       </div>

//       <div className="space-y-2">
//         <label htmlFor="nationalID">National ID number</label>
//         <input
//           defaultValue={nationalID}
//           name="nationalID"
//           className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
//         />
//       </div>

//       <div className="flex justify-end items-center gap-6">
//         <Button />
//       </div>
//     </form>
//   );
// }

// function Button() {
//   const { pending } = useFormStatus();
//   return (
//     <button
//       className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
//       disabled={pending}
//     >
//       {pending ? "Updating..." : "Update profile"}
//     </button>
//   );
// }

// export default UpdateProfileForm;

// import { useFormStatus } from "react-dom";
// import { updateGuest } from "../_library/action";

// function UpdateProfileForm({ guest, children }) {
//   const { fullName, email, nationality, nationalID, countryFlag } = guest;

//   //useFormStatus() cannot be used in a component that contains a form.

//   return (
//     <form
//       action={updateGuest}
//       className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
//     >
//       <div className="space-y-2">
//         <label>Full name</label>
//         <input
//           disabled
//           defaultValue={fullName}
//           name="fullName"
//           className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
//         />
//       </div>

//       <div className="space-y-2">
//         <label>Email address</label>
//         <input
//           disabled
//           defaultValue={email}
//           name="email"
//           className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
//         />
//       </div>

//       <div className="space-y-2">
//         <div className="flex items-center justify-between">
//           <label htmlFor="nationality">Where are you from?</label>
//           <img
//             src={countryFlag}
//             alt="Country flag"
//             className="h-5 rounded-sm"
//           />
//         </div>
//         {children}
//       </div>

//       <div className="space-y-2">
//         <label htmlFor="nationalID">National ID number</label>
//         <input
//           defaultValue={nationalID}
//           name="nationalID"
//           className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
//         />
//       </div>

//       <div className="flex justify-end items-center gap-6">
//         <Button />
//       </div>
//     </form>
//   );
// }

// function Button() {
//   const { pending } = useFormStatus();
//   return (
//     <button
//       className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
//       disabled={pending}
//     >
//       {pending ? "Updating..." : "Update profile"}
//     </button>
//   );
// }

// export default UpdateProfileForm;

// "use client";

// import { useState } from "react";
// import SelectCountry from "./SelectCountry"; // ✅ Import it directly

// function UpdateProfileForm({ countries }) {
//   const [countryFlag, setCountryFlag] = useState("");

//   return (
//     <form className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
//       <div className="space-y-2">
//         <label>Full name</label>
//         <input
//           disabled
//           className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
//         />
//       </div>

//       <div className="space-y-2">
//         <label>Email address</label>
//         <input
//           disabled
//           className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
//         />
//       </div>

//       <div className="space-y-2">
//         <div className="flex items-center justify-between">
//           <label htmlFor="nationality">Where are you from?</label>
//           {countryFlag && (
//             <img
//               src={countryFlag}
//               alt="Country flag"
//               className="h-5 rounded-sm"
//             />
//           )}
//         </div>

//         <SelectCountry
//           countries={countries}
//           name="nationality"
//           id="nationality"
//           className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
//           onCountryChange={setCountryFlag}
//         />
//       </div>

//       <div className="space-y-2">
//         <label htmlFor="nationalID">National ID number</label>
//         <input
//           name="nationalID"
//           className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
//         />
//       </div>

//       <div className="flex justify-end items-center gap-6">
//         <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
//           Update profile
//         </button>
//       </div>
//     </form>
//   );
// }

// export default UpdateProfileForm;
