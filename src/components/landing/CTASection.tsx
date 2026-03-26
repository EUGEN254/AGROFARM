import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  const handleJoin = (role: "farmer" | "buyer") => {
    navigate(`/auth/signup/${role}`);
  };

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary-foreground/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary-foreground/5 translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
            Ready to Get Fair Prices for Your Harvest?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Join thousands of farmers who've already taken control of their
            market. Start selling directly to buyers today — it's free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => handleJoin("farmer")}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base gap-2 px-8 py-6 rounded-xl shadow-lg"
            >
              Join as a Farmer <ArrowRight size={18} />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => handleJoin("buyer")}
              className="text-base px-8 py-6 rounded-xl bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
            >
              Join as a Buyer
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
