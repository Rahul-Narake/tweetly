const Advertise = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div
        className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4"
        role="alert"
      >
        <p className="font-bold">Advertise with Us!</p>
        <p>Reach a wide audience and boost your brand on Twitter.</p>
        <button className="mt-2 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
          Learn More
        </button>
      </div>{' '}
      <div
        className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
        role="alert"
      >
        <p className="font-bold">Special Promotion!</p>
        <p>
          Advertise on Twitter and get 20% off your first campaign. Limited time
          offer!
        </p>
        <button className="mt-2 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
          Get Started
        </button>
      </div>
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">
          New Feature: Twitter Spaces!
        </h2>
        <p className="mb-4">
          Join live audio conversations with your followers. Engage in real-time
          discussions and share your thoughts.
        </p>
        <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-700">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Advertise;
