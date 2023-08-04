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

    if (
      !inputs.name ||
      !inputs.email ||
      !inputs.gender ||
      !inputs.dob ||
      !inputs.phone
    ) {
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
    setInputs({
      name: tempData.name,
      email: tempData.email,
      gender: tempData.gender,
      dob: tempData.dob,
      phone: tempData.phone,
    });
    setEditClick(true);
    setEditIndex(index);
  };

  return (
    <div className="bg-gradient-to-t from-[#ff9efa] to-[#b988fd] min-h-screen flex items-center justify-center rounded-[5px]">
      <div className="w-[700px] overflow-hidden bg-transparent rounded-[5px]">
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
              <form onSubmit={handleSubmit} className="mt-4">
                <label htmlFor="name" className="block font-bold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                  className="input-style text-[#383838] italic p-1 rounded-sm"
                />
                <label htmlFor="email" className="block font-bold mb-1 mt-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className="input-style text-[#383838] italic p-1 rounded-sm"
                />
                <label htmlFor="gender" className="block font-bold mb-1 mt-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={inputs.gender}
                  onChange={handleChange}
                  className="input-style text-[#6a6a6a] px-3 py-1 rounded border italic bg-white border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>

                <label htmlFor="dob" className="block font-bold mb-1 mt-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={inputs.dob}
                  onChange={handleChange}
                  placeholder="date of birth"
                  className="input-style text-[#515151] italic p-1 rounded-sm"
                />
                <label htmlFor="phone" className="block font-bold mb-1 mt-2">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={inputs.phone}
                  onChange={handleChange}
                  placeholder="phone number"
                  className="input-style text-[#383838] italic p-1 rounded-sm"
                />
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 rounded-sm bg-green-500 text-white w-full"
                >
                  {editClick ? "Update" : "Submit"}
                </button>
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
