import type { ExerciseItem, TestMode } from '../core/types';

interface QuestionTemplate {
  prompt: string;
  correct: string;
  wrongs: string[];
  explanation: string;
  svgDiagramType?: 'fraction_circle' | 'fraction_bar' | 'none';
}

// Banco profundo e categorizado por disciplina
const DISCIPLINE_QUESTION_BANKS: Record<string, QuestionTemplate[]> = {
  matematica: [
    {
      prompt: 'Se repartires 48 figurinhas igualmente entre 6 amigos, quantas figurinhas cada um recebe?',
      correct: '8 figurinhas',
      wrongs: ['6 figurinhas', '7 figurinhas', '9 figurinhas'],
      explanation: '48 dividido por 6 é igual a 8, pois 8 × 6 = 48.'
    },
    {
      prompt: 'Qual é o resultado da expressão numérica 25 + 5 × 4? (Atenção à prioridade das operações!)',
      correct: '45',
      wrongs: ['120', '34', '50'],
      explanation: 'Multiplicação resolve-se primeiro: 5 × 4 = 20. Depois somamos: 25 + 20 = 45.'
    },
    {
      prompt: 'Que fração representa a metade de uma pizza cortada em 8 fatias iguais?',
      correct: '4/8 (ou 1/2)',
      wrongs: ['2/8', '6/8', '8/4'],
      explanation: 'A metade de 8 partes é 4 partes, logo 4/8 equivale simplificado a 1/2.',
      svgDiagramType: 'fraction_circle'
    },
    {
      prompt: 'Uma loja anuncia um tênis de R$ 200 com 15% de desconto à vista. Qual é o valor do desconto em reais?',
      correct: 'R$ 30',
      wrongs: ['R$ 15', 'R$ 25', 'R$ 35'],
      explanation: '15% de R$ 200 = (15 / 100) × 200 = 15 × 2 = R$ 30 de desconto.'
    },
    {
      prompt: 'Na equação x + 18 = 45, qual é o valor numérico da incógnita x?',
      correct: 'x = 27',
      wrongs: ['x = 63', 'x = 23', 'x = 37'],
      explanation: 'Subtraindo 18 de ambos os lados: x = 45 - 18 = 27.'
    },
    {
      prompt: 'Um campo retangular mede 20 metros de comprimento por 10 metros de largura. Qual é o seu perímetro total?',
      correct: '60 metros',
      wrongs: ['200 metros', '30 metros', '50 metros'],
      explanation: 'O perímetro é a soma dos 4 lados: 20 + 20 + 10 + 10 = 60 metros.'
    },
    {
      prompt: 'Qual é a área de uma sala quadrada cujos lados medem 6 metros?',
      correct: '36 m²',
      wrongs: ['24 m²', '12 m²', '48 m²'],
      explanation: 'A área do quadrado é lado × lado: 6 × 6 = 36 metros quadrados (m²).'
    },
    {
      prompt: 'Qual das frações abaixo é equivalente a 2/5?',
      correct: '4/10',
      wrongs: ['3/10', '4/15', '2/10'],
      explanation: 'Multiplicando o numerador e o denominador por 2: (2×2)/(5×2) = 4/10.'
    },
    {
      prompt: 'Se um triângulo tem um ângulo reto (90°) e um ângulo de 40°, quanto mede o terceiro ângulo?',
      correct: '50°',
      wrongs: ['40°', '60°', '45°'],
      explanation: 'A soma dos ângulos internos de qualquer triângulo é 180°. 180 - (90 + 40) = 50°.'
    },
    {
      prompt: 'Numa corrida de 5 km, Lucas já correu 3.200 metros. Quantos metros ainda faltam para cruzar a linha de chegada?',
      correct: '1.800 metros',
      wrongs: ['2.200 metros', '1.200 metros', '800 metros'],
      explanation: '5 km equivalem a 5.000 metros. 5.000 - 3.200 = 1.800 metros restantes.'
    },
    {
      prompt: 'Qual é o valor de 3 elevado ao cubo (3³)?',
      correct: '27',
      wrongs: ['9', '18', '81'],
      explanation: '3³ = 3 × 3 × 3 = 9 × 3 = 27.'
    },
    {
      prompt: 'Uma padaria produz 120 pães a cada 30 minutos. Quantos pães produzirá em 2 horas completas no mesmo ritmo?',
      correct: '480 pães',
      wrongs: ['240 pães', '360 pães', '600 pães'],
      explanation: '2 horas têm 4 períodos de 30 minutos. 4 × 120 = 480 pães.'
    }
  ],

  portugues: [
    {
      prompt: 'Na frase "Os alunos inteligentes estudaram com dedicação", qual palavra funciona como adjetivo?',
      correct: 'inteligentes',
      wrongs: ['estudaram', 'alunos', 'dedicação'],
      explanation: '"Inteligentes" caracteriza o substantivo "alunos", sendo, portanto, um adjetivo.'
    },
    {
      prompt: 'Assinale a alternativa em que a palavra destacada é proparoxítona e deve receber acento gráfico:',
      correct: 'Música',
      wrongs: ['Cafe', 'Cipo', 'Jardim'],
      explanation: 'Todas as palavras proparoxítonas (com sílaba tônica na antepenúltima: MÚ-si-ca) são obrigatoriamente acentuadas.'
    },
    {
      prompt: 'Complete a frase corretamente: "Ele não compareceu à aula _______ estava doente."',
      correct: 'porque (junto e sem acento)',
      wrongs: ['por que (separado)', 'por quê (no fim de frase)', 'porquê (substantivo)'],
      explanation: 'Usa-se "porque" junto e sem acento como conjunção explicativa ou causal (equivale a "pois").'
    },
    {
      prompt: 'Qual é o sujeito da oração: "Chegaram ontem os novos livros da biblioteca"?',
      correct: 'Os novos livros da biblioteca',
      wrongs: ['Ontem', 'Chegaram', 'A biblioteca'],
      explanation: 'Fazendo a pergunta ao verbo: Quem chegou ontem? Resposta: "Os novos livros da biblioteca".'
    },
    {
      prompt: 'Identifique o antônimo correto da palavra "abundante":',
      correct: 'Escasso',
      wrongs: ['Farto', 'Volumoso', 'Rico'],
      explanation: 'Escasso significa raro ou insuficiente, sendo o oposto direto de abundante.'
    },
    {
      prompt: 'Em qual das alternativas o uso de "mas" ou "mais" está plenamente correto?',
      correct: 'Ela treinou bastante, mas não conseguiu a medalha.',
      wrongs: [
        'Ela treinou bastante, mais não conseguiu a medalha.',
        'Quero mas um copo de água fresca.',
        'Eles são mas velhos que nós.'
      ],
      explanation: '"Mas" é conjunção adversativa (ideia de oposição). "Mais" indica quantidade e intensidade.'
    },
    {
      prompt: 'A figura de linguagem que consiste em atribuir qualidades humanas a seres inanimados chama-se:',
      correct: 'Personificação (ou Prosopopeia)',
      wrongs: ['Metáfora', 'Hipérbole', 'Antítese'],
      explanation: 'Como em "O vento sussurrava entre as árvores": ventos não sussurram como humanos, logo é personificação.'
    },
    {
      prompt: 'Qual frase faz o emprego correto do ponto de interrogação e vírgula de vocativo?',
      correct: 'Mariana, você já revisou o texto?',
      wrongs: [
        'Mariana você já revisou o texto.',
        'Mariana? Você já revisou o texto!',
        'Mariana você, já revisou o texto?'
      ],
      explanation: 'O vocativo (termo de chamamento) deve ser isolado por vírgula, seguido da pontuação interrogativa direta.'
    },
    {
      prompt: 'Qual classe de palavras expressa ações, estados ou fenômenos da natureza conjugados no tempo?',
      correct: 'Verbo',
      wrongs: ['Substantivo', 'Advérbio', 'Pronome'],
      explanation: 'Os verbos indicam ações (correr), estados (estar) e fenômenos da natureza (chover).'
    },
    {
      prompt: 'Identifique o sinônimo adequado da palavra "efêmero":',
      correct: 'Passageiro',
      wrongs: ['Eterno', 'Duradouro', 'Pesado'],
      explanation: 'Efêmero é aquilo de curta duração, transitório e passageiro.'
    }
  ],

  ciencias: [
    {
      prompt: 'Qual organela celular é conhecida como a "usina de energia" da célula por realizar a respiração celular?',
      correct: 'Mitocôndria',
      wrongs: ['Ribossomo', 'Cloroplasto', 'Lisossomo'],
      explanation: 'As mitocôndrias produzem moléculas de ATP (energia) para a manutenção das atividades vitais da célula.'
    },
    {
      prompt: 'Na fotossíntese, quais são os três elementos fundamentais que as plantas combinam para gerar glicose?',
      correct: 'Água, gás carbônico (CO2) e luz solar',
      wrongs: [
        'Oxigênio, nitrogênio e escuridão',
        'Gás hélio, sal e calor',
        'Glicose pronta, terra e vento'
      ],
      explanation: 'A clorofila vegetal captura fótons de luz para transformar água e CO2 em glicose e liberar oxigênio.'
    },
    {
      prompt: 'Em uma teia alimentar, como são classificados os seres que produzem seu próprio alimento através da luz?',
      correct: 'Autótrofos (ou Produtores)',
      wrongs: ['Consumidores primários', 'Decompositores', 'Herbívoros'],
      explanation: 'Plantas e algas são produtores autótrofos porque sintetizam matéria orgânica por fotossíntese.'
    },
    {
      prompt: 'Qual processo físico ocorre quando a água líquida ferve e passa para o estado gasoso de vapor?',
      correct: 'Vaporização (ou Ebulição)',
      wrongs: ['Solidificação', 'Condensação', 'Fusão'],
      explanation: 'Vaporização é a transição do estado líquido para o gasoso com o aumento de temperatura.'
    },
    {
      prompt: 'Qual componente do sangue humano é o principal responsável pelo transporte de oxigênio a todos os tecidos?',
      correct: 'Glóbulos vermelhos (Hemácias)',
      wrongs: ['Plaquetas', 'Glóbulos brancos (Leucócitos)', 'Plasma neutro'],
      explanation: 'As hemácias contêm hemoglobina, proteína rica em ferro que se liga ao oxigênio nos pulmões.'
    },
    {
      prompt: 'Qual fonte de energia é classificada como 100% renovável e não emite gases poluentes no efeito estufa?',
      correct: 'Energia Solar',
      wrongs: ['Carvão mineral', 'Petróleo', 'Gás natural fóssil'],
      explanation: 'A energia solar vem da radiação inesgotável do Sol sem queima de combustíveis fósseis.'
    }
  ],

  historia: [
    {
      prompt: 'Qual povo da Mesopotâmia antiga desenvolveu o mais antigo sistema de escrita conhecido, a escrita cuneiforme?',
      correct: 'Sumérios',
      wrongs: ['Romanos', 'Persas', 'Vikings'],
      explanation: 'Os sumérios criaram a escrita cuneiforme por volta de 3.500 a.C. em tabuletas de argila úmida.'
    },
    {
      prompt: 'Qual era a principal finalidade das imponentes pirâmides construídas pelos antigos egípcios?',
      correct: 'Túmulos sagrados para abrigar o corpo e a alma dos faraós',
      wrongs: [
        'Mercados públicos e feiras',
        'Fundações militares para guerras',
        'Escolas para o povo comum'
      ],
      explanation: 'As pirâmides eram monumentos funerários onde os faraós eram sepultados com suas riquezas para a vida após a morte.'
    },
    {
      prompt: 'Em qual cidade-estado da Grécia Antiga nasceu o conceito de democracia direta e cidadania participativa?',
      correct: 'Atenas',
      wrongs: ['Esparta', 'Tebas', 'Corinto'],
      explanation: 'Em Atenas, os cidadãos reuniam-se na Ágora para debater, votar leis e tomar decisões de governo.'
    },
    {
      prompt: 'Qual inovação tecnológica do século XV permitiu a difusão veloz de livros e do conhecimento na Europa?',
      correct: 'A imprensa de tipos móveis inventada por Johannes Gutenberg',
      wrongs: ['A máquina a vapor', 'O telégrafo elétrico', 'A bússola magnética'],
      explanation: 'Gutenberg criou a prensa tipográfica por volta de 1440, tornando a produção de livros muito mais ágil e acessível.'
    },
    {
      prompt: 'No sistema feudal da Idade Média, qual era a principal obrigação dos servos em relação aos senhores feudais?',
      correct: 'Trabalhar as terras e entregar parte da produção agrícola em troca de proteção',
      wrongs: [
        'Comandar exércitos de cavalaria',
        'Votar nos reis da Europa',
        'Navegar para a América'
      ],
      explanation: 'A servidão feudal baseava-se em laços de dependência econômica, tributos agrários e proteção senhorial.'
    },
    {
      prompt: 'Qual marco histórico em 1888 pôs fim legal à escravidão no Brasil com a assinatura da Lei Áurea?',
      correct: 'Abolição da Escravidão',
      wrongs: ['Proclamação da República', 'Independência do Brasil', 'Revolução Farroupilha'],
      explanation: 'A Lei Áurea foi assinada em 13 de maio de 1888 pela Princesa Isabel, extinguindo formalmente a escravidão no país.'
    }
  ],

  geografia: [
    {
      prompt: 'Qual é a linha imaginária horizontal que divide a Terra em Hemisfério Norte e Hemisfério Sul?',
      correct: 'Linha do Equador (Paralelo 0°)',
      wrongs: ['Meridiano de Greenwich', 'Trópico de Câncer', 'Círculo Polar Ártico'],
      explanation: 'O Equador é a circunferência média do globo que marca a latitude 0°, dividindo os hemisférios norte e sul.'
    },
    {
      prompt: 'O movimento de rotação que a Terra executa ao girar em torno do seu próprio eixo dura aproximadamente 24 horas e origina:',
      correct: 'A alternância entre o dia e a noite',
      wrongs: ['As quatro estações do ano', 'As fases da lua', 'Os terremotos submarinos'],
      explanation: 'A rotação expõe sucessivamente diferentes faces do planeta à luz solar, criando o dia e a noite.'
    },
    {
      prompt: 'Qual continente possui a maior extensão territorial e a maior população do planeta Terra?',
      correct: 'Ásia',
      wrongs: ['América do Norte', 'África', 'Europa'],
      explanation: 'A Ásia abriga mais de 4,7 bilhões de habitantes e possui mais de 44 milhões de km² de área.'
    },
    {
      prompt: 'Qual bioma brasileiro é considerado a maior floresta tropical do planeta, possuindo imensa biodiversidade e bacia hidrográfica?',
      correct: 'Floresta Amazônica',
      wrongs: ['Cerrado', 'Caatinga', 'Pampa'],
      explanation: 'A Amazônia é a maior floresta tropical do mundo, abrigando o gigantesco Rio Amazonas e milhões de espécies.'
    },
    {
      prompt: 'O que indica a escala de um mapa cartográfico?',
      correct: 'A proporção entre a distância no mapa e a distância real no terreno',
      wrongs: [
        'A previsão meteorológica da região',
        'A quantidade exata de habitantes',
        'Os nomes dos governantes'
      ],
      explanation: 'A escala cartográfica traduz a redução proporcional do espaço real para o desenho do mapa.'
    }
  ],

  fisica: [
    {
      prompt: 'Se um automóvel percorre 180 km em 2 horas de viagem contínua, qual foi a sua velocidade média?',
      correct: '90 km/h',
      wrongs: ['60 km/h', '120 km/h', '80 km/h'],
      explanation: 'Velocidade média = Distância / Tempo = 180 km / 2 h = 90 km/h.'
    },
    {
      prompt: 'A Primeira Lei de Newton afirma que um corpo em repouso ou movimento retilíneo uniforme tende a manter seu estado a menos que atue sobre ele uma força. Esse princípio é chamado de:',
      correct: 'Lei da Inércia',
      wrongs: ['Ação e Reação', 'Gravitação Universal', 'Conservação da Massa'],
      explanation: 'Inércia é a propriedade da matéria de resistir a alterações no seu estado de repouso ou velocidade.'
    },
    {
      prompt: 'Qual é a diferença fundamental entre "massa" e "peso" na física?',
      correct: 'Massa é a quantidade de matéria (kg) e peso é a força gravitacional exercida sobre ela (N).',
      wrongs: [
        'Massa e peso são exatamente a mesma coisa sem diferença.',
        'Massa só existe na Terra e peso existe no espaço.',
        'Massa mede-se em litros e peso mede-se em metros.'
      ],
      explanation: 'Massa (kg) é constante em qualquer lugar do universo; o peso (P = m × g) depende da gravidade local.'
    },
    {
      prompt: 'Qual material abaixo é considerado um excelente condutor de eletricidade utilizado em fios domésticos?',
      correct: 'Cobre',
      wrongs: ['Borracha', 'Madeira seca', 'Vidro'],
      explanation: 'O cobre é um metal com elétrons livres que facilitam a passagem contínua da corrente elétrica.'
    },
    {
      prompt: 'Quando a luz branca do Sol atravessa gotas de chuva ou um prisma de vidro e se separa em cores do arco-íris, temos o fenômeno de:',
      correct: 'Refração e dispersão da luz',
      wrongs: ['Eco sonoro', 'Radiação gama', 'Magnetismo estático'],
      explanation: 'Ao mudar de meio material, cada cor da luz refrata em ângulo diferente, gerando o espectro colorido.'
    }
  ],

  quimica: [
    {
      prompt: 'Qual é a fórmula molecular da substância química vital que compõe a água pura?',
      correct: 'H₂O (dois átomos de hidrogênio e um de oxigênio)',
      wrongs: ['CO₂', 'NaCl', 'O₂'],
      explanation: 'A molécula de água é formada pela ligação covalente de 2 átomos de hidrogênio e 1 de oxigênio.'
    },
    {
      prompt: 'Qual das alternativas exemplifica uma mistura heterogênea, onde é possível distinguir visualmente suas fases?',
      correct: 'Água e óleo de cozinha',
      wrongs: ['Água com sal totalmente dissolvido', 'Ar atmosférico limpo', 'Vinagre transparente'],
      explanation: 'Água e óleo não se misturam (são imiscíveis), formando duas fases distintas e visíveis.'
    },
    {
      prompt: 'No núcleo de um átomo encontram-se quais partículas subatômicas?',
      correct: 'Prótons (carga positiva) e nêutrons (sem carga)',
      wrongs: [
        'Elétrons e fótons apenas',
        'Moléculas de gás e calor',
        'Apenas elétrons negativos'
      ],
      explanation: 'O núcleo atômico abriga prótons e nêutrons, enquanto os elétrons orbitam na eletrosfera.'
    },
    {
      prompt: 'A passagem direta do estado sólido para o estado gasoso sem passar pelo líquido chama-se:',
      correct: 'Sublimação',
      wrongs: ['Fusão', 'Condensação', 'Solidificação'],
      explanation: 'Sublimação é a transição direto do sólido ao gasoso, como ocorre com o gelo seco e naftalina.'
    },
    {
      prompt: 'Na tabela periódica, qual elemento químico é representado pelo símbolo universal "Fe"?',
      correct: 'Ferro',
      wrongs: ['Fósforo', 'Flúor', 'Frâncio'],
      explanation: 'O símbolo "Fe" deriva do latim "Ferrum", que significa Ferro.'
    }
  ],

  biologia: [
    {
      prompt: 'Qual molécula biológica em formato de dupla hélice armazena todo o código genético e hereditário dos seres vivos?',
      correct: 'DNA (Ácido Desoxirribonucleico)',
      wrongs: ['Glicose', 'Hemoglobina', 'Clorofila'],
      explanation: 'O DNA contém as instruções genéticas responsáveis pela transmissão de características de pais para filhos.'
    },
    {
      prompt: 'Qual é a principal diferença estrutural entre uma célula procariótica (como bactérias) e uma célula eucariótica?',
      correct: 'Células procarióticas não possuem núcleo membranoso individualizado delimitando o material genético.',
      wrongs: [
        'Células procarióticas são maiores que elefantes.',
        'Células eucarióticas não possuem membrana celular.',
        'Bactérias possuem cérebro e neurônios complexos.'
      ],
      explanation: 'Nos procariontes o DNA fica solto no citoplasma; nos eucariontes há uma carioteca delimitando o núcleo.'
    },
    {
      prompt: 'Por que as vacinas são ferramentas fundamentais da saúde pública e da imunologia?',
      correct: 'Estimulam o sistema imunológico a produzir anticorpos e células de memória contra vírus e bactérias.',
      wrongs: [
        'Destroem todas as células saudáveis do corpo humano.',
        'Substituem a necessidade de respirar oxigênio.',
        'Causam doenças incuráveis permanentemente.'
      ],
      explanation: 'As vacinas treinam os glóbulos brancos para reagir com rapidez e neutralizar o patógeno real.'
    },
    {
      prompt: 'Os fungos (como cogumelos, leveduras e bolores) pertencem a qual reino biológico?',
      correct: 'Reino Fungi',
      wrongs: ['Reino Plantae', 'Reino Animalia', 'Reino Monera'],
      explanation: 'Fungos não realizam fotossíntese e têm características próprias, constituindo o Reino Fungi.'
    }
  ],

  ingles: [
    {
      prompt: 'Complete the sentence with the correct form of the Verb To Be: "She _____ a very dedicated student."',
      correct: 'is',
      wrongs: ['are', 'am', 'be'],
      explanation: 'With singular third-person pronouns (He, She, It), we use "is".'
    },
    {
      prompt: 'What is the correct English translation for the greeting "Bom dia, como vai você?"',
      correct: 'Good morning, how are you?',
      wrongs: [
        'Good night, who are you?',
        'Good afternoon, what is this?',
        'Goodbye, see you later'
      ],
      explanation: '"Good morning" means Bom dia, and "How are you?" asks Como vai você.'
    },
    {
      prompt: 'Choose the correct plural form of the word "child":',
      correct: 'Children',
      wrongs: ['Childs', 'Childes', 'Childrens'],
      explanation: '"Child" has an irregular plural in English: one child, two children.'
    },
    {
      prompt: 'Which Question Word is used to ask about a specific PLACE or location?',
      correct: 'Where',
      wrongs: ['When (tempo)', 'Who (pessoa)', 'Why (motivo)'],
      explanation: '"Where" specifically inquires about place, as in "Where is the library?".'
    },
    {
      prompt: 'Complete with Present Continuous: "Listen! The teacher _______ now."',
      correct: 'is speaking',
      wrongs: ['speaks', 'are speaking', 'speaking'],
      explanation: 'Actions happening right now use is/are + verb-ing: "The teacher is speaking".'
    },
    {
      prompt: 'How do you say the number "75" in English words?',
      correct: 'Seventy-five',
      wrongs: ['Seven-five', 'Seventeen-five', 'Sixty-five'],
      explanation: '70 is seventy, so 75 is written as seventy-five.'
    }
  ]
};

