import { useState } from 'react';
import { useRouter } from 'next/router';

const AddUserForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    zip: ''
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = () => {
    if (step === 1 && (!formData.name || !formData.email || !/\S+@\S+\.\S+/.test(formData.email))) {
      alert('Enter a valid name and email');
      return false;
    }
    if (step === 2 && (!formData.street || !formData.city || !formData.zip)) {
      alert('Fill all address fields');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log(formData);
    alert('User data submitted to console!');
    router.push('/dashboard');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
      {step === 1 && (
        <div className="space-y-4">
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 w-full" />
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <input name="street" placeholder="Street" value={formData.street} onChange={handleChange} className="border p-2 w-full" />
          <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border p-2 w-full" />
          <input name="zip" placeholder="Zip" value={formData.zip} onChange={handleChange} className="border p-2 w-full" />
        </div>
      )}
      {step === 3 && (
        <div className="space-y-2">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Street:</strong> {formData.street}</p>
          <p><strong>City:</strong> {formData.city}</p>
          <p><strong>Zip:</strong> {formData.zip}</p>
        </div>
      )}

      <div className="mt-4 space-x-2">
        {step > 1 && <button onClick={handleBack} className="bg-gray-300 px-4 py-2 rounded">Back</button>}
        {step < 3 && <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>}
        {step === 3 && <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>}
        <button onClick={() => router.push('/dashboard')} className="ml-4 underline">Back to Dashboard</button>
      </div>
    </div>
  );
};

export default AddUserForm;
