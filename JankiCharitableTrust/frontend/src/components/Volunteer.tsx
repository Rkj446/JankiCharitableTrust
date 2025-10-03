import { useState } from 'react';
import api from '../lib/axios';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export default function Volunteer() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    availability: '',
    message: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await api.post('/volunteer', form);
      toast({ title: 'Thank you!', description: 'We received your volunteer request.' });
      setForm({ name: '', email: '', phone: '', location: '', availability: '', message: '' });
    } catch (err: any) {
      toast({ title: 'Submission failed', description: 'Please check your details and try again.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Become a Volunteer</h1>
      <p className="text-muted-foreground mb-8">Share a few details and we will reach out.</p>
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={onChange} placeholder="Full name" required minLength={2}
            className="w-full rounded-lg border border-border/60 bg-card/70 px-3 py-2" />
          <input name="email" type="email" value={form.email} onChange={onChange} placeholder="Email" required
            className="w-full rounded-lg border border-border/60 bg-card/70 px-3 py-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone"
            className="w-full rounded-lg border border-border/60 bg-card/70 px-3 py-2" />
          <input name="location" value={form.location} onChange={onChange} placeholder="Location (City/Area)"
            className="w-full rounded-lg border border-border/60 bg-card/70 px-3 py-2" />
        </div>
        <input name="availability" value={form.availability} onChange={onChange} placeholder="Availability (e.g., weekends, evenings)"
          className="w-full rounded-lg border border-border/60 bg-card/70 px-3 py-2" />
        <textarea name="message" value={form.message} onChange={onChange} placeholder="How would you like to help?" rows={5}
          className="w-full rounded-lg border border-border/60 bg-card/70 px-3 py-2" />
        <div>
          <Button type="submit" disabled={submitting} className="gradient-primary text-primary-foreground rounded-xl px-6 py-2">
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </section>
  );
}



