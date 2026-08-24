import { useState } from "react";
import emailjs from "emailjs-com";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const inputClass =
	"w-full border-0 border-b border-slate-700 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors duration-200 placeholder:text-slate-500 focus:border-primary";

const ContactForm = () => {
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState("");

	const sendEmail = (event) => {
		event.preventDefault();
		setLoading(true);
		setStatus("");

		if (!serviceId || !templateId || !publicKey) {
			setStatus("Contact form configuration is unavailable right now. Please email me directly.");
			setLoading(false);
			return;
		}

		emailjs.sendForm(serviceId, templateId, event.target, publicKey).then(
			() => {
				setStatus("Message sent successfully. I will get back to you soon.");
				setLoading(false);
				event.target.reset();
			},
			() => {
				setStatus("Message could not be sent right now. Please try again.");
				setLoading(false);
			}
		);
	};

	return (
		<div>
			<form onSubmit={sendEmail} className="flex flex-col gap-7">
				<label className="text-sm text-slate-300">
					Your Name
					<input name="name" type="text" required className={inputClass} autoComplete="name" />
				</label>
				<label className="text-sm text-slate-300">
					Your Email
					<input name="email" type="email" required className={inputClass} autoComplete="email" />
				</label>
				<label className="text-sm text-slate-300">
					Your Message
					<textarea name="message" rows="5" required className={`${inputClass} resize-y`} />
				</label>
				<button
					type="submit"
					disabled={loading}
					className="inline-flex w-fit items-center gap-3 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-[#07111F] transition-colors duration-200 hover:bg-primary/85 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{loading ? "Sending..." : "Send Message"}
					<span aria-hidden="true">-&gt;</span>
				</button>
			</form>
			{status && <p className="mt-5 text-sm text-slate-400" aria-live="polite">{status}</p>}
		</div>
	);
};

export default ContactForm;