// Gerador procedural inteligente para atingir 50-60 questões por matéria mantendo alto padrão didático
function generateDynamicDisciplineQuestion(subjectId: string, qNum: number, seed: number): QuestionTemplate {
  const bank = DISCIPLINE_QUESTION_BANKS[subjectId] || DISCIPLINE_QUESTION_BANKS.matematica;
  const baseTemplate = bank[seed % bank.length];

  // Variação matemática e procedural
  if (subjectId === 'matematica') {
    const variant = seed % 4;
    if (variant === 0) {
      const a = (seed * 7 + 13) % 40 + 12;
      const b = (seed * 11 + 23) % 35 + 8;
      const total = a + b;
      return {
        prompt: `Qual é o resultado da adição ${a} + ${b}?`,
        correct: `${total}`,
        wrongs: [`${total - 2}`, `${total + 10}`, `${total + 3}`],
        explanation: `Somando ${a} com ${b}, encontramos exatamente ${total}.`
      };
    } else if (variant === 1) {
      const factorA = (seed * 3 + 2) % 8 + 3;
      const factorB = (seed * 5 + 4) % 7 + 4;
      const mult = factorA * factorB;
      return {
        prompt: `Calcule mentalmente: quanto é ${factorA} × ${factorB}?`,
        correct: `${mult}`,
        wrongs: [`${mult + factorA}`, `${mult - 4}`, `${mult + 6}`],
        explanation: `${factorA} multiplicado por ${factorB} resulta em ${mult}.`
      };
    } else if (variant === 2) {
      const div = (seed * 2 + 3) % 6 + 2;
      const quo = (seed * 4 + 7) % 9 + 3;
      const num = div * quo;
      return {
        prompt: `Se dividires ${num} por ${div}, qual é o quociente exato?`,
        correct: `${quo}`,
        wrongs: [`${quo + 2}`, `${quo - 1}`, `${quo + 3}`],
        explanation: `${num} ÷ ${div} = ${quo}, pois ${quo} × ${div} = ${num}.`
      };
    } else {
      const valor = (seed * 10 + 50) % 100 + 40;
      const descPercent = 10;
      const valDesc = (valor * descPercent) / 100;
      const finalVal = valor - valDesc;
      return {
        prompt: `Um livro custa R$ ${valor}. Com ${descPercent}% de desconto à vista, qual será o valor final a pagar?`,
        correct: `R$ ${finalVal}`,
        wrongs: [`R$ ${valor - 5}`, `R$ ${finalVal - 4}`, `R$ ${finalVal + 8}`],
        explanation: `${descPercent}% de ${valor} = R$ ${valDesc}. Valor com desconto: ${valor} - ${valDesc} = R$ ${finalVal}.`
      };
    }
  }

  // Para outras disciplinas, rotacionar com modificadores contextuais
  return {
    prompt: `[Questão #${qNum}] ${baseTemplate.prompt}`,
    correct: baseTemplate.correct,
    wrongs: baseTemplate.wrongs,
    explanation: baseTemplate.explanation,
    svgDiagramType: baseTemplate.svgDiagramType
  };
}

