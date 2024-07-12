function UserGeneral() {
  return (
    <div>
      <h1 className="text-lg font-semibold">User General Informations</h1>
      <form action="#" className="mt-3">
        <div className="form__group flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="primary-form-input mt-2"
          />
        </div>
        <div className="form__group flex flex-col mt-3">
          <label htmlFor="name">Email</label>
          <input
            type="text"
            id="name"
            name="name"
            className="primary-form-input mt-2"
          />
        </div>
        <div className="form__group flex flex-col mt-3">
          <label htmlFor="name">Phone</label>
          <input
            type="text"
            id="name"
            name="name"
            className="primary-form-input mt-2"
          />
        </div>
        <div className="form__group flex flex-col mt-3">
          <label htmlFor="name">Address</label>
          <input
            type="text"
            id="name"
            name="name"
            className="primary-form-input mt-2"
          />
        </div>
        <div className="flex justify-end items-center gap-4">
          <button className="primary-rounded-btn danger">Discard</button>
          <button className="primary-rounded-btn ">Update</button>
        </div>
      </form>
    </div>
  );
}

export default UserGeneral;
