import React, { useState } from 'react';
import { useGarage } from '../context/GarageContext';
import { Video, Play, Clock, Tag, X, Plus, Trash2 } from 'lucide-react';
import { GarageVlog } from '../types';

export const VlogsSection: React.FC = () => {
  const { vlogs, isAdminLoggedIn, addVlog, deleteVlog } = useGarage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideoModal, setActiveVideoModal] = useState<GarageVlog | null>(null);

  // Admin Add Vlog Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newVlog, setNewVlog] = useState({
    title: '',
    category: 'Bike Maintenance Tips' as GarageVlog['category'],
    youtubeId: '',
    description: '',
    readTimeOrDuration: '5 Min Watch',
    featured: false,
  });

  const categories = [
    'All',
    'Bike Maintenance Tips',
    'Engine Care',
    'Electric Scooter Tips',
    'Bike Repair Videos',
    'Garage Vlogs',
  ];

  const filteredVlogs = vlogs.filter((v) => {
    if (selectedCategory === 'All') return true;
    return v.category === selectedCategory;
  });

  const handleCreateVlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVlog.title || !newVlog.youtubeId) return;

    // Extract YouTube ID if full URL pasted
    let cleanId = newVlog.youtubeId.trim();
    if (cleanId.includes('v=')) {
      cleanId = cleanId.split('v=')[1]?.split('&')[0] || cleanId;
    } else if (cleanId.includes('youtu.be/')) {
      cleanId = cleanId.split('youtu.be/')[1]?.split('?')[0] || cleanId;
    }

    addVlog({
      title: newVlog.title.trim(),
      category: newVlog.category,
      youtubeId: cleanId,
      description: newVlog.description.trim(),
      readTimeOrDuration: newVlog.readTimeOrDuration,
      date: new Date().toISOString().split('T')[0],
      featured: newVlog.featured,
    });

    setNewVlog({
      title: '',
      category: 'Bike Maintenance Tips',
      youtubeId: '',
      description: '',
      readTimeOrDuration: '5 Min Watch',
      featured: false,
    });
    setIsAddModalOpen(false);
  };

  return (
    <section id="vlogs" className="py-20 bg-neutral-950 relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
              <Video className="w-3.5 h-3.5" />
              <span>Workshop Knowledge & Guides</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Garage Vlogs & <span className="text-red-600">Maintenance Tips</span>
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              Practical guides on Konkan monsoon maintenance, chain cleaning, engine oil longevity, and EV battery thermal care.
            </p>
          </div>

          {isAdminLoggedIn && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vlog / Video Tip</span>
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white font-bold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vlogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredVlogs.map((vlog) => (
            <div
              key={vlog.id}
              className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-red-900/60 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Video Thumbnail with Play Button */}
                <div
                  onClick={() => setActiveVideoModal(vlog)}
                  className="relative aspect-video bg-neutral-950 cursor-pointer overflow-hidden group"
                >
                  <img
                    src={`https://img.youtube.com/vi/${vlog.youtubeId}/hqdefault.jpg`}
                    alt={vlog.title}
                    onError={(e) => {
                      // Fallback to stylized workshop image if YouTube thumbnail is unavailable
                      (e.currentTarget as HTMLImageElement).src = '/src/assets/images/service_engine_repair_1794283005676.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>

                  <span className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 backdrop-blur-sm text-[11px] font-mono text-neutral-200">
                    {vlog.readTimeOrDuration}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-neutral-400 mb-2">
                    <span className="font-semibold text-red-500 uppercase tracking-wider">{vlog.category}</span>
                    <span>·</span>
                    <span className="font-mono">{vlog.date}</span>
                  </div>

                  <h3
                    onClick={() => setActiveVideoModal(vlog)}
                    className="text-lg font-bold text-white mb-3 cursor-pointer group-hover:text-red-400 transition-colors"
                  >
                    {vlog.title}
                  </h3>

                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {vlog.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-neutral-800/80">
                <button
                  onClick={() => setActiveVideoModal(vlog)}
                  className="text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Video Guide</span>
                </button>

                {isAdminLoggedIn && (
                  <button
                    onClick={() => deleteVlog(vlog.id)}
                    className="text-xs text-neutral-500 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Lightbox Modal */}
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-3xl w-full p-4 sm:p-6 relative shadow-2xl">
              <button
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-950 text-neutral-400 hover:text-white cursor-pointer z-10"
                aria-label="Close Video Player"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoModal.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideoModal.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
                  {activeVideoModal.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">
                  {activeVideoModal.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {activeVideoModal.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Admin Add Vlog Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 relative">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-white mb-4">Add Garage Vlog or Tip</h3>

              <form onSubmit={handleCreateVlog} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Video Title</label>
                  <input
                    type="text"
                    required
                    value={newVlog.title}
                    onChange={(e) => setNewVlog({ ...newVlog, title: e.target.value })}
                    placeholder="e.g. How to check spark plug health"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Category</label>
                  <select
                    value={newVlog.category}
                    onChange={(e) => setNewVlog({ ...newVlog, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm"
                  >
                    <option value="Bike Maintenance Tips">Bike Maintenance Tips</option>
                    <option value="Engine Care">Engine Care</option>
                    <option value="Electric Scooter Tips">Electric Scooter Tips</option>
                    <option value="Bike Repair Videos">Bike Repair Videos</option>
                    <option value="Garage Vlogs">Garage Vlogs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">YouTube URL or Video ID</label>
                  <input
                    type="text"
                    required
                    value={newVlog.youtubeId}
                    onChange={(e) => setNewVlog({ ...newVlog, youtubeId: e.target.value })}
                    placeholder="e.g. 3G4Hvh2Zp3Y or https://youtu.be/..."
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={newVlog.description}
                    onChange={(e) => setNewVlog({ ...newVlog, description: e.target.value })}
                    placeholder="What will the viewer learn from this video?"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-2 text-xs font-bold uppercase tracking-wider text-neutral-400 bg-neutral-800 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-lg"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
