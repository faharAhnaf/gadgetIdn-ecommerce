import { useState } from "react";

// Define the type for a shipping option
type ShippingOption = {
  id: string;
  name: string;
  eta: string;
  price: string;
  logo: string;
};

const ShippingDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ShippingOption | null>(null);

  const shippingOptions: ShippingOption[] = [
    {
      id: "jnt",
      name: "J&T Express",
      eta: "2 - 3 Hari",
      price: "Rp15.000",
      logo: "/assets/image/jnt-logo.png",
    },
    {
      id: "sicepat",
      name: "SiCepat",
      eta: "2 - 3 Hari",
      price: "Rp12.000",
      logo: "/assets/image/sicepat-logo.png",
    },
    {
      id: "jne",
      name: "JNE",
      eta: "2 - 3 Hari",
      price: "Rp10.000",
      logo: "/assets/image/jne-logo.png",
    },
    {
      id: "ninja",
      name: "Ninja Standard",
      eta: "2 - 3 Hari",
      price: "Rp20.000",
      logo: "/assets/image/Ninja-logo.png",
    },
    {
      id: "tiki",
      name: "TIKI",
      eta: "2 - 3 Hari",
      price: "Rp10.000",
      logo: "/assets/image/tiki-logo.png",
    },
  ];

  return (
    <div className="relative">
      {/* Dropdown Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {selectedOption
          ? `${selectedOption.name} - ${selectedOption.price}`
          : "Pilih ekspedisi"}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg">
          <ul className="divide-y divide-gray-200">
            {shippingOptions.map((option) => (
              <li
                key={option.id}
                className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                }}
              >
                {/* Logo */}
                <img
                  src={option.logo}
                  alt={`${option.name} logo`}
                  className="w-10 h-10 mr-4"
                />
                {/* Option Details */}
                <div>
                  <h3 className="text-sm font-medium">{option.name}</h3>
                  <p className="text-xs text-gray-500">Eta. {option.eta}</p>
                  <p className="text-sm font-semibold text-green-500">
                    {option.price}
                  </p>
                </div>
                {/* Radio Button */}
                <div className="ml-auto">
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={selectedOption?.id === option.id}
                    readOnly
                    className="w-4 h-4 text-blue-500"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShippingDropdown;
