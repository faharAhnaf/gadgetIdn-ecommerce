export default function SideBar() {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start h-full max-h-[800px]">

            <div className="mb-4 pt-4">
                <h2 className="font-semibold text-lg mb-2">Kategori</h2>
                <div className="ml-4 space-y-2">
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Fashion
                </label>
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Elektronik
                </label>
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Otomotif
                </label>
                </div>
            </div>

            <div className="mb-4 border-t w-full pt-4">
                <h2 className="font-semibold text-lg mb-2">Lokasi</h2>
                <div className="ml-4 space-y-2">
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Jakarta Selatan
                </label>
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Bandung
                </label>
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Bogor
                </label>
                </div>
            </div>

            <div className="mb-4 border-t w-full pt-4">
                <h2 className="font-semibold text-lg mb-2">Kondisi</h2>
                <div className="ml-4 space-y-2">
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Brand New
                </label>
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Second Hand
                </label>
                </div>
            </div>

            <div className="border-t w-full pt-4">
                <h2 className="font-semibold text-lg mb-2">Penilaian Product</h2>
                <div className="ml-4">
                <label className="flex items-center mb-1">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-yellow-500">⭐</span> 5 Keatas
                </label>
                <label className="flex items-center mb-1">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-yellow-500">⭐</span> 4 Keatas
                </label>
                <label className="flex items-center mb-1">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-yellow-500">⭐</span> 3 Keatas
                </label>
                <label className="flex items-center mb-1">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-yellow-500">⭐</span> 2 Keatas
                </label>
                <label className="flex items-center mb-1">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-yellow-500">⭐</span> 1 Keatas
                </label>
                </div>
            </div>
        </div>
    );
}