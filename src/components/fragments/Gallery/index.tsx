export default function Gallery() {
    return (
        <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-2 mb-2">
                <img
                    src="/assets/image/section_2_1.png"
                    alt="Image 1"
                    className="w-3/5 h-auto max-h-[75vh] object-cover rounded-[12px]"
                />
                <img
                    src="/assets/image/section_2_2.png"
                    alt="Image 2"
                    className="w-2/5 h-auto max-h-[75vh] object-cover rounded-[12px]"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-2">
                <img
                    src="/assets/image/section_2_3.png"
                    alt="Image 3"
                    className="w-1/2 h-auto max-h-[75vh] object-cover rounded-[12px]"
                />
                <img
                    src="/assets/image/section_2_4.png"
                    alt="Image 4"
                    className="w-1/2 h-auto max-h-[75vh] object-cover rounded-[12px]"
                />
            </div>
        </div>
    );
}