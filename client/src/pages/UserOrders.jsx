import { Link } from "react-router-dom";

function UserOrders() {
  return (
    <>
      <h1 className="text-lg font-bold">My Orders</h1>
      <div className="order-wrapper mt-5">
        <div className="p-5 rounded-lg border-gray-400 border">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Order #123456</h2>
              <p className="text-sm">Order Date: 12/12/2021</p>
            </div>
            <div>
              <Link className="primary-rounded-btn">Details</Link>
            </div>
          </div>
          <div className="order-products">
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-2">
                <img
                  src="../../src/assets/loginbanner.svg"
                  alt="product"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold">Product Name</h3>
                  <p className="text-sm">Quantity: 2</p>
                </div>
              </div>
              <p className="text-lg font-semibold">$200</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserOrders;
