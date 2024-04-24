import { Scanner } from "@yudiel/react-qr-scanner";
import Modal from "../../common/Modal";
import { useNavigate } from "react-router-dom";
import { useAdminActions } from "../../../services/actions/AdminActions";

const AdminScanner = () => {
  const navigate = useNavigate();
  const adminAction = useAdminActions();
  return (
    <div className=" overflow-hidden">
      <Modal isOpen={true} onClose={() => navigate("/admin/dashboard/events")}>
        <div className=" w-72 h-72 md:w-96 md:h-96">
          <Scanner
            onResult={async (text, result) => {
              const { eventId, userId } = JSON.parse(text);
              await adminAction.sendQRDatas(eventId, userId);
            }}
            onError={(error) => toast.error(error)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AdminScanner;
