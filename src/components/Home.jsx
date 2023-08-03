import { useState } from "react";

const Home = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
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

    if (!inputs.name || !inputs.email) {
      alert("Both name and email fields are required.");
      return;
    }

    if (editClick) {
      const tempTableData = [...tableData];
      tempTableData[editIndex] = inputs;
      setTableData(tempTableData);
      setEditClick(false);
      setInputs({
        name: "",
        email: "",
      });
    } else {
      setTableData([...tableData, inputs]);
      setInputs({
        name: "",
        email: "",
      });
    }
  };

  const handleDelete = (index) => {
    const filteredData = tableData.filter((_, i) => i !== index);
    setTableData(filteredData);
  };

  const handleEdit = (index) => {
    const tempData = tableData[index];
    setInputs({ name: tempData.name, email: tempData.email });
    setEditClick(true);
    setEditIndex(index);
  };

  return (
    <>
      <div className="italic bg-purple-600 text-center text-white text-2xl font-bold h-12 p-2">
        <h1>Simple Form</h1>
      </div>
      <div className="sm: w-[430px] lg:w-[430px] text-white m-auto mt-[40px]">
        <form
          onSubmit={handleSubmit}
          className="bg-purple-600 p-4 rounded-[3px]"
        >
          <label htmlFor="name" className="text-white font-bold">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            placeholder="Enter your name here!!"
            className="border-black placeholder-slate-500 text-[#353535] w-full p-2 my-1 rounded-sm"
          />
          <label htmlFor="email" className="text-white font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="Enter your email here!!"
            className="border-black placeholder-slate-500 text-[#353535] w-full p-2 my-1 rounded-sm"
          />
          <button
            type="submit"
            className="block mx-auto px-4 py-2 rounded-sm mt-2 bg-[#55f144] text-[#ffffff]"
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        <table className="w-full border-collapse text-center mt-10">
          <thead className="bg-purple-600 text-white font-mono font-bold  italic">
            <tr>
              <th className="py-2 px-4 font-semibold">Name</th>
              <th className="py-2 px-4 font-semibold">Email</th>
              <th className="py-2 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index} className="bg-gray-100">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4 flex justify-center items-center space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-4 py-2 bg-[#fcff45] border-[#4d4d4d] border-[1px] text-black rounded hover:bg-[#fdff6b] focus:outline-none focus:ring focus:ring-yellow-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-4 py-2 bg-[#f22] text-white border-[#4d4d4d] border-[1px] font-semibold rounded hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
