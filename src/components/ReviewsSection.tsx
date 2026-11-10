import React, { useState } from 'react';
import { useGarage } from '../context/GarageContext';
import { Star, MessageSquare, ExternalLink, CheckCircle2, ShieldCheck, Plus, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews, submitReview, businessDetails } = useGarage();
  const [modalOpen, setModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    customerName: '',
    vehicleModel: '',
    rating: 5,
    reviewText: '',
  });
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Filter only approved reviews for public display
  const approvedReviews = reviews.filter((r) => r.approved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.customerName || !newReview.reviewText) return;

    submitReview({
      customerName: newReview.customerName.trim(),
      vehicleModel: newReview.vehicleModel.trim() || 'Two-Wheeler Owner',
      rating: newReview.rating,
      reviewText: newReview.reviewText.trim(),
      verifiedCustomer: false,
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setModalOpen(false);
      setNewReview({ customerName: '', vehicleModel: '', rating: 5, reviewText: '' });
    }, 2500);
  };

  return (
    <section id="reviews" className="py-20 bg-neutral-950 relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
              <Star className="w-3.5 h-3.5 fill-red-500 text-red-500" />
              <span>Customer Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Rider Experiences & <span className="text-red-600">Testimonials</span>
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              Authentic reviews submitted by motorcycle and electric scooter owners serviced at our Ratnagiri workshop.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={businessDetails.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-colors flex items-center gap-2"
            >
              <span>View on Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-red-500" />
            </a>

            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-red-950"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approvedReviews.map((review) => (
            <div
              key={review.id}
              className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-neutral-700'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-mono text-neutral-400 ml-2 font-bold">
                    {review.rating}.0
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-neutral-300 leading-relaxed mb-6 italic">
                  "{review.reviewText}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{review.customerName}</h4>
                  <span className="text-[11px] text-neutral-400 block">{review.vehicleModel}</span>
                </div>
                <span className="text-[10px] text-neutral-500 font-mono">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-black uppercase text-white tracking-tight mb-2">
                Share Your <span className="text-red-600">Experience</span>
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Your genuine feedback helps fellow riders in Ratnagiri find honest garage care.
              </p>

              {submittedSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Review Submitted!</h4>
                  <p className="text-xs text-neutral-400">
                    To maintain authenticity, reviews are checked by our team before appearing publicly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={newReview.customerName}
                      onChange={(e) => setNewReview({ ...newReview, customerName: e.target.value })}
                      placeholder="e.g. Anand Rane"
                      className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">
                      Vehicle Brand & Model
                    </label>
                    <input
                      type="text"
                      value={newReview.vehicleModel}
                      onChange={(e) => setNewReview({ ...newReview, vehicleModel: e.target.value })}
                      placeholder="e.g. Royal Enfield Hunter / Ather 450X"
                      className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">
                      Star Rating (1 to 5)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="p-1 focus:outline-none cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              star <= newReview.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-neutral-700 hover:text-amber-400'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-white ml-2">{newReview.rating} of 5</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">
                      Your Review <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={newReview.reviewText}
                      onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
                      placeholder="Describe the service quality, technician communication, and vehicle performance..."
                      className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <p className="text-[11px] text-neutral-500">
                    * Submitted reviews require garage admin verification prior to public publishing to prevent spam.
                  </p>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-neutral-400 bg-neutral-800 rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl cursor-pointer"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
