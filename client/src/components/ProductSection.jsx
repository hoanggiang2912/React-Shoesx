import Button from "./Button";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

function ProductSection({ title, products }) {
  return (
    <div className="px-48 py-20">
      <div className="title flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <div className="w-1 h-6 block shrink-0 bg-indigo-400"></div>
          <h1 className="text-3xl font-bold uppercase">{title}</h1>
        </div>
        <div className="flex gap-2 sliderButtons">
          <Button>
            <FaAngleLeft />
          </Button>
          <Button>
            <FaAngleRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductSection;
