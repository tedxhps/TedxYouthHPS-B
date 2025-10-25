import React, { useEffect, useRef, useState } from "react";

const LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/9/9d/TEDx_logo.svg";
const INSTAGRAM_URL = "https://www.instagram.com/tedxhps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

const TEAM = [
  { id: 1, name: "John Doe", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80" },
  { id: 2, name: "Jane Smith", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80" },
  { id: 3, name: "Rahul Verma", photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&q=80" }
];

const SPEAKERS = [
  { id: 1, name: "Dr. Asha Rao", title: "AI & Society", bio: "Short placeholder bio.", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80" },
  { id: 2, name: "Rahul Mehta", title: "Climate Storyteller", bio: "Short placeholder bio.", photo: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=1200&q=80" },
  { id: 3, name: "Sana Iqbal", title: "Urban Designer", bio: "Short placeholder bio.", photo: "https://images.unsplash.com/photo-1545996124-1b0c6f3a0a6b?w=1200&q=80" }
];

function SpeakersCarousel({ onSelect }) {
  const scrollRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let speed = 0.6;
    const step = () => {
      container.scrollLeft += speed;
      if (container.scrollLeft >= container.scrollWidth / 2) container.scrollLeft = 0;
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="w-full overflow-hidden" aria-hidden={false}>
      <div ref={scrollRef} className="flex gap-8 w-max">
        {[...SPEAKERS, ...SPEAKERS].map((s, i) => (
          <div key={i} className="inline-block bg-gradient-to-b from-zinc-900 to-black border border-red-800 rounded-xl w-80 flex-shrink-0 overflow-hidden">
            <button onClick={() => onSelect(s.id)} className="block text-left w-full">
              <img src={s.photo} alt={s.name} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-semibold text-red-500">{s.name}</h4>
                <p className="text-sm text-gray-400">{s.title}</p>
                <p className="mt-2 text-gray-300 text-sm">{s.bio}</p>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TEDxWebsite() {
  const [page, setPage] = useState("home");
  const [currentSpeaker, setCurrentSpeaker] = useState(null);

  function handleNav(target) {
    setCurrentSpeaker(null);
    setPage(target);
  }

  function gotoSpeaker(id) {
    const s = SPEAKERS.find((x) => x.id === id);
    if (s) setCurrentSpeaker(s);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-900 to-red-700 text-white">
      <header className="sticky top-0 bg-black/80 backdrop-blur border-b border-red-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 relative flex items-center">
          <div className="flex items-center gap-4">
            <img src={LOGO_URL} alt="TEDx Logo" className="h-10" />
            <span className="text-lg font-bold text-red-600">TEDx HPS Begumpet Youth</span>
          </div>

          <nav className="absolute left-1/2 transform -translate-x-1/2">
            <div className="flex gap-8">
              <button onClick={() => handleNav("home")} className={`text-sm font-medium ${page === "home" ? "text-red-400" : "text-gray-300"}`}>Home</button>
              <button onClick={() => handleNav("info")} className={`text-sm font-medium ${page === "info" ? "text-red-400" : "text-gray-300"}`}>About</button>
              <button onClick={() => handleNav("team")} className={`text-sm font-medium ${page === "team" ? "text-red-400" : "text-gray-300"}`}>Meet the Team</button>
              <button onClick={() => handleNav("organisers")} className={`text-sm font-medium ${page === "organisers" ? "text-red-400" : "text-gray-300"}`}>Organisers & Event</button>
            </div>
          </nav>

          <div className="ml-auto w-24" />
        </div>
      </header>

      {currentSpeaker && (
        <div className="fixed inset-0 z-40 bg-black/90 flex items-start justify-center p-8">
          <div className="max-w-3xl w-full bg-zinc-900 rounded-xl border border-red-800 p-6">
            <div className="flex gap-6 items-start">
              <img src={currentSpeaker.photo} alt={currentSpeaker.name} className="w-48 h-48 object-cover rounded-md" />
              <div>
                <h2 className="text-3xl font-bold text-red-500">{currentSpeaker.name}</h2>
                <div className="text-gray-300 mt-2">{currentSpeaker.title}</div>
                <p className="mt-4 text-gray-300">Extended placeholder biography for {currentSpeaker.name}. Details of achievements and background.</p>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setCurrentSpeaker(null)} className="px-4 py-2 rounded bg-red-600 text-black font-semibold">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main>
        {page === "home" && (
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-6xl font-extrabold text-red-600 mb-6">TED-Tech: The Fusion of Ideas and Innovation</h1>
            <p className="max-w-3xl text-gray-300 mb-10">Landing introduction connecting technology, creativity, and youth potential.</p>

            <div className="w-full max-w-6xl">
              <h3 className="text-2xl text-red-400 mb-4">Speakers</h3>
              <SpeakersCarousel onSelect={gotoSpeaker} />
            </div>
          </section>
        )}

        {page === "info" && (
          <div className="py-20 px-6 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-red-500 mb-6">What is TEDx?</h2>
            <p className="text-gray-200 mb-10">Placeholder explaining the TEDx platform—independently organized events under TED’s license.</p>

            <h2 className="text-4xl font-bold text-red-500 mb-6">Importance of Chapter 1</h2>
            <p className="text-gray-200 mb-10">Placeholder about Chapter 1 as a beginning—symbolic of new stories and youth-led innovation.</p>

            <h2 className="text-4xl font-bold text-red-500 mb-6">Theme & The Story Behind It</h2>
            <p className="text-gray-200 mb-10">Placeholder explaining the inspiration behind the theme and how it reflects resilience and reinvention.</p>

            <div className="mt-12">
              <h3 className="text-2xl text-red-400 mb-6">Speakers</h3>
              <SpeakersCarousel onSelect={gotoSpeaker} />
            </div>
          </div>
        )}

        {page === "team" && (
          <div className="py-20 px-6 max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-red-500 mb-6">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {TEAM.map((member) => (
                <div key={member.id} className="relative group rounded-xl overflow-hidden border border-red-800">
                  <img src={member.photo} alt={member.name} className="object-cover w-full h-80 transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <p className="text-red-500 text-lg font-semibold">{member.name}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-2xl text-red-400 mb-6">Speakers</h3>
              <SpeakersCarousel onSelect={gotoSpeaker} />
            </div>
          </div>
        )}

        {page === "organisers" && (
          <div className="py-20 px-6 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-red-500 mb-6">From the Organiser's Desk</h2>
            <p className="text-gray-200 mb-10">Placeholder narrative detailing the journey, approval process, and dedication that made the event possible.</p>

            <h2 className="text-4xl font-bold text-red-500 mb-6">Event Details</h2>
            <p className="text-gray-200">Date: April 20, 2025 | Time: 9:00 AM - 4:00 PM | Venue: HPS Begumpet Auditorium</p>
            <p className="text-gray-400 mt-4">Includes speaker list, event flow, dress code for attendees (Formal Red & Black) and volunteers (Black).</p>

            <div className="mt-12">
              <h3 className="text-2xl text-red-400 mb-6">Speakers</h3>
              <SpeakersCarousel onSelect={gotoSpeaker} />
            </div>
          </div>
        )}
      </main>

      <footer className="bg-black border-t border-red-800 py-10 text-center text-gray-400 relative">
        <p>© 2025 TEDx HPS Begumpet Youth. Independently organized under TED license.</p>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="h-6 w-6" />
        </a>
      </footer>
    </div>
  );
}
