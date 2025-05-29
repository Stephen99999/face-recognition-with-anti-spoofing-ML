export function Input({ type = "text", placeholder, value, onChange }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded w-full"
      />
    );
  }
  