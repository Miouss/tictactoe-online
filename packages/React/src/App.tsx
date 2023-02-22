export default function App() {
  const fetchNode = () => {
    fetch("http://localhost:3001/data")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return <button onClick={fetchNode}>GET SOME DATA</button>;
}
