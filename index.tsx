import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const Icons = {
  Fire: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  )
};

const questions = [
  // BLOCO 1: A CIÊNCIA DO CAOS
  { id: 1, block: "🔬 Bloco 1: A Ciência do Caos", type: "choice", q: "Exatas é o pilar da sanidade (ou a falta dela). Das três áreas principais, qual ganha o pódio do coração e da mente?", options: ["Química (Reagentes, misturas e a satisfação do caos em escala reduzida)", "Física (A beleza de calcular o cosmos, o peso existencial da gravidade)", "Matemática (Porque todo o resto é interpretativo, mas os números não mentem jamais)"] },
  { id: 2, block: "🔬 Bloco 1: A Ciência do Caos", type: "choice", q: "Qual o seu 'Modo de Operação' preferido em sala de aula (ou no meio corporativo)?", options: ["Lançar uma ironia fina e sutil quando a lógica da pessoa não acompanha.", "Desviar o foco de uma equação complexa pra contar um caso criminal cabuloso.", "Espalhar o terror cognitivo botando um exercício insuperável no quadro.", "Transcender em pura paciência (porém mentalmente julgando muito)."] },
  { id: 3, block: "🔬 Bloco 1: A Ciência do Caos", type: "choice", q: "Avalie o cenário: você recebe a pergunta científica mais deprimente possível. Qual é a reação natural?", options: ["Respirar fundo e explicar as leis da física como se estivesse num jardim de infância.", "Soltar um sorriso magnético e perguntar: 'Você já avaliou suas chances na área de Humanas?'.", "Começar a derivar a equação inteira no quadro em silêncio mortal.", "Apenas aquele olhar letal que congela o ar condicionado e promove arrependimentos imediatos."] },
  { id: 4, block: "🔬 Bloco 1: A Ciência do Caos", type: "text", q: "Fale em ciência pura: qual é a teoria científica, equação matemática ou caso que mais explode os limites da sua mente ultimamente?" },

  // BLOCO 2: ALGORITMOS & AMBIÇÕES
  { id: 5, block: "💻 Bloco 2: O Código da Vilania", type: "choice", q: "Qual seria a meta final, o arco de personagem supremo na carreira de Dev/TI?", options: ["Virar Tech Lead absolutista que chora sangue revisando o commit dos juniores.", "A sênior fantasma: resolve o bug master em 5 minutos, não fala com ninguém e volta pro café.", "Criar um projeto open-source brilhante, lucrar obscenamente e sumir numa cabana com internet.", "Dominar processos globais manipulando Inteligência Artificial no conforto de casa."] },
  { id: 6, block: "💻 Bloco 2: O Código da Vilania", type: "choice", q: "Error Status 500: O banco caiu! O frontend quebrou. Qual o protocolo Bolsonara de crise?", options: ["'Na minha máquina tava compilando e lindo. Deve ser pau da AWS.'", "Xingar todas as gerações do criador do framework com a elegância de uma professora.", "Aplicar uma marretada na branch, ignorar e fingir que era feature pra semana que vem.", "Girar a cadeira, pedir um delivery pra processar o luto e culpar o cache."] },
  { id: 7, block: "💻 Bloco 2: O Código da Vilania", type: "choice", q: "Ambiente de Desenvolvimento: O que é absolutamente inegociável no seu battle station?", options: ["O barulho ensurdecedor e satisfatório de um teclado mecânico.", "Dois ou mais monitores pro log de erros competir com meu tédio em 4k.", "Iluminação estética (provavelmente laranja) forjando um ambiente cyberpunk.", "Zero distrações mamíferas num raio de 5 metros."] },
  { id: 8, block: "💻 Bloco 2: O Código da Vilania", type: "choice", q: "Dado o boom da IA, muitos temem pela carreira dev. Qual seu veredito oficial?", options: ["Eu delego o código chato pra ela, fico com o pensamento arquitetural e a glória.", "Tô tranquila. No dia que o robô der pau, o salário sobe pra quem sabe consertar ele.", "Ela ainda é incapaz de processar sarcasmo nível sênior, então o emprego está salvo.", "Se a Skynet dominar, minha retaguarda é ser da Química/Física e construir abrigos subterrâneos."] },
  { id: 9, block: "💻 Bloco 2: O Código da Vilania", type: "text", q: "Quem são as mentes ou empresas (referências de TI/Dev) que você consome e pensa: 'Isso aqui bate um bolão na genialidade'?" },

  // BLOCO 3: MENTE INVESTIGATIVA & CULTURA
  { id: 10, block: "🕵️‍♀️ Bloco 3: Mente Investigativa, Arte & Cultura", type: "choice", q: "O que monopoliza completamente o seu algoritmo num domingo à tarde de tédio?", options: ["Vlogs de teorias da conspiração densas que exigem mapa mental na parede.", "Análises de 3 horas sobre o porquê um filme sci-fi não faz sentido fisicamente.", "True crime impecável narrando cada decisão equivocada de um psicopata.", "Design de setups, códigos absurdos ou documentários aleatoriamente profundos."] },
  { id: 11, block: "🕵️‍♀️ Bloco 3: Mente Investigativa, Arte & Cultura", type: "choice", q: "Fazendo jus ao chapéu de alumínio: sob qual condição química/física ocorreria o sumiço perfeito num cenário de roteiro?", options: ["A clássica banheira de ácido fluorídrico corroendo até as preocupações do indivíduo.", "Um acidente altamente calculado testando os limites da conservação de energia sobre um penhasco.", "Substância exótica, de degradação rápida e completamente indetectável em autópsias padrão.", "Não cometo crimes físicos, prefiro apagar digitalmente os rastros no servidor da vida."] },
  { id: 12, block: "🕵️‍♀️ Bloco 3: Mente Investigativa, Arte & Cultura", type: "choice", q: "Quando a prancheta vira seu refúgio, qual o padrão visual dos seus desenhos/artes?", options: ["Simetria e geometria fria. A precisão acalma o caos mental.", "Retratos ou personagens expressivos, banhados em contrastes quentes (laranja predominando).", "Estética sombria e minimalista, quase rascunhos de investigações secretas.", "O que a mão mandar! É o momento onde eu simplesmente desligo a lógica de exatas."] },
  { id: 13, block: "🕵️‍♀️ Bloco 3: Mente Investigativa, Arte & Cultura", type: "choice", q: "Leitura em andamento! Qual é o trope literário que sequestra sua atenção impiedosamente?", options: ["Mistério denso ou thriller psicológico onde *ninguém* é confiável e a sanidade derrete.", "Ficção 'Hard' crivada de dados científicos válidos que deixam a professora satisfeita.", "Romance carregado na acidez, banter sarcástico ou a lendária dinâmica inimigos-para-amantes.", "Qualquer coisa profunda, sombria e que me desconecte dessa dimensão falha."] },
  { id: 14, block: "🕵️‍♀️ Bloco 3: Mente Investigativa, Arte & Cultura", type: "text", q: "Pra salvar nos logs primários: qual a obra cinematográfica (filme/série) cujo plot twist ou estética ecoa impecavelmente com seus processos mentais?" },
  { id: 15, block: "🕵️‍♀️ Bloco 3: Mente Investigativa, Arte & Cultura", type: "text", q: "Caso a host do caos lance um Podcast... Qual seria o nome do SEU episódio ou quadro de estreia?" },

  // BLOCO 4: PROTOCOLO DE SOBREVIVÊNCIA (LAZER E ROLÊS)
  { id: 16, block: "☕ Bloco 4: Protocolo de Sobrevivência", type: "choice", q: "Condições meteorológicas ótimas. Qual o 'setup de clima' irresistível que comanda a agenda?", options: ["Chuva intensa e cinza: A autorização inquestionável para deitar e anular compromissos.", "Fim de tarde alaranjado, fresco, idealizado por deuses gregos, pedindo um ar puro em parque calmo.", "Noite limpa, gelada, propícia para aquecer num restaurante chique ou tacar terror num bar.", "Qualquer um, a variável determinante costuma ser a ausência de grandes aglomerações."] },
  { id: 17, block: "☕ Bloco 4: Protocolo de Sobrevivência", type: "choice", q: "Deploy encerrado, alunos dispensados. Para recarregar as energias cognitivas num fim de semana glorioso:", options: ["Reclusão isolada num café estético com meu livro, julgando transeuntes enquanto o latte esfria.", "Ar condicionado rasgando a conta de luz, maratona televisiva até minha retina queimar e zero socialização.", "Exploração tática em áreas abertas ou ambientes culturais que estimulem minha criatividade reprimida.", "Botão do caos ligado: vinho e/ou diversão para dissolver a burocracia dos cinco dias úteis anteriores."] },
  { id: 18, block: "☕ Bloco 4: Protocolo de Sobrevivência", type: "choice", q: "Status: Carência de Calorias. Como estilhaçamos as dietas contemporâneas com elegância?", options: ["Cortes nobres e Sashimi fresco. Leve, sofisticado, como toda boa linha de código deveria ser.", "Sobrecarga de carboidrato: a pizza mais recheada da metrópole pra entupir artérias e aliviar frustrações.", "Delivery tático de conforto absurdo que não demande lavar incrédulas panelas ao amanhecer.", "Tábua de frios rústica, queijos e uma tacinha de vinho denso pra alinhar os chacras."] },
  { id: 19, block: "☕ Bloco 4: Protocolo de Sobrevivência", type: "choice", q: "Protocolo de Agudos Táticos de Suborno: Se alguém decidir mandar um 'mimo', no que aposta para inflar o medidor de afinidade?", options: ["Componentes eletrônicos impecáveis ou livros importados grossos que alimentem o intelecto.", "Estética material: algo decorativo vintage ou de papelaria incrivelmente elaborada.", "Docerias premium ou gastronomia de respeito entregues diretamente na minha zona de conforto.", "Experiências: um ingresso pra um lugar insano que a maioria não teria coragem de ir."] },

  // BLOCO 5: CAOS E TESTE DE ESTRESSE COMPORTAMENTAL
  { id: 20, block: "🌶️ Bloco 5: Teste de Estresse", type: "choice", q: "Analisando variáveis sociais e interações diretas. No complexo protocolo do flerte, qual algoritmo te baseia?", options: ["Teste heurístico de QI: lanço algo duplo-sentido com tom sarcástico. Quem capta passa, quem pisca perde.", "O uso sutil de cantadas embasadas em teorias científicas até a pessoa engasgar rindo (ou ficar muito confusa).", "Economia de energia: um olhar impassível, sorriso oblíquo, deixando que cometam as falhas em minha direção.", "Eu causo disrupção. Ignoro a mecânica inteira, jogo os fatos mais caóticos na mesa e vejo quem sobrevive."] },
  { id: 21, block: "🌶️ Bloco 5: Teste de Estresse", type: "choice", q: "Hipótese de Date: 'Sessão de Cinema'. Ao iniciar os créditos, qual cláusula não pode ser violada?", options: ["Absoluto Mutismo Tático. Comentadores de filmes paralelos devem ser ejetados sem direito à defesa.", "Anarquia Analítica: será exigida a destruição do roteirista com pausas apontando furos de física na trama.", "Nesse protocolo o filme sequer importa. É só a luz de fundo pra gente debater rindo pela madrugada.", "Flexibilidade. Dá pra relaxar, comer algo insalubre e até desligar o cérebro crítico por duas raras horas."] },
  { id: 22, block: "🌶️ Bloco 5: Teste de Estresse", type: "text", q: "Para processamento terminal: inicie o dump final deixando registrada a sua teoria conspiratória favorita ou a máxima cínica que você tatuaria na mente!" }
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
    const subject = "🔥 LOGS DO SISTEMA: Diagnóstico Bolsonara Concluído";
    
    let body = "Aqui estão os logs extraídos pelo protocolo de verificação. Padrões de comportamento documentados com sucesso:\n\n";
    
    let currentBlock = "";
    questions.forEach(q => {
      if (q.block !== currentBlock) {
        currentBlock = q.block;
        body += `--- ${currentBlock.toUpperCase()} ---\n`;
      }
      body += `${q.id}. ${q.q}\n   R: ${answers[q.id]}\n\n`;
    });
    
    body += "\nProcessamento computado sem warnings do compilador. Assinatura neural confirmada. 🚀";

    const mailtoUrl = `mailto:${EMAIL_DESTINO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  if (currentStep === -1) {
    return (
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="max-w-md w-full glass rounded-[2.5rem] p-8 text-center animate-slide-up shadow-2xl">
          <div className="flex justify-center mb-6 animate-bounce-slow">
            <Icons.Fire />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600 mb-4 leading-tight">
            Terminal de Análise Bolsonara
          </h1>
          <p className="text-slate-600 leading-relaxed mb-8 text-sm font-medium">
            Bem-vinda à interface de processamento comportamental. O objetivo deste diagnóstico é compilar variáveis cognitivas ligadas a código, tolerância ao estresse e metodologias de reboot estético. Não oculte variáveis durante os prompts investigativos.
          </p>
          <button 
            onClick={() => setCurrentStep(0)}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Iniciar Diagnóstico de Sistema <Icons.ArrowRight />
          </button>
        </div>
      </div>
    );
  }

  if (isFinishing) {
    return (
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="max-w-md w-full glass rounded-[2.5rem] p-8 text-center animate-slide-up shadow-2xl">
          <div className="flex justify-center mb-6 text-orange-500">
            <div className="bg-orange-100 p-6 rounded-full">
               <Icons.Check />
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-800 mb-4">Laudo Final Compilado</h2>
          <p className="text-slate-600 mb-8 text-sm leading-relaxed">
            As métricas comportamentais foram compiladas com sucesso! Clique no botão abaixo para abrir seu aplicativo de e-mail e disparar este dossiê diretamente para a base primária (<strong>WillianDouglaszero@gmail.com</strong>). O log já estará gerado e preenchido, bastando apertar em enviar!
            <br/><br/>
            <span className="text-xs italic opacity-70 text-slate-500">ps: sim, eu não tive paciência de fazer um banco de dados pra isso. Vai por e-mail mesmo 🤡</span>
          </p>
          <button 
            onClick={sendEmail}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Abrir E-mail e Enviar Logs 🚀
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
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-600">{q.block}</span>
            <span className="text-[10px] font-bold text-slate-400 font-display">{currentStep + 1} / {totalSteps}</span>
         </div>
         <div className="w-full h-1.5 bg-white/40 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-orange-400 via-amber-500 to-orange-500 transition-all duration-700 ease-out" 
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
                  className="w-full text-left p-4 rounded-2xl bg-white border-2 border-slate-50 hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-200 group flex items-center justify-between"
                >
                  <span className="text-sm font-medium text-slate-600 group-hover:text-orange-600 leading-tight">{opt}</span>
                  <div className="shrink-0 w-6 h-6 rounded-full border-2 border-slate-100 flex items-center justify-center group-hover:border-orange-300 transition-all ml-2">
                    <div className="w-2.5 h-2.5 bg-orange-500 rounded-full opacity-0 group-active:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <input 
                autoFocus
                type="text"
                placeholder="Insira entrada de dados aqui..."
                className="w-full p-4 rounded-2xl bg-white border-2 border-slate-50 focus:border-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition-all text-sm font-medium shadow-sm"
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
                Injetar Dado <Icons.ArrowRight />
              </button>
            </div>
          )}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
            V.1.03 - Diagnostic Core
          </p>
          {currentStep > 0 && (
            <button 
              onClick={() => setCurrentStep(currentStep - 1)}
              className="text-slate-400 text-[10px] font-black hover:text-orange-500 transition-colors uppercase tracking-[0.1em]"
            >
              Reverter Resposta
            </button>
          )}
        </div>
      </div>
      
      <p className="mt-8 text-[10px] text-slate-400/80 font-medium">
        Processamento Local - Mapeamento Comportamental
      </p>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
