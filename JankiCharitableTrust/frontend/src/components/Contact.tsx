import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from './ui/use-toast';
import GoogleMap from './GoogleMap';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      console.log('Form submission:', values);

      toast({
        title: "Message sent successfully!",
        description: "We will get back to you soon.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gradient text-center">Contact Us</h2>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card className="p-8 shadow-card dark:shadow-card-dark gradient-card border border-border/50">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-foreground">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    className="w-full focus-ring"
                    placeholder="Enter your name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-foreground">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className="w-full focus-ring"
                    placeholder="Enter your email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-foreground">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    {...form.register("subject")}
                    className="w-full focus-ring"
                    placeholder="Enter message subject"
                  />
                  {form.formState.errors.subject && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-foreground">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    {...form.register("message")}
                    className="w-full focus-ring"
                    placeholder="Type your message here..."
                    rows={4}
                  />
                  {form.formState.errors.message && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary text-primary-foreground shadow-lg hover-glow focus-ring font-semibold py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Location</h3>
              <GoogleMap className="w-full" />
            </div>

            <div className="space-y-6">
              <Card className="p-8 shadow-card dark:shadow-card-dark gradient-card border border-border/50 hover-lift">
                <h3 className="text-2xl font-bold mb-6 text-primary">Get in Touch</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Address</h4>
                    <p className="text-foreground/80">Hooghly, West Bengal, India</p>
                    <p className="text-sm text-muted-foreground mt-1">Near the heart of the community we serve</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Email</h4>
                    <p className="text-foreground/80">info@jankitrust.org</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Phone</h4>
                    <p className="text-foreground/80">+91 123 456 7890</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Hours</h4>
                    <p className="text-foreground/80">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-foreground/80">Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 shadow-card dark:shadow-card-dark gradient-card border border-border/50 hover-lift">
                <h3 className="text-2xl font-bold mb-6 text-primary">Follow Us</h3>
                <div className="space-y-4">
                  {/* Replace "#" with actual links if available */}
                  <a
                    href="https://www.facebook.com/people/JANKI-SEVA-SANGH/100067845215910/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
                  >
                    {/* Facebook Icon */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-foreground/80 hover:text-primary transition-colors duration-300 font-medium">
                    {/* Twitter Icon */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775..." />
                    </svg>
                    <span>Twitter</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-foreground/80 hover:text-primary transition-colors duration-300 font-medium">
                    {/* Instagram Icon */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367..." />
                    </svg>
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-foreground/80 hover:text-primary transition-colors duration-300 font-medium">
                    {/* LinkedIn Icon */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569..." />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
