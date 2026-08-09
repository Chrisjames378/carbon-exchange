import React, { useState } from 'react';
import { LearnArticle } from '../types';
import {
  BookOpen,
  Video,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Award,
  Trees,
  Globe,
  Clock,
  ChevronRight,
  HelpCircle,
  X
} from 'lucide-react';

interface LearnSectionProps {
  articles: LearnArticle[];
  onCompleteArticleQuiz: (articleId: string, rewardCredits: number) => void;
}

export const LearnSection: React.FC<LearnSectionProps> = ({
  articles,
  onCompleteArticleQuiz
}) => {
  const [selectedArticle, setSelectedArticle] = useState<LearnArticle | null>(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOpenArticle = (article: LearnArticle) => {
    setSelectedArticle(article);
    setSelectedAnswerIndex(null);
    setQuizSubmitted(false);
    setIsCorrect(false);
  };

  const handleAnswerSubmit = () => {
    if (!selectedArticle || selectedArticle.quiz === undefined || selectedAnswerIndex === null) return;

    const correct = selectedAnswerIndex === selectedArticle.quiz.correctIndex;
    setIsCorrect(correct);
    setQuizSubmitted(true);

    if (correct && !selectedArticle.isCompleted) {
      onCompleteArticleQuiz(selectedArticle.id, selectedArticle.rewardCredits);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/60 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              Atmosphere Learn Academy
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Master Carbon Markets & Climate Science
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore short articles, video breakdowns, and audited research on carbon credits, CO₂ emissions, and native New Zealand reforestation reserves. Earn bonus credits by completing knowledge checks!
            </p>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-emerald-500/30 bg-slate-900/90 flex items-center gap-3 shrink-0">
            <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Knowledge Rewards</p>
              <p className="text-[11px] text-emerald-300">Earn up to +70 CR by reading modules</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reputable Sources Directory */}
      <section className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-emerald-400" />
          Reputable Official Registries & Scientific Sources
        </h3>
        <div className="flex flex-wrap gap-2 text-xs">
          <a
            href="https://verra.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-emerald-300 rounded-xl transition-all flex items-center gap-1.5"
          >
            <span>Verra Verified Carbon Standard</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <a
            href="https://www.goldstandard.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-emerald-300 rounded-xl transition-all flex items-center gap-1.5"
          >
            <span>Gold Standard for Global Goals</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <a
            href="https://www.treesthatcount.co.nz/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-emerald-300 rounded-xl transition-all flex items-center gap-1.5"
          >
            <span>Trees That Count NZ Registry</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <a
            href="https://www.ipcc.ch/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-emerald-300 rounded-xl transition-all flex items-center gap-1.5"
          >
            <span>IPCC Sixth Assessment Report</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <a
            href="https://www.mpi.govt.nz/forestry/new-zealand-emissions-trading-scheme/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-emerald-300 rounded-xl transition-all flex items-center gap-1.5"
          >
            <span>NZ Ministry for Primary Industries (MPI)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {articles.map((art) => (
          <div
            key={art.id}
            className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="px-2.5 py-0.5 rounded-full font-extrabold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {art.category}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {art.readTime}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium mt-1">{art.subtitle}</p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {art.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-amber-300 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>+{art.rewardCredits} CR Quiz Reward</span>
              </div>

              <button
                onClick={() => handleOpenArticle(art)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                id={`read-article-btn-${art.id}`}
              >
                <span>Read & Learn</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Reader & Quiz Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="glass-card bg-slate-950/95 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-6 relative text-slate-100">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Article Header */}
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {selectedArticle.category}
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight">{selectedArticle.title}</h2>
              <p className="text-xs text-slate-400">By {selectedArticle.author} • {selectedArticle.readTime}</p>
            </div>

            {/* Video Overview Callout if present */}
            {selectedArticle.videoDuration && (
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-teal-500/30 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-teal-500/20 text-teal-400 rounded-xl border border-teal-500/30">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Video Summary Breakdown</h4>
                    <p className="text-slate-400">{selectedArticle.videoDuration} • Verified Education Module</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-teal-500/20 text-teal-300 font-bold rounded-xl border border-teal-500/30">
                  Included
                </span>
              </div>
            )}

            {/* Content Paragraphs */}
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              {selectedArticle.fullContent.map((paragraph, idx) => (
                <p key={idx} className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/80">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Takeaways */}
            <div className="bg-emerald-950/30 p-4 rounded-2xl border border-emerald-500/30 space-y-2 text-xs">
              <h4 className="font-bold text-emerald-300 flex items-center gap-1.5">
                <Trees className="w-4 h-4" />
                Key Ecological Takeaways:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {selectedArticle.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx}>{takeaway}</li>
                ))}
              </ul>
            </div>

            {/* Reputable Source Link */}
            <div className="flex justify-between items-center text-xs bg-slate-900 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">Official Primary Source:</span>
              <a
                href={selectedArticle.externalLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
              >
                <span>{selectedArticle.externalLink.name}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Interactive Knowledge Quiz */}
            {selectedArticle.quiz && (
              <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    Knowledge Check (+{selectedArticle.rewardCredits} Credits)
                  </h4>
                  {selectedArticle.isCompleted && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Module Completed
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-white">{selectedArticle.quiz.question}</p>

                <div className="space-y-2 text-xs">
                  {selectedArticle.quiz.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedAnswerIndex(i)}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedAnswerIndex === i
                          ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {!quizSubmitted ? (
                  <button
                    onClick={handleAnswerSubmit}
                    disabled={selectedAnswerIndex === null}
                    className={`w-full py-3 font-bold text-xs rounded-xl transition-all shadow-md ${
                      selectedAnswerIndex !== null
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Answer & Earn +{selectedArticle.rewardCredits} Credits
                  </button>
                ) : (
                  <div className={`p-4 rounded-xl border space-y-2 text-xs ${
                    isCorrect
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  }`}>
                    <div className="flex items-center gap-2 font-bold">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <span>Correct! +{selectedArticle.rewardCredits} Carbon Credits awarded!</span>
                        </>
                      ) : (
                        <span>Incorrect answer. Review the material and try again.</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300">{selectedArticle.quiz.explanation}</p>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setSelectedArticle(null)}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Close Reader
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
