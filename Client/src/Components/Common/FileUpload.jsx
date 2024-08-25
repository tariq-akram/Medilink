import React, { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { LuAsterisk } from "react-icons/lu";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const navigate = useNavigate();

  const [FormDataa, setFormData] = useState({
    name: "",
  });
  const token = sessionStorage.getItem("token");
  const [SelectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    setFormData({ ...FormDataa, [name]: processedValue });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", SelectedFile);
    formData.append("filename", FormDataa.name);

    try {
      await axios.post(
        `${BASE_URL}/api/v1/user/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormData({ name: "" });
      setSelectedFile(null);
      setIsLoading(false);
    } catch (error) {
      console.error("Please Try Again", error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-screen min-w-screen dark:bg-black bg-white dark:bg-dot-white-[0.2] bg-dot-black-[0.2] relative flex items-center justify-center">
      <div className="rounded-md flex flex-col items-center justify-center antialiased">
        <div className="lg:-mt-16">
          <div className="p-3 lg:p-0 ">
            <h1 className="text-4xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
              Scan Reports
            </h1>
            <p className="select-none text-neutral-500 max-w-lg mx-auto text-lg lg:text-[1.25rem] tracking-[1px] font-ai p-3 lg:p-0 text-justify">
              Having trouble uploading your medical files? You're in the right
              place! Welcome to{" "}
              <span className="uppercase font-bold floating-animation gemini-font">
              Medilink
              </span>
              , your secure and easy-to-use platform for managing your vital
              medical documents. We prioritize your privacy and convenience,
              ensuring a seamless experience every time.
            </p>
          </div>

          <div className="lg:p-0 p-3">
            <div className="max-w-[450px] min-h-[300px] border rounded-[30px] mt-[7%] border-neutral-300 mx-auto flex flex-col bg-black p-14">
              <form onSubmit={submitHandler}>
                <div className="flex flex-col gap-y-7">
                  <div className="mx-auto w-[100%]">
                    <div className="w-full mx-auto flex flex-col items-center">
                      <label
                        htmlFor="name"
                        className="text-lg md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans font-bold uppercase tracking-[1px] mt-[3%]"
                      >
                        {" "}
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter File Name"
                        name="name"
                        value={FormDataa.name}
                        onChange={changeHandler}
                        className="block mt-3 mb-3 pl-3 text-white w-full bg-transparent border border-gray-100 rounded-lg placeholder:pl-4  py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm "
                      />
                    </div>
                  </div>

                  <div>
                    {!SelectedFile ? (
                      <>
                        <label htmlFor="uploadInput" className="cursor-pointer">
                          <FaUpload
                            size={30}
                            className="mt-[3%] text-neutral-400 mx-auto"
                          />
                          <div className="text-lg md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mt-[3%] mx-auto">
                            Upload File
                          </div>
                        </label>
                        <input
                          type="file"
                          id="uploadInput"
                          accept=".jpg, .jpeg, .png, .pdf, .docx"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <div className="text-neutral-500 max-w-lg my-2 text-sm text-center tracking-[1px] mt-[2%] mx-auto">
                          Accepted file types are jpg, png, pdf, jpeg, docx.
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="loader"></span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex w-full justify-center">
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-b from-neutral-200 to-neutral-600 rounded-lg py-2 px-4 mt-4 uppercase tracking-[2px]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="flex lg:items-center mt-4 lg:ml-6 gap-1">
              <div className="text-red-500 text-md">
                <LuAsterisk />
              </div>
              <div className="text-neutral-500 my-1 text-[0.65rem] text-center tracking-[1px]">
                Information provided is subject to ongoing evolution and may not
                be entirely accurate.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
