import { motion } from "framer-motion";
import { BarChart3, MapPin, MessageSquare, Shield, Smartphone, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: BarChart3,
    title: "Real-Time Pricing",
    description: "Live market prices by crop and region so you never sell below value.",
  },
  {
    icon: MapPin,
    title: "Location Matching",
    description: "Find nearby buyers and reduce transport costs with smart geo-matching.",
  },
  {
    icon: MessageSquare,
    title: "Direct Messaging",
    description: "Negotiate directly with buyers — no middlemen fees or hidden charges.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Escrow-protected transactions ensure both parties are covered.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Designed for farmers in the field — works seamlessly on any phone.",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description: "Get alerts when buyers are looking for your crops in your area.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-medium text-primary uppercase tracking-widest">Features</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-3">
            Everything You Need to <span className="text-primary">Succeed</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Built for farmers and buyers who deserve transparency, speed, and fair pricing.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="group hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon size={24} className="text-accent-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 font-body">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
