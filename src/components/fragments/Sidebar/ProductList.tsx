import { useState } from 'react';
import searchProductsByName from '@/app/api/search_list/product';

type Props = {
    params: string,
    onSubmitFilters: (filters: any) => void;
};

export default function SideBar({ params, onSubmitFilters }: Props) {
    const initialFilters = {
        name: params,
        kategori: '',
        harga: '',
        kondisi: '',
        penilaian: 0,
    };

    const [filters, setFilters] = useState(initialFilters);

    const handleFilterChange = (category: string, value: string | number | null) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [category]: value,
        }));
    };

    const handleSubmit = async () => {
        onSubmitFilters(filters);
    };

    const handleReset = () => {
        setFilters(initialFilters);
        onSubmitFilters(initialFilters); // Optional: langsung mengirim nilai reset
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
                            value="Accessories"
                            checked={filters.kategori === 'Accessories'}
                            onChange={() => handleFilterChange('kategori', 'Accessories')}
                        />
                        Accessories
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="mr-2"
                            value="Electronic"
                            checked={filters.kategori === 'Electronic'}
                            onChange={() => handleFilterChange('kategori', 'Electronic')}
                        />
                        Electronic
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="mr-2"
                            value="Sports"
                            checked={filters.kategori === 'Sports'}
                            onChange={() => handleFilterChange('kategori', 'Sports')}
                        />
                        Sports
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="mr-2"
                            value="Clothes"
                            checked={filters.kategori === 'Clothes'}
                            onChange={() => handleFilterChange('kategori', 'Clothes')}
                        />
                        Clothes
                    </label>
                </div>
            </div>

            <div className="mb-4 border-t w-full pt-4">
                <h2 className="font-semibold text-lg mb-2">Urutkan Berdasarkan Harga</h2>
                <div className="ml-4 space-y-2">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="mr-2"
                            value="termurah"
                            checked={filters.harga === 'termurah'}
                            onChange={() => handleFilterChange('harga', 'termurah')}
                        />
                        Termurah
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="mr-2"
                            value="termahal"
                            checked={filters.harga === 'termahal'}
                            onChange={() => handleFilterChange('harga', 'termahal')}
                        />
                        Termahal
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="mr-2"
                            value="netral"
                            checked={filters.harga === 'netral'}
                            onChange={() => handleFilterChange('harga', 'netral')}
                        />
                        Netral
                    </label>
                </div>
            </div>

            <button
                className="w-full mt-5 px-4 py-1 text-md rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                onClick={handleSubmit}
            >
                Submit
            </button>
            <button
                className="w-full mt-2 px-4 py-1 text-md rounded-full bg-red-400 text-white hover:bg-red-500 transition duration-300"
                onClick={handleReset}
            >
                Reset
            </button>
        </div>
    );
}
