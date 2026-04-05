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
    <section id="contact" className="py-28 md:py-36 border-t border-border/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <p className="font-heading text-sm tracking-widest uppercase text-primary mb-4">
            Contact
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Démarrez votre projet
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-16 max-w-5xl">
          <div className="lg:col-span-3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading text-sm text-foreground">Nom complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom" className="bg-card/30 border-border/60 font-body" {...field} />
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
                        <FormLabel className="font-heading text-sm text-foreground">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="votre@email.com" type="email" className="bg-card/30 border-border/60 font-body" {...field} />
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
                      <FormLabel className="font-heading text-sm text-foreground">Organisation</FormLabel>
                      <FormControl>
                        <Input placeholder="Hôpital, laboratoire, université..." className="bg-card/30 border-border/60 font-body" {...field} />
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
                      <FormLabel className="font-heading text-sm text-foreground">Type de service</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-card/30 border-border/60 font-body">
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
                      <FormLabel className="font-heading text-sm text-foreground">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez votre projet ou besoin..."
                          className="bg-card/30 border-border/60 font-body min-h-[140px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="rounded-md font-heading text-sm px-10">
                  Envoyer la demande
                </Button>
              </form>
            </Form>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-start gap-10 pt-2">
            {[
              { icon: Mail, title: "Email", content: "genolabgab@proton.me", href: "mailto:genolabgab@proton.me" },
              { icon: MapPin, title: "Localisation", content: "Basé au Maroc" },
              { icon: Globe, title: "Disponibilité", content: "Disponible à l'international" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold mb-1 text-foreground">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item.content}
                    </a>
                  ) : (
                    <p className="font-body text-sm text-muted-foreground">{item.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
