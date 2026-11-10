import React, { useState } from 'react';
import { useGarage } from '../context/GarageContext';
import { GalleryItem } from '../types';
import { Camera, Eye, X, ChevronLeft, ChevronRight, Plus, Trash2, Tag } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { gallery, isAdminLoggedIn, addGalleryItem, deleteGalleryItem } = useGarage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Admin add image modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newImage, setNewImage] = useState({
    title: '',
    category: 'Workshop' as GalleryItem['category'],
    imageUrl: '',
    description: '',
  });

  const categories = ['All', 'Workshop', 'Servicing', 'Engine Repair', 'Electric Scooter', 'Team & Tools'];

  const filteredGallery = gallery.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveImageIndex(null);
  };

  const handlePrevImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + filteredGallery.length) % filteredGallery.length);
  };

  const handleNextImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % filteredGallery.length);
  };

  const handleCreateImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.title || !newImage.imageUrl) return;

    addGalleryItem({
      title: newImage.title.trim(),
      category: newImage.category,
      imageUrl: newImage.imageUrl.trim(),
      description: newImage.description.trim(),
    });

    setNewImage({
      title: '',
      category: 'Workshop',
      imageUrl: '',
      description: '',
    });
    setIsAddModalOpen(false);
  };

  return (
    <section id="gallery" className="py-20 bg-neutral-950 relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Workshop Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Engine Ear <span className="text-red-600">Gallery</span>
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              Real workshop photographs showing our hydraulic bays, engine overhauls, diagnostic equipment, and trained mechanics at work in Ratnagiri.
            </p>
          </div>

          {isAdminLoggedIn && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Workshop Photo</span>
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-neutral-100 text-neutral-900 font-bold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-red-900/60 transition-all flex flex-col justify-between"
            >
              <div
                className="relative aspect-4/3 overflow-hidden cursor-pointer bg-neutral-950"
                onClick={() => handleOpenLightbox(index)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 rounded-full bg-red-600 text-white shadow-lg">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-neutral-950/80 backdrop-blur-sm border border-neutral-800 text-[10px] font-mono uppercase tracking-wider text-neutral-300">
                  {item.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {isAdminLoggedIn && (
                  <div className="pt-3 mt-3 border-t border-neutral-800 flex justify-end">
                    <button
                      onClick={() => deleteGalleryItem(item.id)}
                      className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImageIndex !== null && filteredGallery[activeImageIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            <button
              onClick={handleCloseLightbox}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer z-10"
              aria-label="Close Fullscreen View"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white transition-colors cursor-pointer z-10"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white transition-colors cursor-pointer z-10"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full flex flex-col items-center">
              <div className="relative max-h-[75vh] overflow-hidden rounded-2xl border border-neutral-800">
                <img
                  src={filteredGallery[activeImageIndex].imageUrl}
                  alt={filteredGallery[activeImageIndex].title}
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="mt-4 text-center max-w-xl">
                <span className="text-xs font-mono uppercase tracking-widest text-red-400">
                  {filteredGallery[activeImageIndex].category} · {activeImageIndex + 1} of {filteredGallery.length}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {filteredGallery[activeImageIndex].title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  {filteredGallery[activeImageIndex].description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Admin Add Image Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 relative">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-white mb-4">Add Photo to Gallery</h3>

              <form onSubmit={handleCreateImage} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Photo Title</label>
                  <input
                    type="text"
                    required
                    value={newImage.title}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                    placeholder="e.g. Engine Overhaul Bay"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Category</label>
                  <select
                    value={newImage.category}
                    onChange={(e) => setNewImage({ ...newImage, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Servicing">Servicing</option>
                    <option value="Engine Repair">Engine Repair</option>
                    <option value="Electric Scooter">Electric Scooter</option>
                    <option value="Team & Tools">Team & Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Image URL / Path</label>
                  <input
                    type="text"
                    required
                    value={newImage.imageUrl}
                    onChange={(e) => setNewImage({ ...newImage, imageUrl: e.target.value })}
                    placeholder="/src/assets/images/... or web URL"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={newImage.description}
                    onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                    placeholder="Brief description of work shown..."
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
                    Save Photo
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
