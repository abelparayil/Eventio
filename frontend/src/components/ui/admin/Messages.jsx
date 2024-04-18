import { useState } from "react";
import Button from "../../common/Button";

const Messages = () => {
  const [messages, setMessages] = useState([
    {
      name: "Vinay Dev S",
      eventTitle: "AdVITya",
      ticketPrice: 500,
      message:
        "Hello myflsadjjfklasdjflaksjdlfjalskdjf jfiowefjlkasdk ifjsadofjlsjdHello myflsadjjfklasdjflaksjdlfjalskdjf jfiowefjlkasdk ifjsadofjlsjdHello myflsadjjfklasdjflaksjdlfjalskdjf jfiowefjlkasdk ifjsadofjlsjdHello myflsadjjfklasdjflaksjdlfjalskdjf jfiowefjlkasdk ifjsadofjlsjd",
    },
    {
      name: "Vinay Dev S",
      eventTitle: "AdVITya",
      ticketPrice: 500,
      message: "Hello",
    },
  ]);
  return (
    <div className="w-full h-screen">
      {messages.length == 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-3xl text-bluePurple">You Have No Messages</h1>
        </div>
      ) : (
        <div>
          <div class="flex-auto block py-8 pt-6 px-9">
            <div class="overflow-x-auto">
              <table class="w-full my-0 align-middle text-dark border-neutral-200">
                <thead class="align-bottom">
                  <tr class="font-semibold text-[0.95rem] text-secondary-dark">
                    <th class="pb-3 text-start min-w-[175px]">USERNAME</th>
                    <th class="pb-3 text-center min-w-[100px]">EVENTNAME</th>
                    <th class="pb-3 text-center min-w-[100px]">TICKETPRICE</th>
                    <th class="pb-3 pr-12  text-center min-w-[175px]">
                      MESSAGE
                    </th>
                    <th class="pb-3 pr-12 text-center min-w-[100px]">
                      APPROVE/REJECT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message) => {
                    return (
                      <tr class="border-b border-dashed last:border-b-0 bg-ghostWhite rounded mb-2">
                        <td class="p-3 pl-0">
                          <div class="flex items-center">
                            <div class="flex flex-col justify-start">
                              <a
                                href="javascript:void(0)"
                                class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"
                              >
                                {" "}
                                {message.name}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td class="p-3 pr-0 text-end">
                          <span class="font-semibold text-light-inverse text-md/normal">
                            {message.eventTitle}
                          </span>
                        </td>
                        <td class="p-3 pr-0 text-end">
                          <span class="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                            {message.ticketPrice}
                          </span>
                        </td>
                        <td class="p-3 pr-12 text-end">
                          <span class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                            {" "}
                            {message.message}
                          </span>
                        </td>
                        <td class="pr-0 text-start flex justify-center items-center p-3">
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
