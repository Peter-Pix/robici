'use client';

import { useState, useRef, useEffect } from 'react';

interface Step {
  id: string;
  instruction: string;
}

interface RobotChatProps {
  lessonId: string;
  steps: Step[];
  robotName: string;
  robotEmoji: string;
  onComplete: () => void;
}

export default function RobotChat({ lessonId, steps, robotName, robotEmoji, onComplete }: RobotChatProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stepCompleted, setStepCompleted] = useState(false);
  const [allStepsCompleted, setAllStepsCompleted] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[currentStepIndex];

  // Scroll to bottom when chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSend = async () => {
    if (!chatInput.trim() || isLoading) return;

    const userMessage = chatInput.trim();
    setChatHistory((prev) => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsLoading(true);
    setStepCompleted(false);

    try {
      const response = await fetch('/api/roboctina/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId,
          stepId: currentStep.id,
          message: userMessage,
        }),
      });

      if (!response.ok) throw new Error('API error');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader');

      let fullText = '';
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }

      // Check if step was completed
      const completed = fullText.includes('[STEP_COMPLETED]');
      const cleanText = fullText.replace('[STEP_COMPLETED]', '').trim();

      setChatHistory((prev) => [...prev, { role: 'robot', text: cleanText }]);

      if (completed) {
        setStepCompleted(true);
      }
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        { role: 'robot', text: 'Něco se rozbilo! Zkus to znovu, pls. 🤖🔧' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setStepCompleted(false);
      setChatHistory([]);
    } else {
      setAllStepsCompleted(true);
      setShowReward(true);
      onComplete();
    }
  };

  const progressPercent = ((currentStepIndex) / steps.length) * 100;

  if (showReward) {
    return (
      <div className="text-center py-8 animate-fadeIn">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-xl font-bold text-robik-dark mb-2">Gratuluji!</h3>
        <p className="text-sm text-robik-text/60 mb-6">Zvládl jsi všechny kroky s {robotName}em!</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              setShowReward(false);
              setCurrentStepIndex(0);
              setChatHistory([]);
              setStepCompleted(false);
              setAllStepsCompleted(false);
            }}
            className="bg-robik-accent text-white px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all"
          >
            🔄 Zopakovat lekci
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-6">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className={`flex-1 h-2 rounded-full transition-all duration-500 ${
              i < currentStepIndex
                ? 'bg-green-400'
                : i === currentStepIndex
                ? 'bg-robik-accent'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Step info */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{robotEmoji}</span>
        <div>
          <div className="text-xs text-robik-text/40">
            Krok {currentStepIndex + 1} z {steps.length}
          </div>
          <div className="text-sm font-semibold text-robik-dark">
            {robotName} říká:
          </div>
        </div>
      </div>

      {/* Instruction */}
      <div className="bg-pastel-blue/20 rounded-2xl p-4 border border-pastel-blue/30 mb-6">
        <p className="text-sm text-robik-text/70 leading-relaxed">{currentStep.instruction}</p>
      </div>

      {/* Chat */}
      <div className="bg-robik-card rounded-2xl border border-pastel-blue/20 overflow-hidden mb-4">
        <div className="h-72 overflow-y-auto p-4 space-y-3">
          {chatHistory.length === 0 && (
            <p className="text-sm text-robik-text/40 text-center py-8">
              Napiš {robotName}ovi do pole níže...
            </p>
          )}
          {chatHistory.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  msg.role === 'user'
                    ? 'bg-robik-accent text-white'
                    : 'bg-pastel-blue/20 text-robik-text/70'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-pastel-blue/20 rounded-2xl px-4 py-2 text-sm text-robik-text/50">
                <span className="animate-gentlePulse">{robotName} přemýšlí...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="border-t border-pastel-blue/20 p-3 flex gap-2">
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Napiš ${robotName}ovi...`}
            disabled={isLoading || stepCompleted}
            className="flex-1 px-3 py-2 rounded-xl border border-pastel-blue/30 text-sm outline-none focus:ring-2 focus:ring-robik-accent/50 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || stepCompleted || !chatInput.trim()}
            className="bg-robik-accent text-white px-4 py-2 rounded-xl text-sm hover:bg-robik-accent/90 transition-all disabled:opacity-50"
          >
            {isLoading ? '...' : 'Poslat'}
          </button>
        </div>
      </div>

      {/* Step completed indicator + Next button */}
      {stepCompleted && (
        <div className="animate-fadeIn">
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-3">
            <span>✅</span> Úkol splněn!
          </div>
          <button
            onClick={handleNextStep}
            className="w-full bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-all"
          >
            {currentStepIndex < steps.length - 1
              ? `Pokračovat na další krok →`
              : '🎉 Dokončit lekci!'}
          </button>
        </div>
      )}
    </div>
  );
}
