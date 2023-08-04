import { useState } from "react";

const Home = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    phone: "",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Object.values(inputs).every(Boolean)) {
      alert("All fields are required.");
      return;
    }

    if (editClick) {
      const tempTableData = [...tableData];
      tempTableData[editIndex] = inputs;
      setTableData(tempTableData);
      setEditClick(false);
      setEditIndex("");
    } else {
      setTableData([...tableData, inputs]);
    }

    setInputs({
      name: "",
      email: "",
      gender: "",
      dob: "",
      phone: "",
    });
  };

  const handleDelete = (index) => {
    const filteredData = tableData.filter((_, i) => i !== index);
    setTableData(filteredData);
  };

  const handleEdit = (index) => {
    const tempData = tableData[index];
    setInputs(tempData);
    setEditClick(true);
    setEditIndex(index);
  };

  return (
    <div className="bg-gradient-to-t from-[#ff9efa] to-[#b988fd] min-h-screen flex items-center justify-center rounded-[5px]">
      <div className="w-[700px] h-auto overflow-hidden bg-transparent rounded-[5px]">
        <div className="rounded-[5px]">
          <div className="flex rounded-[5px]">
            <div className="w-1/2 bg-black">
              <img
                src="/src/assets/img.jpg"
                alt="Your Image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-1/2 p-6 bg-gray-900 text-white">
              <h1 className="text-2xl text-center font-sans italic font-bold">
                Register Now!
              </h1>
              <form onSubmit={handleSubmit} className="mt-8 ">
                {[
                  { label: "Name", name: "name" },
                  { label: "Email", name: "email" },
                  {
                    label: "Gender",
                    name: "gender",
                    type: "select",
                    options: ["Select", "Male", "Female", "Others"],
                  },
                  { label: "Date of Birth", name: "dob", type: "date" },
                  { label: "Phone", name: "phone" },
                ].map(({ label, name, type, options }) => (
                  <div key={name} className="mb-2">
                    <label htmlFor={name} className="block font-bold mb-1">
                      {label}
                    </label>
                    {type === "select" ? (
                      <select
                        name={name}
                        value={inputs[name]}
                        onChange={handleChange}
                        className="appearance-none italic bg-transparent border-b w-fit text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                      >
                        {options.map((option) => (
                          <option key={option} value={option.toLowerCase()}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={type || "text"}
                        name={name}
                        value={inputs[name]}
                        onChange={handleChange}
                        placeholder={`Enter your ${label}`}
                        className="appearance-none italic bg-transparent  w-full border-cyan-500 border-b-[1.8px] focus:border-cyan-200 text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                      />
                    )}
                  </div>
                ))}
                <div className="mt-3 grid">
                  <button
                    type="submit"
                    className="mt-6 px-4 py-2 rounded-sm bg-green-600 hover:bg-green-500 font-semibold text-white"
                  >
                    {editClick ? "Update" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-3">
          {tableData.length > 0 && (
            <div className="bg-white rounded-md shadow-md">
              <h2 className="text-[1.2rem] italic text-white bg-gray-900 font-medium mb-2 p-1 pl-2">
                Submitted Data:
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                      <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date of Birth
                      </th>
                      <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tableData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {item.email}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {item.gender}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {item.dob}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {item.phone}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <button
                            onClick={() => handleEdit(index)}
                            className="text-blue-500 hover:underline mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
