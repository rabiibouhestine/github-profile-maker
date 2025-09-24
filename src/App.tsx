function App() {
  return (
    <div className="h-screen max-w-[1440px] mx-auto p-4 grid grid-cols-4 gap-4">
      <div className="panel col-span-1"></div>
      <div className="panel col-span-1"></div>
      <div className="col-span-2 flex flex-col gap-4">
        <div className="panel h-16"></div>
        <div className="panel h-full"></div>
      </div>
    </div>
  );
}

export default App;
