const Home = () => {
  return (
    <div className="flex justify-between">
      <div>
        <h2 className="text-xl sm:text-3xl font-medium mb-5 border-b border-colorOne">To Do</h2>
      </div>
      <div>
        <h2 className="text-xl sm:text-3xl font-medium mb-5 border-b border-colorOne">In Progress</h2>
      </div>
      <div>
        <h2 className="text-xl sm:text-3xl font-medium mb-5 border-b border-colorOne">Done</h2>
      </div>
    </div>
  );
}

export default Home;
