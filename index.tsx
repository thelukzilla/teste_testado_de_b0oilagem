import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const Icons = {
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  )
};

const questions = [
  // BLOCO 1: O CLOSE (ESTILO)
  { id: 1, block: "👗 Parte 1: O Close (Medidas e Estilo)", type: "choice", q: "Pra eu não errar o presente, qual o número do seu sapato?", options: ["33-35 (Pézinho de princesa)", "36-38 (Padrão diva)", "39+ (Pé de modelo)"] },
  { id: 2, block: "👗 Parte 1: O Close (Medidas e Estilo)", type: "choice", q: "Qual o tamanho da blusinha que você mais usa?", options: ["P", "M", "G", "GG", "Oversized, sou despojada"] },
  { id: 3, block: "👗 Parte 1: O Close (Medidas e Estilo)", type: "choice", q: "No quesito acessórios, qual o seu metal favorito?", options: ["Prata (Vibe sereia)", "Dourado (Vibe rica)", "Coloridos/Artesanais (Vibe artes)"] },
  { id: 4, block: "👗 Parte 1: O Close (Medidas e Estilo)", type: "choice", q: "Se eu for te dar um mimo, o que tem mais chance de te fazer lacrar?", options: ["Uma comida babadeira", "Uma skin care/maquiagem", "Um acessório de milhões", "Uma cartinha fofa (sou sentimental)"] },
  { id: 5, block: "👗 Parte 1: O Close (Medidas e Estilo)", type: "text", q: "Qual sua cor favorita da vida (aquela que você usaria todo dia)?" },

  // BLOCO 2: FOME DE QUÊ
  { id: 6, block: "🍕 Parte 2: Fome de Quê?", type: "choice", q: "Se a gente for pedir um delivery, qual é o seu 'mood' padrão?", options: ["Sushi (Diva fina)", "Pizza (Clássico da galera)", "Hambúrguer (Vibe ogra fofa)", "Comida Árabe/Mexicana (Diferenciada)"] },
  { id: 7, block: "🍕 Parte 2: Fome de Quê?", type: "choice", q: "Doce ou Salgado?", options: ["Sou do açúcar, mona!", "Salgado sempre", "Um de cada, por favor"] },
  { id: 8, block: "🍕 Parte 2: Fome de Quê?", type: "choice", q: "Qual bebida nunca pode faltar no seu copo?", options: ["Vinho/Gin (Chique)", "Cervejinha gelada (Da galera)", "Suquinho natural/Água (Saudável)", "Café (Minha bateria)"] },
  { id: 9, block: "🍕 Parte 2: Fome de Quê?", type: "text", q: "Tem alguma comida que te dá preguiça só de olhar?" },

  // BLOCO 3: BATERIA SOCIAL
  { id: 10, block: "🔋 Parte 3: Bateria Social e Rolês", type: "choice", q: "Como está sua bateria social hoje?", options: ["100% (Mona da galera, quero ver gente!)", "50% (Um barzinho calmo tá ótimo)", "0% (Que preguiça de sair, quero cama)"] },
  { id: 11, block: "🔋 Parte 3: Bateria Social e Rolês", type: "choice", q: "Qual o seu tipo de rolê favorito para um sábado à noite?", options: ["Balada/Show (Puro suco do caos)", "Jantarzinho/Cinema (Vibe cult)", "Ficar em casa fofocando (O melhor de todos)"] },
  { id: 12, block: "🔋 Parte 3: Bateria Social e Rolês", type: "choice", q: "Gênero de filme que você não cansa de ver:", options: ["Comédia Romântica (Diva apaixonada)", "Terror (Pra dar uns gritos)", "Suspense/Crime (Diva investigadora)"] },
  { id: 13, block: "🔋 Parte 3: Bateria Social e Rolês", type: "choice", q: "Qual rede social você mais perde tempo?", options: ["TikTok (Só os vídeos babadeiros)", "Instagram (Vendo a vida das divas)", "Twitter/X (Só pelo caos)"] },
  { id: 14, block: "🔋 Parte 3: Bateria Social e Rolês", type: "choice", q: "Você é do tipo que acorda cedo ou que odeia o sol?", options: ["Madrugadora, já acordo lacrando.", "Sou noturna, de manhã me dá uma preguiça..."] },

  // BLOCO 4: RANÇO
  { id: 15, block: "🙄 Parte 4: O Que me Dá Ranço (Reações)", type: "choice", q: "Qual comportamento de alguém te faz pensar: 'Ai, que preguiça...'?", options: ["Gente que fala muito de si mesma", "Gente grossa com garçom", "Gente que demora mil anos pra responder"] },
  { id: 16, block: "🙄 Parte 4: O Que me Dá Ranço (Reações)", type: "choice", q: "Se alguém pisa na bola com você, como você reage?", options: ["Sou direta: 'Escuta aqui, mona...'", "Fico quieta e entro no meu casulo", "Lanço um deboche e sigo a vida"] },
  { id: 17, block: "🙄 Parte 4: O Que me Dá Ranço (Reações)", type: "choice", q: "O que é 'o fim do mundo' para você em uma amizade ou lance?", options: ["Mentira (Aí eu perco a confiança total)", "Desatenção (Gente que não nota os detalhes)", "Falta de humor (Gente chata não dá)"] },
  { id: 18, block: "🙄 Parte 4: O Que me Dá Ranço (Reações)", type: "choice", q: "Qual seu nível de ciúmes?", options: ["0% (Confio na minha beleza)", "50% (Olho, mas não falo nada)", "100% (FBI perde pra mim, mona)"] },
  { id: 19, block: "🙄 Parte 4: O Que me Dá Ranço (Reações)", type: "choice", q: "Se você está brava, o que eu devo fazer?", options: ["Me dar comida e ficar quieto", "Me dar um abraço e me ouvir", "Me dar espaço, senão eu mordo"] },

  // BLOCO 5: CONEXÃO
  { id: 20, block: "🌈 Parte 5: Conexão e Vibe", type: "choice", q: "Qual sua estação do ano favorita?", options: ["Verão (Sol e close)", "Inverno (Casaco e elegância)"] },
  { id: 21, block: "🌈 Parte 5: Conexão e Vibe", type: "choice", q: "Qual sua linguagem do amor preferida?", options: ["Ganhar mimos", "Ouvir que sou incrível", "Receber um cafuné", "Alguém fazendo algo por mim"] },
  { id: 22, block: "🌈 Parte 5: Conexão e Vibe", type: "choice", q: "Se a gente fosse fazer uma viagem amanhã, pra onde seria?", options: ["Praia (Vibe sereia)", "Montanha (Vibe chalé)", "Disney (Vibe criança)"] },
  { id: 23, block: "🌈 Parte 5: Conexão e Vibe", type: "text", q: "Qual música é o seu hino atual?" },
  { id: 24, block: "🌈 Parte 5: Conexão e Vibe", type: "text", q: "Um hábito seu que ninguém imagina:" },
  { id: 25, block: "🌈 Parte 5: Conexão e Vibe", type: "choice", q: "Como você gosta de ser acordada?", options: ["Com mensagem fofa", "Deixa eu dormir, mona, que preguiça!"] },
  { id: 26, block: "🌈 Parte 5: Conexão e Vibe", type: "choice", q: "Você prefere planejar tudo ou ir na onda?", options: ["Tenho a planilha pronta", "Deixo a vida me levar"] },
  { id: 27, block: "🌈 Parte 5: Conexão e Vibe", type: "text", q: "Qual seu maior sonho de consumo no momento?" },
  { id: 28, block: "🌈 Parte 5: Conexão e Vibe", type: "choice", q: "Se você fosse um emoji, qual seria?", options: ["✨", "💅", "🙄", "🔥"] },
  { id: 29, block: "🌈 Parte 5: Conexão e Vibe", type: "choice", q: "O que você achou de eu ter feito esse formulário?", options: ["Lacrou, amei a iniciativa!", "Corajoso, mona", "Achei babado"] },
  { id: 30, block: "🌈 Parte 5: Conexão e Vibe", type: "text", q: "Defina você mesma em uma palavra (pode usar gíria!):" },

  // BLOCO 6: ESTILO DE VIDA
  { id: 31, block: "💅 Parte 6: Estilo de Vida (Habilidades e Caos)", type: "choice", q: "No quesito Skin Care e beleza, você é:", options: ["A louca dos 10 passos (Diva dedicada)", "Só lavo o rosto com o que tiver e sigo o baile", "Compro tudo, mas me dá uma preguiça de usar...", "Só uso protetor solar e um gloss de milhões"] },
  { id: 32, block: "💅 Parte 6: Estilo de Vida (Habilidades e Caos)", type: "choice", q: "Qual seu nível de vício em Reality Show?", options: ["Sou a comentarista oficial, acompanho tudo!", "Só assisto se o babado for muito grande", "Que preguiça, mona, prefiro ver série cult"] },
  { id: 33, block: "💅 Parte 6: Estilo de Vida (Habilidades e Caos)", type: "choice", q: "Se você ganhasse um vale-compras de R$ 5.000, onde gastaria primeiro?", options: ["Sephora/Maquiagem (Glow up)", "Loja de eletrônicos (Diva tecnológica)", "Farmácia/Livraria (Amo um aleatório)", "Roupa, óbvio, preciso lacrar nos looks"] },
  { id: 34, block: "💅 Parte 6: Estilo de Vida (Habilidades e Caos)", type: "choice", q: "Na cozinha, você é:", options: ["Masterchef: faço tudo e emprato bonito", "Sobrevivente: sei fazer miojo e ovo frito", "A diva do iFood: minha cozinha é meramente decorativa"] },
  { id: 35, block: "💅 Parte 6: Estilo de Vida (Habilidades e Caos)", type: "choice", q: "Qual sua relação com plantas/animais?", options: ["Mãe de pet/planta fervorosa (casa é selva)", "Gosto, mas me dá um pouco de trabalho, né?", "Prefiro os de pelúcia, não morrem se esquecer a água"] },

  // BLOCO 7: RANÇO E COMPORTAMENTO
  { id: 36, block: "🙄 Parte 7: Ranço e Comportamento", type: "choice", q: "O que te faz querer ir embora de um lugar na mesma hora?", options: ["Música muito ruim/chata", "Gente querendo puxar assunto forçado", "Lugar muito quente e abafado (meu gloss derrete!)", "Banheiro sujo (aí não dá, lacrou errado)"] },
  { id: 37, block: "🙄 Parte 7: Ranço e Comportamento", type: "text", q: "Qual seu 'talento inútil' que ninguém imagina?" },
  { id: 38, block: "🙄 Parte 7: Ranço e Comportamento", type: "choice", q: "Se alguém te manda um áudio de 5 minutos, você:", options: ["Ouço no 2x e respondo por partes", "Me dá preguiça e deixo pra depois", "Escuto o começo e o fim e finjo que entendi", "Amo um podcast de fofoca, mando outro de volta"] },
  { id: 39, block: "🙄 Parte 7: Ranço e Comportamento", type: "choice", q: "Como você lida com falsidade/fofoca no seu círculo?", options: ["Sou a detetive: descubro tudo, mas fico na minha", "Sou a direta: 'Escuta aqui, mona...', e resolvo", "Finjo demência e me afasto silenciosamente"] },
  { id: 40, block: "🙄 Parte 7: Ranço e Comportamento", type: "choice", q: "Qual sua opinião sobre astrologia?", options: ["Totalmente viciada: 'Culpa do ascendente!'", "Olho horóscopo só pra ver se vou ficar rica", "Sou racional, mona, estrelas não mandam em mim"] },

  // BLOCO 8: PREFERÊNCIAS ALEATÓRIAS
  { id: 41, block: "✨ Parte 8: Preferências Aleatórias", type: "choice", q: "Se você fosse uma vilã de filme, você seria:", options: ["A que tem um plano genial e chique", "A que faz o caos só por diversão", "A que desiste porque deu preguiça de lutar"] },
  { id: 42, block: "✨ Parte 8: Preferências Aleatórias", type: "choice", q: "Qual seu cheiro favorito no mundo?", options: ["Cheiro de terra molhada/chuva", "Cheiro de café fresquinho", "Cheiro de perfume importado/chique", "Cheiro de roupa limpa"] },
  { id: 43, block: "✨ Parte 8: Preferências Aleatórias", type: "choice", q: "O que não pode faltar na sua bolsa de jeito nenhum?", options: ["Carregador de celular (minha vida tá aqui)", "Chiclete/Bala", "Protetor labial/Batom", "Um amuleto ou coisa aleatória de estimação"] },
  { id: 44, block: "✨ Parte 8: Preferências Aleatórias", type: "choice", q: "Você é a pessoa que:", options: ["Chega 15 minutos antes em tudo", "Chega na hora (pontualidade de diva)", "Chega 30 minutos atrasada com um café na mão"] },
  { id: 45, block: "✨ Parte 8: Preferências Aleatórias", type: "choice", q: "Qual seu feriado favorito?", options: ["Carnaval (Puro suco do close)", "Natal (Comida e família)", "Meu aniversário (Dia da verdadeira rainha)", "Qualquer um que me permita dormir o dia todo"] },

  // BLOCO 9: VIBE ANNA BEATRIZ
  { id: 46, block: "🧠 Parte 9: Vibe Anna Beatriz", type: "text", q: "Se sua vida fosse uma série, qual seria o nome?" },
  { id: 47, block: "🧠 Parte 9: Vibe Anna Beatriz", type: "choice", q: "Qual hábito 'velho' você tem?", options: ["Gosto de plantas e de ficar em casa", "Reclamo de dor nas costas e tomo chá", "Sou viciada em palavras cruzadas/lógica", "Dormir às 21h sempre que posso"] },
  { id: 48, block: "🧠 Parte 9: Vibe Anna Beatriz", type: "text", q: "Um sonho de viagem que não seja clichê:" },
  { id: 49, block: "🧠 Parte 9: Vibe Anna Beatriz", type: "choice", q: "O que você faria se encontrasse sua celebridade favorita na rua?", options: ["Pediria foto e faria um story lacrando", "Ficaria em choque e não falaria nada", "Fingiria que sou amiga há anos (da galera)"] },
  { id: 50, block: "🧠 Parte 9: Vibe Anna Beatriz", type: "choice", q: "Pra fechar: Qual o seu 'mood' oficial para 2024?", options: ["Ficar rica e plena", "Viajar até o passaporte pedir socorro", "Só quero paz e um lanche bom", "Evolução espiritual e autocuidado"] },
];