/**
 * Cria uma sessão de teste sob medida por disciplina com a quantidade requisitada
 */
export function createDisciplineTestSession(
  subjectId: string,
  testMode: TestMode,
  count: number = 10,
  themeId?: string
): ExerciseItem[] {
  const letters = ['a', 'b', 'c', 'd'];
  const bank = DISCIPLINE_QUESTION_BANKS[subjectId] || DISCIPLINE_QUESTION_BANKS.matematica;
  const items: ExerciseItem[] = [];

  for (let i = 0; i < count; i++) {
    const seed = i + (themeId ? themeId.length * 3 : 7);
    const template = i < bank.length
      ? bank[i]
      : generateDynamicDisciplineQuestion(subjectId, i + 1, seed);

    const correctLetter = letters[(seed + i) % 4];
    const options = [];
    let wrongIdx = 0;

    for (const letter of letters) {
      if (letter === correctLetter) {
        options.push({ id: letter, text: template.correct });
      } else {
        const wrongText = template.wrongs[wrongIdx++] || `Alternativa didática ${letter.toUpperCase()}`;
        options.push({ id: letter, text: wrongText });
      }
    }

    items.push({
      id: `${subjectId}_test_${testMode}_${i + 1}`,
      lessonId: themeId || `${subjectId}_general`,
      questionNumber: i + 1,
      totalQuestions: count,
      prompt: template.prompt,
      svgDiagramType: template.svgDiagramType,
      options,
      correctOptionId: correctLetter,
      explanation: template.explanation
    });
  }

  return items;
}

