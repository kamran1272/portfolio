import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUtensils,
	faCartShopping,
	faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const niches = [
	{
		icon: faUtensils,
		title: "Restaurant Websites",
		description:
			"Online menus, table reservations and commission-free online ordering for restaurants that want more direct customers.",
		href: "/portfolio/services/restaurant-website-developer/",
	},
	{
		icon: faCartShopping,
		title: "Ecommerce Stores",
		description:
			"Fast online stores with smooth checkout and payments, built to turn visitors into buyers.",
		href: "/portfolio/services/ecommerce-website-developer/",
	},
	{
		icon: faCalendarCheck,
		title: "Salon Booking Websites",
		description:
			"Online appointments, staff calendars and reminders for salons, barbers and spas.",
		href: "/portfolio/services/salon-booking-website/",
	},
];

const NicheServices = () => (
	<section aria-label="Specialized services" className="pb-24 lg:pb-32">
		<Container>
			<SectionHeading
				eyebrow="Specialized services"
				title="Niche websites that bring clients"
				description="Focused builds for three industries I know well. Each one is a full breakdown of what you get."
				className="mb-12"
			/>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{niches.map((niche) => (
					<a
						key={niche.title}
						href={niche.href}
						className="group rounded-xl border border-slate-700/70 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 sm:p-8"
					>
						<span
							className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-xl text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-[#07111F]"
							aria-hidden="true"
						>
							<FontAwesomeIcon icon={niche.icon} />
						</span>
						<h3 className="mt-6 text-xl font-semibold text-white">
							{niche.title}
						</h3>
						<p className="mt-3 text-sm leading-6 text-muted-text">
							{niche.description}
						</p>
						<span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
							View service
							<span
								aria-hidden="true"
								className="transition-transform duration-300 group-hover:translate-x-1"
							>
								&rarr;
							</span>
						</span>
					</a>
				))}
			</div>
		</Container>
	</section>
);

export default NicheServices;
