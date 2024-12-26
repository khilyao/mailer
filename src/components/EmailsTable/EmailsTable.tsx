import Button from "@components/Button";
import { IDraftFormValues } from "@components/Draft/Draft";
import { useOwnEmailsQuery } from "@features/email/email-api";
import { useState } from "react";

interface Email extends IDraftFormValues {
  id: number;
}

interface Email {
  id: number;
  recipient: string;
  subject: string;
}

const EmailsTable = () => {
  const [offset, setOffset] = useState(0);
  const { data } = useOwnEmailsQuery(offset);

  const perPage = 5;
  const currentPage = Math.floor(offset / perPage) + 1;
  const totalPages = data ? Math.ceil(data.count / perPage) : 0;

  const tableHeadings = ["ID", "Recipient", "Subject"];

  const decrementOffset = () => {
    setOffset((prevOffset) => prevOffset - 5);
  };

  const incrementOffset = () => {
    setOffset((prevOffset) => prevOffset + 5);
  };

  return (
    <>
      {data?.count > 0 ? (
        <div className="px-3">
          <div className="overflow-x-auto mb-4">
            <table className="bg-[#e7e5e5] rounded-md max-w-full mx-auto border-collapse table-auto">
              <thead>
                <tr>
                  {tableHeadings.map((tableHeading) => (
                    <th
                      key={tableHeading}
                      className="p-2 text-center text-sm sm:text-base"
                    >
                      {tableHeading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.results.map(({ id, recipient, subject }: Email) => (
                  <tr key={id} className="border-t border-[#000]">
                    <td className="p-2 text-center text-sm sm:text-base">
                      {id}
                    </td>
                    <td className="p-2 text-center text-sm sm:text-base">
                      {recipient}
                    </td>
                    <td className="p-2 text-center text-sm sm:text-base">
                      {subject}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button
              className={`bg-[#c2b4f3] ${
                currentPage === 1 && "opacity-0 pointer-events-none"
              }`}
              onClick={decrementOffset}
            >
              {"<"}
            </Button>
            <span className="font-medium text-lg">{currentPage}</span>
            <Button
              className={`bg-[#c2b4f3] ${
                currentPage === totalPages && "opacity-0 pointer-events-none"
              }`}
              onClick={incrementOffset}
            >
              {">"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="mx-auto">No emails yet</div>
      )}
    </>
  );
};

export default EmailsTable;
