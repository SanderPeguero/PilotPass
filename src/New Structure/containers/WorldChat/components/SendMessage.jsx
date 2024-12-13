import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react"
import { UserAuth } from "../context/AuthContext";
import { firedb } from "../../../services/firebase";

const SendMessage = () => {
  const [value, setValue] = useState("");
  const { currentUser } = UserAuth();
  
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if(value.trim() === "") {
      alert("Write a message!");
      return;
    }

    try {
      const { uid, displayName, photoURL } = currentUser; 
      await addDoc(collection(firedb, import.meta.env.VITE_FIREBASE_MESSAGE_WORLDCHAT_DIR), {
        text: value,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid
      })
    } catch(error) {
      console.log(error);
    }
    setValue("");
  }

  return (
    <div className="bg-[#060b15cc] z-1 fixed bottom-[5rem] sm:bottom-[0] w-full py-5 shadow-lg">
      <form onSubmit={handleSendMessage} className="px-2 containerWrap flex">
        <input value={value} onChange={e => setValue(e.target.value)} className="input w-full focus:outline-none bg-gray-100 rounded-r-none" type="text" />
        <button type="submit" className="w-auto h-[2.8rem] bg-gray-500 text-white rounded-r-lg px-5 text-sm">Send</button>
      </form>
    </div>
  )
}

export default SendMessage