import './Button.css';
export default function Button({ value, onClick }) {
  return (
    <button type="button" onClick={onClick} className="Button">
      {value}
    </button>
  );
}
