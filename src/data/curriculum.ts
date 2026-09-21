import type { SubjectItem } from '../core/types';
import { buildSubject } from './curriculum-factory';
import {
  MATEMATICA_SEEDS,
  PORTUGUES_SEEDS,
  CIENCIAS_SEEDS,
  HISTORIA_SEEDS,
  GEOGRAFIA_SEEDS,
  FISICA_SEEDS,
  QUIMICA_SEEDS,
  BIOLOGIA_SEEDS,
  INGLES_SEEDS,
} from './curriculum-seeds';

const BASE_SUBJECTS_DATA: SubjectItem[] = [
  {
    "id": "matematica",
    "title": "Matemática",
    "color": "#00C48C",
    "icon": "📐",
    "imageSrc": "/assets/disciplina_matematica.png",
    "activeLessonsCount": "6/10",
    "themes": [
      {
        "id": "num_op",
        "number": 1,
        "title": "1. Números e operações (Soma, Subtração, Multiplicação e Divisão)",
        "description": "As 4 Operações Fundamentais: Adição, Subtração, Multiplicação e Divisão com propriedades, cálculo mental e resolução de problemas (10-12 anos)",
        "level": "basico",
        "ageGroup": "10-12 anos",
        "lessons": [
          {
            "id": "num_op_intro",
            "subjectId": "matematica",
            "themeNumber": 1,
            "title": "1. Números e Operações (Soma, Subtração, Multiplicação e Divisão)",
            "subtitle": "As Quatro Operações Básicas e Raciocínio Lógico",
            "summary": "Domine o cálculo mental e a resolução prática com Soma, Subtração, Multiplicação e Divisão.",
            "content": {
              "questionPrompt": "Como funcionam as quatro operações matemáticas fundamentais?",
              "description": "As quatro operações essenciais são os pilares de todo o cálculo: a Soma (Adição) junta ou acrescenta quantidades; a Subtração retira uma quantidade de outra ou calcula a diferença; a Multiplicação é o método rápido de somar parcelas iguais; e a Divisão reparte um número em partes rigorosamente iguais.",
              "numeratorExplanation": "Propriedades e Cálculos: Na Adição (ex: 24 + 16 = 40) e na Multiplicação (ex: 6 x 7 = 42), trocar a ordem não altera o resultado. Já na Subtração (ex: 50 - 18 = 32) e na Divisão (ex: 48 / 6 = 8), a ordem dos números altera completamente o resultado.",
              "denominatorExplanation": "Ordem de Prioridade (Precedência): Numa expressão com várias operações juntas (ex: 15 + 7 x 2), as multiplicações e divisões resolvem-se SEMPRE primeiro! Por isso: 7 x 2 = 14, e só depois somamos 15 + 14 = 29.",
              "exampleText": "Aplicação prática: Compras 3 livros a 8€ cada (3 x 8 = 24€). Se pagares com uma nota de 50€, o teu troco é por subtração: 50 - 24 = 26€. Se dividires esse troco com o teu irmão, cada um recebe por divisão: 26 / 2 = 13€!",
              "dailyLifeContext": "Contar dinheiro, calcular trocos no mercado, repartir tarefas, controlar tempo e receitas culinárias dependem das quatro operações todos os dias."
            },
            "level": "basico",
            "exercises": [
              {
                "id": "m1_1",
                "lessonId": "num_op_intro",
                "questionNumber": 1,
                "totalQuestions": 10,
                "prompt": "Se repartires 24 bombons igualmente por 6 amigos, quantos recebe cada um?",
                "options": [
                  {
                    "id": "a",
                    "text": "3 bombons"
                  },
                  {
                    "id": "b",
                    "text": "4 bombons"
                  },
                  {
                    "id": "c",
                    "text": "5 bombons"
                  },
                  {
                    "id": "d",
                    "text": "6 bombons"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "24 / 6 = 4 bombons."
              },
              {
                "id": "m1_2",
                "lessonId": "num_op_intro",
                "questionNumber": 2,
                "totalQuestions": 10,
                "prompt": "Qual o resultado de 15 + 7 x 2? (Atenção à ordem das operações!)",
                "options": [
                  {
                    "id": "a",
                    "text": "44"
                  },
                  {
                    "id": "b",
                    "text": "29"
                  },
                  {
                    "id": "c",
                    "text": "22"
                  },
                  {
                    "id": "d",
                    "text": "31"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Multiplica-se primeiro: 7 x 2 = 14. Depois: 15 + 14 = 29."
              },
              {
                "id": "m1_3",
                "lessonId": "num_op_intro",
                "questionNumber": 3,
                "totalQuestions": 10,
                "prompt": "Um agricultor colheu 140 laranjas e vendeu 65. Quantas laranjas sobraram?",
                "options": [
                  {
                    "id": "a",
                    "text": "65 laranjas"
                  },
                  {
                    "id": "b",
                    "text": "75 laranjas"
                  },
                  {
                    "id": "c",
                    "text": "85 laranjas"
                  },
                  {
                    "id": "d",
                    "text": "70 laranjas"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "140 - 65 = 75 laranjas restantes."
              },
              {
                "id": "m1_4",
                "lessonId": "num_op_intro",
                "questionNumber": 4,
                "totalQuestions": 10,
                "prompt": "Qual é o dobro de 125 somado com 50?",
                "options": [
                  {
                    "id": "a",
                    "text": "250"
                  },
                  {
                    "id": "b",
                    "text": "300"
                  },
                  {
                    "id": "c",
                    "text": "275"
                  },
                  {
                    "id": "d",
                    "text": "350"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Dobro de 125 = 250. 250 + 50 = 300."
              },
              {
                "id": "m1_5",
                "lessonId": "num_op_intro",
                "questionNumber": 5,
                "totalQuestions": 10,
                "prompt": "Qual o triplo de 15 subtraído de 10?",
                "options": [
                  {
                    "id": "a",
                    "text": "35"
                  },
                  {
                    "id": "b",
                    "text": "45"
                  },
                  {
                    "id": "c",
                    "text": "50"
                  },
                  {
                    "id": "d",
                    "text": "25"
                  }
                ],
                "correctOptionId": "a",
                "explanation": "Triplo de 15 = 45. 45 - 10 = 35."
              },
              {
                "id": "m1_6",
                "lessonId": "num_op_intro",
                "questionNumber": 6,
                "totalQuestions": 10,
                "prompt": "Se comprares 5 cadernos a 4 euros cada e pagares com uma nota de 50 euros, qual é o troco?",
                "options": [
                  {
                    "id": "a",
                    "text": "20 euros"
                  },
                  {
                    "id": "b",
                    "text": "30 euros"
                  },
                  {
                    "id": "c",
                    "text": "25 euros"
                  },
                  {
                    "id": "d",
                    "text": "35 euros"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "5 x 4 = 20 euros. Troco: 50 - 20 = 30 euros."
              },
              {
                "id": "m1_7",
                "lessonId": "num_op_intro",
                "questionNumber": 7,
                "totalQuestions": 10,
                "prompt": "Qual o valor de 100 dividido por 4 somado com 15?",
                "options": [
                  {
                    "id": "a",
                    "text": "35"
                  },
                  {
                    "id": "b",
                    "text": "40"
                  },
                  {
                    "id": "c",
                    "text": "25"
                  },
                  {
                    "id": "d",
                    "text": "45"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "100 / 4 = 25. 25 + 15 = 40."
              },
              {
                "id": "m1_8",
                "lessonId": "num_op_intro",
                "questionNumber": 8,
                "totalQuestions": 10,
                "prompt": "Quantas dezenas completas existem no número 480?",
                "options": [
                  {
                    "id": "a",
                    "text": "4"
                  },
                  {
                    "id": "b",
                    "text": "48"
                  },
                  {
                    "id": "c",
                    "text": "80"
                  },
                  {
                    "id": "d",
                    "text": "480"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "480 / 10 = 48 dezenas."
              },
              {
                "id": "m1_9",
                "lessonId": "num_op_intro",
                "questionNumber": 9,
                "totalQuestions": 10,
                "prompt": "Qual é o resultado de 9 x 8?",
                "options": [
                  {
                    "id": "a",
                    "text": "64"
                  },
                  {
                    "id": "b",
                    "text": "72"
                  },
                  {
                    "id": "c",
                    "text": "81"
                  },
                  {
                    "id": "d",
                    "text": "70"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Tabuada do 9: 9 x 8 = 72."
              },
              {
                "id": "m1_10",
                "lessonId": "num_op_intro",
                "questionNumber": 10,
                "totalQuestions": 10,
                "prompt": "Se um livro tem 180 páginas e lês 20 páginas por dia, em quantos dias terminarás?",
                "options": [
                  {
                    "id": "a",
                    "text": "8 dias"
                  },
                  {
                    "id": "b",
                    "text": "9 dias"
                  },
                  {
                    "id": "c",
                    "text": "10 dias"
                  },
                  {
                    "id": "d",
                    "text": "12 dias"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "180 / 20 = 9 dias."
              }
            ]
          }
        ]
      },
      {
        "id": "fracoes",
        "number": 2,
        "title": "2. Frações e Proporções",
        "description": "Partes do todo, frações equivalentes, numerador, denominador e proporções (11-14 anos)",
        "level": "intermediario",
        "ageGroup": "11-14 anos",
        "lessons": [
          {
            "id": "fracoes_intro",
            "subjectId": "matematica",
            "themeNumber": 2,
            "title": "2. Frações e Proporções",
            "subtitle": "Conceito, Numerador e Denominador",
            "summary": "Aprenda a visualizar partes e frações equivalentes.",
            "content": {
              "questionPrompt": "O que são frações e proporções?",
              "description": "Uma fração representa uma ou mais partes de um todo dividido em parcelas iguais. É a base das percentagens e razões.",
              "numeratorExplanation": "Numerador: o número de cima, que indica quantas partes consideramos.",
              "denominatorExplanation": "Denominador: o número de baixo, que indica o total de divisões iguais.",
              "exampleText": "Comer 2 fatias de uma pizza de 8 fatias é 2/8, o que equivale exatamente a 1/4 (25%).",
              "dailyLifeContext": "Descontos de lojas (50% = 1/2), medidas culinárias e baterias de smartphone funcionam em frações."
            },
            "level": "intermediario",
            "exercises": [
              {
                "id": "m2_1",
                "lessonId": "fracoes_intro",
                "questionNumber": 1,
                "totalQuestions": 10,
                "prompt": "Que fração representa uma parte pintada num círculo dividido em 4 partes iguais?",
                "options": [
                  {
                    "id": "a",
                    "text": "1/2"
                  },
                  {
                    "id": "b",
                    "text": "1/4"
                  },
                  {
                    "id": "c",
                    "text": "3/4"
                  },
                  {
                    "id": "d",
                    "text": "2/4"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "1 parte de 4 representa a fração 1/4.",
                "svgDiagramType": "fraction_circle",
                "svgData": {
                  "totalParts": 4,
                  "coloredParts": 1
                }
              },
              {
                "id": "m2_2",
                "lessonId": "fracoes_intro",
                "questionNumber": 2,
                "totalQuestions": 10,
                "prompt": "Qual o nome do termo inferior de uma fração?",
                "options": [
                  {
                    "id": "a",
                    "text": "Numerador"
                  },
                  {
                    "id": "b",
                    "text": "Denominador"
                  },
                  {
                    "id": "c",
                    "text": "Fator"
                  },
                  {
                    "id": "d",
                    "text": "Quociente"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "O Denominador indica em quantas partes o todo foi dividido."
              },
              {
                "id": "m2_3",
                "lessonId": "fracoes_intro",
                "questionNumber": 3,
                "totalQuestions": 10,
                "prompt": "Qual das frações abaixo é equivalente a 1/2?",
                "options": [
                  {
                    "id": "a",
                    "text": "2/4"
                  },
                  {
                    "id": "b",
                    "text": "1/3"
                  },
                  {
                    "id": "c",
                    "text": "3/5"
                  },
                  {
                    "id": "d",
                    "text": "2/6"
                  }
                ],
                "correctOptionId": "a",
                "explanation": "2/4 simplificado dividindo por 2 em cima e em baixo dá 1/2."
              },
              {
                "id": "m2_4",
                "lessonId": "fracoes_intro",
                "questionNumber": 4,
                "totalQuestions": 10,
                "prompt": "A quanto corresponde 50% de 200 reais?",
                "options": [
                  {
                    "id": "a",
                    "text": "50 reais"
                  },
                  {
                    "id": "b",
                    "text": "100 reais"
                  },
                  {
                    "id": "c",
                    "text": "150 reais"
                  },
                  {
                    "id": "d",
                    "text": "75 reais"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "50% é a metade (1/2). Metade de 200 é 100."
              },
              {
                "id": "m2_5",
                "lessonId": "fracoes_intro",
                "questionNumber": 5,
                "totalQuestions": 10,
                "prompt": "Quanto é 1/4 somado com 2/4?",
                "options": [
                  {
                    "id": "a",
                    "text": "3/8"
                  },
                  {
                    "id": "b",
                    "text": "3/4"
                  },
                  {
                    "id": "c",
                    "text": "1/2"
                  },
                  {
                    "id": "d",
                    "text": "2/8"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Com o mesmo denominador, somam-se os numeradores: 1 + 2 = 3. Logo, 3/4."
              },
              {
                "id": "m2_6",
                "lessonId": "fracoes_intro",
                "questionNumber": 6,
                "totalQuestions": 10,
                "prompt": "Qual é maior: 3/4 ou 1/4?",
                "options": [
                  {
                    "id": "a",
                    "text": "1/4"
                  },
                  {
                    "id": "b",
                    "text": "3/4"
                  },
                  {
                    "id": "c",
                    "text": "São iguais"
                  },
                  {
                    "id": "d",
                    "text": "Depende do dia"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "3 partes de 4 é nitidamente maior do que 1 parte de 4."
              },
              {
                "id": "m2_7",
                "lessonId": "fracoes_intro",
                "questionNumber": 7,
                "totalQuestions": 10,
                "prompt": "Se uma turma tem 30 alunos e 1/3 são rapazes, quantos rapazes há na turma?",
                "options": [
                  {
                    "id": "a",
                    "text": "5"
                  },
                  {
                    "id": "b",
                    "text": "10"
                  },
                  {
                    "id": "c",
                    "text": "15"
                  },
                  {
                    "id": "d",
                    "text": "20"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "30 dividido por 3 é igual a 10."
              },
              {
                "id": "m2_8",
                "lessonId": "fracoes_intro",
                "questionNumber": 8,
                "totalQuestions": 10,
                "prompt": "A fração 4/4 representa:",
                "options": [
                  {
                    "id": "a",
                    "text": "Zero"
                  },
                  {
                    "id": "b",
                    "text": "Um inteiro completo"
                  },
                  {
                    "id": "c",
                    "text": "Metade"
                  },
                  {
                    "id": "d",
                    "text": "Quatro inteiros"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "4 partes de 4 completam 1 inteiro."
              },
              {
                "id": "m2_9",
                "lessonId": "fracoes_intro",
                "questionNumber": 9,
                "totalQuestions": 10,
                "prompt": "A percentagem de 25% equivale à fração:",
                "options": [
                  {
                    "id": "a",
                    "text": "1/2"
                  },
                  {
                    "id": "b",
                    "text": "1/4"
                  },
                  {
                    "id": "c",
                    "text": "1/5"
                  },
                  {
                    "id": "d",
                    "text": "1/10"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "25/100 simplificado é exatamente 1/4."
              },
              {
                "id": "m2_10",
                "lessonId": "fracoes_intro",
                "questionNumber": 10,
                "totalQuestions": 10,
                "prompt": "Se comeres 3 fatias de um bolo de 6 fatias iguais, comeste:",
                "options": [
                  {
                    "id": "a",
                    "text": "1/3 do bolo"
                  },
                  {
                    "id": "b",
                    "text": "1/2 do bolo"
                  },
                  {
                    "id": "c",
                    "text": "2/3 do bolo"
                  },
                  {
                    "id": "d",
                    "text": "1/4 do bolo"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "3/6 simplificado é igual a 1/2 (metade do bolo)."
              }
            ]
          }
        ]
      },
      {
        "id": "decimais",
        "number": 3,
        "title": "3. Decimais e Percentagens",
        "description": "Números com vírgula, casas decimais, conversão de frações e cálculo de percentagens (11-14 anos)",
        "level": "intermediario",
        "ageGroup": "11-14 anos",
        "lessons": [
          {
            "id": "decimais_intro",
            "subjectId": "matematica",
            "themeNumber": 3,
            "title": "3. Números Decimais e Percentagens",
            "subtitle": "Décimos, Centésimos e Descontos",
            "summary": "Compreenda como funcionam os números decimais e aprenda a calcular percentagens de cabeça.",
            "content": {
              "questionPrompt": "Como funcionam os números decimais e as percentagens?",
              "description": "Um número decimal utiliza a vírgula para separar a parte inteira da parte fracionária menor que um (décimos, centésimos, milésimos). A percentagem (%) é simplesmente uma fração de base 100.",
              "numeratorExplanation": "Casas Decimais: Em 3,75 temos 3 unidades inteiras, 7 décimos e 5 centésimos. 50% equivale a 0,50 ou metade.",
              "denominatorExplanation": "Cálculo de Percentagem: Para achar 10% de 80, dividimos por 10 = 8. Para achar 20%, dobramos esse valor = 16.",
              "exampleText": "Se uma camisola de 40€ tem 25% de desconto, o desconto é um quarto do valor: 40 ÷ 4 = 10€. O preço final será 40 - 10 = 30€!",
              "dailyLifeContext": "Preços no supermercado, taxas bancárias, notas escolares e descontos de lojas usam números decimais e percentagens."
            },
            "level": "intermediario",
            "exercises": [
              {
                "id": "dec_1",
                "lessonId": "decimais_intro",
                "questionNumber": 1,
                "totalQuestions": 5,
                "prompt": "Quanto é 10% de 150 euros?",
                "options": [
                  { "id": "a", "text": "10 euros" },
                  { "id": "b", "text": "15 euros" },
                  { "id": "c", "text": "25 euros" },
                  { "id": "d", "text": "30 euros" }
                ],
                "correctOptionId": "b",
                "explanation": "10% de 150 = 150 ÷ 10 = 15 euros."
              },
              {
                "id": "dec_2",
                "lessonId": "decimais_intro",
                "questionNumber": 2,
                "totalQuestions": 5,
                "prompt": "Qual é a representação decimal da fração 1/4?",
                "options": [
                  { "id": "a", "text": "0,4" },
                  { "id": "b", "text": "0,25" },
                  { "id": "c", "text": "0,14" },
                  { "id": "d", "text": "0,5" }
                ],
                "correctOptionId": "b",
                "explanation": "1 dividido por 4 = 0,25 (ou 25%)."
              },
              {
                "id": "dec_3",
                "lessonId": "decimais_intro",
                "questionNumber": 3,
                "totalQuestions": 5,
                "prompt": "Qual é o resultado da soma 4,5 + 2,75?",
                "options": [
                  { "id": "a", "text": "7,25" },
                  { "id": "b", "text": "6,8" },
                  { "id": "c", "text": "7,15" },
                  { "id": "d", "text": "6,25" }
                ],
                "correctOptionId": "a",
                "explanation": "4,50 + 2,75 = 7,25."
              },
              {
                "id": "dec_4",
                "lessonId": "decimais_intro",
                "questionNumber": 4,
                "totalQuestions": 5,
                "prompt": "Se um produto custa 200€ e tem 15% de desconto, qual o valor do desconto?",
                "options": [
                  { "id": "a", "text": "15€" },
                  { "id": "b", "text": "20€" },
                  { "id": "c", "text": "30€" },
                  { "id": "d", "text": "35€" }
                ],
                "correctOptionId": "c",
                "explanation": "10% de 200 é 20, 5% é 10. Logo, 15% = 20 + 10 = 30€ de desconto."
              },
              {
                "id": "dec_5",
                "lessonId": "decimais_intro",
                "questionNumber": 5,
                "totalQuestions": 5,
                "prompt": "Que percentagem equivale à fração 1/2?",
                "options": [
                  { "id": "a", "text": "20%" },
                  { "id": "b", "text": "50%" },
                  { "id": "c", "text": "25%" },
                  { "id": "d", "text": "100%" }
                ],
                "correctOptionId": "b",
                "explanation": "1/2 é a metade de 100%, portanto 50%."
              }
            ]
          }
        ]
      },
      {
        "id": "geometria",
        "number": 4,
        "title": "4. Geometria (Formas, Ângulos e Áreas)",
        "description": "Polígonos, perímetro, área do quadrado, retângulo e triângulo, ângulos e simetria (11-14 anos)",
        "level": "intermediario",
        "ageGroup": "11-14 anos",
        "lessons": [
          {
            "id": "geo_intro",
            "subjectId": "matematica",
            "themeNumber": 4,
            "title": "4. Formas Geométricas, Perímetro e Área",
            "subtitle": "Polígonos e Espaço Visual",
            "summary": "Descubra como calcular o contorno (perímetro) e a superfície (área) das principais formas geométricas.",
            "content": {
              "questionPrompt": "Qual é a diferença entre perímetro e área?",
              "description": "O perímetro é a medida do contorno exterior de uma figura (soma de todos os lados). A área é a medida de toda a superfície plana ocupada no seu interior.",
              "numeratorExplanation": "Fórmulas de Área: Quadrado = Lado x Lado; Retângulo = Base x Altura; Triângulo = (Base x Altura) ÷ 2.",
              "denominatorExplanation": "Soma dos Ângulos Internos: Em qualquer triângulo do universo plano, a soma dos 3 ângulos internos é SEMPRE igual a 180 graus.",
              "exampleText": "Um quarto retangular de 5 metros de comprimento por 3 metros de largura tem perímetro 5+5+3+3 = 16 metros e área 5 x 3 = 15 metros quadrados (m²).",
              "dailyLifeContext": "Comprar piso para uma casa, cercar um jardim ou construir móveis exige saber calcular perímetros e áreas com exatidão."
            },
            "level": "intermediario",
            "exercises": [
              {
                "id": "geo_1",
                "lessonId": "geo_intro",
                "questionNumber": 1,
                "totalQuestions": 5,
                "prompt": "Qual é a área de um quadrado cujo lado mede 7 metros?",
                "options": [
                  { "id": "a", "text": "28 m²" },
                  { "id": "b", "text": "49 m²" },
                  { "id": "c", "text": "14 m²" },
                  { "id": "d", "text": "35 m²" }
                ],
                "correctOptionId": "b",
                "explanation": "Área do quadrado = lado × lado: 7 × 7 = 49 m²."
              },
              {
                "id": "geo_2",
                "lessonId": "geo_intro",
                "questionNumber": 2,
                "totalQuestions": 5,
                "prompt": "Um terreno retangular mede 12 metros de comprimento e 8 metros de largura. Qual é o seu perímetro?",
                "options": [
                  { "id": "a", "text": "96 metros" },
                  { "id": "b", "text": "40 metros" },
                  { "id": "c", "text": "20 metros" },
                  { "id": "d", "text": "48 metros" }
                ],
                "correctOptionId": "b",
                "explanation": "Perímetro = 12 + 12 + 8 + 8 = 40 metros."
              },
              {
                "id": "geo_3",
                "lessonId": "geo_intro",
                "questionNumber": 3,
                "totalQuestions": 5,
                "prompt": "Qual é a soma dos três ângulos internos de qualquer triângulo?",
                "options": [
                  { "id": "a", "text": "90°" },
                  { "id": "b", "text": "180°" },
                  { "id": "c", "text": "360°" },
                  { "id": "d", "text": "270°" }
                ],
                "correctOptionId": "b",
                "explanation": "A soma dos ângulos internos de um triângulo é sempre 180°."
              },
              {
                "id": "geo_4",
                "lessonId": "geo_intro",
                "questionNumber": 4,
                "totalQuestions": 5,
                "prompt": "Qual é a área de um triângulo com base de 10 cm e altura de 6 cm?",
                "options": [
                  { "id": "a", "text": "60 cm²" },
                  { "id": "b", "text": "30 cm²" },
                  { "id": "c", "text": "16 cm²" },
                  { "id": "d", "text": "45 cm²" }
                ],
                "correctOptionId": "b",
                "explanation": "Área do triângulo = (base × altura) ÷ 2 = (10 × 6) ÷ 2 = 60 ÷ 2 = 30 cm²."
              },
              {
                "id": "geo_5",
                "lessonId": "geo_intro",
                "questionNumber": 5,
                "totalQuestions": 5,
                "prompt": "Quantos lados possui um hexágono regular?",
                "options": [
                  { "id": "a", "text": "5 lados" },
                  { "id": "b", "text": "6 lados" },
                  { "id": "c", "text": "7 lados" },
                  { "id": "d", "text": "8 lados" }
                ],
                "correctOptionId": "b",
                "explanation": "Um hexágono possui exatamente 6 lados."
              }
            ]
          }
        ]
      },
      {
        "id": "medidas",
        "number": 5,
        "title": "5. Medidas e Grandezas (Comprimento, Massa e Volume)",
        "description": "Sistema métrico decimal: metros, quilogramas, litros, horas e conversão de unidades (10-13 anos)",
        "level": "basico",
        "ageGroup": "10-13 anos",
        "lessons": [
          {
            "id": "medidas_intro",
            "subjectId": "matematica",
            "themeNumber": 5,
            "title": "5. Medidas e Conversões do Dia a Dia",
            "subtitle": "Metros, Gramas, Litros e Minutos",
            "summary": "Aprenda a converter unidades de medida fundamentais com facilidade e rapidez.",
            "content": {
              "questionPrompt": "Como converter entre quilômetros, metros, gramas e litros?",
              "description": "O sistema métrico decimal baseia-se em potências de 10: 'quilo' significa mil (1000 vezes maior), e 'mili' significa a milésima parte (1000 vezes menor).",
              "numeratorExplanation": "Relações Básicas: 1 km = 1.000 m; 1 kg = 1.000 g; 1 litro = 1.000 ml; 1 hora = 60 minutos = 3.600 segundos.",
              "denominatorExplanation": "Conversão: Para passar de uma unidade maior para menor, multiplica-se (ex: 2,5 kg x 1000 = 2.500 g). Para passar de menor para maior, divide-se (ex: 500 ml ÷ 1000 = 0,5 litros).",
              "exampleText": "Se uma garrafa contém 1,5 litros de sumo e serve copos de 250 ml, temos 1.500 ÷ 250 = 6 copos cheios!",
              "dailyLifeContext": "Pesar alimentos na balança, medir altura, calcular tempo de viagem e comprar combustível usam grandezas e medidas constantemente."
            },
            "level": "basico",
            "exercises": [
              {
                "id": "med_1",
                "lessonId": "medidas_intro",
                "questionNumber": 1,
                "totalQuestions": 5,
                "prompt": "Quantos gramas existem em 3,5 quilogramas (kg)?",
                "options": [
                  { "id": "a", "text": "350 g" },
                  { "id": "b", "text": "3.500 g" },
                  { "id": "c", "text": "35.000 g" },
                  { "id": "d", "text": "35 g" }
                ],
                "correctOptionId": "b",
                "explanation": "1 kg = 1000 g, logo 3,5 × 1000 = 3.500 g."
              },
              {
                "id": "med_2",
                "lessonId": "medidas_intro",
                "questionNumber": 2,
                "totalQuestions": 5,
                "prompt": "Se um treino dura 90 minutos, a quantas horas isso corresponde?",
                "options": [
                  { "id": "a", "text": "1 hora" },
                  { "id": "b", "text": "1 hora e 30 minutos (1,5 h)" },
                  { "id": "c", "text": "2 horas" },
                  { "id": "d", "text": "1 hora e 15 minutos" }
                ],
                "correctOptionId": "b",
                "explanation": "60 minutos = 1 hora. 90 minutos = 60 + 30 minutos = 1h30min (1,5 h)."
              },
              {
                "id": "med_3",
                "lessonId": "medidas_intro",
                "questionNumber": 3,
                "totalQuestions": 5,
                "prompt": "Quantos mililitros (ml) há em 2 litros de leite?",
                "options": [
                  { "id": "a", "text": "200 ml" },
                  { "id": "b", "text": "2.000 ml" },
                  { "id": "c", "text": "20.000 ml" },
                  { "id": "d", "text": "20 ml" }
                ],
                "correctOptionId": "b",
                "explanation": "1 litro = 1000 ml. 2 litros = 2.000 ml."
              },
              {
                "id": "med_4",
                "lessonId": "medidas_intro",
                "questionNumber": 4,
                "totalQuestions": 5,
                "prompt": "Uma pista de corrida tem 400 metros. Quantas voltas completas são precisas para correr 2 km (2.000 m)?",
                "options": [
                  { "id": "a", "text": "4 voltas" },
                  { "id": "b", "text": "5 voltas" },
                  { "id": "c", "text": "6 voltas" },
                  { "id": "d", "text": "10 voltas" }
                ],
                "correctOptionId": "b",
                "explanation": "2 km = 2.000 metros. 2.000 ÷ 400 = 5 voltas completas."
              },
              {
                "id": "med_5",
                "lessonId": "medidas_intro",
                "questionNumber": 5,
                "totalQuestions": 5,
                "prompt": "Quantos centímetros (cm) equivalem a 1,8 metros?",
                "options": [
                  { "id": "a", "text": "18 cm" },
                  { "id": "b", "text": "180 cm" },
                  { "id": "c", "text": "1.800 cm" },
                  { "id": "d", "text": "0,18 cm" }
                ],
                "correctOptionId": "b",
                "explanation": "1 m = 100 cm. Logo 1,8 × 100 = 180 cm."
              }
            ]
          }
        ]
      },
      {
        "id": "algebra",
        "number": 6,
        "title": "6. Resolução de Problemas e Álgebra",
        "description": "Raciocínio lógico dedutivo, equações de 1.º e 2.º grau e resolução de problemas complexos (14-17 anos)",
        "level": "avancado",
        "ageGroup": "14-17 anos",
        "lessons": [
          {
            "id": "alg_intro",
            "subjectId": "matematica",
            "themeNumber": 3,
            "title": "Equações e Álgebra Moderna",
            "subtitle": "Descobrindo o valor de X",
            "summary": "Isole variáveis, resolva equações lineares e quadráticas.",
            "content": {
              "questionPrompt": "O que é uma equação algébrica?",
              "description": "Uma equação é uma igualdade matemática onde uma letra (como 'x' ou 'y') esconde um valor desconhecido. O objetivo é equilibrar a balança e isolar a incógnita.",
              "numeratorExplanation": "Regra de ouro: o que passa para o outro lado do sinal de igual muda de operação (soma vira subtração, multiplicação vira divisão).",
              "denominatorExplanation": "Fórmula Resolvente de Bhaskara: x = (-b ± √(b² - 4ac)) / (2a) para equações do 2.º grau.",
              "exampleText": "Se 2x + 4 = 10, temos 2x = 10 - 4 -> 2x = 6 -> x = 3.",
              "dailyLifeContext": "Programação de jogos, engenharia, economia e previsões meteorológicas funcionam com álgebra avançada."
            },
            "level": "avancado",
            "exercises": [
              {
                "id": "m3_1",
                "lessonId": "alg_intro",
                "questionNumber": 1,
                "totalQuestions": 10,
                "prompt": "Qual o valor de x na equação 2x + 6 = 14?",
                "options": [
                  {
                    "id": "a",
                    "text": "x = 3"
                  },
                  {
                    "id": "b",
                    "text": "x = 4"
                  },
                  {
                    "id": "c",
                    "text": "x = 5"
                  },
                  {
                    "id": "d",
                    "text": "x = 8"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "2x = 14 - 6 -> 2x = 8 -> x = 4."
              },
              {
                "id": "m3_2",
                "lessonId": "alg_intro",
                "questionNumber": 2,
                "totalQuestions": 10,
                "prompt": "Se 3x - 5 = 10, qual o valor de x?",
                "options": [
                  {
                    "id": "a",
                    "text": "x = 3"
                  },
                  {
                    "id": "b",
                    "text": "x = 5"
                  },
                  {
                    "id": "c",
                    "text": "x = 15"
                  },
                  {
                    "id": "d",
                    "text": "x = 2"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "3x = 10 + 5 -> 3x = 15 -> x = 5."
              },
              {
                "id": "m3_3",
                "lessonId": "alg_intro",
                "questionNumber": 3,
                "totalQuestions": 10,
                "prompt": "Qual o valor de x² = 49 para x positivo?",
                "options": [
                  {
                    "id": "a",
                    "text": "5"
                  },
                  {
                    "id": "b",
                    "text": "7"
                  },
                  {
                    "id": "c",
                    "text": "9"
                  },
                  {
                    "id": "d",
                    "text": "14"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "A raiz quadrada de 49 é 7, pois 7 x 7 = 49."
              },
              {
                "id": "m3_4",
                "lessonId": "alg_intro",
                "questionNumber": 4,
                "totalQuestions": 10,
                "prompt": "Na equação x/2 = 12, qual o valor de x?",
                "options": [
                  {
                    "id": "a",
                    "text": "6"
                  },
                  {
                    "id": "b",
                    "text": "24"
                  },
                  {
                    "id": "c",
                    "text": "14"
                  },
                  {
                    "id": "d",
                    "text": "10"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "x = 12 * 2 = 24."
              },
              {
                "id": "m3_5",
                "lessonId": "alg_intro",
                "questionNumber": 5,
                "totalQuestions": 10,
                "prompt": "Qual é o discriminante (Delta = b² - 4ac) da equação x² - 5x + 6 = 0?",
                "options": [
                  {
                    "id": "a",
                    "text": "Delta = 1"
                  },
                  {
                    "id": "b",
                    "text": "Delta = 4"
                  },
                  {
                    "id": "c",
                    "text": "Delta = 25"
                  },
                  {
                    "id": "d",
                    "text": "Delta = 0"
                  }
                ],
                "correctOptionId": "a",
                "explanation": "b² - 4ac = (-5)² - 4(1)(6) = 25 - 24 = 1."
              },
              {
                "id": "m3_6",
                "lessonId": "alg_intro",
                "questionNumber": 6,
                "totalQuestions": 10,
                "prompt": "Quais são as raízes da equação x² - 5x + 6 = 0?",
                "options": [
                  {
                    "id": "a",
                    "text": "1 e 6"
                  },
                  {
                    "id": "b",
                    "text": "2 e 3"
                  },
                  {
                    "id": "c",
                    "text": "-2 e -3"
                  },
                  {
                    "id": "d",
                    "text": "0 e 5"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "As raízes são x = (5 ± 1)/2 -> x = 3 e x = 2."
              },
              {
                "id": "m3_7",
                "lessonId": "alg_intro",
                "questionNumber": 7,
                "totalQuestions": 10,
                "prompt": "Se 4x + 8 = 0, qual o valor de x?",
                "options": [
                  {
                    "id": "a",
                    "text": "x = 2"
                  },
                  {
                    "id": "b",
                    "text": "x = -2"
                  },
                  {
                    "id": "c",
                    "text": "x = -4"
                  },
                  {
                    "id": "d",
                    "text": "x = 4"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "4x = -8 -> x = -8/4 = -2."
              },
              {
                "id": "m3_8",
                "lessonId": "alg_intro",
                "questionNumber": 8,
                "totalQuestions": 10,
                "prompt": "Qual é a expressão reduzida de 3x + 2y + 4x - y?",
                "options": [
                  {
                    "id": "a",
                    "text": "7x + y"
                  },
                  {
                    "id": "b",
                    "text": "7x - y"
                  },
                  {
                    "id": "c",
                    "text": "12x + y"
                  },
                  {
                    "id": "d",
                    "text": "7x + 3y"
                  }
                ],
                "correctOptionId": "a",
                "explanation": "Agrupando termos semelhantes: (3x + 4x) + (2y - y) = 7x + y."
              },
              {
                "id": "m3_9",
                "lessonId": "alg_intro",
                "questionNumber": 9,
                "totalQuestions": 10,
                "prompt": "O triplo de um número somado a 10 é igual a 40. Que número é esse?",
                "options": [
                  {
                    "id": "a",
                    "text": "8"
                  },
                  {
                    "id": "b",
                    "text": "10"
                  },
                  {
                    "id": "c",
                    "text": "15"
                  },
                  {
                    "id": "d",
                    "text": "12"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "3x + 10 = 40 -> 3x = 30 -> x = 10."
              },
              {
                "id": "m3_10",
                "lessonId": "alg_intro",
                "questionNumber": 10,
                "totalQuestions": 10,
                "prompt": "Se x = 3 e y = 4, qual o valor de x² + y²?",
                "options": [
                  {
                    "id": "a",
                    "text": "14"
                  },
                  {
                    "id": "b",
                    "text": "25"
                  },
                  {
                    "id": "c",
                    "text": "49"
                  },
                  {
                    "id": "d",
                    "text": "12"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "3² + 4² = 9 + 16 = 25 (o clássico triângulo retângulo!)."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "portugues",
    "title": "Português",
    "color": "#FF6B6B",
    "icon": "📖",
    "imageSrc": "/assets/disciplina_portugues.png",
    "activeLessonsCount": "4/8",
    "themes": [
      {
        "id": "gramatica_basica",
        "number": 1,
        "title": "Gramática e Ortografia Essencial",
        "description": "Substantivos, pontuação, acentuação e concordância (10-12 anos)",
        "level": "basico",
        "ageGroup": "10-12 anos",
        "lessons": [
          {
            "id": "pt_base",
            "subjectId": "portugues",
            "themeNumber": 1,
            "title": "Classes de Palavras e Acentuação",
            "subtitle": "Construção de Frases Claras",
            "summary": "Substantivos, adjetivos, verbos e regras ortográficas.",
            "content": {
              "questionPrompt": "O que constitui uma frase correta?",
              "description": "As frases organizam-se através da relação harmoniosa entre quem pratica a ação (sujeito) e o que acontece (verbo e predicado).",
              "numeratorExplanation": "Substantivo: dá nome aos seres e objetos.",
              "denominatorExplanation": "Adjetivo: atribui características, qualidades ou estados.",
              "exampleText": "Na frase 'Os alunos atentos compreenderam a lição', 'alunos' é substantivo, 'atentos' é adjetivo e 'compreenderam' é verbo.",
              "dailyLifeContext": "Escrever sem erros transmite credibilidade, respeito e permite expressar ideias com segurança."
            },
            "level": "basico",
            "exercises": [
              {
                "id": "p1_1",
                "lessonId": "pt_base",
                "questionNumber": 1,
                "totalQuestions": 10,
                "prompt": "Qual das seguintes palavras é um adjetivo na frase: 'O gato veloz fugiu pelo muro'?",
                "options": [
                  {
                    "id": "a",
                    "text": "gato"
                  },
                  {
                    "id": "b",
                    "text": "veloz"
                  },
                  {
                    "id": "c",
                    "text": "fugiu"
                  },
                  {
                    "id": "d",
                    "text": "muro"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "'Veloz' caracteriza o gato."
              },
              {
                "id": "p1_2",
                "lessonId": "pt_base",
                "questionNumber": 2,
                "totalQuestions": 10,
                "prompt": "Qual o plural correto da palavra 'cidadão'?",
                "options": [
                  {
                    "id": "a",
                    "text": "cidadões"
                  },
                  {
                    "id": "b",
                    "text": "cidadãos"
                  },
                  {
                    "id": "c",
                    "text": "cidadães"
                  },
                  {
                    "id": "d",
                    "text": "cidadãos-homens"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "O plural de cidadão é cidadãos."
              },
              {
                "id": "p1_3",
                "lessonId": "pt_base",
                "questionNumber": 3,
                "totalQuestions": 10,
                "prompt": "Identifique o verbo na frase: 'Nós estudamos com alegria todos os dias.'",
                "options": [
                  {
                    "id": "a",
                    "text": "Nós"
                  },
                  {
                    "id": "b",
                    "text": "estudamos"
                  },
                  {
                    "id": "c",
                    "text": "alegria"
                  },
                  {
                    "id": "d",
                    "text": "dias"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "'Estudamos' indica a ação executada."
              },
              {
                "id": "p1_4",
                "lessonId": "pt_base",
                "questionNumber": 4,
                "totalQuestions": 10,
                "prompt": "Qual das seguintes palavras é proparoxítona (acento na antepenúltima sílaba)?",
                "options": [
                  {
                    "id": "a",
                    "text": "café"
                  },
                  {
                    "id": "b",
                    "text": "lâmpada"
                  },
                  {
                    "id": "c",
                    "text": "coração"
                  },
                  {
                    "id": "d",
                    "text": "feliz"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Lâm-pa-da: toda proparoxítona é acentuada."
              },
              {
                "id": "p1_5",
                "lessonId": "pt_base",
                "questionNumber": 5,
                "totalQuestions": 10,
                "prompt": "Qual sinal de pontuação expressa surpresa, entusiasmo ou admiração?",
                "options": [
                  {
                    "id": "a",
                    "text": "Ponto final (.)"
                  },
                  {
                    "id": "b",
                    "text": "Ponto de exclamação (!)"
                  },
                  {
                    "id": "c",
                    "text": "Ponto de interrogação (?)"
                  },
                  {
                    "id": "d",
                    "text": "Reticências (...)"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "O ponto de exclamação expressa emoções vivas."
              },
              {
                "id": "p1_6",
                "lessonId": "pt_base",
                "questionNumber": 6,
                "totalQuestions": 10,
                "prompt": "Qual é o antónimo de 'corajoso'?",
                "options": [
                  {
                    "id": "a",
                    "text": "forte"
                  },
                  {
                    "id": "b",
                    "text": "medroso"
                  },
                  {
                    "id": "c",
                    "text": "valente"
                  },
                  {
                    "id": "d",
                    "text": "ousado"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Antónimo é o sentido oposto: corajoso x medroso."
              },
              {
                "id": "p1_7",
                "lessonId": "pt_base",
                "questionNumber": 7,
                "totalQuestions": 10,
                "prompt": "Em 'Eles viajaram ontem', o verbo 'viajaram' está em que tempo?",
                "options": [
                  {
                    "id": "a",
                    "text": "Presente"
                  },
                  {
                    "id": "b",
                    "text": "Pretérito (Passado)"
                  },
                  {
                    "id": "c",
                    "text": "Futuro"
                  },
                  {
                    "id": "d",
                    "text": "Infinitivo"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Ação já concluída: pretérito perfeito."
              },
              {
                "id": "p1_8",
                "lessonId": "pt_base",
                "questionNumber": 8,
                "totalQuestions": 10,
                "prompt": "Complete a frase: 'Havia _____ pessoas na biblioteca.'",
                "options": [
                  {
                    "id": "a",
                    "text": "bastantes"
                  },
                  {
                    "id": "b",
                    "text": "bastante"
                  },
                  {
                    "id": "c",
                    "text": "bastantíssima"
                  },
                  {
                    "id": "d",
                    "text": "nenhumas"
                  }
                ],
                "correctOptionId": "a",
                "explanation": "Bastantes funciona como pronome adjetivo equivalente a 'muitas'."
              },
              {
                "id": "p1_9",
                "lessonId": "pt_base",
                "questionNumber": 9,
                "totalQuestions": 10,
                "prompt": "Qual é o coletivo de 'peixes'?",
                "options": [
                  {
                    "id": "a",
                    "text": "Alcateia"
                  },
                  {
                    "id": "b",
                    "text": "Cardume"
                  },
                  {
                    "id": "c",
                    "text": "Enxame"
                  },
                  {
                    "id": "d",
                    "text": "Manada"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Cardume é o conjunto de peixes."
              },
              {
                "id": "p1_10",
                "lessonId": "pt_base",
                "questionNumber": 10,
                "totalQuestions": 10,
                "prompt": "Qual frase está pontuada corretamente?",
                "options": [
                  {
                    "id": "a",
                    "text": "Onde vais."
                  },
                  {
                    "id": "b",
                    "text": "Onde vais?"
                  },
                  {
                    "id": "c",
                    "text": "Onde vais!"
                  },
                  {
                    "id": "d",
                    "text": "Onde vais,"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Trata-se de uma pergunta direta, exige ponto de interrogação."
              }
            ]
          }
        ]
      },
      {
        "id": "sintaxe_redacao",
        "number": 2,
        "title": "Sintaxe, Figuras de Estilo e Redação",
        "description": "Orações coordenadas e subordinadas, metáfora, coesão e redação dissertativa (14-17 anos)",
        "level": "avancado",
        "ageGroup": "14-17 anos",
        "lessons": [
          {
            "id": "pt_adv",
            "subjectId": "portugues",
            "themeNumber": 2,
            "title": "Análise Sintática e Argumentação",
            "subtitle": "O Poder das Palavras e da Lógica Textual",
            "summary": "Domine a oração complexa, conectivos e argumentação sólida.",
            "content": {
              "questionPrompt": "Como construir um texto dissertativo nota 1000?",
              "description": "Um texto argumentativo exige introdução com tese clara, dois parágrafos de desenvolvimento com repertório e dados, e conclusão com proposta de solução.",
              "numeratorExplanation": "Coesão Textual: uso correto de conectivos como 'portanto', 'entretanto', 'ademais', 'visto que'.",
              "denominatorExplanation": "Figuras de Estilo: metáfora, metonímia, paradoxo e antítese enriquecem a expressividade.",
              "exampleText": "'A educação é a arma mais poderosa que podes usar para mudar o mundo' (Nelson Mandela) - excelente repertório sociocultural.",
              "dailyLifeContext": "Exames de acesso ao ensino superior (ENEM no Brasil, Exames Nacionais em Portugal) exigem domínio impecável de redação."
            },
            "level": "avancado",
            "exercises": [
              {
                "id": "p2_1",
                "lessonId": "pt_adv",
                "questionNumber": 1,
                "totalQuestions": 10,
                "prompt": "Na frase 'Estudou muito, contudo não obteve aprovação', a conjunção 'contudo' exprime:",
                "options": [
                  {
                    "id": "a",
                    "text": "Adição"
                  },
                  {
                    "id": "b",
                    "text": "Oposição / Adversidade"
                  },
                  {
                    "id": "c",
                    "text": "Conclusão"
                  },
                  {
                    "id": "d",
                    "text": "Tempo"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "'Contudo', 'porém', 'todavia' expressam oposição adversativa."
              },
              {
                "id": "p2_2",
                "lessonId": "pt_adv",
                "questionNumber": 2,
                "totalQuestions": 10,
                "prompt": "Qual figura de linguagem está presente em 'Seus olhos eram dois faróis na escuridão'?",
                "options": [
                  {
                    "id": "a",
                    "text": "Metáfora"
                  },
                  {
                    "id": "b",
                    "text": "Hipérbole"
                  },
                  {
                    "id": "c",
                    "text": "Eufemismo"
                  },
                  {
                    "id": "d",
                    "text": "Pleonasmo"
                  }
                ],
                "correctOptionId": "a",
                "explanation": "Comparação implícita sem conectivo comparativo: metáfora."
              },
              {
                "id": "p2_3",
                "lessonId": "pt_adv",
                "questionNumber": 3,
                "totalQuestions": 10,
                "prompt": "Qual frase apresenta um exemplo de hipérbole (exagero intencional)?",
                "options": [
                  {
                    "id": "a",
                    "text": "Ela é rápida como o vento."
                  },
                  {
                    "id": "b",
                    "text": "Já te disse isso um milhão de vezes!"
                  },
                  {
                    "id": "c",
                    "text": "O sol brilhava no horizonte."
                  },
                  {
                    "id": "d",
                    "text": "O mar beijava a praia."
                  }
                ],
                "correctOptionId": "b",
                "explanation": "'Um milhão de vezes' é um exagero expressivo figurado."
              },
              {
                "id": "p2_4",
                "lessonId": "pt_adv",
                "questionNumber": 4,
                "totalQuestions": 10,
                "prompt": "Em 'A cidade acordou cedo', temos que figura de linguagem?",
                "options": [
                  {
                    "id": "a",
                    "text": "Personificação / Prosopopeia"
                  },
                  {
                    "id": "b",
                    "text": "Metáfora"
                  },
                  {
                    "id": "c",
                    "text": "Antítese"
                  },
                  {
                    "id": "d",
                    "text": "Ironia"
                  }
                ],
                "correctOptionId": "a",
                "explanation": "Atribuição de uma ação humana ('acordar') a um ser inanimado ('cidade')."
              },
              {
                "id": "p2_5",
                "lessonId": "pt_adv",
                "questionNumber": 5,
                "totalQuestions": 10,
                "prompt": "Qual conectivo indica ideia de causa?",
                "options": [
                  {
                    "id": "a",
                    "text": "Visto que"
                  },
                  {
                    "id": "b",
                    "text": "Portanto"
                  },
                  {
                    "id": "c",
                    "text": "Apesar de"
                  },
                  {
                    "id": "d",
                    "text": "Logo"
                  }
                ],
                "correctOptionId": "a",
                "explanation": "'Visto que', 'já que' e 'porque' introduzem orações subordinadas causais."
              },
              {
                "id": "p2_6",
                "lessonId": "pt_adv",
                "questionNumber": 6,
                "totalQuestions": 10,
                "prompt": "Identifique o sujeito da frase: 'Chegaram ontem os novos computadores da escola.'",
                "options": [
                  {
                    "id": "a",
                    "text": "Ontem"
                  },
                  {
                    "id": "b",
                    "text": "Os novos computadores da escola"
                  },
                  {
                    "id": "c",
                    "text": "Escola"
                  },
                  {
                    "id": "d",
                    "text": "Sujeito oculto"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Pergunta-se ao verbo: 'O que chegou ontem?' Resposta: 'Os novos computadores da escola'."
              },
              {
                "id": "p2_7",
                "lessonId": "pt_adv",
                "questionNumber": 7,
                "totalQuestions": 10,
                "prompt": "Qual frase apresenta concordância verbal exemplar?",
                "options": [
                  {
                    "id": "a",
                    "text": "Fazem três anos que não o vejo."
                  },
                  {
                    "id": "b",
                    "text": "Faz três anos que não o vejo."
                  },
                  {
                    "id": "c",
                    "text": "Haviam muitos alunos na sala."
                  },
                  {
                    "id": "d",
                    "text": "Vende-se casas antigas."
                  }
                ],
                "correctOptionId": "b",
                "explanation": "O verbo fazer indicando tempo decorrido é impessoal: fica no singular ('Faz três anos')."
              },
              {
                "id": "p2_8",
                "lessonId": "pt_adv",
                "questionNumber": 8,
                "totalQuestions": 10,
                "prompt": "O que caracteriza a antítese?",
                "options": [
                  {
                    "id": "a",
                    "text": "Aproximação de termos de sentidos contrários"
                  },
                  {
                    "id": "b",
                    "text": "Repetição desnecessária de palavras"
                  },
                  {
                    "id": "c",
                    "text": "Suavização de uma notícia ruim"
                  },
                  {
                    "id": "d",
                    "text": "Comparação explícita com 'como'"
                  }
                ],
                "correctOptionId": "a",
                "explanation": "Ex: 'O riso e o pranto, o dia e a noite'."
              },
              {
                "id": "p2_9",
                "lessonId": "pt_adv",
                "questionNumber": 9,
                "totalQuestions": 10,
                "prompt": "Em um texto dissertativo, o parágrafo de introdução deve conter primordialmente:",
                "options": [
                  {
                    "id": "a",
                    "text": "Apenas uma piada ou história fictícia"
                  },
                  {
                    "id": "b",
                    "text": "A contextualização do tema e a tese do autor"
                  },
                  {
                    "id": "c",
                    "text": "A conclusão final do trabalho"
                  },
                  {
                    "id": "d",
                    "text": "Nenhum conectivo"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "A introdução contextualiza o problema e apresenta a tese central a defender."
              },
              {
                "id": "p2_10",
                "lessonId": "pt_adv",
                "questionNumber": 10,
                "totalQuestions": 10,
                "prompt": "Qual pronome relativo substitui corretamente 'o qual' com sentido de posse?",
                "options": [
                  {
                    "id": "a",
                    "text": "Cujo"
                  },
                  {
                    "id": "b",
                    "text": "Onde"
                  },
                  {
                    "id": "c",
                    "text": "Quem"
                  },
                  {
                    "id": "d",
                    "text": "Quanto"
                  }
                ],
                "correctOptionId": "a",
                "explanation": "'Cujo' exprime posse e concorda com o substantivo seguinte (ex: o autor cujos livros li)."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "ciencias",
    "title": "Ciências",
    "color": "#00C48C",
    "icon": "🧪",
    "imageSrc": "/assets/disciplina_ciencias.png",
    "activeLessonsCount": "4/6",
    "themes": [
      {
        "id": "biologia_eco",
        "number": 1,
        "title": "Ecossistemas e Biologia Celular",
        "description": "Células, fotossíntese, cadeias alimentares e biodiversidade (10-14 anos)",
        "level": "intermediario",
        "ageGroup": "10-14 anos",
        "lessons": [
          {
            "id": "cie_bio",
            "subjectId": "ciencias",
            "themeNumber": 1,
            "title": "A Vida em Nível Celular e Ecológico",
            "subtitle": "Da Célula à Biosfera",
            "summary": "Descubra como a energia solar se transforma em vida através da fotossíntese.",
            "content": {
              "questionPrompt": "Como a vida se sustenta no planeta Terra?",
              "description": "Todos os seres vivos são constituídos por células. A energia que move os animais provém originalmente do sol, capturada pelas plantas e algas através da fotossíntese.",
              "numeratorExplanation": "Célula: a menor unidade estrutural e funcional de vida. Possui membrana, citoplasma e material genético (DNA).",
              "denominatorExplanation": "Fotossíntese: Água + Gás Carbônico + Luz Solar -> Glicose + Oxigênio (O2).",
              "exampleText": "As florestas e os oceanos absorvem carbono e libertam o oxigénio vital para a nossa respiração.",
              "dailyLifeContext": "Compreender a ecologia é indispensável para combater as alterações climáticas e preservar os mananciais de água."
            },
            "level": "intermediario",
            "exercises": [
              {
                "id": "c1_1",
                "lessonId": "cie_bio",
                "questionNumber": 1,
                "totalQuestions": 10,
                "prompt": "Qual organelo celular é responsável pela produção de energia celular através da respiração?",
                "options": [
                  {
                    "id": "a",
                    "text": "Ribossoma"
                  },
                  {
                    "id": "b",
                    "text": "Mitocôndria"
                  },
                  {
                    "id": "c",
                    "text": "Complexo de Golgi"
                  },
                  {
                    "id": "d",
                    "text": "Lisossoma"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "As mitocôndrias são as usinas de energia (ATP) da célula."
              },
              {
                "id": "c1_2",
                "lessonId": "cie_bio",
                "questionNumber": 2,
                "totalQuestions": 10,
                "prompt": "Na fotossíntese, que gás as plantas absorvem do ambiente?",
                "options": [
                  {
                    "id": "a",
                    "text": "Oxigénio"
                  },
                  {
                    "id": "b",
                    "text": "Dióxido de Carbono (CO2)"
                  },
                  {
                    "id": "c",
                    "text": "Nitrogénio"
                  },
                  {
                    "id": "d",
                    "text": "Hélio"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "As plantas captam CO2 e libertam O2 para a atmosfera."
              },
              {
                "id": "c1_3",
                "lessonId": "cie_bio",
                "questionNumber": 3,
                "totalQuestions": 10,
                "prompt": "Qual é a base primária da maioria das teias alimentares marinhas?",
                "options": [
                  {
                    "id": "a",
                    "text": "Baleias"
                  },
                  {
                    "id": "b",
                    "text": "Fitoplâncton"
                  },
                  {
                    "id": "c",
                    "text": "Tubarões"
                  },
                  {
                    "id": "d",
                    "text": "Corais"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "O fitoplâncton é composto por microrganismos fotossintetizantes que sustentam a vida marinha."
              },
              {
                "id": "c1_4",
                "lessonId": "cie_bio",
                "questionNumber": 4,
                "totalQuestions": 10,
                "prompt": "Que estrutura protege a célula vegetal e lhe confere rigidez?",
                "options": [
                  {
                    "id": "a",
                    "text": "Membrana plasmática"
                  },
                  {
                    "id": "b",
                    "text": "Parede celular de celulose"
                  },
                  {
                    "id": "c",
                    "text": "Núcleo"
                  },
                  {
                    "id": "d",
                    "text": "Citoplasma"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "A parede celular celulósica dá rigidez às plantas."
              },
              {
                "id": "c1_5",
                "lessonId": "cie_bio",
                "questionNumber": 5,
                "totalQuestions": 10,
                "prompt": "Qual a principal molécula que armazena a informação genética dos seres vivos?",
                "options": [
                  {
                    "id": "a",
                    "text": "Glicose"
                  },
                  {
                    "id": "b",
                    "text": "DNA (Ácido Desoxirribonucleico)"
                  },
                  {
                    "id": "c",
                    "text": "Hemoglobina"
                  },
                  {
                    "id": "d",
                    "text": "Lípido"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "O DNA contém o código com todas as instruções genéticas."
              },
              {
                "id": "c1_6",
                "lessonId": "cie_bio",
                "questionNumber": 6,
                "totalQuestions": 10,
                "prompt": "Qual dos seguintes animais é um mamífero que põe ovos?",
                "options": [
                  {
                    "id": "a",
                    "text": "Ornitorrinco"
                  },
                  {
                    "id": "b",
                    "text": "Canguru"
                  },
                  {
                    "id": "c",
                    "text": "Morcego"
                  },
                  {
                    "id": "d",
                    "text": "Baleia"
                  }
                ],
                "correctOptionId": "a",
                "explanation": "O ornitorrinco e a équidna são monotremados, mamíferos ovíparos."
              },
              {
                "id": "c1_7",
                "lessonId": "cie_bio",
                "questionNumber": 7,
                "totalQuestions": 10,
                "prompt": "A união do espermatozoide com o óvulo chama-se:",
                "options": [
                  {
                    "id": "a",
                    "text": "Divisão celular"
                  },
                  {
                    "id": "b",
                    "text": "Fecundação"
                  },
                  {
                    "id": "c",
                    "text": "Respiração"
                  },
                  {
                    "id": "d",
                    "text": "Digestão"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "A fecundação forma a primeira célula do novo organismo: o zigoto."
              },
              {
                "id": "c1_8",
                "lessonId": "cie_bio",
                "questionNumber": 8,
                "totalQuestions": 10,
                "prompt": "O que são organismos decompositores?",
                "options": [
                  {
                    "id": "a",
                    "text": "Animais carnívoros predadores"
                  },
                  {
                    "id": "b",
                    "text": "Fungos e bactérias que degradam matéria morta"
                  },
                  {
                    "id": "c",
                    "text": "Plantas que comem insetos"
                  },
                  {
                    "id": "d",
                    "text": "Peixes herbívoros"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Fungos e bactérias reciclam nutrientes essenciais no solo."
              },
              {
                "id": "c1_9",
                "lessonId": "cie_bio",
                "questionNumber": 9,
                "totalQuestions": 10,
                "prompt": "Qual é o maior órgão do corpo humano?",
                "options": [
                  {
                    "id": "a",
                    "text": "Fígado"
                  },
                  {
                    "id": "b",
                    "text": "Pele"
                  },
                  {
                    "id": "c",
                    "text": "Coração"
                  },
                  {
                    "id": "d",
                    "text": "Cérebro"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "A pele é o maior órgão humano, atuando como barreira de proteção térmica e biológica."
              },
              {
                "id": "c1_10",
                "lessonId": "cie_bio",
                "questionNumber": 10,
                "totalQuestions": 10,
                "prompt": "Qual vitamina é sintetizada na nossa pele pela exposição adequada à luz solar?",
                "options": [
                  {
                    "id": "a",
                    "text": "Vitamina C"
                  },
                  {
                    "id": "b",
                    "text": "Vitamina D"
                  },
                  {
                    "id": "c",
                    "text": "Vitamina B12"
                  },
                  {
                    "id": "d",
                    "text": "Vitamina A"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "A luz solar ativa a síntese de vitamina D, fundamental para ossos e dentes fortes."
              }
            ]
          }
        ]
      },
      {
        "id": "fisica_quimica",
        "number": 2,
        "title": "Física e Química Avançada",
        "description": "Tabela periódica, ligações químicas, leis de Newton e energia (14-17 anos)",
        "level": "avancado",
        "ageGroup": "14-17 anos",
        "lessons": [
          {
            "id": "cie_fis_qui",
            "subjectId": "ciencias",
            "themeNumber": 2,
            "title": "Leis do Universo: Matéria e Movimento",
            "subtitle": "Átomos, Forças e Transformações de Energia",
            "summary": "Leis de Newton, velocidade, aceleração, reações químicas e conservação de energia.",
            "content": {
              "questionPrompt": "O que rege as forças físicas e a matéria?",
              "description": "Na natureza, nada se cria, nada se perde, tudo se transforma (Lei de Lavoisier). A física estuda as forças e energias; a química estuda a composição atômica da matéria.",
              "numeratorExplanation": "1.ª Lei de Newton (Inércia): um corpo em repouso permanece em repouso se nenhuma força externa atuar sobre ele.",
              "denominatorExplanation": "2.ª Lei de Newton: Força = Massa x Aceleração (F = m . a).",
              "exampleText": "Ao frear bruscamente um carro, o nosso corpo tende a continuar em movimento, razão pela qual o cinto de segurança é obrigatório.",
              "dailyLifeContext": "Smartphones, aviões, satélites GPS e medicamentos dependem da física quântica e termodinâmica."
            },
            "level": "avancado",
            "exercises": [
              {
                "id": "c2_1",
                "lessonId": "cie_fis_qui",
                "questionNumber": 1,
                "totalQuestions": 10,
                "prompt": "Qual partícula atómica possui carga elétrica negativa e gira ao redor do núcleo?",
                "options": [
                  {
                    "id": "a",
                    "text": "Próton"
                  },
                  {
                    "id": "b",
                    "text": "Elétron"
                  },
                  {
                    "id": "c",
                    "text": "Nêutron"
                  },
                  {
                    "id": "d",
                    "text": "Quark"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Os elétrons giram na eletrosfera com carga elétrica negativa (-1)."
              },
              {
                "id": "c2_2",
                "lessonId": "cie_fis_qui",
                "questionNumber": 2,
                "totalQuestions": 10,
                "prompt": "Qual é a velocidade média de um veículo que percorre 180 km em 2 horas?",
                "options": [
                  {
                    "id": "a",
                    "text": "80 km/h"
                  },
                  {
                    "id": "b",
                    "text": "90 km/h"
                  },
                  {
                    "id": "c",
                    "text": "100 km/h"
                  },
                  {
                    "id": "d",
                    "text": "120 km/h"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Velocidade = Distância / Tempo = 180 / 2 = 90 km/h."
              },
              {
                "id": "c2_3",
                "lessonId": "cie_fis_qui",
                "questionNumber": 3,
                "totalQuestions": 10,
                "prompt": "Qual elemento químico possui o símbolo 'O' e número atômico 8?",
                "options": [
                  {
                    "id": "a",
                    "text": "Ouro"
                  },
                  {
                    "id": "b",
                    "text": "Oxigénio"
                  },
                  {
                    "id": "c",
                    "text": "Ósmio"
                  },
                  {
                    "id": "d",
                    "text": "Olho"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "'O' representa o oxigénio fundamental à vida aeróbica."
              },
              {
                "id": "c2_4",
                "lessonId": "cie_fis_qui",
                "questionNumber": 4,
                "totalQuestions": 10,
                "prompt": "A que temperatura, ao nível do mar, a água ferve (passa para estado de vapor)?",
                "options": [
                  {
                    "id": "a",
                    "text": "50 ºC"
                  },
                  {
                    "id": "b",
                    "text": "100 ºC"
                  },
                  {
                    "id": "c",
                    "text": "0 ºC"
                  },
                  {
                    "id": "d",
                    "text": "200 ºC"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Ponto de ebulição da água a 1 atm: exatamente 100 ºC."
              },
              {
                "id": "c2_5",
                "lessonId": "cie_fis_qui",
                "questionNumber": 5,
                "totalQuestions": 10,
                "prompt": "Se uma força resultante de 20 Newtons é aplicada a um bloco de 4 kg, qual a aceleração?",
                "options": [
                  {
                    "id": "a",
                    "text": "2 m/s²"
                  },
                  {
                    "id": "b",
                    "text": "5 m/s²"
                  },
                  {
                    "id": "c",
                    "text": "10 m/s²"
                  },
                  {
                    "id": "d",
                    "text": "80 m/s²"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "F = m . a -> a = F / m = 20 / 4 = 5 m/s²."
              },
              {
                "id": "c2_6",
                "lessonId": "cie_fis_qui",
                "questionNumber": 6,
                "totalQuestions": 10,
                "prompt": "Qual o pH neutro a 25 ºC (como o da água pura)?",
                "options": [
                  {
                    "id": "a",
                    "text": "pH 0"
                  },
                  {
                    "id": "b",
                    "text": "pH 7"
                  },
                  {
                    "id": "c",
                    "text": "pH 14"
                  },
                  {
                    "id": "d",
                    "text": "pH 5"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "pH 7 é neutro. Abaixo de 7 é ácido, acima de 7 é básico/alcalino."
              },
              {
                "id": "c2_7",
                "lessonId": "cie_fis_qui",
                "questionNumber": 7,
                "totalQuestions": 10,
                "prompt": "Qual forma de transmissão de calor ocorre no vácuo do espaço (como o calor do Sol até à Terra)?",
                "options": [
                  {
                    "id": "a",
                    "text": "Condução"
                  },
                  {
                    "id": "b",
                    "text": "Convecção"
                  },
                  {
                    "id": "c",
                    "text": "Radiação eletromagnética"
                  },
                  {
                    "id": "d",
                    "text": "Atrito"
                  }
                ],
                "correctOptionId": "c",
                "explanation": "A radiação térmica (ondas eletromagnéticas) não necessita de meio material."
              },
              {
                "id": "c2_8",
                "lessonId": "cie_fis_qui",
                "questionNumber": 8,
                "totalQuestions": 10,
                "prompt": "Qual é a fórmula molecular do gás carbónico?",
                "options": [
                  {
                    "id": "a",
                    "text": "CO"
                  },
                  {
                    "id": "b",
                    "text": "CO2"
                  },
                  {
                    "id": "c",
                    "text": "H2O"
                  },
                  {
                    "id": "d",
                    "text": "CH4"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Um átomo de carbono ligado a dois átomos de oxigénio: CO2."
              },
              {
                "id": "c2_9",
                "lessonId": "cie_fis_qui",
                "questionNumber": 9,
                "totalQuestions": 10,
                "prompt": "Segundo a 3.ª Lei de Newton, para toda ação há uma reação:",
                "options": [
                  {
                    "id": "a",
                    "text": "De menor intensidade em sentido contrário"
                  },
                  {
                    "id": "b",
                    "text": "De igual intensidade e mesma direção, mas sentido oposto"
                  },
                  {
                    "id": "c",
                    "text": "Nula"
                  },
                  {
                    "id": "d",
                    "text": "Que anula a primeira sem efeitos"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Ação e reação têm mesmo módulo, mesma direção e sentidos opostos."
              },
              {
                "id": "c2_10",
                "lessonId": "cie_fis_qui",
                "questionNumber": 10,
                "totalQuestions": 10,
                "prompt": "Qual a velocidade aproximada da luz no vácuo?",
                "options": [
                  {
                    "id": "a",
                    "text": "300.000 km/s"
                  },
                  {
                    "id": "b",
                    "text": "1.000 km/h"
                  },
                  {
                    "id": "c",
                    "text": "3.000 km/s"
                  },
                  {
                    "id": "d",
                    "text": "30.000 km/s"
                  }
                ],
                "correctOptionId": "a",
                "explanation": "A velocidade da luz é cerca de 300.000 km por segundo."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "historia",
    "title": "História",
    "color": "#F59E0B",
    "icon": "🏛️",
    "imageSrc": "/assets/disciplina_historia.png",
    "activeLessonsCount": "3/5",
    "themes": [
      {
        "id": "antiguidade_media",
        "number": 1,
        "title": "Civilizações e Idade Média",
        "description": "Mesopotâmia, Grécia Antiga, Roma e Feudalismo (10-13 anos)",
        "level": "basico",
        "ageGroup": "10-13 anos",
        "lessons": [
          {
            "id": "hist_antiga",
            "subjectId": "historia",
            "themeNumber": 1,
            "title": "O Berço da Civilização e Cidadania",
            "subtitle": "Das Margens do Nilo à Democracia de Atenas",
            "summary": "Escrita cuneiforme, pirâmides e a criação da cidadania.",
            "content": {
              "questionPrompt": "Como surgiram as primeiras cidades e leis?",
              "description": "Entre os rios Tigre e Eufrates e às margens do Rio Nilo, a agricultura irrigada gerou os primeiros centros urbanos. Na Grécia, nasceu a filosofia e a democracia.",
              "numeratorExplanation": "Código de Hamurabi: um dos primeiros conjuntos de leis escritas da história.",
              "denominatorExplanation": "Atenas e a Democracia: cidadãos reuniam-se na praça pública (Ágora) para debater os rumos da cidade.",
              "exampleText": "As Olimpíadas modernas têm origem nos jogos atléticos celebrados em honra a Zeus na Grécia Antiga.",
              "dailyLifeContext": "Leis escritas, tribunais e votações populares que temos hoje nasceram dessas sociedades antigas."
            },
            "level": "basico",
            "exercises": [
              {
                "id": "h1_1",
                "lessonId": "hist_antiga",
                "questionNumber": 1,
                "totalQuestions": 10,
                "prompt": "Qual civilização antiga construiu as famosas Pirâmides de Gizé?",
                "options": [
                  {
                    "id": "a",
                    "text": "Egípcia"
                  },
                  {
                    "id": "b",
                    "text": "Romana"
                  },
                  {
                    "id": "c",
                    "text": "Viking"
                  },
                  {
                    "id": "d",
                    "text": "Chinesa"
                  }
                ],
                "correctOptionId": "a",
                "explanation": "Os antigos egípcios ergueram as pirâmides como monumentos funerários reais."
              },
              {
                "id": "h1_2",
                "lessonId": "hist_antiga",
                "questionNumber": 2,
                "totalQuestions": 10,
                "prompt": "Em qual cidade grega nasceu a democracia direta?",
                "options": [
                  {
                    "id": "a",
                    "text": "Esparta"
                  },
                  {
                    "id": "b",
                    "text": "Atenas"
                  },
                  {
                    "id": "c",
                    "text": "Corinto"
                  },
                  {
                    "id": "d",
                    "text": "Tebas"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Atenas é considerada o berço histórico da democracia."
              },
              {
                "id": "h1_3",
                "lessonId": "hist_antiga",
                "questionNumber": 3,
                "totalQuestions": 10,
                "prompt": "Que rio africano foi essencial para a agricultura do Antigo Egito?",
                "options": [
                  {
                    "id": "a",
                    "text": "Rio Amazonas"
                  },
                  {
                    "id": "b",
                    "text": "Rio Nilo"
                  },
                  {
                    "id": "c",
                    "text": "Rio Danúbio"
                  },
                  {
                    "id": "d",
                    "text": "Rio Sena"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Heródoto dizia: 'O Egito é uma dádiva do Nilo'."
              },
              {
                "id": "h1_4",
                "lessonId": "hist_antiga",
                "questionNumber": 4,
                "totalQuestions": 10,
                "prompt": "Qual língua falada pelos romanos deu origem ao português, espanhol, francês e italiano?",
                "options": [
                  {
                    "id": "a",
                    "text": "Latim"
                  },
                  {
                    "id": "b",
                    "text": "Grego"
                  },
                  {
                    "id": "c",
                    "text": "Aramaico"
                  },
                  {
                    "id": "d",
                    "text": "Árabe"
                  }
                ],
                "correctOptionId": "a",
                "explanation": "O latim vulgar falado pelas legiões originou as línguas neolatinas."
              },
              {
                "id": "h1_5",
                "lessonId": "hist_antiga",
                "questionNumber": 5,
                "totalQuestions": 10,
                "prompt": "Qual era o principal objetivo das rotas comerciais medievais pelas Índias?",
                "options": [
                  {
                    "id": "a",
                    "text": "Buscar ouro e prata"
                  },
                  {
                    "id": "b",
                    "text": "Comprar especiarias como pimenta e canela"
                  },
                  {
                    "id": "c",
                    "text": "Capturar cavalos"
                  },
                  {
                    "id": "d",
                    "text": "Exportar trigo"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "As especiarias conservavam carnes e tinham enorme valor na Europa."
              },
              {
                "id": "h1_6",
                "lessonId": "hist_antiga",
                "questionNumber": 6,
                "totalQuestions": 10,
                "prompt": "Quem foi o filósofo grego mestre de Platão que dizia 'Só sei que nada sei'?",
                "options": [
                  {
                    "id": "a",
                    "text": "Sócrates"
                  },
                  {
                    "id": "b",
                    "text": "Aristóteles"
                  },
                  {
                    "id": "c",
                    "text": "Pitágoras"
                  },
                  {
                    "id": "d",
                    "text": "Homero"
                  }
                ],
                "correctOptionId": "a",
                "explanation": "Sócrates inaugurou o método de questionamento e reflexão ética."
              },
              {
                "id": "h1_7",
                "lessonId": "hist_antiga",
                "questionNumber": 7,
                "totalQuestions": 10,
                "prompt": "Qual sistema político e social caracterizou a Europa durante a Idade Média?",
                "options": [
                  {
                    "id": "a",
                    "text": "Capitalismo financeiro"
                  },
                  {
                    "id": "b",
                    "text": "Feudalismo"
                  },
                  {
                    "id": "c",
                    "text": "Democracia representativa"
                  },
                  {
                    "id": "d",
                    "text": "Socialismo"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "O feudalismo baseava-se em relações de suserania, vassalagem e terra."
              },
              {
                "id": "h1_8",
                "lessonId": "hist_antiga",
                "questionNumber": 8,
                "totalQuestions": 10,
                "prompt": "O Coliseu é um dos monumentos mais famosos de que antiga cidade?",
                "options": [
                  {
                    "id": "a",
                    "text": "Alexandria"
                  },
                  {
                    "id": "b",
                    "text": "Roma"
                  },
                  {
                    "id": "c",
                    "text": "Atenas"
                  },
                  {
                    "id": "d",
                    "text": "Babilónia"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "O Coliseu romano era o grande anfiteatro das festas imperiais."
              },
              {
                "id": "h1_9",
                "lessonId": "hist_antiga",
                "questionNumber": 9,
                "totalQuestions": 10,
                "prompt": "Qual invenção de Johannes Gutenberg no século XV revolucionou o acesso aos livros?",
                "options": [
                  {
                    "id": "a",
                    "text": "O papel vegetal"
                  },
                  {
                    "id": "b",
                    "text": "A prensa de tipos móveis"
                  },
                  {
                    "id": "c",
                    "text": "A caneta esferográfica"
                  },
                  {
                    "id": "d",
                    "text": "A máquina de escrever"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "A imprensa de Gutenberg permitiu imprimir livros em massa."
              },
              {
                "id": "h1_10",
                "lessonId": "hist_antiga",
                "questionNumber": 10,
                "totalQuestions": 10,
                "prompt": "Qual civilização americana construiu a cidade sagrada de Machu Picchu?",
                "options": [
                  {
                    "id": "a",
                    "text": "Astecas"
                  },
                  {
                    "id": "b",
                    "text": "Incas"
                  },
                  {
                    "id": "c",
                    "text": "Maias"
                  },
                  {
                    "id": "d",
                    "text": "Tupis"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Os Incas ergueram Machu Picchu nos cumes dos Andes peruanos."
              }
            ]
          }
        ]
      },
      {
        "id": "mundo_contemporaneo",
        "number": 2,
        "title": "Idade Moderna e Contemporânea",
        "description": "Revolução Francesa, Revolução Industrial, Guerras Mundiais e Direitos Humanos (14-17 anos)",
        "level": "avancado",
        "ageGroup": "14-17 anos",
        "lessons": [
          {
            "id": "hist_mod",
            "subjectId": "historia",
            "themeNumber": 2,
            "title": "Revoluções que Moldaram o Mundo Atual",
            "subtitle": "Liberdade, Tecnologia e Direitos Humanos",
            "summary": "O Iluminismo, a fábrica a vapor, as guerras mundiais e a Carta da ONU.",
            "content": {
              "questionPrompt": "Como surgiram os Direitos Humanos e as democracias modernas?",
              "description": "A Revolução Francesa (1789) consagrou os ideais de Liberdade, Igualdade e Fraternidade. A Revolução Industrial transformou o trabalho com as máquinas a vapor e eletricidade.",
              "numeratorExplanation": "Iluminismo: movimento intelectual que defendeu a razão contra o absolutismo.",
              "denominatorExplanation": "Declaração Universal dos Direitos Humanos (1948): aprovada pela ONU após a Segunda Guerra Mundial para proteger a dignidade humana.",
              "exampleText": "O direito ao voto universal, férias remuneradas e educação pública gratuita são conquistas dessas revoluções.",
              "dailyLifeContext": "Conhecer as lutas do passado impede o regresso de regimes autoritários e protege as liberdades civis."
            },
            "level": "avancado",
            "exercises": [
              {
                "id": "h2_1",
                "lessonId": "hist_mod",
                "questionNumber": 1,
                "totalQuestions": 10,
                "prompt": "Qual foi o lema fundamental da Revolução Francesa de 1789?",
                "options": [
                  {
                    "id": "a",
                    "text": "Paz, Terra e Pão"
                  },
                  {
                    "id": "b",
                    "text": "Liberdade, Igualdade e Fraternidade"
                  },
                  {
                    "id": "c",
                    "text": "Ordem e Progresso"
                  },
                  {
                    "id": "d",
                    "text": "Deus, Pátria e Família"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Liberté, Égalité, Fraternité tornou-se a base dos direitos humanos."
              },
              {
                "id": "h2_2",
                "lessonId": "hist_mod",
                "questionNumber": 2,
                "totalQuestions": 10,
                "prompt": "Onde teve início a Primeira Revolução Industrial no século XVIII?",
                "options": [
                  {
                    "id": "a",
                    "text": "França"
                  },
                  {
                    "id": "b",
                    "text": "Inglaterra"
                  },
                  {
                    "id": "c",
                    "text": "Alemanha"
                  },
                  {
                    "id": "d",
                    "text": "Estados Unidos"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "A Inglaterra liderou o processo fabril com carvão mineral e tear mecânico."
              },
              {
                "id": "h2_3",
                "lessonId": "hist_mod",
                "questionNumber": 3,
                "totalQuestions": 10,
                "prompt": "Em que ano terminou a Segunda Guerra Mundial?",
                "options": [
                  {
                    "id": "a",
                    "text": "1918"
                  },
                  {
                    "id": "b",
                    "text": "1945"
                  },
                  {
                    "id": "c",
                    "text": "1939"
                  },
                  {
                    "id": "d",
                    "text": "1960"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "A Segunda Guerra encerrou-se em 1945 com a capitulação dos países do Eixo."
              },
              {
                "id": "h2_4",
                "lessonId": "hist_mod",
                "questionNumber": 4,
                "totalQuestions": 10,
                "prompt": "Qual organização internacional foi criada em 1945 para promover a paz e os direitos globais?",
                "options": [
                  {
                    "id": "a",
                    "text": "Liga das Nações"
                  },
                  {
                    "id": "b",
                    "text": "ONU (Organização das Nações Unidas)"
                  },
                  {
                    "id": "c",
                    "text": "OTAN"
                  },
                  {
                    "id": "d",
                    "text": "União Europeia"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "A ONU foi fundada em 1945 para evitar novos conflitos globais."
              },
              {
                "id": "h2_5",
                "lessonId": "hist_mod",
                "questionNumber": 5,
                "totalQuestions": 10,
                "prompt": "Quem liderou o movimento de independência pacífico da Índia através da não-violência?",
                "options": [
                  {
                    "id": "a",
                    "text": "Nelson Mandela"
                  },
                  {
                    "id": "b",
                    "text": "Mahatma Gandhi"
                  },
                  {
                    "id": "c",
                    "text": "Martin Luther King"
                  },
                  {
                    "id": "d",
                    "text": "Winston Churchill"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Gandhi usou a resistência pacífica (Satyagraha) e desobediência civil."
              },
              {
                "id": "h2_6",
                "lessonId": "hist_mod",
                "questionNumber": 6,
                "totalQuestions": 10,
                "prompt": "O que representou a queda do Muro de Berlim em 1989?",
                "options": [
                  {
                    "id": "a",
                    "text": "O início da 1.ª Guerra Mundial"
                  },
                  {
                    "id": "b",
                    "text": "O fim simbólico da Guerra Fria e reunificação alemã"
                  },
                  {
                    "id": "c",
                    "text": "A criação da União Soviética"
                  },
                  {
                    "id": "d",
                    "text": "A descoberta da energia nuclear"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "A queda do muro marcou o colapso dos blocos antagônicos da Guerra Fria."
              },
              {
                "id": "h2_7",
                "lessonId": "hist_mod",
                "questionNumber": 7,
                "totalQuestions": 10,
                "prompt": "Qual tratado oficial encerrou a Primeira Guerra Mundial em 1919?",
                "options": [
                  {
                    "id": "a",
                    "text": "Tratado de Versalhes"
                  },
                  {
                    "id": "b",
                    "text": "Tratado de Tordesilhas"
                  },
                  {
                    "id": "c",
                    "text": "Pacto de Varsóvia"
                  },
                  {
                    "id": "d",
                    "text": "Tratado de Roma"
                  }
                ],
                "correctOptionId": "a",
                "explanation": "O Tratado de Versalhes impôs pesadas reparações à Alemanha."
              },
              {
                "id": "h2_8",
                "lessonId": "hist_mod",
                "questionNumber": 8,
                "totalQuestions": 10,
                "prompt": "Quem foi o líder sul-africano que passou 27 anos preso e venceu o regime do Apartheid?",
                "options": [
                  {
                    "id": "a",
                    "text": "Kofi Annan"
                  },
                  {
                    "id": "b",
                    "text": "Nelson Mandela"
                  },
                  {
                    "id": "c",
                    "text": "Desmond Tutu"
                  },
                  {
                    "id": "d",
                    "text": "Thomas Sankara"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Mandela tornou-se o primeiro presidente negro da África do Sul e Nobel da Paz."
              },
              {
                "id": "h2_9",
                "lessonId": "hist_mod",
                "questionNumber": 9,
                "totalQuestions": 10,
                "prompt": "A independência do Brasil foi proclamada em qual data histórica?",
                "options": [
                  {
                    "id": "a",
                    "text": "22 de Abril de 1500"
                  },
                  {
                    "id": "b",
                    "text": "7 de Setembro de 1822"
                  },
                  {
                    "id": "c",
                    "text": "15 de Novembro de 1889"
                  },
                  {
                    "id": "d",
                    "text": "1 de Dezembro de 1640"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "D. Pedro I proclamou a independência às margens do Ipiranga em 1822."
              },
              {
                "id": "h2_10",
                "lessonId": "hist_mod",
                "questionNumber": 10,
                "totalQuestions": 10,
                "prompt": "A restauração da independência de Portugal após a União Ibérica deu-se em:",
                "options": [
                  {
                    "id": "a",
                    "text": "1500"
                  },
                  {
                    "id": "b",
                    "text": "1640"
                  },
                  {
                    "id": "c",
                    "text": "1755"
                  },
                  {
                    "id": "d",
                    "text": "1910"
                  }
                ],
                "correctOptionId": "b",
                "explanation": "Em 1 de Dezembro de 1640, Portugal restaurou a soberania com D. João IV."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "geografia",
    "title": "Geografia",
    "color": "#0EA5E9",
    "icon": "🌍",
    "imageSrc": "/assets/disciplina_geografia.png",
    "activeLessonsCount": "4/8",
    "themes": [
      {
        "id": "geo_cartografia_clima",
        "number": 1,
        "title": "Cartografia, Climas e Relevo",
        "description": "Coordenadas geográficas, fusos horários, zonas climáticas e bacias hidrográficas (10-14 anos)",
        "level": "basico",
        "ageGroup": "10-14 anos",
        "lessons": [
          {
            "id": "geo_intro",
            "subjectId": "geografia",
            "themeNumber": 1,
            "title": "A Terra, Linhas Imaginárias e Clima",
            "subtitle": "Paralelos, Meridianos e Paisagens Naturais",
            "summary": "Descubra como a inclinação da Terra gera as estações do ano e os grandes biomas.",
            "content": {
              "questionPrompt": "Como nos orientamos no planeta Terra?",
              "description": "A linha do Equador divide o globo nos hemisférios Norte e Sul, enquanto o Meridiano de Greenwich divide em Leste e Oeste. Essa rede de coordenadas permite localizar qualquer ponto do planeta com precisão.",
              "numeratorExplanation": "Latitude e Longitude: a latitude mede a distância do Equador (-90° a +90°) e define as zonas térmicas; a longitude mede a distância de Greenwich (-180° a +180°) e define os fusos horários.",
              "denominatorExplanation": "Zonas Térmicas: Zona Intertropical (mais quente), Zonas Temperadas (estações bem definidas) e Zonas Polares (frio extremo).",
              "exampleText": "Ao meio-dia solar em Londres (Greenwich 0°), em Brasília (45° Oeste) são 9h da manhã devido à rotação da Terra.",
              "dailyLifeContext": "Os sistemas de navegação GPS em telemóveis e aviões utilizam exatamente coordenadas geográficas para traçar rotas."
            },
            "level": "basico",
            "exercises": [
              {
                "id": "geo_1",
                "lessonId": "geo_intro",
                "questionNumber": 1,
                "totalQuestions": 5,
                "prompt": "Qual é a linha imaginária principal que divide a Terra nos hemisférios Norte e Sul?",
                "options": [
                  { "id": "a", "text": "Meridiano de Greenwich" },
                  { "id": "b", "text": "Linha do Equador" },
                  { "id": "c", "text": "Trópico de Capricórnio" },
                  { "id": "d", "text": "Círculo Polar Ártico" }
                ],
                "correctOptionId": "b",
                "explanation": "A Linha do Equador é o paralelo de referência 0° que divide a Terra entre os hemisférios Norte e Sul."
              },
              {
                "id": "geo_2",
                "lessonId": "geo_intro",
                "questionNumber": 2,
                "totalQuestions": 5,
                "prompt": "O movimento da Terra responsável pela sucessão dos dias e das noites é a:",
                "options": [
                  { "id": "a", "text": "Translação" },
                  { "id": "b", "text": "Rotação" },
                  { "id": "c", "text": "Nutação" },
                  { "id": "d", "text": "Precessão" }
                ],
                "correctOptionId": "b",
                "explanation": "A rotação é o giro da Terra em torno do próprio eixo, durando aproximadamente 24 horas e gerando dias e noites."
              },
              {
                "id": "geo_3",
                "lessonId": "geo_intro",
                "questionNumber": 3,
                "totalQuestions": 5,
                "prompt": "Qual é o maior oceano em extensão do planeta Terra?",
                "options": [
                  { "id": "a", "text": "Oceano Atlântico" },
                  { "id": "b", "text": "Oceano Índico" },
                  { "id": "c", "text": "Oceano Pacífico" },
                  { "id": "d", "text": "Oceano Glacial Ártico" }
                ],
                "correctOptionId": "c",
                "explanation": "O Oceano Pacífico é o maior e mais profundo de todos os oceanos, cobrindo mais de um terço da superfície terrestre."
              },
              {
                "id": "geo_4",
                "lessonId": "geo_intro",
                "questionNumber": 4,
                "totalQuestions": 5,
                "prompt": "A camada de gases que envolve a Terra e protege os seres vivos dos raios solares nocivos é a:",
                "options": [
                  { "id": "a", "text": "Litosfera" },
                  { "id": "b", "text": "Hidrosfera" },
                  { "id": "c", "text": "Atmosfera" },
                  { "id": "d", "text": "Biosfera" }
                ],
                "correctOptionId": "c",
                "explanation": "A atmosfera é a camada gasosa retida pela gravidade, contendo oxigênio, nitrogênio e a camada protetora de ozônio."
              },
              {
                "id": "geo_5",
                "lessonId": "geo_intro",
                "questionNumber": 5,
                "totalQuestions": 5,
                "prompt": "Qual é o bioma caracterizado por árvores de grande porte, clima quente e chuvas abundantes ao longo do ano?",
                "options": [
                  { "id": "a", "text": "Tundra" },
                  { "id": "b", "text": "Floresta Tropical (Ex: Amazônia)" },
                  { "id": "c", "text": "Deserto" },
                  { "id": "d", "text": "Taiga" }
                ],
                "correctOptionId": "b",
                "explanation": "As florestas tropicais encontram-se próximas à Linha do Equador e abrigam a maior biodiversidade do planeta."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "fisica",
    "title": "Física",
    "color": "#6366F1",
    "icon": "⚡",
    "imageSrc": "/assets/disciplina_fisica.png",
    "activeLessonsCount": "5/10",
    "themes": [
      {
        "id": "fis_mecanica_energia",
        "number": 1,
        "title": "Movimento, Força e Energia",
        "description": "Leis de Newton, velocidade média, gravidade e transformações energéticas (13-17 anos)",
        "level": "intermediario",
        "ageGroup": "13-17 anos",
        "lessons": [
          {
            "id": "fis_intro",
            "subjectId": "fisica",
            "themeNumber": 1,
            "title": "Cinemática e Dinâmica Fundamental",
            "subtitle": "Velocidade, Aceleração e Forças da Natureza",
            "summary": "Compreenda como os corpos se movem e as forças invisíveis que governam o universo.",
            "content": {
              "questionPrompt": "O que faz os objetos acelerarem ou pararem?",
              "description": "A física investiga a matéria e a energia. A velocidade média indica a rapidez com que a posição varia no tempo, enquanto uma força resultante provoca aceleração ou desaceleração nos corpos.",
              "numeratorExplanation": "Velocidade Média (Vm): Vm = ΔS / Δt (distância percorrida a dividir pelo tempo gasto). Se percorres 100 metros em 10 segundos, a velocidade é de 10 m/s.",
              "denominatorExplanation": "As Leis de Newton: 1.ª Lei (Inércia), 2.ª Lei (F = m . a, Força é massa vezes aceleração) e 3.ª Lei (Ação e Reação: a toda força corresponde uma reação oposta de mesma intensidade).",
              "exampleText": "Ao frear um autocarro bruscamente, os passageiros são projetados para a frente devido ao princípio da inércia.",
              "dailyLifeContext": "O cinto de segurança e os airbags dos automóveis foram concebidos com base nas leis de inércia e conservação de quantidade de movimento."
            },
            "level": "intermediario",
            "exercises": [
              {
                "id": "fis_1",
                "lessonId": "fis_intro",
                "questionNumber": 1,
                "totalQuestions": 5,
                "prompt": "Se um carro percorre 120 km em 2 horas, qual foi a sua velocidade média?",
                "options": [
                  { "id": "a", "text": "50 km/h" },
                  { "id": "b", "text": "60 km/h" },
                  { "id": "c", "text": "70 km/h" },
                  { "id": "d", "text": "80 km/h" }
                ],
                "correctOptionId": "b",
                "explanation": "Velocidade Média = 120 km ÷ 2 h = 60 km/h."
              },
              {
                "id": "fis_2",
                "lessonId": "fis_intro",
                "questionNumber": 2,
                "totalQuestions": 5,
                "prompt": "A tendência de um corpo manter o seu estado de repouso ou movimento retilíneo uniforme é chamada de:",
                "options": [
                  { "id": "a", "text": "Inércia" },
                  { "id": "b", "text": "Atrito" },
                  { "id": "c", "text": "Gravidade" },
                  { "id": "d", "text": "Pressão" }
                ],
                "correctOptionId": "a",
                "explanation": "A 1.ª Lei de Newton define o princípio da inércia: um corpo só altera o seu movimento se sofrer uma força resultante externa."
              },
              {
                "id": "fis_3",
                "lessonId": "fis_intro",
                "questionNumber": 3,
                "totalQuestions": 5,
                "prompt": "De acordo com a 2.ª Lei de Newton (F = m . a), se aplicarmos uma força de 20 N sobre uma massa de 4 kg, qual será a aceleração?",
                "options": [
                  { "id": "a", "text": "2 m/s²" },
                  { "id": "b", "text": "5 m/s²" },
                  { "id": "c", "text": "10 m/s²" },
                  { "id": "d", "text": "80 m/s²" }
                ],
                "correctOptionId": "b",
                "explanation": "a = F ÷ m = 20 N ÷ 4 kg = 5 m/s²."
              },
              {
                "id": "fis_4",
                "lessonId": "fis_intro",
                "questionNumber": 4,
                "totalQuestions": 5,
                "prompt": "Qual é a forma de energia associada ao movimento de um corpo?",
                "options": [
                  { "id": "a", "text": "Energia Potencial Gravítica" },
                  { "id": "b", "text": "Energia Cinética" },
                  { "id": "c", "text": "Energia Química" },
                  { "id": "d", "text": "Energia Nuclear" }
                ],
                "correctOptionId": "b",
                "explanation": "A energia cinética é a energia que um corpo adquire devido à sua velocidade (Ec = m . v² / 2)."
              },
              {
                "id": "fis_5",
                "lessonId": "fis_intro",
                "questionNumber": 5,
                "totalQuestions": 5,
                "prompt": "Por que a Lua orbita em torno da Terra em vez de se afastar pelo espaço?",
                "options": [
                  { "id": "a", "text": "Pela força magnética" },
                  { "id": "b", "text": "Pela atração da força gravitacional" },
                  { "id": "c", "text": "Pela pressão atmosférica" },
                  { "id": "d", "text": "Pela luz solar" }
                ],
                "correctOptionId": "b",
                "explanation": "A gravidade terrestre exerce atração centrípeta contínua, mantendo a Lua em órbita estável."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "quimica",
    "title": "Química",
    "color": "#10B981",
    "icon": "🧪",
    "imageSrc": "/assets/disciplina_quimica.png",
    "activeLessonsCount": "4/9",
    "themes": [
      {
        "id": "qui_materia_reacoes",
        "number": 1,
        "title": "Matéria, Átomos e Reações Químicas",
        "description": "Estados físicos, tabela periódica, elementos químicos e transformações da matéria (13-17 anos)",
        "level": "intermediario",
        "ageGroup": "13-17 anos",
        "lessons": [
          {
            "id": "qui_intro",
            "subjectId": "quimica",
            "themeNumber": 1,
            "title": "A Estrutura do Átomo e a Tabela Periódica",
            "subtitle": "Prótons, Nêutrons, Elétrons e Ligações",
            "summary": "Mergulhe no fascinante mundo invisível das partículas que formam tudo o que existe.",
            "content": {
              "questionPrompt": "De que é feita a matéria à nossa volta?",
              "description": "Tudo o que tem massa e ocupa espaço é matéria. No coração de cada substância existem átomos compostos por um núcleo (prótons e nêutrons) rodeado por uma eletrosfera com elétrons.",
              "numeratorExplanation": "Tabela Periódica: organiza os elementos por número atômico (número de prótons). O Hidrogênio (H) é o número 1, o Oxigênio (O) é o 8, e o Carbono (C) é a base de todas as moléculas orgânicas vivas.",
              "denominatorExplanation": "Lei da Conservação da Massa (Lavoisier): 'Na natureza, nada se cria, nada se perde, tudo se transforma'. Numa reação química, a massa inicial dos reagentes é exatamente igual à massa final dos produtos.",
              "exampleText": "A molécula da água (H2O) resulta da união química estável entre dois átomos de Hidrogênio e um átomo de Oxigênio.",
              "dailyLifeContext": "A digestão dos alimentos, o cozimento na cozinha e o funcionamento das baterias dos telemóveis são reações químicas cotidianas."
            },
            "level": "intermediario",
            "exercises": [
              {
                "id": "qui_1",
                "lessonId": "qui_intro",
                "questionNumber": 1,
                "totalQuestions": 5,
                "prompt": "Quais partículas com carga elétrica positiva encontram-se no núcleo atômico?",
                "options": [
                  { "id": "a", "text": "Elétrons" },
                  { "id": "b", "text": "Prótons" },
                  { "id": "c", "text": "Nêutrons" },
                  { "id": "d", "text": "Fótons" }
                ],
                "correctOptionId": "b",
                "explanation": "Os prótons possuem carga positiva e localizam-se no núcleo atômico ao lado dos nêutrons."
              },
              {
                "id": "qui_2",
                "lessonId": "qui_intro",
                "questionNumber": 2,
                "totalQuestions": 5,
                "prompt": "Qual é a fórmula química molecular da água pura?",
                "options": [
                  { "id": "a", "text": "CO2" },
                  { "id": "b", "text": "H2O" },
                  { "id": "c", "text": "NaCl" },
                  { "id": "d", "text": "O2" }
                ],
                "correctOptionId": "b",
                "explanation": "A água é composta por dois átomos de hidrogênio ligados covalentemente a um átomo de oxigênio (H2O)."
              },
              {
                "id": "qui_3",
                "lessonId": "qui_intro",
                "questionNumber": 3,
                "totalQuestions": 5,
                "prompt": "A passagem direta do estado sólido para o estado gasoso sem passar pelo líquido chama-se:",
                "options": [
                  { "id": "a", "text": "Fusão" },
                  { "id": "b", "text": "Evaporação" },
                  { "id": "c", "text": "Sublimação" },
                  { "id": "d", "text": "Condensação" }
                ],
                "correctOptionId": "c",
                "explanation": "A sublimação ocorre quando um sólido passa diretamente ao estado de vapor (ex: gelo seco ou naftalina)."
              },
              {
                "id": "qui_4",
                "lessonId": "qui_intro",
                "questionNumber": 4,
                "totalQuestions": 5,
                "prompt": "Uma solução de água com sal totalmente dissolvido é classificada como uma mistura:",
                "options": [
                  { "id": "a", "text": "Heterogênea" },
                  { "id": "b", "text": "Homogênea" },
                  { "id": "c", "text": "Composta trifásica" },
                  { "id": "d", "text": "Coloidal opaca" }
                ],
                "correctOptionId": "b",
                "explanation": "Uma mistura homogênea apresenta uma única fase visível uniforme em toda a sua extensão."
              },
              {
                "id": "qui_5",
                "lessonId": "qui_intro",
                "questionNumber": 5,
                "totalQuestions": 5,
                "prompt": "Qual cientista formulou a célebre frase 'Na natureza nada se cria, nada se perde, tudo se transforma'?",
                "options": [
                  { "id": "a", "text": "Albert Einstein" },
                  { "id": "b", "text": "Antoine Lavoisier" },
                  { "id": "c", "text": "Isaac Newton" },
                  { "id": "d", "text": "Dmitri Mendeleiev" }
                ],
                "correctOptionId": "b",
                "explanation": "Antoine Lavoisier é considerado o pai da química moderna pela comprovação da Lei de Conservação das Massas."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "biologia",
    "title": "Biologia",
    "color": "#14B8A6",
    "icon": "🧬",
    "imageSrc": "/assets/disciplina_biologia.png",
    "activeLessonsCount": "4/8",
    "themes": [
      {
        "id": "bio_genetica_dna",
        "number": 1,
        "title": "Células, DNA e Genética Moderna",
        "description": "O código genético, reprodução celular, hereditariedade e biodiversidade (14-17 anos)",
        "level": "avancado",
        "ageGroup": "14-17 anos",
        "lessons": [
          {
            "id": "bio_intro",
            "subjectId": "biologia",
            "themeNumber": 1,
            "title": "O Livro da Vida: DNA e Células",
            "subtitle": "Como as Informações Biológicas são Transmitidas",
            "summary": "Descubra a estrutura em dupla hélice do DNA e os mecanismos que garantem a continuidade dos seres vivos.",
            "content": {
              "questionPrompt": "Como as nossas características físicas são herdadas dos pais?",
              "description": "Cada célula do nosso corpo guarda no seu núcleo uma cópia do código genético sob a forma de moléculas de DNA (Ácido Desoxirribonucleico), organizadas em cromossomos herdados dos progenitores.",
              "numeratorExplanation": "Bases Nitrogenadas: o DNA é formado por 4 bases que se emparelham em pares específicos: Adenina (A) com Timina (T), e Citosina (C) com Guanina (G).",
              "denominatorExplanation": "Genótipo e Fenótipo: o genótipo é a composição genética interna; o fenótipo é a expressão observável das características (como a cor dos olhos ou o tipo sanguíneo), influenciada pelo ambiente.",
              "exampleText": "Gregor Mendel descobriu as leis da hereditariedade cruzando ervilhas de características puras e observando as gerações seguintes.",
              "dailyLifeContext": "Testes de DNA para identificação de parentesco e diagnósticos precoces de saúde baseiam-se na leitura dessas sequências genéticas."
            },
            "level": "avancado",
            "exercises": [
              {
                "id": "bio_1",
                "lessonId": "bio_intro",
                "questionNumber": 1,
                "totalQuestions": 5,
                "prompt": "Na molécula de DNA, qual base nitrogenada emparelha sempre com a Adenina (A)?",
                "options": [
                  { "id": "a", "text": "Citosina (C)" },
                  { "id": "b", "text": "Guanina (G)" },
                  { "id": "c", "text": "Timina (T)" },
                  { "id": "d", "text": "Uracila (U)" }
                ],
                "correctOptionId": "c",
                "explanation": "No DNA, as pontes de hidrogênio unem estritamente Adenina à Timina (A-T) e Citosina à Guanina (C-G)."
              },
              {
                "id": "bio_2",
                "lessonId": "bio_intro",
                "questionNumber": 2,
                "totalQuestions": 5,
                "prompt": "Qual organela celular é conhecida como a 'usina de energia' da célula por realizar a respiração celular?",
                "options": [
                  { "id": "a", "text": "Complexo de Golgi" },
                  { "id": "b", "text": "Mitocôndria" },
                  { "id": "c", "text": "Ribossomo" },
                  { "id": "d", "text": "Lisossomo" }
                ],
                "correctOptionId": "b",
                "explanation": "As mitocôndrias convertem glicose e oxigênio em moléculas de energia (ATP) para abastecer a atividade celular."
              },
              {
                "id": "bio_3",
                "lessonId": "bio_intro",
                "questionNumber": 3,
                "totalQuestions": 5,
                "prompt": "Quantos pares de cromossomos uma célula somática humana típica possui?",
                "options": [
                  { "id": "a", "text": "12 pares" },
                  { "id": "b", "text": "23 pares (total de 46)" },
                  { "id": "c", "text": "36 pares" },
                  { "id": "d", "text": "48 pares" }
                ],
                "correctOptionId": "b",
                "explanation": "Os seres humanos possuem 23 pares de cromossomos (46 no total), sendo metade herdada da mãe e metade do pai."
              },
              {
                "id": "bio_4",
                "lessonId": "bio_intro",
                "questionNumber": 4,
                "totalQuestions": 5,
                "prompt": "O processo de divisão celular que forma os gametas (espermatozoides e óvulos) com metade do número de cromossomos é a:",
                "options": [
                  { "id": "a", "text": "Mitose" },
                  { "id": "b", "text": "Meiose" },
                  { "id": "c", "text": "Bipartição" },
                  { "id": "d", "text": "Fragmentação" }
                ],
                "correctOptionId": "b",
                "explanation": "A meiose é uma divisão reducional que produz 4 células-filhas haploides (com metade do material genético) para a reprodução sexuada."
              },
              {
                "id": "bio_5",
                "lessonId": "bio_intro",
                "questionNumber": 5,
                "totalQuestions": 5,
                "prompt": "Quem é considerado o 'Pai da Genética' por suas experiências com ervilhas no século XIX?",
                "options": [
                  { "id": "a", "text": "Charles Darwin" },
                  { "id": "b", "text": "Gregor Mendel" },
                  { "id": "c", "text": "Louis Pasteur" },
                  { "id": "d", "text": "James Watson" }
                ],
                "correctOptionId": "b",
                "explanation": "Gregor Mendel descobriu os princípios fundamentais da hereditariedade e segregação dos fatores genéticos."
              }
            ]
          }
        ]
      }
    ]
  }
];

const CONFIGS: Record<string, { title: string; color: string; icon: string; imageSrc: string; seeds: readonly any[] }> = {
  matematica: {
    title: 'Matemática',
    color: '#00C48C',
    icon: '📐',
    imageSrc: '/assets/disciplina_matematica.png',
    seeds: MATEMATICA_SEEDS
  },
  portugues: {
    title: 'Português',
    color: '#1E88E5',
    icon: '📚',
    imageSrc: '/assets/disciplina_portugues.png',
    seeds: PORTUGUES_SEEDS
  },
  ciencias: {
    title: 'Ciências',
    color: '#10B981',
    icon: '🔬',
    imageSrc: '/assets/disciplina_ciencias.png',
    seeds: CIENCIAS_SEEDS
  },
  historia: {
    title: 'História',
    color: '#F59E0B',
    icon: '🏛️',
    imageSrc: '/assets/disciplina_historia.png',
    seeds: HISTORIA_SEEDS
  },
  geografia: {
    title: 'Geografia',
    color: '#8B5CF6',
    icon: '🌍',
    imageSrc: '/assets/disciplina_geografia.png',
    seeds: GEOGRAFIA_SEEDS
  },
  fisica: {
    title: 'Física',
    color: '#EC4899',
    icon: '⚡',
    imageSrc: '/assets/disciplina_fisica.png',
    seeds: FISICA_SEEDS
  },
  quimica: {
    title: 'Química',
    color: '#06B6D4',
    icon: '🧪',
    imageSrc: '/assets/disciplina_quimica.png',
    seeds: QUIMICA_SEEDS
  },
  biologia: {
    title: 'Biologia',
    color: '#84CC16',
    icon: '🧬',
    imageSrc: '/assets/disciplina_biologia.png',
    seeds: BIOLOGIA_SEEDS
  },
  ingles: {
    title: 'Inglês',
    color: '#6366F1',
    icon: '🌐',
    imageSrc: '/assets/disciplina_ingles.png',
    seeds: INGLES_SEEDS
  }
};

export const SUBJECTS_DATA: SubjectItem[] = Object.keys(CONFIGS).map((id) => {
  const cfg = CONFIGS[id];
  const baseSub = BASE_SUBJECTS_DATA.find(s => s.id === id);
  return buildSubject(
    { id, title: cfg.title, color: cfg.color, icon: cfg.icon, imageSrc: cfg.imageSrc },
    cfg.seeds,
    baseSub?.themes
  );
});

