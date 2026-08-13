import { useState } from "react";
import axios from "axios";

export default function Newsletter() {

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const subscribe = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/newsletter/",
        {
          email: email,
        }
      );

      setMessage("Successfully subscribed!");

      setEmail("");

    } catch {

      setMessage("Email already exists.");

    }

  };

  return (

    <section className=" text-white px-2 mt-2">

      <div className=" ">

        <h2 className="text-xl font-bold">

          Subscribe to our Newsletter

        </h2>
        <div className="px-2">

        <p className="mt-1 text-gray-300">

          Get the latest articles, technology  <br />
          updates delivered straight to your inbox.
          

        </p>

        <form
          onSubmit={subscribe}
          className="grid  gap-2 mt-2"
        >

          <input

            type="email"

            placeholder="Enter your email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            className="flex-1 bg-blue-200 w-[15rem] rounded-lg px-4 py-3 text-black"

            required

          />

          <button

            className="bg-blue-200 px-8 flex items-center justify-center py-3 w-[8rem] h-[2rem] rounded-lg font-bold text-blue-500"

          >

            Subscribe

          </button>

        </form>

        <p className="mt-4">

          {message}

        </p>
        </div>

      </div>

    </section>

  );

}