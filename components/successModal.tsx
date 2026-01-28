import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isVisible, onClose }) => {
  const router = useRouter();

  // useEffect
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        router.push("/");
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, router, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-[10px] shadow-lg w-[301px] h-[221px] text-center animate-slide-right">
        <div className="flex justify-center mb-4">
          <Image
            src="/images/checkmark.svg"
            width={52}
            height={30}
            alt="Success Checkmark"
          />
        </div>

        <p className="text-18 font-bold mt-4">
          Registration Successful,
          <br /> Redirecting to Home
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;
