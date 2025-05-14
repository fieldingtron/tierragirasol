import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Heading from "./Heading";

const contactform = {
  en: {
    title: "Contact",
    name: "Your Name",
    email: "Email Address",
    message: "Message",
    sendMessage: "Send Message",
    sent: "Message Sent!",
  },
  es: {
    title: "Contacto",
    name: "Tu Nombre",
    email: "Correo",
    message: "Mensaje",
    sendMessage: "Manda Correo",
    sent: "Enviado",
  },
};
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "+56942464565";

export default function Contact({ locale }) {
  const form = contactform[locale];
  const [response, setResponse] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  async function submitForm(data) {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "your-name": data["your-name"],
          "your-email": data["your-email"],
          "your-message": data["your-message"],
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setResponse(true);
      reset();
      setError("");
    } catch (error) {
      console.error("Form submission error: ", error);
      setError(error.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="bg-no-repeat bg-right-bottom bg-araucaria" id="contact">
      <Heading text={form.title} />
      <div className="container mx-auto py-1">
        <div className="w-full max-w-2xl mx-auto my-2">
          <div className="p-6 border rounded-md">
            {response ? (
              <h2 className="p-6 text-5xl text-green-600 text-center font-extrabold">
                {form.sent}
              </h2>
            ) : (
              <form method="post" onSubmit={handleSubmit(submitForm)}>
                {error && (
                  <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
                    {error}
                  </div>
                )}
                <label className="block mb-6">
                  <span>{form.name}</span>
                  <input
                    {...register("your-name", { required: true, minLength: 3 })}
                    type="text"
                    className="block w-full mt-1 p-2 px-3 border-gray-300 rounded-md shadow-sm dark:text-white dark:bg-darkGrayishBlue"
                    placeholder="Pedro RiosLibres"
                  />
                </label>
                <label className="block mb-6">
                  <span>{form.email}</span>
                  <input
                    {...register("your-email", {
                      required: true,
                      minLength: 5,
                    })}
                    type="email"
                    className="block w-full mt-1 p-2 px-3 border-gray-300 rounded-md shadow-sm dark:text-white dark:bg-darkGrayishBlue"
                    placeholder="juan.pedro@gmail.com"
                  />
                </label>
                <label className="block mb-6">
                  <span>{form.message}</span>
                  <textarea
                    {...register("your-message", {
                      required: true,
                      minLength: 5,
                    })}
                    rows="3"
                    className="block w-full mt-1 p-2 px-3 border-gray-300 rounded-md shadow-sm dark:text-white dark:bg-darkGrayishBlue"
                    placeholder="Cuenta nos que estas pensando..."
                  ></textarea>
                </label>
                <div className="mb-2">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className={`h-10 px-5 font-semibold rounded-lg text-white transition ease-in-out duration-150
                      ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-indigo-700 hover:bg-indigo-800"
                      }`}
                  >
                    {isSubmitting ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      form.sendMessage
                    )}
                  </button>
                </div>
              </form>
            )}
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-5 right-5 bg-green-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
