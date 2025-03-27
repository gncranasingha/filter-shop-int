import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  send this data to your backend
    console.log('Form submitted:', formData);
    toast.success('Message sent successfully!');
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-[#2563eb] hover:bg-[#1e40af] text-white font-medium py-2 px-6 rounded transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-gray-700">123 Filter Street, Clean City, CC 12345</p>
              </div>
              
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-700">+1 (555) 123-4567</p>
              </div>
              
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-700">info@filtershop.com</p>
              </div>
              
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-700">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-700">Sunday: Closed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
         
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Google Maps would be embedded here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}