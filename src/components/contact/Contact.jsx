import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import Container from "../common/Container";

const Contact = () => {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 rounded-xl border border-slate-700/70 bg-surface p-6 sm:p-10 lg:grid-cols-2 lg:gap-20 lg:p-14">
          <ContactInfo />
          <ContactForm />
        </div>
      </Container>
    </section>
  );
};

export default Contact;
