# Career OS — Leandro Goulart

Site único que reúne currículo, portfólio e as decisões por trás de cada um.

**No ar:** <https://leandrogoulart.github.io/CV/>

> Este repositório é, ele próprio, parte do portfólio. A forma como o projeto
> foi pensado, decidido e documentado é a evidência de organização que o site
> afirma ter. Por isso o que está registrado aqui não é o resultado — é o
> raciocínio.

---

## Por que isto existe

Em processo seletivo sempre perguntam **o que** eu sei fazer. Quase nunca
perguntam **como** eu decido. E é a segunda pergunta que separa quem executa
tarefa de quem resolve problema.

Currículo em PDF responde à primeira em duas páginas e para por aí. Perfil de
rede social responde mal às duas. Eu precisava de um lugar onde a resposta
inteira coubesse — e onde quem quisesse verificar pudesse abrir o código e
conferir.

Daí a regra que governa o projeto inteiro:

> **Toda afirmação do site precisa ser sustentável em cinco minutos de pergunta
> técnica.** Se não for, sai.

É a mesma regra que aplico em entrevista. Escrever um site que a respeita é
mais difícil do que escrever um que impressiona, e é exatamente por isso que
ele vale alguma coisa.

---

## O método por trás

O site não é um exercício de front-end. É a aplicação de um método que eu uso
em qualquer coisa que construo, registrado no meu PDI:

```
Conhecimento → Laboratório → Evidência → Aplicação → Documentação → Maturidade
```

Curso concluído não entra como competência — entra como conhecimento. Vira
competência quando produz evidência. É o motivo de o site declarar, em cada
item, **onde** aquilo foi exercido, e de o portfólio declarar qual foi minha
participação real em cada projeto.

Três coisas nascem antes da primeira linha de código, em qualquer projeto meu:

1. **O problema.** Não a solução, não a ferramenta. Que pergunta isto responde?
2. **O critério de aceite.** Como eu saberei que está pronto, antes de começar.
3. **O registro da decisão.** Por que este caminho e não o outro — enquanto a
   alternativa ainda está fresca, não meses depois, quando virou mito.

Dá trabalho. É também a única coisa que impede um projeto de virar aquilo que
ninguém mais consegue manter, nem quem escreveu.

---

## Arquitetura da informação

Cinco abas, na ordem em que um recrutador lê:
*quem é* → *o que sabe fazer* → *prove* → *quem é por dentro* → *como falar comigo*.

| # | Aba | O que ela precisa provar |
| --- | --- | --- |
| 1 | **Identidade e trajetória** | De onde vim e por que a transição faz sentido |
| 2 | **Competências** | O que sei fazer, e em que nível de maturidade |
| 3 | **Portfólio** | A prova prática, com participação declarada |
| 4 | **Comportamental** | Como penso, decido e trabalho |
| 5 | **Contato** | Perfis, currículo e um formulário que funciona |

A ordem não é estética, é hipótese de leitura: ninguém avalia competência antes
de entender quem é a pessoa, e ninguém se interessa por perfil comportamental
antes de ter se interessado pelo resto.

**O comportamental fica por último de propósito.** DISC e tipologias têm
validade psicométrica contestada. Funcionam como aprofundamento de quem já se
interessou — não como cartão de visita. Colocá-los na frente seria vender o
que menos se sustenta.

---

## Decisões que valeram a pena registrar

### A linha do tempo virou espinha de peixe

A primeira versão era vertical: 19 marcos, cerca de 1.800 px de altura. Um muro
que o leitor abandona no meio. O mesmo conteúdo em formato horizontal, com os
marcos alternando acima e abaixo de uma espinha central, resolve em ~400 px.

Detalhe que só aparece quando se usa: a alternância acima/abaixo é recalculada
a cada filtro. Resolver isso em CSS puro quebraria — itens ocultos continuam
contando para o seletor, e um filtro jogaria todos os cartões para o mesmo lado.

As contagens dos filtros são lidas do próprio conteúdo em tempo de execução.
Nenhum número escrito à mão que possa, um dia, divergir do que está na tela.
Número que mente é pior que número ausente.

### Competência é dimensão, não lista de tecnologia

Lista de cinquenta tecnologias não diz nada: ninguém sabe cinquenta coisas no
mesmo nível, e todo mundo finge que sabe. Então as competências ficam agrupadas
em oito dimensões, fechadas por padrão — o estado inicial é um índice de oito
linhas, não um muro.

E cada item carrega o nível declarado:

- **Profissional** — ambiente real, com responsabilidade sobre o resultado
- **Prática** — projeto ou laboratório executado
- **Fundamentos** — conhecimento teórico, sem aplicação demonstrável

