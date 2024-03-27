import { Scanner } from "@yudiel/react-qr-scanner";
import Modal from "../../common/Modal";
import { useNavigate } from "react-router-dom";

const AdminScanner = () => {
  const navigate = useNavigate();
  return (
    <div className=" overflow-hidden">
      <Modal isOpen={true} onClose={() => navigate("/admin/dashboard/events")}>
        <div className=" w-72 h-72 md:w-96 md:h-96">
          <Scanner
            onResult={(text, result) => console.log(text, result)}
            onError={(error) => console.log(error?.message)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AdminScanner;
