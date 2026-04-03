import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  organisation: z.string().trim().max(200).optional(),
  service: z.string().min(1, "Veuillez choisir un service"),
  message: z.string().trim().min(1, "Le message est requis").max(2000),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", organisation: "", service: "", message: "" },
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      const response = await fetch("https://formspree.io/f/xpqoyoyj", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Erreur réseau");
      toast({
        title: "Message envoyé !",
        description: "Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.",
      });
      form.reset();
    } catch {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-heading text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
            Contactez-nous
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            Démarrez votre <span className="text-gradient">projet</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading text-sm">Nom complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom" className="bg-secondary/50 border-border font-body" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading text-sm">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="votre@email.com" type="email" className="bg-secondary/50 border-border font-body" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="organisation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-heading text-sm">Organisation</FormLabel>
                      <FormControl>
                        <Input placeholder="Hôpital, laboratoire, université..." className="bg-secondary/50 border-border font-body" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-heading text-sm">Type de service</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-secondary/50 border-border font-body">
                            <SelectValue placeholder="Choisissez un service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sequencage">Séquençage et pré-traitement</SelectItem>
                          <SelectItem value="analyse">Analyse bioinformatique avancée</SelectItem>
                          <SelectItem value="visualisation">Visualisation et rapports</SelectItem>
                          <SelectItem value="consulting">Consulting général</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-heading text-sm">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez votre projet ou besoin..."
                          className="bg-secondary/50 border-border font-body min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full rounded-full font-heading text-sm glow-teal">
                  Envoyer la demande
                </Button>
              </form>
            </Form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col justify-center gap-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold mb-1">Email</h3>
                <a href="mailto:genolabgab@proton.me" className="font-body text-muted-foreground hover:text-primary transition-colors">
                  genolabgab@proton.me
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold mb-1">Localisation</h3>
                <p className="font-body text-muted-foreground">Basé au Maroc</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold mb-1">Disponibilité</h3>
                <p className="font-body text-muted-foreground">Disponible à l'international</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
