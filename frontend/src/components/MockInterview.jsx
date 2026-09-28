import React, { useState } from 'react';
import { MessageSquareCode, Mic, MicOff, Send, Sparkles, Award, Volume2, CheckCircle2, Play } from 'lucide-react';
import { evaluateInterviewAnswer } from '../services/gemini';

const SAMPLE_QUESTIONS = [
  "How would you design a rate-limiting system for a high-traffic REST API?",
  "Explain the difference between SQL database sharding and read replicas.",
  "Describe a situation where a service experienced high memory usage and how you debugged it."
];

export default function MockInterview({ studentProfile, apiKey }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const question = SAMPLE_QUESTIONS[currentQIndex];

  const handleEvaluate = async (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);
    const result = await evaluateInterviewAnswer(question, userAnswer, studentProfile.targetRole, apiKey);
    setEvaluation(result);
    setIsEvaluating(false);
  };

  const handleSpeechInputSim = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setUserAnswer("To build a rate limiter, I would use a Token Bucket or Leaky Bucket algorithm backed by Redis for fast distributed in-memory key increments...");
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E7B46A] flex items-center justify-center text-slate-900 shadow-sm font-bold">
              <MessageSquareCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Interactive AI Mock Interview Simulator</h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Simulates real-time technical & behavioral interviews for <span className="text-[#D69E4E] font-bold">{studentProfile.targetRole}</span> with AI scoring.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Question {currentQIndex + 1} of {SAMPLE_QUESTIONS.length}</span>
            <button
              onClick={() => {
                setCurrentQIndex((prev) => (prev + 1) % SAMPLE_QUESTIONS.length);
                setUserAnswer('');
                setEvaluation(null);
              }}
              className="px-3 py-1.5 bg-[#DFDFE3] hover:bg-slate-300 text-slate-900 rounded-xl text-xs font-extrabold shadow-sm transition-all"
            >
              Next Question
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Interview Panel */}
        <div className="lg:col-span-7 bg-white border border-slate-300 rounded-2xl p-6 shadow-sm space-y-5">
          {/* Question Box */}
          <div className="bg-[#DFDFE3]/50 border border-slate-300 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-[#D69E4E] uppercase tracking-wider">
                AI Host Question
              </span>
              <button 
                onClick={() => {
                  const synth = window.speechSynthesis;
                  if (synth) {
                    const utter = new SpeechSynthesisUtterance(question);
                    synth.speak(utter);
                  }
                }}
                className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-bold"
              >
                <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                Listen
              </button>
            </div>
            <p className="text-base font-bold text-slate-900 leading-relaxed">{question}</p>
          </div>

          {/* User Answer Textarea / Audio */}
          <form onSubmit={handleEvaluate} className="space-y-4">
            <div className="relative">
              <textarea
                rows={6}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Speak or type your technical answer here..."
                className="w-full bg-[#DFDFE3]/30 border border-slate-300 rounded-xl p-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#E7B46A] font-mono leading-relaxed"
              />

              <button
                type="button"
                onClick={handleSpeechInputSim}
                className={`absolute right-3 bottom-4 p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                  isRecording
                    ? 'bg-[#F1A17E] text-slate-900 border-[#F1A17E] animate-pulse'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-[#DFDFE3]'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#D69E4E]" />}
                <span>{isRecording ? 'Recording Answer...' : 'Voice Dictate'}</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={isEvaluating || !userAnswer.trim()}
              className="w-full py-3 bg-[#E7B46A] hover:bg-[#d69e4e] text-slate-900 rounded-xl text-xs font-extrabold shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isEvaluating ? 'animate-spin' : ''}`} />
              <span>{isEvaluating ? 'Evaluating Answer Integrity...' : 'Submit Answer for AI Feedback'}</span>
            </button>
          </form>
        </div>

        {/* Feedback & Analytics Panel */}
        <div className="lg:col-span-5 bg-white border border-slate-300 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 mb-2">Live AI Interview Evaluation</h3>

          {!evaluation ? (
            <div className="h-80 flex flex-col items-center justify-center text-center p-6 bg-[#DFDFE3]/40 rounded-xl border border-slate-300">
              <MessageSquareCode className="w-10 h-10 text-slate-400 mb-2" />
              <p className="text-xs text-slate-600 font-medium">Answer the question on the left to receive immediate scoring, clarity breakdown, and recommended sample answers.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Score header */}
              <div className="bg-[#DFDFE3]/60 p-4 rounded-xl border border-slate-300 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-600 font-medium">Response Score</div>
                  <div className="text-2xl font-extrabold text-slate-900">{evaluation.score} / 100</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-600 font-medium">Clarity & Accuracy</div>
                  <div className="text-xs font-extrabold text-[#A3AA5A] bg-white px-2 py-1 rounded-md border border-slate-300">{evaluation.clarity} • {evaluation.technicalAccuracy}</div>
                </div>
              </div>

              {/* Strengths */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Key Strengths:</label>
                <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                  {evaluation.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5 bg-[#A3AA5A]/15 p-2 rounded-lg border border-[#A3AA5A]/30">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A3AA5A] shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improved Sample Answer */}
              <div className="bg-[#DFDFE3]/40 p-3.5 rounded-xl border border-slate-300 space-y-1">
                <div className="text-xs font-bold text-slate-900">Model Answer Approach:</div>
                <p className="text-xs text-slate-700 leading-relaxed font-mono">{evaluation.improvedSampleAnswer}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
