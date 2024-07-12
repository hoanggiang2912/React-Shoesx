function Feedback() {
  return (
    <div className="feedback">
      <div className="p-4 rounded-xl shadow-md text-base flex gap-4">
        <img
          src="https://plus.unsplash.com/premium_photo-1687653078299-ae7fc1453bc4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="rounded-full w-16 h-16 overflow-hidden object-cover flex-shrink-0"
        />
        <div className="flex flex-col">
          <h4 className="text-gray-700 font-semibold text-lg">
            David Ostince{" - "}
            <span className="text-sm !font-regular italic text-slate-400">
              {new Date().toDateString()}
            </span>
          </h4>
          <p className="text-md font-italic">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            in hic repudiandae obcaecati harum beatae fugiat...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
