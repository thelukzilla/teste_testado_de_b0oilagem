import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck, Send, Sparkles, MapPin, Utensils, Music, CalendarClock, ChevronRight, Loader2 } from 'lucide-react';
import { Question } from './types';

// --- Configuration Data ---

const QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'choice',
    question: "Se a sua energia hoje fosse um local de BH, qual seria?",
    options: [
      { id: 'a', text: "Modo Capivara Chill (Pampulha, grama e água de coco)", emoji: "🌿" },
      { id: 'b', text: "Vibe Madame em Lourdes (Ar condicionado e taça de vinho)", emoji: "🍷" },
      { id: 'c', text: "Dora Aventureira (Trilha, Cachoeira ou Mirante)", emoji: "🧗‍♀️" },
      { id: 'd', text: "Caos Cultural do Centro (Maletta, Sapucaí ou Mercado Novo)", emoji: "🍻" },
    ]
  },
  {
    id: 2,
    type: 'choice',
    question: "O estômago roncou. Qual a estratégia nutricional?",
    options: [
      { id: 'a', text: "Café da tarde de vó (Broa, pão de queijo e cafezinho)", emoji: "☕" },
      { id: 'b', text: "Jantar de adulto funcional (Massas, Risotos ou Gastronomia)", emoji: "🍝" },
      { id: 'c', text: "Baixa Gastronomia (Torresmo, Fígado com Jiló e Cerveja)", emoji: "🥓" },
      { id: 'd', text: "Street Food (Hambúrguer ou Pizza pra comer com a mão)", emoji: "🍕" },
    ]
  },
  {
    id: 3,
    type: 'choice',
    question: "Para o entretenimento, qual a pedida?",
    options: [
      { id: 'a', text: "Assistir algo quieto (Teatro ou Cinema)", emoji: "🎭" },
      { id: 'b', text: "Fofocar horrores (Barzinho com mesa na calçada)", emoji: "🗣️" },
      { id: 'c', text: "Ouvir música alta (Balada ou Bar com DJ)", emoji: "🪩" },
      { id: 'd', text: "Só andar e julgar casas bonitas (Passeio na Praça da Liberdade)", emoji: "💅" },
    ]
  },
  {
    id: 4,
    type: 'scale',
    question: "Nível de Prioridade: De 1 a 10, qual a necessidade disso rolar antes do dia 20?",
    scaleConfig: {
      min: 1,
      max: 10,
      minLabel: "Sem pressa (paz de jah)",
      maxLabel: "URGENTE (preciso sair de casa)"
    }
  }
];

