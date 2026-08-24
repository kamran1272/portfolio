import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { siteConfig } from "../../data/siteData";

const contactItems = [
	{
		label: "Email",
		value: siteConfig.email,
		href: `mailto:${siteConfig.email}`,
		icon: faEnvelope,
	},
	{
		label: "LinkedIn",
		value: "Connect with me",
		href: siteConfig.linkedinUrl,
		icon: faLinkedin,
	},
	{
		label: "Location",
		value: siteConfig.location,
		href: "https://www.google.com/maps?q=Lahore,+Pakistan",
		icon: faLocationDot,
	},
	{
		label: "GitHub",
		value: "View my code",
		href: siteConfig.githubUrl,
		icon: faGithub,
	},
];

const ContactInfo = () => (
	<div>
		<p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
			Let&apos;s work together
		</p>
		<h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
			Let&apos;s build something useful.
		</h2>
		<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
			{contactItems.map((item) => (
				<a
					key={item.label}
					href={item.href}
					target={item.label === "Email" ? undefined : "_blank"}
					rel={item.label === "Email" ? undefined : "noopener noreferrer"}
					className="group flex items-center gap-4"
				>
					<span className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-700 bg-surface-light text-primary transition-colors duration-200 group-hover:border-primary">
						<FontAwesomeIcon icon={item.icon} />
					</span>
					<span>
						<span className="block text-xs uppercase tracking-[0.16em] text-slate-500">
							{item.label}
						</span>
						<span className="mt-1 block text-sm text-slate-300 group-hover:text-primary">
							{item.value}
						</span>
					</span>
				</a>
			))}
		</div>
	</div>
);

export default ContactInfo;
