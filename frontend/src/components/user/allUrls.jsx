import { useEffect, useState } from "react";
import CopyIcon from "/copy-regular.png";
import deleteUrl from "../../services/deleteUrl";
import userGeneratedUrls from "../../services/getUserGeneratedUrls";



const CLIENT_URL = import.meta.env.CLIENT_URL || "http://localhost:5173/";

const AllUrls = () => {
  const [tableData, setTableData] = useState(null);
  const [isDataUptodate, setIsDataUptodate] = useState(false);
  const [skipAmount, setSkipAmount] = useState(0);

  const getUrls = async () => {
    const responseData = await userGeneratedUrls(skipAmount);
    setTableData(responseData.data);
  };

  const handleCopyUrl = (shortUrl) => {
    navigator.clipboard.writeText(CLIENT_URL + shortUrl);
  };

  const handleDeleteUrl = async (id) => {
    const responseData = await deleteUrl(id);
    if (responseData.message === true) {
      setIsDataUptodate(false);
    }
  };

  useEffect(() => {
    if (!isDataUptodate) {
      getUrls();
      setIsDataUptodate(true);
    }
  }, [isDataUptodate]);

  const handleNextButton = () => {
    setSkipAmount((prev) => prev + 10);
    setIsDataUptodate(false);
  };

  const handlePrevButton = () => {
    if (skipAmount <= 0) {
      return;
    }
    setSkipAmount((prev) => prev - 10);
    setIsDataUptodate(false);
  };
  return (
    <section className="flex flex-col items-center justify-center pb-10">
      <div className="flex flex-col items-center pt-10 pb-5">
        <h2 className="text-purple font-semibold">URLs</h2>
        <h3 className="text-center text-2xl">My Url&apos;s dashboard</h3>
      </div>
      <table className="table-fixed w-[90%] md:w-[80%] lg:w-[70%] border">
        <thead className=" bg-basePurple opacity-80">
          <tr>
            <th className="text-left w-[30%] p-4 text-nowrap">Original Url</th>
            <th className="text-left w-[20%]">Created</th>
            <th className="text-left w-[25%]">Short Url</th>
            <th className="text-center w-[10%]">Views</th>
            <th className="text-center w-[15%] p-4">
              <div className="flex justify-center space-x-2 text-white">
                <button
                  onClick={handlePrevButton}
                  className={` ${
                    tableData && skipAmount == 0
                      ? "disabled cursor-not-allowed "
                      : "active:scale-90 cursor-pointer"
                  }`}
                >
                  &lt;
                </button>
                <button
                  onClick={handleNextButton}
                  className={`${
                    tableData && tableData.length < 10
                      ? "disabled cursor-not-allowed "
                      : "active:scale-90 cursor-pointer"
                  }`}
                >
                  &gt;
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((item) => (
              <tr className="text-base border-b" key={item.shortUrl}>
                <td className="p-2">
                  <a
                    href={
                      !item.originalUrl.includes("https://")
                        ? "https://" + item.originalUrl
                        : item.originalUrl
                    }
                    target="blank"
                    className="text-violet-800"
                  >
                    <p className="text-nowrap overflow-hidden">
                      {item.originalUrl}
                    </p>
                  </a>
                </td>
                <td>{item.created}</td>
                <td
                  className="space-x-1 text-nowrap"
                  onClick={() => handleCopyUrl(item.shortUrl)}
                >
                  <p className="text-violet-800 inline-block">
                    {item.shortUrl}
                  </p>
                  <img
                    src={CopyIcon}
                    alt="copy"
                    className="h-3 w-3 cursor-pointer active:w-2 active:h-2 inline-block"
                  />
                </td>
                <td className="text-center">{item.views}</td>
                <td className="text-center text-red-700 p-2 active:scale-75">
                  <button onClick={() => handleDeleteUrl(item._id)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan="12" className="text-center py-2">
              no more data
            </td>
          </tr>
        </tbody>
        <tfoot className=" bg-basePurple opacity-80">
          <tr>
            <td colSpan="12" className="p-3">
              <div className="flex justify-end space-x-2 text-white">
                <button
                  onClick={handlePrevButton}
                  className={`underline ${
                    tableData && skipAmount == 0
                      ? "disabled cursor-not-allowed "
                      : "active:scale-90 cursor-pointer"
                  }`}
                >
                  prev
                </button>
                <button
                  onClick={handleNextButton}
                  className={`underline ${
                    tableData && tableData.length < 10
                      ? "disabled cursor-not-allowed "
                      : "active:scale-90 cursor-pointer"
                  }`}
                >
                  next
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

export default AllUrls;
