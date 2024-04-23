import { useEffect, useState } from "react";
import Button from "../../common/Button";
import { useAdminActions } from "../../../services/actions/AdminActions";
import Loader from "../../layout/Loader";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetch, setFetch] = useState(false);
  const adminAction = useAdminActions();
  useEffect(() => {
    async function getMessages() {
      const res = await adminAction.getAllMessages();
      if (res) setLoading(false);
      const response = res.map((res) => {
        return {
          eventId: res.event._id,
          userId: res.user._id,
          name: res.user.name,
          eventTitle: res.event.eventTitle,
          ticketPrice: res.event.ticketPrice,
          message: res.message,
        };
      });
      setMessages(response);
    }
    getMessages();
  }, [fetch]);
  async function approveRefund(userId, eventId) {
    await adminAction.approveRefund(userId, eventId);
    setFetch((prev) => !prev);
  }
  async function rejectRefund(userId, eventId) {
    await adminAction.rejectRefund(userId, eventId);
    setFetch((prev) => !prev);
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-screen">
      {messages.length == 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-3xl text-bluePurple">You Have No Messages</h1>
        </div>
      ) : (
        <div>
          <div className="flex-auto block py-8 pt-6 px-9">
            <div className="overflow-x-auto">
              <table className="w-full my-0 align-middle text-dark border-neutral-200">
                <thead className="align-bottom">
                  <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                    <th className="pb-3 text-start min-w-[175px]">USERNAME</th>
                    <th className="pb-3 text-center min-w-[100px]">
                      EVENTNAME
                    </th>
                    <th className="pb-3 text-center min-w-[100px]">
                      TICKETPRICE
                    </th>
                    <th className="pb-3 pr-12  text-center min-w-[175px]">
                      MESSAGE
                    </th>
                    <th className="pb-3 pr-12 text-center min-w-[100px]">
                      APPROVE/REJECT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message) => {
                    return (
                      <tr className="border-b border-dashed last:border-b-0 bg-ghostWhite rounded mb-2">
                        <td className="p-3 pl-0">
                          <div className="flex items-center">
                            <div className="flex flex-col justify-start">
                              <a
                                href="javascript:void(0)"
                                className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"
                              >
                                {" "}
                                {message.name}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 pr-0 text-end">
                          <span className="font-semibold text-light-inverse text-md/normal">
                            {message.eventTitle}
                          </span>
                        </td>
                        <td className="p-3 pr-0 text-end">
                          <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                            {message.ticketPrice}
                          </span>
                        </td>
                        <td className="p-3 pr-12 text-end">
                          <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                            {" "}
                            {message.message}
                          </span>
                        </td>
                        <td className="pr-0 text-start flex justify-center items-center p-3">
                          <Button
                            name={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m4.5 12.75 6 6 9-13.5"
                                />
                              </svg>
                            }
                            styleclass={
                              "bg-successGreen text-white rounded-full mr-1"
                            }
                            onClick={() =>
                              approveRefund(message.userId, message.eventId)
                            }
                          />
                          <Button
                            name={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18 18 6M6 6l12 12"
                                />
                              </svg>
                            }
                            styleclass={"bg-failureRed text-white rounded-full"}
                            onClick={() =>
                              rejectRefund(message.userId, message.eventId)
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
