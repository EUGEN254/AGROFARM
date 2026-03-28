import { motion } from "framer-motion";
import { UserPlus, ListChecks, Handshake, Truck } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your free account as a farmer or buyer in under 2 minutes.",
  },
  {
    icon: ListChecks,
    title: "List or Browse",
    description: "Farmers list produce with photos and pricing. Buyers browse and filter.",
  },
  {
    icon: Handshake,
    title: "Connect & Negotiate",
    description: "Chat directly, agree on price, and confirm the order securely.",
  },
  {
    icon: Truck,
    title: "Deliver & Get Paid",
    description: "Coordinate delivery and receive payment directly — no middlemen.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-medium text-primary uppercase tracking-widest">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-3">
            Simple Steps to <span className="text-primary">Fair Trade</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="w-24 h-24 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center mb-6 relative z-10">
                <step.icon size={36} className="text-primary" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 font-body">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-[220px]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
