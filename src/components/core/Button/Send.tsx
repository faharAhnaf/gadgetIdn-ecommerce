import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  onSend?: () => void;
};

export default function Send({ onSend }: Props) {
  return (
    <button onClick={onSend} className="mt-1 self-start text-[20px] text-black">
      <FontAwesomeIcon icon={faPaperPlane} />
    </button>
  );
}
