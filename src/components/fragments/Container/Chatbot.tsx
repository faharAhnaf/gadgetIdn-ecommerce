import "@/app/assets/css/chatbot.css";

type Props = {
  children?: any;
};

export default function ChatbotContainer({ children }: Props) {
  return (
    <div className="flex flex-col overflow-y-auto max-h-[79vh] custom-scrollbar">
      <div className="mb-5 flex flex-col justify-center items-center min-h-[80vh] my-auto">
        <p className="text-black text-[32px] italic my-4">Chat Bot</p>
        <p className="text-black text-center">
        Dapatkan informasi eksklusif tentang diskon spesial, tips memilih produk yang sesuai dengan kebutuhanmu, <br></br>
        hingga konsultasi penggunaan aplikasi untuk memaksimalkan pengalaman belanja. <br></br>
        Kami siap menemanimu dalam setiap langkah untuk memastikan belanja online <br></br>
        terasa lebih aman, mudah, dan tentunya, menyenangkan!
        </p>
      </div>
      <div className="">
        {children} {/* message list */}
      </div>
    </div>
  );
}
