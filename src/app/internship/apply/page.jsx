'use client';
import { useState } from 'react';
import { UploadCloud } from 'lucide-react';

export default function ApplyFormPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    role: '',
    skills: '',
    portfolio: '',
    address: '',
    documents: null,
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Only PDF allowed ❌');
      return;
    }

    setForm((prev) => ({ ...prev, documents: file }));
    alert('Document Uploaded Successfully ✅');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.documents) {
      alert('Resume PDF is required ❌');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('education', form.education);
    formData.append('role', form.role);
    formData.append('skills', form.skills);
    formData.append('portfolio', form.portfolio);
    formData.append('address', form.address);
    formData.append('documents', form.documents);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/internship`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Submission failed');
      }

      alert('Application Submitted ✅');

      setForm({
        name: '',
        email: '',
        phone: '',
        education: '',
        role: '',
        skills: '',
        portfolio: '',
        address: '',
        documents: null,
      });

    } catch (error) {
      console.error(error);
      alert('Submit failed ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Apply for Internship
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Field label="Full Name">
              <input name="name" value={form.name} className="input" onChange={handleChange} required />
            </Field>

            <Field label="Email">
              <input type="email" name="email" value={form.email} className="input" onChange={handleChange} required />
            </Field>

            <Field label="Phone">
              <input type="tel" name="phone" value={form.phone} className="input" onChange={handleChange} required />
            </Field>

            <Field label="Education">
              <input name="education" value={form.education} className="input" onChange={handleChange} />
            </Field>

            <Field label="Preferred Role">
              <select name="role" value={form.role} className="input" onChange={handleChange} required>
                <option value="">Select Role</option>
                <option>Full Stack Developer</option>
                <option>Backend Developer</option>
                <option>Frontend Developer</option>
                <option>Server Developer</option>
                <option>Flutter Developer</option>
                <option>UI/UX Developer</option>
                <option>Social Media Handler</option>
                <option>DevOps Engineer</option>
              </select>
            </Field>

            <Field label="Skills">
              <textarea name="skills" value={form.skills} className="input resize-none" onChange={handleChange} />
            </Field>

            <Field label="Portfolio">
              <textarea name="portfolio" value={form.portfolio} className="input resize-none" onChange={handleChange} />
            </Field>

            <Field label="Address">
              <textarea name="address" value={form.address} className="input resize-none" onChange={handleChange} />
            </Field>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <label className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-2 border border-dashed border-blue-400 rounded-xl cursor-pointer text-sm text-gray-600 hover:bg-blue-50 transition">
              <UploadCloud size={18} />

              {form.documents ? (
                <span className="text-green-600 font-medium truncate max-w-[150px]">
                  {form.documents.name}
                </span>
              ) : (
                <span>Upload Resume (PDF)</span>
              )}

              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #4b5563;
          margin-bottom: 4px;
        }

        .input {
          width: 100%;
          height: 42px;
          padding: 0 12px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          outline: none;
          transition: 0.2s;
        }

        textarea.input {
          height: 42px;
        }

        .input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px #bfdbfe;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}