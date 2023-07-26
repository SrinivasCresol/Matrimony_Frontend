import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import { getUserFunction } from "../Services/Apis";
import ProfileCard from "../Components/ProfileCard";
import "./Styles.css";
import Filters from "../Components/Filters";
import Register from "./Register";

export default function Home() {
  const [userData, setUserData] = useState([]);
  const [showSpin, setShowSpin] = useState(true);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userGet = async () => {
    const response = await getUserFunction(search, gender, status, sort, page);
    if (response.status === 200) {
      setUserData(response.data.usersData);
      setPageCount(response.data.Pagination);
    } else {
      toast.error("Users Not Found");
    }
  };

  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 500);
  }, [search, gender, status, sort, page]);

  return (
    <div className="bg-container">
      <div className="bg-con">
        <div className="d-flex flex-row justify-content-between">
          <h1 className="text-white">Lakhs of Happy Marriages</h1>
          <Button
            className="add_btn text-black"
            data-target="#registerModal"
            onClick={handleShow}
            data-toggle="modal"
          >
            Add User
          </Button>
          <Register handleClose={handleClose} showModal={showModal} />
        </div>
      </div>
      <Filters />
      {showSpin ? (
        <Spinner />
      ) : (
        <ProfileCard
          userData={userData}
          userGet={userGet}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          page={page}
          setPage={setPage}
          pageCount={pageCount}
        />
      )}
    </div>
  );
}