function App() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isFinishing, setIsFinishing] = useState(false);

  const totalSteps = questions.length;
  const progress = currentStep >= 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  const handleNext = (val: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: val });
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinishing(true);
    }
  };

  const sendEmail = () => {
    const EMAIL_DESTINO = "WillianDouglaszero@gmail.com";
    const subject = "💅 O DOSSIÊ DA DIVA: Anna Beatriz (50 Respostas)";
    
    let body = "Mona, para tudo! Aqui estão as 50 respostas do dossiê oficial da Anna Beatriz:\n\n";
    
    let currentBlock = "";
    questions.forEach(q => {
      if (q.block !== currentBlock) {
        currentBlock = q.block;
        body += `--- ${currentBlock.toUpperCase()} ---\n`;
      }
      body += `${q.id}. ${q.q}\n   R: ${answers[q.id]}\n\n`;
    });
    
    body += "\nBabado finalizado com sucesso! ✨🚀";

    const mailtoUrl = `mailto:${EMAIL_DESTINO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  if (currentStep === -1) {
    return (
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="max-w-md w-full glass rounded-[2.5rem] p-8 text-center animate-slide-up shadow-2xl">
          <div className="flex justify-center mb-6 animate-bounce-slow">
            <Icons.Sparkles />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4 leading-tight">
            💅 O Dossiê Oficial da Diva: Edição Anna Beatriz ✨
          </h1>
          <p className="text-slate-600 leading-relaxed mb-8 text-sm italic">
            "Mona, para tudo! ✋ Chega de mistério. Esse aqui é o Dossiê Oficial da Anna Beatriz: o manual definitivo da sua personalidade. Responde essas 50 perguntas pra gente deixar registrado o que lacra, o que dá preguiça e qual é o seu verdadeiro close. Solta o verbo, Anna Beatriz! ✨"
          </p>
          <button 
            onClick={() => setCurrentStep(0)}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Começar o Lacre <Icons.ArrowRight />
          </button>
        </div>
      </div>
    );
  }

  if (isFinishing) {
    return (
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="max-w-md w-full glass rounded-[2.5rem] p-8 text-center animate-slide-up shadow-2xl">
          <div className="flex justify-center mb-6 text-green-500">
            <div className="bg-green-100 p-6 rounded-full">
               <Icons.Check />
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-800 mb-4">Babado de Milhões!</h2>
          <p className="text-slate-600 mb-8 text-sm leading-relaxed">
            Você finalizou o seu manual, Anna Beatriz! Agora é só clicar abaixo para enviar esse dossiê chique direto para o meu e-mail e deixar tudo documentado. ✨💅
          </p>
          <button 
            onClick={sendEmail}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Enviar Dossiê de Milhões 🚀
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentStep];

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen">
      <div className="max-w-md w-full mb-6">
         <div className="flex justify-between items-end mb-2 px-1">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-pink-400">{q.block}</span>
            <span className="text-[10px] font-bold text-slate-400 font-display">{currentStep + 1} / {totalSteps}</span>
         </div>
         <div className="w-full h-1.5 bg-white/40 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 via-purple-500 to-pink-500 transition-all duration-700 ease-out" 
              style={{ width: `${progress}%` }}
            />
         </div>
      </div>

      <div className="max-w-md w-full glass rounded-[2.5rem] p-8 animate-slide-up shadow-2xl relative overflow-hidden flex flex-col min-h-[420px]">
        <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-8 leading-snug">
          {q.q}
        </h3>

        <div className="flex-grow overflow-y-auto custom-scrollbar pr-1">
          {q.type === 'choice' ? (
            <div className="space-y-3 pb-2">
              {q.options?.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleNext(opt)}
                  className="w-full text-left p-4 rounded-2xl bg-white border-2 border-slate-50 hover:border-pink-200 hover:bg-pink-50/50 transition-all duration-200 group flex items-center justify-between"
                >
                  <span className="text-sm font-medium text-slate-600 group-hover:text-pink-600 leading-tight">{opt}</span>
                  <div className="shrink-0 w-6 h-6 rounded-full border-2 border-slate-100 flex items-center justify-center group-hover:border-pink-300 transition-all ml-2">
                    <div className="w-2.5 h-2.5 bg-pink-500 rounded-full opacity-0 group-active:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <input 
                autoFocus
                type="text"
                placeholder="Digita aqui, Anna..."
                className="w-full p-4 rounded-2xl bg-white border-2 border-slate-50 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-100/50 transition-all text-sm font-medium shadow-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                    handleNext((e.target as HTMLInputElement).value);
                  }
                }}
                id="text-input"
              />
              <button
                onClick={() => {
                  const el = document.getElementById('text-input') as HTMLInputElement;
                  if (el.value.trim()) handleNext(el.value);
                }}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Confirmar <Icons.ArrowRight />
              </button>
            </div>
          )}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
            Anna Beatriz Ed.
          </p>
          {currentStep > 0 && (
            <button 
              onClick={() => setCurrentStep(currentStep - 1)}
              className="text-slate-400 text-[10px] font-black hover:text-pink-500 transition-colors uppercase tracking-[0.1em]"
            >
              Voltar
            </button>
          )}
        </div>
      </div>
      
      <p className="mt-8 text-[10px] text-slate-400/80 font-medium">
        Feito com ✨ especialmente para a Anna Beatriz
      </p>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);