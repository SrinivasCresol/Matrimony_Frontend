import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { statusChangeFunction } from "../Services/Apis";

export default function ProfileCard({
  userData,
  userGet,
  handlePrevious,
  handleNext,
  page,
  setPage,
  pageCount,
  setSort,
}) {
  const handleChange = async (id, status) => {
    const response = await statusChangeFunction(id, status);
    if (response.status === 200) {
      userGet();
      toast.error("Status Updated");
    } else {
      toast.error("Error!");
    }
  };

  console.log(userData)

  return (
    <div className="p-5">
      <div>
        <div>
          <h1>All Profiles</h1>
        </div>
        <div>
          <div>
            {userData.map((item, index) => {
              return (
                <div key={item._id}>
                  {index + 1 + (page - 1) * 10}
                  <div className="d-flex flex-row justify-content-between p-2 m-2">
                    <img
                      src={`https://cresol.s3.ap-south-1.amazonaws.com/${item.profile}`}
                      alt="profile"
                      style={{ width: "100px" }}
                    />
                    <h1>{item.name}</h1>
                    <h5>{item.city}</h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
