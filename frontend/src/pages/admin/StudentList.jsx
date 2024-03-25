import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useCommonActions from "../../services/actions/CommonActions";
import { useAdminActions } from "../../services/actions/AdminActions";

const StudentList = () => {
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const commonActions = useCommonActions();
  const adminActions = useAdminActions();
  useEffect(() => {
    commonActions
      .getEventDetails(id)
      .then((res) => {
        console.log(res);
        if (res.status) {
          toast.error(res.data.message);
        } else {
          const { eventTitle } = res;
          console.log(eventTitle);
          setTitle(eventTitle);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    adminActions.getBookedDetails(id).then((res) => {
      console.log(res);
    });
  }, [id]);
  return <div>StudentList {title}</div>;
};

export default StudentList;
