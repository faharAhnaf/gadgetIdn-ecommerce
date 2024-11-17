import { useState } from 'react';
import searchProductsByName from '@/app/api/search_list/product';

type Props = {
    params: string,
    onSubmitFilters: (filters: any) => void;
};

export default function SideBar({ params, onSubmitFilters }: Props) {
    
    const [filters, setFilters] = useState({
        name: params,
        kategori: '',
        harga: '',
        kondisi: '',
        penilaian: 0,
    });

    const handleFilterChange = (category: string, value: string | number | null) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [category]: value,
        }));
    };

    const handleSubmit = async () => {
        onSubmitFilters(filters);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start h-full max-h-[800px]">
            <div className="mb-4 pt-4">
                <h2 className="font-semibold text-lg mb-2">Kategori</h2>
                <div className="ml-4 space-y-2">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="mr-2"
                            checked={filters.kategori === 'Fashion'}
                            onChange={() => handleFilterChange('kategori', 'Fashion')}
                        />
                        Fashion
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="mr-2"
                            checked={filters.kategori === 'Elektronik'}
                            onChange={() => handleFilterChange('kategori', 'Elektronik')}
                        />
                        Elektronik
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="mr-2"
                            checked={filters.kategori === 'Otomotif'}
                            onChange={() => handleFilterChange('kategori', 'Otomotif')}
                        />
                        Otomotif
                    </label>
                </div>
            </div>

            <div className="mb-4 border-t w-full pt-4">
                <h2 className="font-semibold text-lg mb-2">Harga</h2>
                <div className="ml-4 space-y-2">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="mr-2"
                            checked={filters.harga === 'termurah'}
                            onChange={() => handleFilterChange('harga', 'termurah')}
                        />
                        Termurah
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="mr-2"
                            checked={filters.harga === 'termahal'}
                            onChange={() => handleFilterChange('harga', 'termahal')}
                        />
                        Termahal
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="mr-2"
                            checked={filters.harga === 'netral'}
                            onChange={() => handleFilterChange('harga', 'netral')}
                        />
                        Netral
                    </label>
                </div>
            </div>

            <div className="mb-4 border-t w-full pt-4">
                <h2 className="font-semibold text-lg mb-2">Kondisi</h2>
                <div className="ml-4 space-y-2">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="mr-2"
                            checked={filters.kondisi === 'brand new'}
                            onChange={() => handleFilterChange('kondisi', 'brand new')}
                        />
                        Brand New
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="mr-2"
                            checked={filters.kondisi === 'second hand'}
                            onChange={() => handleFilterChange('kondisi', 'second hand')}
                        />
                        Second Hand
                    </label>
                </div>
            </div>

            <div className="border-t w-full pt-4">
                <h2 className="font-semibold text-lg mb-2">Penilaian Product</h2>
                <div className="ml-4">
                    <label className="flex items-center mb-1">
                        <input
                            type="radio"
                            className="mr-2"
                            checked={filters.penilaian === 5}
                            onChange={() => handleFilterChange('penilaian', 5)}
                        />
                        <span className="text-yellow-500">⭐</span> 5 Keatas
                    </label>
                    <label className="flex items-center mb-1">
                        <input
                            type="radio"
                            className="mr-2"
                            checked={filters.penilaian === 4}
                            onChange={() => handleFilterChange('penilaian', 4)}
                        />
                        <span className="text-yellow-500">⭐</span> 4 Keatas
                    </label>
                    <label className="flex items-center mb-1">
                        <input
                            type="radio"
                            className="mr-2"
                            checked={filters.penilaian === 3}
                            onChange={() => handleFilterChange('penilaian', 3)}
                        />
                        <span className="text-yellow-500">⭐</span> 3 Keatas
                    </label>
                    <label className="flex items-center mb-1">
                        <input
                            type="radio"
                            className="mr-2"
                            checked={filters.penilaian === 2}
                            onChange={() => handleFilterChange('penilaian', 2)}
                        />
                        <span className="text-yellow-500">⭐</span> 2 Keatas
                    </label>
                    <label className="flex items-center mb-1">
                        <input
                            type="radio"
                            className="mr-2"
                            checked={filters.penilaian === 1}
                            onChange={() => handleFilterChange('penilaian', 1)}
                        />
                        <span className="text-yellow-500">⭐</span> 1 Keatas
                    </label>
                </div>
            </div>

            <button
                className="w-full mt-5 px-4 py-1 text-md rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
}