// --- Components ---

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const progress = Math.min((current / total) * 100, 100);
  return (
    <div className="w-full h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
      <motion.div 
        className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [sliderValue, setSliderValue] = useState(5); // Default value for scale question
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = QUESTIONS.length; 

  const handleOptionSelect = (optionText: string) => {
    setAnswers((prev) => [...prev, optionText]);
    setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 250); 
  };

  const handleScaleSubmit = () => {
    setAnswers((prev) => [...prev, `Nível ${sliderValue}/10`]);
    setStep((prev) => prev + 1);
  };

  const handleEmailSubmit = () => {
    setIsSubmitting(true);

    // Simula um tempo de processamento para parecer "sistema"
    setTimeout(() => {
        // ⚠️ COLOQUE SEU EMAIL AQUI
        const EMAIL_DESTINO = "seu_email@gmail.com"; 
        
        const subject = "Dados de Auditoria - Anna Beatriz";
        const body = `RESUMO DA COLETA DE DADOS:
        
1. Vibe: ${answers[0]}
2. Nutrição: ${answers[1]}
3. Lazer: ${answers[2]}
4. Prioridade/Prazo: ${answers[3]}

OBSERVAÇÕES:
${note || "N/A"}

Fim do relatório.`;

        const mailtoUrl = `mailto:${EMAIL_DESTINO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoUrl;
        setIsSubmitting(false);
    }, 2000);
  };

  // Determine current icon based on step
  const getHeaderIcon = () => {
    if (step === 0) return <MapPin className="w-6 h-6 text-pink-500" />;
    if (step === 1) return <Utensils className="w-6 h-6 text-purple-500" />;
    if (step === 2) return <Music className="w-6 h-6 text-indigo-500" />;
    if (step === 3) return <CalendarClock className="w-6 h-6 text-rose-500" />;
    return <Sparkles className="w-6 h-6 text-amber-500" />;
  };

  const currentQuestion = QUESTIONS[step];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-slate-100 to-teal-50 flex items-center justify-center p-4 font-sans text-slate-700 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <motion.div 
        className="relative w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="p-6 md:p-8">
          
          {/* Header - Changed to "Auditoria/Formulário" vibes */}
          <header className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gray-50 rounded-xl shadow-inner border border-gray-100">
                {getHeaderIcon()}
              </div>
              <div>
                <h1 className="text-xs font-bold uppercase tracking-widest text-gray-400">Formulário de Auditoria</h1>
                <h2 className="text-lg font-bold text-gray-800 leading-tight">Anna Beatriz</h2>
              </div>
            </div>
            <div className="bg-green-100 px-2 py-1 rounded text-xs font-medium text-green-700">
              EM ABERTO
            </div>
          </header>

          <ProgressBar current={step + 1} total={totalSteps + 1} />

          {/* Content Swapper */}
          <AnimatePresence mode="wait">
            {step < totalSteps ? (
              <motion.div
                key={`question-${step}`}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h3 className="text-xl font-bold mb-6 text-gray-800 leading-snug">
                  {currentQuestion.question}
                </h3>

                {/* Render Choice Buttons */}
                {currentQuestion.type === 'choice' && currentQuestion.options && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <motion.button
                        key={option.id}
                        onClick={() => handleOptionSelect(option.text)}
                        className="w-full text-left p-4 rounded-xl border border-transparent bg-white shadow-sm hover:shadow-md hover:border-purple-200 hover:bg-purple-50 transition-all duration-300 group flex items-center justify-between"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all">{option.emoji}</span>
                          <span className="text-sm md:text-base font-medium text-gray-600 group-hover:text-gray-900">{option.text}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Render Scale Slider */}
                {currentQuestion.type === 'scale' && currentQuestion.scaleConfig && (
                  <div className="py-4">
                    <div className="relative mb-12 px-2">
                       <div className="text-center text-4xl font-bold text-purple-600 mb-6 font-mono">
                         {sliderValue}
                       </div>
                       <input 
                          type="range" 
                          min={currentQuestion.scaleConfig.min} 
                          max={currentQuestion.scaleConfig.max} 
                          value={sliderValue}
                          onChange={(e) => setSliderValue(parseInt(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                       />
                       <div className="flex justify-between mt-4 text-xs font-medium text-gray-400 uppercase tracking-wide">
                          <span>{currentQuestion.scaleConfig.minLabel}</span>
                          <span>{currentQuestion.scaleConfig.maxLabel}</span>
                       </div>
                    </div>
                    
                    <motion.button
                      onClick={handleScaleSubmit}
                      className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-semibold shadow-lg shadow-gray-300 flex items-center justify-center gap-2 hover:bg-black transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Confirmar Resposta <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}
              </motion.div>
            ) : (
              // Final Text Area Screen
              <motion.div
                key="final-step"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col h-full"
              >
                <div className="text-center mb-6">
                  <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
                    <ClipboardCheck className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Coleta Finalizada</h3>
                  <p className="text-gray-500 text-sm mt-1">Preencha os campos finais para homologação.</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                    Considerações Finais, Alergias ou Avisos:
                  </label>
                  <textarea
                    className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-purple-300 focus:ring-0 focus:outline-none transition-colors text-gray-700 resize-none h-32 text-sm"
                    placeholder="Ex: Tenho medo de pombos, sou alérgica a camarão, etc..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <motion.button
                  onClick={handleEmailSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-semibold shadow-lg shadow-gray-300 flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-900 hover:bg-black text-white'} `}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processando Envio...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
                
                <p className="text-xs text-center text-gray-400 mt-4">
                  O formulário será processado pelo sistema de e-mail.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
}