Declarar "Fundamentos" custa caro. É também o que torna "Profissional"
confiável. Se tudo fosse Profissional, nada seria.

Uma versão anterior usava um selo grande por competência. Ficou poluída e eu
derrubei: **densidade não é rigor.**

### Participação real, escrita

Cada caso do portfólio diz se fui autor único, qual foi minha parte e qual é o
escopo. O laboratório de análise de logs usa dados sintéticos e isso está
escrito nele — prova método, não volume de produção.

É a ressalva que mais dói escrever e a que mais sustenta o resto. Portfólio que
não delimita escopo convida a pergunta que derruba a entrevista.

### O site funciona sem JavaScript

O carrossel do portfólio, sem script, vira uma faixa rolável com todos os casos
visíveis. Nenhuma informação depende do JavaScript — ele melhora a experiência,
não a viabiliza.

Mesma lógica nos scripts: se a marcação esperada não existir, o script sai em
silêncio em vez de derrubar a página.

### Acessibilidade não é item de checklist

Navegação por abas no padrão ARIA completo, com setas, Home e End. Link para
pular a navegação. Foco visível para quem navega por teclado. Animação
respeitando `prefers-reduced-motion`. Contraste verificado, não estimado.

Nenhuma informação é transmitida só por cor — onde há marcador colorido, há
também diferença de forma e o nível em texto para leitor de tela.

Isso não está aqui para parecer bonito num README. Está porque acessibilidade é
o teste mais honesto de se a interface foi pensada ou improvisada.

### Sem build, sem framework

HTML, CSS e JavaScript direto. Nada a compilar significa nada a quebrar quando
uma dependência deixa de ser mantida. Um site que precisa existir por anos não
deveria depender de uma cadeia de ferramentas que muda a cada seis meses.

Para rodar local, qualquer servidor estático:

```bash
python -m http.server 8000
```

### Currículos

Três recortes — generalista, suporte e segurança — gerados da mesma fonte de
dados. Coluna única, títulos literais, nada de informação dentro de imagem.
Habilidades e certificações vêm **antes** da experiência, porque a triagem
procura palavra-chave nos primeiros segundos e o que transborda de página
precisa ser a seção menos crítica.

Só o generalista tem link no site. Os outros dois existem no repositório.

---

## Identidade visual

O site é entrega da **Goulart InfoSolutions** e segue o manual de marca da
empresa, não uma paleta escolhida para esta página. Os valores vivem em um
único arquivo de tokens — se precisou de um valor novo, ele vira token antes de
ser usado.

Uma versão anterior tinha um azul próprio, diferente do azul da marca, com o
argumento de que dois azuis próximos na mesma tela seriam lidos como erro. O
argumento estava certo; a conclusão estava invertida. **Quem cede é o site, não
a marca.**

O rodapé é a assinatura institucional da empresa, idêntica à do site
[goulartinfosolutions.github.io](https://leandrogoulart.github.io/GoulartInfoSolutions/).

---

## Estrutura

```
.
├── index.html            Documento único; cada aba é um <section role="tabpanel">
├── assets/
│   ├── cv/               Três currículos em PDF
│   ├── img/              Imagens, capas dos casos e credenciais
│   └── icons/            Marca e favicon
├── css/
│   ├── tokens.css        Única fonte de valores
│   ├── base.css          Reset, tipografia e acessibilidade
│   ├── layout.css        Cabeçalho, abas, painéis, hero e rodapé
│   └── components.css    Espinha de peixe, cards, chips e carrossel
└── js/
    ├── tabs.js           Navegação por abas (ARIA + rota por hash)
    ├── timeline.js       Filtro, alternância e rolagem da linha do tempo
    ├── skills.js         Filtro de competências
    ├── portfolio.js      Carrossel e sincronia com o caso aberto
    └── contato.js        Envio do formulário sem recarregar a página
```

Toda aba é endereçável por URL: `#identidade`, `#competencias`, `#portfolio`,
`#comportamental`, `#contato`. Link compartilhado abre onde deveria abrir.

Branch única: `main`, que é o que o GitHub Pages publica.

---

## O que ainda falta

- **`og:image`.** Link compartilhado em rede social abre sem cartão de prévia.
  É a pendência de maior impacto, porque afeta justamente o canal que traz
  gente para cá.

Pendência registrada é pendência que existe. A que não está escrita vira
surpresa.

---

## Licença

O conteúdo — texto, trajetória, currículos e imagens — é pessoal e não é
reaproveitável. O código, se te for útil como referência de estrutura ou de
acessibilidade, fica à vontade.
