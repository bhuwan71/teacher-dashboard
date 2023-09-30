import { useState, useEffect } from "react";
import NavBar from "@/component/NavBar";
import CKeditor from "./CKeditor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { getToken } from "@/helper/token";
import { useRouter } from "next/router";

const index = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    file: "",
    deadline: "",
  });
  const [pdf, setPdf] = useState("");
  const uploadeAssignment = () => {
    let formData = new FormData();
    formData.append("note", pdf?.originFileObj);
    formData.append("word", data);
    formData.append("deadLine", formValues.deadline);
    let requestOptions = {
      method: "POST",
      headers: {
        Authorization: getToken() || null,
      },
      body: formData,
    };

    fetch(
      "https://sms-twox.onrender.com/api/teacher/assignment",
      requestOptions
    ).then(() => {
      router.push("/assignmentLIst");
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const props = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      setPdf(info.file);
    },
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <div className="flex">
      <div>
        <NavBar />
      </div>
      <div className="ml-56 mt-2 bg-slate-50 h-full  w-full  shadow-md rounded-md px-5">
        <ToastContainer />
        <div className="flex justify-between gap-10">
          <div className=" w-[100%] p-5">
            <h1 className="font-bold text-2xl rounded-md text-white font-serif px-5 my-2 bg-black py-1 ">
              Upload Assignment
            </h1>
            <CKeditor
              name="description"
              onChange={(data) => {
                setData(data);
              }}
              editorLoaded={editorLoaded}
            />

            <div class="flex my-2 flex-col py-2 space-y-4">
              <label for="pdf" class="text-gray-700">
                PDF File:
              </label>
              <div class="mb-3">
                {/* <input
                  name="file"
                  value={formValues.file}
                  onChange={handleChange}
                  class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  id="formFile"
                /> */}
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </div>
              <label for="date" class="text-gray-700">
                Dead Line for Assignment
              </label>
              <input
                value={formValues.deadline}
                onChange={handleChange}
                type="date"
                id="date"
                name="deadline"
                class="py-2 px-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={uploadeAssignment}
                type="button"
                class="inline-block rounded bg-blue-800 px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out ] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
              >
                Upload Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