/**
 * Expande a bateria de exercícios de uma lição garantindo até 60 questões consistentes
 */
export function expandTo60Questions(existingExercises: ExerciseItem[], lessonId: string, subjectId: string): ExerciseItem[] {
  const result: ExerciseItem[] = [...existingExercises];
  const targetTotal = 60;
  const currentCount = existingExercises.length;
  if (currentCount >= targetTotal) return result;

  const needed = targetTotal - currentCount;
  const letters = ['a', 'b', 'c', 'd'];

  for (let i = 0; i < needed; i++) {
    const qNum = currentCount + i + 1;
    const seed = i + 1;
    const template = generateDynamicDisciplineQuestion(subjectId, qNum, seed);
    const correctLetter = letters[(seed + qNum) % 4];

    const options = [];
    let wrongIdx = 0;
    for (const letter of letters) {
      if (letter === correctLetter) {
        options.push({ id: letter, text: template.correct });
      } else {
        options.push({ id: letter, text: template.wrongs[wrongIdx++] || `Alternativa de reforço ${letter.toUpperCase()}` });
      }
    }

    result.push({
      id: `${lessonId}_gen_${qNum}`,
      lessonId,
      questionNumber: qNum,
      totalQuestions: targetTotal,
      prompt: template.prompt,
      svgDiagramType: template.svgDiagramType,
      options,
      correctOptionId: correctLetter,
      explanation: template.explanation
    });
  }

  return result.map((ex, idx) => ({
    ...ex,
    questionNumber: idx + 1,
    totalQuestions: targetTotal
  }));
}
