import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for filters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-10 py-3 rounded-full border-0  focus:ring-2 focus:ring-[#2563eb]"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#2563eb]"
        >
          <IoSearch className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}