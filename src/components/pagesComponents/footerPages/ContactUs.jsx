"use client";

import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import userAxios from "@/lib/userbackAxios";
import { toast } from "react-toastify";
import {
  Loader2,
  Phone,
  Mail,
  MapPin,
  Send,
  RotateCcw,
  UploadCloud,
  FileCheck2,
} from "lucide-react";

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  /* ---------------- SUBMIT HANDLER ---------------- */
  const submitHandler = async (formData) => {
    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("subject", formData.subject);
      payload.append("message", formData.message);

      if (file) payload.append("profile", file);

      const response = await userAxios.post(
        "/contactUs/create",
        payload,
        // { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success(response.data.message || "Message sent successfully");
      reset();
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8">

        {/* ================= CONTACT FORM ================= */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">

          <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
          <p className="text-sm text-gray-500 mb-4">
            Fill out the form and our team will contact you shortly.
          </p>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField
                id="name"
                label="Your Name"
                placeholder="John Doe"
                register={register}
                error={errors.name}
              />
              <InputField
                id="email"
                label="Your Email"
                placeholder="john@example.com"
                type="email"
                register={register}
                error={errors.email}
              />
            </div>

            <InputField
              id="subject"
              label="Subject"
              placeholder="I need help with..."
              register={register}
              error={errors.subject}
            />

            <TextareaField
              id="message"
              label="Message"
              placeholder="Write your message here..."
              register={register}
              error={errors.message}
            />

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />

            {/* ================= BUTTONS ROW ================= */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 pt-1">

              {/* SEND */}
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-5 py-2.5 
                bg-blue-600 text-white rounded-lg font-semibold 
                hover:bg-blue-700 disabled:opacity-70 w-full sm:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              {/* UPLOAD PROFILE */}
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="flex items-center justify-center gap-2 px-5 py-2.5 
                bg-indigo-600 text-white rounded-lg font-semibold 
                hover:bg-indigo-700 transition w-full sm:w-auto"
              >
                <UploadCloud className="w-4 h-4" />
                Upload Profile
              </button>

              {/* RESET */}
              <button
                type="button"
                onClick={() => {
                  reset();
                  setFile(null);
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 
                bg-gray-100 rounded-lg text-gray-700 font-semibold 
                hover:bg-gray-200 transition w-full sm:w-auto"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            {/* FILE NAME */}
            {file && (
              <div className="flex items-center gap-2 text-green-700 text-xs pt-1">
                <FileCheck2 className="w-4 h-4" />
                {file.name}
              </div>
            )}

            {/* CONTACT INFO */}
            <div className="grid sm:grid-cols-2 gap-3 pt-3">
              <ContactInfo
                icon={<Phone className="w-4 h-4 text-blue-500" />}
                text="+91 8770877270"
                href="tel:+918770877270"
              />
              <ContactInfo
                icon={<Mail className="w-4 h-4 text-blue-500" />}
                text="info@itaxeasy.com"
                href="mailto:info@itaxeasy.com"
              />
            </div>
          </form>
        </div>

        {/* ================= MAP SECTION ================= */}
        <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
          <div className="p-3 border-b flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-medium text-gray-900">Our Location</h3>
          </div>

          <div className="h-[400px]">
            <iframe
              title="Office Location"
              loading="lazy"
              allowFullScreen
              className="w-full h-full"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4668.759088204337!2d78.1760718502079!3d26.2171536260565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c69faa0547f1%3A0x3996f8cdea3069b!2sItax%20easy%20private%20limited!5e0!3m2!1sen!2sin!4v1676326483432!5m2!1sen!2sin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

const InputField = ({ id, label, placeholder, type = "text", register, error }) => (
  <div>
    <label className="block text-xs font-medium text-gray-700 mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type={type}
      placeholder={placeholder}
      {...register(id, { required: `${label} is required` })}
      className={`w-full px-3 py-2 border rounded-lg text-sm
      focus:ring-2 focus:ring-blue-500 transition
      ${error ? "border-red-500" : "border-gray-300"}`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
  </div>
);

const TextareaField = ({ id, label, placeholder, register, error }) => (
  <div>
    <label className="block text-xs font-medium text-gray-700 mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
    <textarea
      rows={2}
      placeholder={placeholder}
      {...register(id, { required: `${label} is required` })}
      className={`w-full px-3 py-2 border rounded-lg text-sm resize-none
      focus:ring-2 focus:ring-blue-500 transition
      ${error ? "border-red-500" : "border-gray-300"}`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
  </div>
);

const ContactInfo = ({ icon, text, href }) => (
  <a
    href={href}
    className="flex items-center gap-2 px-3 py-2 
    bg-gray-50 rounded-lg text-sm text-gray-600 
    hover:bg-blue-50 hover:text-blue-600 transition"
  >
    {icon}
    {text}
  </a>
);
