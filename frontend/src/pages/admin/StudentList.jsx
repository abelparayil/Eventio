import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useCommonActions from "../../services/actions/CommonActions";
import { useAdminActions } from "../../services/actions/AdminActions";
import { isoToNormalDate } from "../../util/TimeConversion";
import Loader from "../../components/layout/Loader";
import Button from "../../components/common/Button";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const StudentList = () => {
  const [eventDetails, setEventDetails] = useState({});
  const { id } = useParams();
  const [studentList, setStudentList] = useState([]);
  console.log(studentList);

  const [loading, setLoading] = useState({
    eventDetails: true,
    studentDetails: true,
  });
  const commonActions = useCommonActions();
  const adminActions = useAdminActions();
  useEffect(() => {
    commonActions
      .getEventDetails(id)
      .then((res) => {
        if (res.status) {
          toast.error(res.data.message);
        } else {
          const updatedValue = {
            ...res,
            eventDateAndTime: isoToNormalDate(res.eventDateAndTime),
          };
          if (updatedValue.eventDateAndTime) {
            setLoading((prev) => ({ ...prev, eventDetails: false }));
          }
          setEventDetails(updatedValue);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    adminActions.getBookedDetails(id).then((res) => {
      if (res) {
        setLoading((prev) => ({ ...prev, studentDetails: false }));
      }
      setStudentList(res.bookings);
    });
  }, [id]);
  const exportPdf = async (eventDetails) => {
    const doc = new jsPDF({ orientation: "landscape" });

    const text = `
      Eventio
      Event Name: ${eventDetails.eventTitle}
      Event Category:${eventDetails.category}
      Event Time:${eventDetails.eventDateAndTime.hours}:${eventDetails.eventDateAndTime.minutes} ${eventDetails.eventDateAndTime.AmOrPM}
      Event Date:${eventDetails.eventDateAndTime.date}/${eventDetails.eventDateAndTime.monthName}/${eventDetails.eventDateAndTime.year}
      Event Venu:${eventDetails.eventVenue}
    `;

    doc.text(text, 20, 20);

    doc.autoTable({
      margin: { top: 70, left: 20, bottom: 30 },
      html: "#student-table",
    });

    doc.save("mypdf.pdf");
  };

  if (!loading.eventDetails && !loading.studentDetails) {
    if (studentList.length === 0) {
      return (
        <div className="h-screen flex justify-center text-3xl text-bluePurple items-center">
          No Registered Student
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <h1 className=" text-3xl text-violetBlue text-center inline-block w-4/5">
              {eventDetails.eventTitle}
            </h1>
            <Button
              name={"Download"}
              styleclass={"bg-bluePurple rounded text-white mb-2"}
              onClick={() => exportPdf(eventDetails)}
            />
          </div>
          <div>
            <div class="flex flex-col">
              <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class="overflow-hidden">
                    <table
                      class="min-w-full divide-y divide-gray-200"
                      id="student-table"
                    >
                      <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 text-black bg-white">
                        Event Details
                        <p class="mt-1 text-sm font-normal text-black">
                          <h1>Event Name:{eventDetails.eventTitle}</h1>
                          <h1>Event Category:{eventDetails.category}</h1>
                          <h1>
                            Event Time:{eventDetails.eventDateAndTime.hours}:
                            {eventDetails.eventDateAndTime.minutes}{" "}
                            {eventDetails.eventDateAndTime.AmOrPM}
                          </h1>
                          <h1>
                            Event Date:{eventDetails.eventDateAndTime.date}/
                            {eventDetails.eventDateAndTime.monthName}/
                            {eventDetails.eventDateAndTime.year}
                          </h1>
                          <h1>Event Venue:{eventDetails.eventVenue}</h1>
                        </p>
                      </caption>
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            Email
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentList.map((student) => {
                          return (
                            <tr class="odd:bg-white even:bg-gray-100 hover:bg-gray-100">
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                {student.user._id}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {student.user.name}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {student.user.email}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return <Loader />;
  }
};

export default StudentList;
