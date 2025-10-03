interface GoogleMapProps {
  className?: string;
}

export default function GoogleMap({ className = '' }: GoogleMapProps) {
  return (
    <div className={`rounded-2xl overflow-hidden shadow-lg border border-border/50 ${className}`}>
      <iframe
        src="https://maps.google.com/maps?q=22.698101,88.334533&hl=es'nhl=en=16&output=embed&t=&q=Janaki+Seva+Sangh"
        width="100%"
        height="320"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Janki Charitable Trust Location"
        className="w-full h-80"
      />
      <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border-t border-border/50">
        <a 
          href="https://maps.app.goo.gl/smx2abv4m24ZR7y7A" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300 font-semibold text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
