import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Amina Kibiru",
    role: "Maize Farmer, Nakuru",
    quote: "I used to sell my maize at half the market price. FarmLink helped me find buyers directly and my income increased by 35% in just 3 months.",
    rating: 5,
  },
  {
    name: "Joseph Odhiambo",
    role: "Restaurant Owner, Nairobi",
    quote: "Finding reliable suppliers was always a struggle. With FarmLink, I get fresh produce delivered directly from verified farmers every week.",
    rating: 5,
  },
  {
    name: "Grace Wanjiku",
    role: "Vegetable Farmer, Kiambu",
    quote: "The real-time pricing feature is a game-changer. I always know the fair market price before I negotiate. No more guessing.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-medium text-primary uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-3">
            Trusted by <span className="text-primary">Real People</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} size={16} className="fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-foreground/90 italic mb-6 flex-1 leading-relaxed">"{t.quote}"</p>
                  <div>
                    <p className="font-bold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
