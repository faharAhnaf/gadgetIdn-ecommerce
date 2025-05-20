import Link from "next/link";

interface HeaderSectionProps {
  title: string;
  subtitle: string;
  link: string;
}

export default function HeaderSection({
  title,
  subtitle,
  link,
}: HeaderSectionProps) {
  return (
    <div className="mb-5 flex justify-between">
      <div className="flex flex-col">
        <div className="mb-3 flex items-center">
          <div className="mr-2 h-[40px] w-[20px] rounded-[4px] bg-blue-500"></div>
          <h5 className="text-blue-500">{subtitle}</h5>
        </div>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
    </div>
  );
}
