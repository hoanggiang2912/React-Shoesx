import { FaTrashCan } from "react-icons/fa6";
import Button from "./Button";

function CartProductPopup() {
  return (
    <div className="cartItem flex items-start pb-5 gap-2">
      <img
        src="https://images.unsplash.com/photo-1719150006655-62fdcadf01a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        width="80"
        height="80"
        style={{
          objectFit: "cover",
          borderRadius: "10px",
          height: "80px",
        }}
      />
      <div className="flex flex-1 flex-col flex-between h-full">
        <div className="flex flex-col">
          <h4 className="text-md font-medium text-gray">
            Coffee Ambasador doloreto
          </h4>
          <div className="flex-1 mt-2">
            <p className="text-md text-slate-400">Ambasador</p>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <span className="text-md">2.299.000d</span>
          <span className="text-md">x2</span>
        </div>
      </div>
      <div className="flex-col flex">
        <Button className="text-slate-500 bg-opacity-0 hover:text-red-400 hover:bg-gray-100">
          <FaTrashCan />
        </Button>
      </div>
    </div>
  );
}

export default CartProductPopup;
