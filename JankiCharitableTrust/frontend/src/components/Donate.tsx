import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Card } from './ui/card';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from './ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  amount: z.string().min(1, {
    message: "Please enter a donation amount.",
  }),
  message: z.string().optional(),
});

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export default function Donate() {
  const { toast } = useToast();
  const [isLoadingScript, setIsLoadingScript] = useState(false);
  const isScriptLoadedRef = useRef<boolean>(false);
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;

  const isTestKey = useMemo(() => {
    return !!razorpayKey && razorpayKey.startsWith('rzp_test_');
  }, [razorpayKey]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      message: "",
    },
  });

  const loadRazorpay = useCallback(async () => {
    if (window.Razorpay) {
      isScriptLoadedRef.current = true;
      return true;
    }
    if (isLoadingScript) return false;
    try {
      setIsLoadingScript(true);
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Razorpay'));
        document.body.appendChild(script);
      });
      isScriptLoadedRef.current = true;
      return true;
    } catch (e) {
      isScriptLoadedRef.current = false;
      return false;
    } finally {
      setIsLoadingScript(false);
    }
  }, [isLoadingScript]);

  useEffect(() => {
    // Preload checkout for faster UX
    loadRazorpay();
  }, [loadRazorpay]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!razorpayKey) {
      toast({
        title: "Payment unavailable",
        description: "Missing Razorpay key. Set VITE_RAZORPAY_KEY_ID in your environment.",
        variant: "destructive",
      });
      return;
    }

    const scriptOk = await loadRazorpay();
    if (!scriptOk || !window.Razorpay) {
      toast({
        title: "Payment unavailable",
        description: "Could not load Razorpay checkout. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const amountPaise = Math.max(1, Math.floor(Number(values.amount) * 100));

    const options: any = {
      key: razorpayKey,
      amount: amountPaise,
      currency: 'INR',
      name: 'Janki Seva Sangh',
      description: 'Donation',
      image: undefined,
      // Ideally use a server to create an order and set order_id here
      handler: function (response: any) {
        toast({
          title: 'Payment successful',
          description: `Payment ID: ${response.razorpay_payment_id}`,
        });
        form.reset();
      },
      prefill: {
        name: values.name,
        email: values.email,
      },
      notes: {
        donor_message: values.message || '',
      },
      theme: {
        color: '#f59e0b',
      },
      modal: {
        ondismiss: () => {
          toast({
            title: 'Payment cancelled',
            description: 'You closed the payment window.',
          });
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response: any) {
      toast({
        title: 'Payment failed',
        description: response.error?.description || 'Please try again.',
        variant: 'destructive',
      });
    });
    rzp.open();
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gradient text-center">Make a Donation</h2>
        {razorpayKey ? (
          <p className="text-center mb-6 text-sm text-foreground/70">
            {isTestKey ? 'Test mode' : 'Live mode'} enabled
          </p>
        ) : (
          <p className="text-center mb-6 text-sm text-destructive">
            Razorpay key missing. Set <code>VITE_RAZORPAY_KEY_ID</code> in your environment.
          </p>
        )}
        
        <div className="grid md:grid-cols-2 gap-8">
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
                  <p className="text-destructive text-sm mt-1">{form.formState.errors.name.message}</p>
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
                  <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-semibold mb-2 text-foreground">
                  Donation Amount (₹)
                </label>
                <Input
                  id="amount"
                  type="number"
                  {...form.register("amount")}
                  className="w-full focus-ring"
                  placeholder="Enter amount"
                  min="1"
                />
                {form.formState.errors.amount && (
                  <p className="text-destructive text-sm mt-1">{form.formState.errors.amount.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-foreground">
                  Message (Optional)
                </label>
                <Textarea
                  id="message"
                  {...form.register("message")}
                  className="w-full focus-ring"
                  placeholder="Leave a message..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-primary text-primary-foreground shadow-lg hover-glow focus-ring font-semibold py-3" 
                disabled={form.formState.isSubmitting || isLoadingScript}
              >
                {form.formState.isSubmitting || isLoadingScript ? "Preparing Checkout..." : "Donate Now"}
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-8 shadow-card dark:shadow-card-dark gradient-card border border-border/50 hover-lift">
              <h3 className="text-2xl font-bold mb-4 text-primary">Why Donate?</h3>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                Your donation helps us continue our mission of providing education, healthcare, and support
                to underprivileged communities. Every contribution, no matter how small, makes a difference.
              </p>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-center space-x-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Support education initiatives</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Fund healthcare programs</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Enable community development</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Empower local communities</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card dark:shadow-card-dark gradient-card border border-border/50 hover-lift">
              <h3 className="text-2xl font-bold mb-4 text-primary">Other Ways to Help</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-primary text-xl">❤</span>
                  <span className="text-foreground/80">Volunteer your time and skills</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary text-xl">❤</span>
                  <span className="text-foreground/80">Spread awareness about our cause</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary text-xl">❤</span>
                  <span className="text-foreground/80">Partner with us for initiatives</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}