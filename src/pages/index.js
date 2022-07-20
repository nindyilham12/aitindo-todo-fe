import {useState, useEffect} from 'react';
import axios from 'axios';
import { BsTrash } from "react-icons/bs";

const Home = () => {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState();

  const getListTodo = () =>{
    axios
      .get(`http://127.0.0.1:8000/api/items`)
      .then((res) => {
        console.log(res.data);
        setTodo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const storeListTodo = () => {
    axios
    .post("http://127.0.0.1:8000/api/item/store", {name: input})
    .then((res) => window.location.reload(res))
    .catch((error) => console.log(error));
  };

  const deleteListTodo = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/item/${id}`)
      .then((res) => {
        console.log(res.data);
        setTodo(
          todo.filter((post) => {
              return post.id !== id;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getListTodo();
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    storeListTodo();
  };

  const markComplete = (id) => {
    axios
      .put(`http://127.0.0.1:8000/api/item/${id}`)
      .then((res) => {
        console.log(res.data);
        setTodo(
          todo.filter((post) => {
              return post.id !== id;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App bg-gray-200 h-screen py-12">
      <div className="container max-w-screen-md m-auto p-8 bg-white rounded-xl">
        <h1 className="text-6xl font-black tracking-tighter lowercase">
          To-Do List
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="my-4 flex space-x-4">
            <input
              type="text"
              className="flex-auto border p-2 rounded"
              placeholder="Masukkan todo list kamu"
              name='name'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="uppercase font-semibold tracking-wider px-4 py-2 rounded text-white bg-blue-600">
              Add to-do
            </button>
          </div>
        </form>
        <ul className="flex flex-col border rounded-xl divide-y">
          {todo.map((row, index) => (
            <div className='grid grid-cols-3 justify-between'>
              <input 
                type="checkbox" 
                name='complete'
                className="cursor-pointer m-4 w-4 h-4 checked:bg-blue-500" 
              />
              <li key={index} className="p-4 hover:bg-blue-100 cursor-pointer">
                {row.name}
              </li>
              <div className='text-end'>
                <button onClick={() => deleteListTodo(row.id)} className='bg-red-500 text-white rounded-md border border-red-700 m-4 p-2 w-max'><BsTrash/></button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home;
